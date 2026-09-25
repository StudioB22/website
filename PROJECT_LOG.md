# Project log

## 2026-09-25

- **Repository initialised** (`3cf8242`) — Created the private
  `StudioB22/website` repository for the public commercial website. The repository name
  deliberately remains independent from the final agency brand.
- **Conception opened** ([issue #1](https://github.com/StudioB22/website/issues/1)) —
  Defined the documentation-only gate for the public MVP, including explicit exclusions
  for the client portal, authentication, payments, chatbot, administration UI, invented
  proof, uncalculated prices, and production deployment.
- **Decision**: `Naming does not block conception` — StudioB22 remains a working label;
  the final brand, domain, and professional email identity will be selected before public
  production launch.
- **Decision**: `No GitHub Project routing` — The organisation currently exposes only the
  unrelated Visio-Back project, so issue #1 was not attached to an incorrect board.
- **Conception package prepared** — Documented the product brief, public MVP requirements,
  launch gates, three architecture decisions, focused use-case and component diagrams, and a
  requirements-to-verification matrix. At this stage Astro remained proposed pending the
  documentation review; implementation and production deployment had not started.
- **Conception review decisions** ([issue #1](https://github.com/StudioB22/website/issues/1)) —
  Resolved the review findings before implementation:
  - `Independent release gates` — Separate private preview, first public website, connected
    qualification, and future portal so speculative providers cannot block useful delivery.
  - `Finite modular offer` — Define one bounded core website foundation plus optional blocks,
    client responsibilities, and exclusions without publishing uncalculated prices.
  - `Progressive proof programme` — Treat the 157 StudioB22 repositories as a multi-week or
    multi-month backlog; launch with four to six reviewed entries and enrich by sector over time.
  - `Data minimisation first` — Keep release 1.0 free of required connected forms, scheduling,
    and analytics; require a dedicated field, provider, retention, deletion, and data-flow review
    before release 1.1 activation.
  - `Static delivery retained` — Accept Astro and Cloudflare Pages for static releases while
    recording Cloudflare Workers as the option to reconsider for a real runtime requirement.
