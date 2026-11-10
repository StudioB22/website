# StudioB22 public website

Public commercial website for Benoît Bremaud's future web studio. `StudioB22` is a
working name: the product architecture must remain independent from the final brand,
domain, and email identity.

The approved conception is now being implemented as a static Astro website. No
production website, client portal, application authentication, payment, connected
form, analytics, or provider integration is implemented yet.

## Current work

- French private preview: [issue #5](https://github.com/StudioB22/website/issues/5)
- Completed foundation: [issue #3](https://github.com/StudioB22/website/issues/3)
- Approved conception: [issue #1](https://github.com/StudioB22/website/issues/1)
- Public website specification: [`docs/architecture/specs/public-website-mvp.md`](docs/architecture/specs/public-website-mvp.md)
- Positioning and offer: [`docs/product/positioning-and-offer.md`](docs/product/positioning-and-offer.md)
- Information architecture: [`docs/product/site-map.md`](docs/product/site-map.md)
- Gallery inventory: [`docs/product/gallery-inventory.md`](docs/product/gallery-inventory.md)
- Responsible AI-assisted delivery: [`docs/product/ai-assisted-delivery.md`](docs/product/ai-assisted-delivery.md)
- Architecture overview: [`docs/architecture/README.md`](docs/architecture/README.md)
- Decision records: [`docs/architecture/decisions/`](docs/architecture/decisions/)

## Planned delivery

1. Complete the release 0.1 preview pages and publish four to six rights-cleared, reviewed creations.
2. Complete release 1.0 with the final identity, offer, method, legal structure, SEO, and one monitored
   contact path.
3. Enrich the gallery progressively from the 157-repository backlog over the following weeks and months.
4. Add release 1.1 qualification features only after their data flow and safeguards are approved.
5. Keep the authenticated client portal as a separately conceived product.

## Local development

Requirements:

- [mise](https://mise.jdx.dev/) (installs Node 22, just, lefthook, gitleaks, Semgrep and the other
  pinned tools of `mise.toml`), `uv` (the pipx backend of mise installs Semgrep through it) and
  `sonar-scanner` on `PATH` (skill `infra-accounts`).

Install the toolchain, the dependencies and the git hooks once per clone, then run the preview:

```bash
just setup
npm run dev
```

Run the pre-push floor (format, lint, typecheck, tests with coverage, build, generated-site test,
doc coverage, Semgrep, `npm audit`, gitleaks); the pre-push hook runs it again:

```bash
just check
```

Prefix with `mise x --` when the shell does not activate mise. `npm run check` is the quick subset
without the security steps. Before every merge, `just gate` attests the pushed head
(ADR-0005, [branch protection](.github/branch-protection.md)); the nightly tier is installed per
[scripts/systemd/README.md](scripts/systemd/README.md).

The safe default is `PUBLIC_RELEASE_CHANNEL=preview`, which keeps the generated page
non-indexable. A `public` build fails until the identity is final, the canonical origin and
professional contact email exist, and the release 1.0 gates have received explicit launch
approval in the central brand configuration. Copy `.env.example` only when an
explicit local environment file is useful; never commit credentials.

## Current foundation boundaries

- Astro generates static HTML; no application server or runtime database exists.
- French preview pages cover the homepage, services, method, founder, and creations. The gallery stays
  empty until reviewed entries are explicitly published; no fictional client work is displayed.
- `npm run test:site` (part of `just check`) verifies the generated pages, local links, no-index directives, and empty state.
- The working identity is centralised in `src/config/brand.ts`.
- Catalogue entries are validated by `src/domain/project.ts` before publication.
- Inactive external services contribute no SDK, endpoint, script, cookie, or embed.
- Every check runs locally, no GitHub workflow (ADR-0005): `just setup` once per clone, then the
  git hooks run `just fast` on commit and `just check` on push; `just gate` attests the pushed head
  before every merge and `just nightly` runs on a systemd timer. Semgrep Community Edition,
  `npm audit --audit-level=high` and gitleaks replace the former CodeQL, dependency audit and
  Gitleaks workflows.
