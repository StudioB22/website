import assert from "node:assert/strict";
import { test } from "node:test";

// Run explicitly with the portfolio and independent Angular development servers started.
const portfolio = "http://127.0.0.1:4400";
const request = (path) =>
  fetch(`${portfolio}${path}`, { signal: AbortSignal.timeout(10_000) });

test("the local gallery exposes the draft without adding a published project", async () => {
  const response = await request("/realisations/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /data-published-count="0"/);
  assert.match(html, /Brouillon : aperçu local uniquement/);
  assert.match(html, /showcase-card-art/);
  assert.match(html, /href="\/atelier-local\/realisations\/maison-marceau\/"/);
  assert.match(
    html,
    /class="button button-primary"\s+href="\/atelier-local\/realisations\/maison-marceau\/"/,
  );
});

test("the detail and documented capture endpoints really load in development", async () => {
  const response = await request("/atelier-local/realisations/maison-marceau/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /href="http:\/\/127\.0\.0\.1:4401\/"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /noopener noreferrer/);
  assert.match(html, /<h1[^>]*>Maison Marceau<\/h1>/);
  assert.match(html, /showcase-layout/);
  assert.match(html, /Ce que cette maquette montre/);
  assert.match(html, /Les limites du projet/);
  assert.match(html, /Crédits et provenance/);
  const introduction = html.match(
    /<header\b[^>]*class="page-intro"[^>]*>([\s\S]*?)<\/header>/,
  )?.[1];
  assert.ok(introduction, "the project introduction is present");
  assert.match(introduction, /href="http:\/\/127\.0\.0\.1:4401\/"/);
  assert.match(introduction, /aria-describedby="local-demo-notice"/);
  assert.match(introduction, /id="local-demo-notice"/);
  assert.match(introduction, /Aperçu de projet en brouillon/);
  assert.match(introduction, /\(nouvel onglet\)/);
  assert.equal(
    (html.match(/href="http:\/\/127\.0\.0\.1:4401\/"/g) ?? []).length,
    1,
  );
  for (const name of ["desktop", "mobile"]) {
    const image = await request(
      `/atelier-local/captures/maison-marceau/${name}.png`,
    );
    assert.equal(image.status, 200);
    assert.equal(image.headers.get("content-type"), "image/png");
    const bytes = new Uint8Array(await image.arrayBuffer());
    assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
  for (const path of [
    "/atelier-local/captures/maison-marceau/unknown.png",
    "/atelier-local/captures/unknown/desktop.png",
    "/atelier-local/captures/desktop.png",
    "/atelier-local/realisations/unknown/",
  ]) {
    assert.equal((await request(path)).status, 404);
  }
});

test("the independent Angular demonstration is reachable without the portfolio owning its source", async () => {
  const response = await fetch("http://127.0.0.1:4401/", {
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Maquette fictive de barbier/);
});
