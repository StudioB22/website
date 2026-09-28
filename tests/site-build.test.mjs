import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { brand } from "../src/config/brand.ts";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const routes = ["/", "/realisations/", "/services/", "/methode/", "/a-propos/"];

test("the private preview generates every planned page without indexing", async () => {
  for (const route of routes) {
    const html = await readFile(
      join(distDirectory, route, "index.html"),
      "utf8",
    );

    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.match(html, /<html lang="fr">/);
    assert.match(html, /<main id="contenu">/);
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
