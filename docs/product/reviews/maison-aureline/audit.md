# Maison Aureline: local preview evidence

Date: 2026-10-06. Status: registered as a local draft; not approved for public publication.
Source repository: `StudioB22/bijouterie-01`.
Captured source commit: `20801cd73c92bbde4165a53f131570722f29491c`.

## Scope and identity

Maison Aureline is a fictional jewellery brand created as a StudioB22 website mock-up. It is not
client work and does not represent a real shop, collection or appointment service. The reviewed
build displays that status on every content route and labels its pieces, prices, history and service
claims as illustrative. Its appointment page contains a non-editable example and cannot collect or
submit visitor data.

This evidence package supports the development-only portfolio preview. It does not approve a public
gallery entry, deploy the mock-up or change its source repository.

## Corrections completed before capture

- Next.js was updated to `16.3.8`; React and React DOM remain on `19.2.4`.
- The fictional-business notice and `noindex, nofollow` metadata are present on all four content
  routes.
- The appointment form and unverified email link were replaced by a non-interactive example.
- The retired, unverified sharing photo was replaced by the reviewed Pexels photo `14999288`.
- Incorrect creator records were corrected, and all 13 active Pexels source pages are documented in
  the source repository.
- Visible or screen-reader credits accompany page photography according to placement.

The source repository keeps the complete inventory, original pages, creators, licence reference,
runtime URLs and unresolved rights limits in `documentation/media-sources.md`.

## Verification completed

- Lint, TypeScript validation, production build and seven HTTP regression tests passed.
- `/`, `/collections`, `/maison` and `/rendez-vous` returned HTTP 200 from the production build on
  the loopback-only server `127.0.0.1:4403`.
- A 320-pixel and 1,280-pixel browser review covered all four routes after scrolling triggered lazy
  loading.
- All 29 rendered image instances loaded with non-zero natural dimensions.
- No reviewed route had horizontal overflow, a missing image alternative, or a browser warning or
  error.
- The visual review found jewellery-focused product photographs and tightly cropped hand imagery,
  without a complete face.

These checks do not establish social-platform rendering, every possible third-party right, legal
clearance for depicted designs, or acceptance on physical devices.

## Captures

| File | Viewport | Source | Treatment |
| --- | --- | --- | --- |
| `desktop-20801cd.png` | 1280 × 900 | Home page served from the captured commit | Direct browser capture, unretouched |
| `mobile-20801cd.png` | 390 × 1688 | Home page served from the captured commit | Direct browser capture, unretouched |

Both captures were produced on 2026-10-06 from the local production server. The primary photograph
visible in them is Pexels `32922844`, credited by the source repository to Melike Baran. It is stock
illustration for a fictional brand and must not be presented as a StudioB22 product, client, employee
or endorsement.

The official Pexels licence was reviewed by the source project. It permits website and promotional
use and modifications, but it does not establish every model, property, jewellery-design or trademark
permission. The source inventory remains the authority for media provenance and outstanding limits.

## Portfolio boundary

- `published` remains `false`.
- Captures remain under `docs/product/reviews/maison-aureline/` and are never copied to `public/`.
- The local preview uses `http://127.0.0.1:4403/`, with the optional server-only override
  `STUDIOB22_LOCAL_MAISON_AURELINE_URL`.
- Production builds must contain no Maison Aureline title, local address, capture or atelier route.
- Public publication requires a separate review and explicit approval.

## Remaining publication checks

1. Complete the independent public-gallery review for content, accessibility, performance,
   dependencies, security, responsive behaviour and demo maturity.
2. Decide whether the remote Pexels runtime dependency is acceptable for a public demonstration or
   whether verified local assets are preferable.
3. Validate the final hosted demonstration URL and indexing policy before publication.
4. Obtain explicit approval before changing the draft status or deploying the mock-up.
