# Add an independent local project preview

**Status: implemented in this checkout; available in local development mode.**

This checkout includes the registry, local routes and `npm run test:local` script.
Use a checkout containing this implementation and start Astro with `npm run dev`.
Production builds exclude local draft pages and captures, including when served
locally with `npm run preview`.

This workflow exposes prepared drafts on the local portfolio only.
It does not publish a project, start its demo, clone its repository or approve its
media rights.

## Procedure

1. Prepare the independent repository and start its server on its own loopback port.
2. Add truthful draft metadata to src/data/projects.ts with published: false. Use the
   existing controlled sector/status vocabulary and unique kebab-case slug.
3. Put unretouched desktop/mobile PNG captures and provenance documentation under
   `docs/product/reviews/<slug>/`. Record source commit, capture date, creator, licence,
   limitations and fictional status where applicable. Do not copy drafts into public/.
4. Add one entry to src/data/local-project-previews.ts, following the Maison Marceau entry.
   Supply displayTitle, formatLabel, overviewTitle, overview, demoUrl, captureDate,
   sourceCommit, captureCredits and the ordered desktop/mobile captures. Set dimensions
   to actual PNG pixel dimensions. Filenames contain only letters, digits, hyphens and
   underscores followed by .png. No directory or absolute path is accepted.
5. Optionally choose a unique server-only demoUrlEnv beginning STUDIOB22_LOCAL_. Set it
   in your local server environment when overriding the default loopback demo. Do not use
   PUBLIC_ names, credentials, query strings, fragments or remote hosts.
6. Run npm run check, start the portfolio separately, then inspect /realisations/ and
   `/atelier-local/realisations/<slug>/`. Captures are served from
   `/atelier-local/captures/<slug>/desktop.png` and `mobile.png`.
7. Check narrow mobile and desktop layouts, credits, limits, keyboard access and the
   independent demo link. The `npm run test:local` integration test checks the
   registered Maison Marceau reference on portfolio port 4400 and demo port 4401; it is not a generic
   reachability test for every added server.

## Expected behavior

Adding another entry does not require editing Astro page templates or the capture route.
Missing files, duplicate slugs and invalid metadata stop local rendering with an error.
Unknown slug/capture routes return 404. Old unscoped capture URLs are retired.

Publication remains a separate review under gallery-inventory.md. This preview never
changes published flags, review approvals or deployment settings. Synthetic automated
test fixtures are not portfolio projects and must not be copied into the actual registry.
