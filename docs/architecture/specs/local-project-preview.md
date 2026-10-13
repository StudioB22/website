# Local project preview

Status: owner-approved local implementation plan, 2026-10-02. No push or deployment.

The [multi-project extension](multi-project-local-preview.md) now defines the registry,
generic template data and slug-scoped capture routes. This document retains the original
development/publication boundary and historical verification evidence.

## Need and acceptance

The maintainer reviews Maison Marceau through the expressive portfolio while its independent
Angular repository evolves separately. The project remains a draft, not published proof.

- UC1: inspect the draft card, its detail page and the independent local demonstration.
- Development mode only: gallery card, detail route and capture endpoints.
- Production builds emit none of these routes, draft copy, local demo URLs or capture assets.
- Public catalogue validation, publication dates and HTTPS demo rules remain unchanged.
- Demo links accept HTTP loopback hosts only, without credentials, queries or fragments.
- Screenshots retain their source commit, fictional notices, photo credits and limitations.
- No external requests, iframe, registration, personal data or deployment is introduced.

## Design and review

The catalogue owns the unchanged draft metadata. A development-only view adapter provides
capture paths and a loopback demo URL. Astro pages enforce the development boundary;
the domain URL validator remains runtime-independent. Existing design tokens and responsive
card/detail styles are reused. No new framework, repository abstraction or dependency is needed.

Four-pass review: requirements map to production-exclusion and URL tests; dependencies point
from Astro/configuration to pure domain validation; reuse existing catalogue and assets without
fake publication evidence; direct conditional routing fits better than a preview framework.
See the component view in ../diagrams/local-project-preview/02-component.md.

## Owner-approved visual refinement, 2026-10-02

The local card uses a neutral presentation surface around the unretouched capture,
a short project name and a primary link with a 52-pixel target height. The detail
places its single demonstration link in the introduction, with an associated local
operation notice and a new-tab announcement. Desktop and mobile captures share a
responsive presentation area; project facts follow in one or two columns.

The original capture files, fictional status and publication boundary are unchanged.
Only pointer-triggered image movement is added, conditional on no reduced-motion
preference. No new media, runtime dependency or automatic animation is introduced.
Visual checks covered the card at 320/390/1280 pixels and the detail at 320 pixels;
no horizontal document overflow was observed. Real browser zoom and reduced-motion
emulation remain pending because the collaborative tools do not expose those controls.

Owner feedback rejected the cobalt capture surround. It was removed without changing
the functional improvements or starting another visual direction.

## Local server operation

Run the portfolio on loopback port 4400 and the independent Angular demo on port 4401.
`STUDIOB22_LOCAL_DEMO_URL` may override the latter with another HTTP loopback address.
It is a server configuration value, not a PUBLIC environment variable or public catalogue field.
The local detail path is `/atelier-local/realisations/maison-marceau/`.

The active captures describe merged commit 8c8bb05, built in production mode and served
locally on 2026-10-02. Earlier 2600fe3 captures remain archived in the review package.
Both versions are review references, not publication approval.
Production-build tests remain the release boundary even for the preview release channel.

After starting both local servers, `npm run test:local` verifies the actual draft routes,
capture PNG signatures, rejection of unknown captures and independent demo reachability.
It is separate from the ordinary checks because it requires running local servers.

## Verification — 2026-10-02

- Full `npm run check`: formatting, lint, Astro diagnostics, 45 unit tests, production
  compilation and nine site-build tests passed.
- Three HTTP integration tests passed with both local servers running.
- Preview and approved-public production fixtures exclude local draft routes and copy.
- Native browser: gallery and detail images loaded at 1280, 390 and 320 CSS-pixel widths,
  with equal document client/scroll widths on inspected pages. The link uses a new tab
  and noopener/noreferrer. The independent Angular home loaded at 320 pixels without overflow.
- Self-review: draft state remains false; production outputs contain no local endpoints,
  capture files or loopback demo address. No new dependencies, deployment or external writes.
- Captures were renewed on 8c8bb05; earlier evidence and photo credits are retained.
  Complete keyboard/zoom and reduced-motion checks remain separate acceptance tasks;
  no certification is claimed.
- The native browser initially reported Electron preload errors; these are host diagnostics,
  not application errors. Initial capture 404s were fixed and loading was reverified.
