import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

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

test("the gallery is honest while no project has passed publication review", async () => {
  const html = await readFile(
    join(distDirectory, "realisations", "index.html"),
    "utf8",
  );

  assert.match(html, /Galerie en préparation/);
  assert.doesNotMatch(html, /class="project-card"/);
});
