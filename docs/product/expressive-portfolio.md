# Expressive portfolio implementation

## Approved scope

The owner selected direction A and approved its integration on 2026-10-02. This work item records a presentation-only redesign of existing journeys, not a new application feature.

Need: a memorable digital atelier, fuller use of available space, and project-led navigation without sales pressure.

Acceptance criteria:

- Cobalt, midnight, cool paper, white, and restrained orange form the shared palette.
- Headlines occupy the available width without stretching glyphs.
- Existing catalogue publication rules, sector filtering, detail routes, and independent demonstration links remain unchanged.
- Mobile has a single-column reading order; desktop combines a wide project with paired cards.
- Motion is short and optional, with visible content when JavaScript is unavailable and no nonessential movement under reduced-motion preferences.
- Draft projects, fictional proof, invented locations, and generated boards do not become published catalogue entries.
- Existing checks and route/asset tests pass; responsive rendering is reviewed in the native preview.

## Design and architecture review

Requirements: owner-approved direction A, portfolio priority, independent demos, honest marketing, and mobile-first readability.

Dependencies/SOLID: only presentation and French page copy change. No domain dependency on CSS, animation library, remote image source, or service is introduced.

Simplicity: existing layout and global design tokens are reused. CSS handles one initial entrance and user-triggered card/button feedback. No observer framework or new dependency is justified.

Pattern fit: no new design pattern is needed for a static presentation change. Existing textual gallery journeys are unchanged; no new actors, types, cross-service flow, lifecycle, or personal data processing justify additional UML views.

## Marketing rationale

The homepage states the offer and its customer benefit before discussing tools. The gallery describes what visitors can inspect and distinguishes fictional concepts. Methodological copy makes scope and validation explicit.

Evidence level: positioning is based on the founder's brief, not independent customer research. Claims about market demand or conversion lift are deliberately absent. Contact integration is still pending and is not replaced by a nonfunctional contact button.

The generated direction board is an art-direction reference only. Original geometric CSS treatments and a provisional textual B avoid importing unverified logos, font files, or invented client screenshots.

## Motion and testing

Initial entrance: 420 ms, opacity and a small translation. Button feedback: 160 ms. Card image response: 420 ms, hover-capable devices only. Reduced-motion users receive the static interface.

Automated build tests cover the new message, navigation semantics, honest gallery explanation, optional-motion stylesheet, and absence of a forced body width. Existing suites retain catalogue and public/private release guarantees.

## Verification results

- Full check passed: formatting, lint, Astro diagnostics (21 files, no warnings or errors), 34 unit tests, static build, and 8 site-build tests.
- Native collaborative browser: five routes at 320, 390, and 1440 CSS-pixel viewport widths; all 15 combinations had equal document client and scroll widths and one primary heading.
- An isolated temporary catalogue with two clearly labelled test projects built seven routes. At 320 px, both images loaded and both cards remained visible with no horizontal overflow.
- At desktop width, filtering to the second sector displayed exactly one card and announced one result; the wide-card hidden rule did not override filtering.
- Reduced-motion handling was reviewed in CSS and checked in the emitted stylesheet. The preview tool does not expose media-preference emulation; a live reduced-motion preference check remains part of final acceptance.
- Self-review: no catalogue, deployment, dependencies, contact integration, or domain logic was changed. No must-fix issue remained in this local lot.

## Remaining work

Approved project captures are still needed to demonstrate the actual visual richness; the test screenshot is a labelled placeholder, not a project preview for publication. The B is a provisional textual mark, not a final cleared logo. Font selection and detailed icon artwork remain separate refinements. Real-device, reduced-motion, and performance acceptance remain required before publication.
