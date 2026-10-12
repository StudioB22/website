# Multi-project local preview

Status: scope and detailed conception owner-approved; implementation completed locally. Work item,
2026-10-02. This extends [the existing preview](local-project-preview.md), not publication.

## Need and acceptance criteria

The maintainer must add a prepared independent mock-up by editing catalogue data and one
preview registry, without changing gallery, detail templates or capture handlers.

- AC1: titles, sector/status labels, summary, capabilities, credits and limitations come from data.
- AC2: each configured draft has its own captures, presentation copy and loopback demo URL.
- AC3: different projects cannot accidentally share capture URLs or overwrite one another.
- AC4: invalid configuration fails explicitly before rendering; unknown routes return 404.
- AC5: production still emits no local drafts, routes, captures or loopback demo addresses.
- AC6: adding a project requires no clone, build, deployment or network request by the portfolio.
- AC7: synthetic projects exist only in isolated tests, never in the actual catalogue.

## Maintainer scenarios

### UC1: inspect a configured draft

Actor: maintainer. Preconditions: portfolio runs in development mode; a valid draft and
preview entry exist. Success: gallery card and detail use that entry's data and captures;
the demo link opens its independently started application in another tab.

Extensions: unknown slug/capture returns 404; a stopped demo remains an independent-server
error, not a false success message. No server is started automatically.

### UC2: register a prepared mock-up

Actor: maintainer. Preconditions: independent repository identified; truthful draft metadata,
documented media provenance and dated captures prepared. Steps:

1. Add the draft to src/data/projects.ts with published false.
2. Store captures under docs/product/reviews/<slug>/ with a provenance document.
3. Add an entry to src/data/local-project-previews.ts.
4. Start the independent demo and portfolio separately; run checks and inspect both routes.

Success: one new draft is available locally without modifying templates. Invalid registration
is rejected with an actionable error; no publication status is changed.

## Data and responsibilities

The existing project catalogue remains authoritative for public status and shared project copy.
A separate local registry contains only presentation and local-review information:

- projectSlug: reference to an existing unpublished catalogue entry;
- displayTitle, formatLabel, overviewTitle, overview: project-specific presentation copy;
- demoUrl: default HTTP loopback address; optional demoUrlEnv: explicitly named server-only
  override, preserving STUDIOB22_LOCAL_DEMO_URL for Maison Marceau;
- captureDate, sourceCommit: factual capture evidence, not publication approval;
- captureCredits: capture-specific attribution and usage limitations;
- captures: ordered desktop/mobile pair, each with name, sourceFilename, intrinsic dimensions
  and alt text. Files stay beneath that project's review directory.

src/domain/local-project-preview.ts validates entries and joins them to catalogue projects.
It is pure: no filesystem, Astro environment or server imports. It reuses parseLocalDemoUrl.
src/config/local-project-preview.ts owns DEV gating, environment overrides and file existence
checks. The registry owns defaults; templates do not contain project-specific fallbacks.

Validation rejects duplicate slugs, missing/published catalogue references, empty copy,
unsafe demo URLs, invalid/future dates, invalid source commits, missing/duplicate capture
roles, nonpositive dimensions and unsafe filenames. Filenames use letters, digits, hyphens
and underscores followed by .png; neither paths nor traversal syntax are accepted.
Environment override names must start with STUDIOB22_LOCAL_ and never PUBLIC_.

## Routes and migration

- Detail remains /atelier-local/realisations/<slug>/.
- Captures become /atelier-local/captures/<slug>/<name>.png.
- The handler resolves a validated registered slug/name pair, never a request-derived disk path.
- Unknown pairs and production requests return 404; successful capture responses keep
  image/png, no-store and noindex/nofollow headers.
- Old unscoped capture URLs are internal local-preview URLs and are retired. All registry,
  template and integration-test consumers migrate together; stored capture files stay intact.
- Maison Marceau's existing commit-specific files are reused without image changes.

## Files and verification plan

New: src/data/local-project-previews.ts, src/domain/local-project-preview.ts,
tests/local-project-preview.test.ts and docs/product/adding-local-project-preview.md.
Update: local preview configuration, capture route, gallery/detail templates and existing
local HTTP/production-exclusion tests. No public project schema or deployment changes.

Unit tests exercise two distinctly labelled synthetic drafts, deterministic ordering, correct
data joins and all validation failures. Temporary filesystem/registry fixtures verify distinct
capture resolution and missing-file rejection without editing the real catalogue.
HTTP tests retain the actual Maison Marceau journey and test unknown slug/name pairs.
Production tests inspect both preview and approved-public output for leakage.
Manual checks cover gallery/detail at 320, 390 and 1280 pixels and the independent demo link.

## Four-pass conception review

1. Requirements: AC1/AC2 map to data-driven rendering and two-project fixtures; AC3/AC4 to
   slug-scoped routing and invalid-input tests; AC5 to production-output tests; AC6/AC7 to
   dependency inspection and isolated fixtures.
2. Clean/SOLID: data and pure validation are inward dependencies; Astro, filesystem and
   environment access stay at the configuration/route boundary. Each module has one role.
3. KISS/YAGNI/DRY: one static registry replaces scattered hardcoded project details. No CMS,
   repository scanner, provider API, server manager or additional framework is justified.
4. Pattern fit: plain validated data plus a pure join is sufficient. No factory, repository
   interface or generic plugin system is introduced.

The [component view](../diagrams/multi-project-local-preview/01-component.md) describes these
boundaries. This extends the existing preview epic and actor; textual scenarios suffice.
There is no new lifecycle, personal-data flow or nontrivial orchestration requiring other views.

## Implementation verification

- Named registry, pure parser, IO configuration and slug-scoped route match the accepted design.
- 70 unit tests, nine site-build tests and three local HTTP tests passed, together with formatting,
  lint, Astro diagnostics and production build. Synthetic fixture data stays in tests.
- Two-project fixtures verify distinct data joins, capture URLs, files and environment overrides.
- Known Maison Marceau files remain unchanged; PNG dimensions use the actual stored raster sizes.
- Unknown slug/name pairs and retired unscoped capture URLs return 404.
- Native browser: gallery and detail checked at 320, 390 and 1280 CSS pixels, all captures
  loaded and document client/scroll widths matched. Demo link remains independent on port 4401.
- No project-specific name, sector, attribution, commit or framework remains in local templates.
- No public schema, dependency, pipeline, deployment or publication status changed.
