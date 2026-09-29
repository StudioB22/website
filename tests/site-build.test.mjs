import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { globSync } from "node:fs";
import {
  access,
  cp,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { brand } from "../src/config/brand.ts";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const projectDirectory = fileURLToPath(new URL("../", import.meta.url));
const routes = ["/", "/realisations/", "/services/", "/methode/", "/a-propos/"];

test("the private preview generates every planned page without indexing", async () => {
  for (const route of routes) {
    const html = await readFile(
      join(distDirectory, route, "index.html"),
      "utf8",
    );

    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.match(html, /Préversion privée/);
    assert.match(html, /<html lang="fr">/);
    assert.match(html, /<main id="contenu">/);
  }
});

test("the About page labels the C++ Lab initiative as unpublished work", async () => {
  const html = await readFile(
    join(distDirectory, "a-propos", "index.html"),
    "utf8",
  );

  assert.match(html, /Lab · projet en préparation/);
  assert.match(html, /cpp-learning-course/);
  assert.match(
    html,
    /aucun cours ni exemple de code C\+\+ n’est encore publié/,
  );
  assert.match(html, /ne correspond pas à une réalisation client/);
  assert.doesNotMatch(
    html,
    /href="https:\/\/github.com\/benoit-bremaud\/cpp-learning-course"/,
  );
});

test("preview-only identity notices remain visible in the private build", async () => {
  const homepage = await readFile(join(distDirectory, "index.html"), "utf8");
  const about = await readFile(
    join(distDirectory, "a-propos", "index.html"),
    "utf8",
  );

  assert.match(homepage, /Atelier web indépendant · Préversion privée/);
  assert.match(homepage, /Le nom du studio et le parcours de contact/);
  assert.match(about, /son identité définitive prend forme/);
});

test("an approved public build has no private-preview copy in generated pages", async () => {
  const fixtureDirectory = await mkdtemp(
    join(tmpdir(), "studiob22-public-build-"),
  );

  try {
    await cp(join(projectDirectory, "src"), join(fixtureDirectory, "src"), {
      recursive: true,
    });
    await cp(
      join(projectDirectory, "public"),
      join(fixtureDirectory, "public"),
      {
        recursive: true,
      },
    );
    await cp(
      join(projectDirectory, "package.json"),
      join(fixtureDirectory, "package.json"),
    );
    await symlink(
      join(projectDirectory, "node_modules"),
      join(fixtureDirectory, "node_modules"),
      "dir",
    );
    const approvedBrand = await readFile(
      join(projectDirectory, "tests", "fixtures", "approved-brand.txt"),
      "utf8",
    );
    await writeFile(
      join(fixtureDirectory, "src", "config", "brand.ts"),
      approvedBrand,
    );

    const build = spawnSync("npm", ["run", "build"], {
      cwd: fixtureDirectory,
      env: { ...process.env, PUBLIC_RELEASE_CHANNEL: "public" },
      encoding: "utf8",
      timeout: 120_000,
    });
    assert.equal(build.status, 0, build.stderr || build.stdout);

    const publicDist = join(fixtureDirectory, "dist");
    const pages = globSync("**/index.html", { cwd: publicDist });
    for (const route of routes) {
      const expectedPage =
        route === "/" ? "index.html" : `${route.slice(1)}index.html`;
      assert.ok(pages.includes(expectedPage), `Missing public page: ${route}`);
    }

    for (const page of pages) {
      const html = await readFile(join(publicDist, page), "utf8");
      assert.match(html, /name="robots" content="index, follow"/);
      assert.doesNotMatch(html, /Préversion privée|Nom de travail/);
      assert.doesNotMatch(
        html,
        /identité définitive prend forme|parcours de contact sont encore en préparation/,
      );
      assert.doesNotMatch(
        html,
        /Lab · projet en préparation|cpp-learning-course/,
      );
    }
  } finally {
    await rm(fixtureDirectory, { recursive: true, force: true });
  }
});

test("all local links in generated pages resolve to built routes or assets", async () => {
  for (const route of routes) {
    const html = await readFile(
      join(distDirectory, route, "index.html"),
      "utf8",
    );
    const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map(
      (match) => match[1],
    );

    for (const link of links) {
      const target = link.endsWith("/")
        ? join(distDirectory, link, "index.html")
        : join(distDirectory, link);
      await assert.doesNotReject(
        access(target),
        `Broken link from ${route} to ${link}`,
      );
    }
  }
});

test("the gallery and homepage adapt to the published catalogue", async () => {
  const html = await readFile(
    join(distDirectory, "realisations", "index.html"),
    "utf8",
  );
  const homepage = await readFile(join(distDirectory, "index.html"), "utf8");
  const publishedCount = Number(
    html.match(/data-published-count="(\d+)"/)?.[1],
  );
  assert.ok(Number.isInteger(publishedCount));
  const renderedCards = [...html.matchAll(/class="project-card"/g)].length;
  assert.equal(renderedCards, publishedCount);
  const visibleDirections = [...html.matchAll(/class="project-direction"/g)]
    .length;
  assert.equal(visibleDirections, publishedCount);
  const hasPublishedProjects = publishedCount > 0;

  if (hasPublishedProjects) {
    assert.doesNotMatch(html, /Galerie en préparation/);
    assert.doesNotMatch(homepage, /premières fiches sont en cours de/);
    assert.match(homepage, /D’autres exemples seront/);
    assert.match(html, /id="sector-filter"/);
    assert.match(
      homepage,
      /class="button button-primary" href="\/realisations\/"/,
    );
  } else {
    assert.match(html, /Galerie en préparation/);
    assert.match(homepage, /premières fiches sont en cours de/);
    assert.doesNotMatch(html, /id="sector-filter"/);
    assert.match(homepage, /class="button button-primary" href="\/services\/"/);
  }

  assert.match(homepage, /href="\/realisations\/"/);
  const founderIntro = homepage
    .match(/<p class="founder-intro">([^<]+)<\/p>/)?.[1]
    .trim();
  assert.equal(
    founderIntro,
    `Je suis ${brand.founder}, fondateur de ${brand.name}.`,
  );
});
