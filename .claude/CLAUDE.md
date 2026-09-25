# Project conventions

## Stack

- Conception phase: Markdown and Mermaid.
- Planned implementation: Astro, strict TypeScript, static Cloudflare Pages output.
- No server runtime, persistence, or authentication in the initial public slice.

## Commands

- Install: not available until the implementation branch creates the Astro project.
- Dev: not available during conception.
- Build: not available during conception.
- Test: documentation validation during conception; automated tests arrive with source code.
- Lint: documentation validation during conception.
- Typecheck: not available until TypeScript source exists.

## Architecture

- `docs/product/`: product principles and scoped decision history.
- `docs/architecture/specs/`: authoritative implementation specifications.
- `docs/architecture/decisions/`: cross-cutting architecture decisions in MADR form.
- `docs/architecture/diagrams/`: focused visual indexes of accepted specifications.
- `docs/architecture/traceability-matrix.md`: requirements-to-verification coverage.

## Project-specific conventions

- All repository artefacts are written in English; the public website is French-first.
- `StudioB22` is a working name, never a production brand assumption.
- Gallery entries must declare their truthful status and may not imply client work.
- The public website and authenticated client portal are separate products.
- Production code must use named exports and strict TypeScript without `any`.

## Known pitfalls

- Do not publish a final domain, professional email, prices, testimonials, or business
  maturity before each item is verified.
- Do not make private GitHub repositories a public runtime dependency.
- Do not introduce a CMS, backend, or authentication to solve a hypothetical need.
