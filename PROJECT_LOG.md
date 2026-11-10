# Project log

## 2026-11-10

- **Local-first CI, no GitHub workflow** ([issue #17](https://github.com/StudioB22/website/issues/17),
  ADR-0005) — GitHub Actions minutes now bill the owner; owner rule 2026-11-07: every check runs
  locally, the only workflow allowed is a tag-driven production deploy, which this repository does
  not have. Deleted `codeql.yml`, `dependency-review.yml`, `gitleaks.yml` and `quality.yml`;
  replaced them by the four `just` tiers of skill `local-ci` (`fast` on pre-commit, `check` on
  pre-push, `gate` on the pushed head before every merge with the signed attestation, `nightly` on
  a systemd timer), lefthook hooks, a mise-pinned toolchain, Semgrep CE for SAST, the same
  `npm audit --audit-level=high` and gitleaks 8.30.1, SonarQube Community Build with quality-gate
  wait, Vitest coverage (floor 80 %) and doc coverage (floor 90 %). `npm audit` found three high
  advisories on the way (zod < 4.6.6, vite 8.3.1, undici 8.11.2): zod bumped to 4.6.7, vite and
  undici pinned through npm `overrides`. Added Dependabot (npm) and `.github/branch-protection.md`.
- **Decision**: `Repository visibility: public` — MCDA (owner, 2026-11-10): public 430, private
  with GitHub Pro 330, private with a derogation 255. GitHub Free grants branch protection on
  public repositories only; the Public Release Checklist (gitleaks on the full history: no leak;
  no secret; placeholder-only `.env.example`) passes. The switch to public and the `gate`-only
  protection of `main` follow the merge, on the owner's explicit approval.
- **Bootstrap merge**: the first merge of this change cannot be verified by `just merge`
  (`.github/allowed_signers` and `scripts/attest.sh` are not on `main` yet); it goes through
  `gh pr merge --squash --match-head-commit <sha>` on the green `gate` status. Every later merge
  uses `just merge <pr>`. Tracked by benoit-bremaud/agents-skills#259.

## 2026-09-25

- **PR #2 merged** (`69ddd96`) — `docs(public-website): define commercial website conception`.
  Squash-merged branch `docs/public-website-conception` after ten review rounds and fifteen inline
  findings. The final package defines the product boundary, staged releases, static architecture,
  provisional-brand control, offer, gallery intake, responsible AI position, privacy flows, access
  gates, and verification plan. Issue #1 was closed after merge.
- **Foundation implementation opened**
  ([issue #3](https://github.com/StudioB22/website/issues/3)) — Created the first implementation lot
  for the Astro static foundation, typed identity and catalogue contracts, tests, local quality gate,
  and mandatory security workflows. Added the issue to the organisation delivery project as
  `StudioB22 — site commercial`, `High`, and `In Progress`.

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
- **Portfolio routing introduced**
  ([StudioB22 Roadmap & Delivery](https://github.com/orgs/StudioB22/projects/2)) — Created the
  single organisation-level agile portfolio, attached issue #1 and pull request #2, and added
  `Kanban global` and `Daily` board views. The Daily view excludes completed work so active
  topics remain visible during stand-ups.
- **Decision**: `One repository per managed project` — Keep every client or internal product in
  an independent repository so source code, access control, history, deployment, and an eventual
  client handover remain isolated. Use the central project's `Projet / client` field for portfolio
  filtering and repository-scoped milestones for concrete delivery objectives such as an MVP,
  release, or redesign.
- **Public website classified** — Assigned issue #1 and pull request #2 to
  `StudioB22 — site commercial`, created the `Public website MVP` milestone, and moved both active
  items to `In Progress`.
- **Active-repository intake automated** — Enabled automatic intake for open issues and pull
  requests from `StudioB22/website`. Organisation-wide intake was deliberately rejected because
  the demonstration repositories currently expose more than one hundred open pull requests that
  would obscure active delivery work. Future client repositories must be added explicitly when
  they become active.
- **Daily prioritisation added** — Added `Urgent`, `High`, `Normal`, and `Low` priority values and
  exposed priority, project/client, and milestone directly on the `Kanban global` and `Daily`
  cards. Current conception items start at `Normal`; no sprint or effort fields were introduced
  before an operational need exists.
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
  - `AI mastery is professional expertise` — Present effective use of AI, automation, testing,
    analysis, and modern engineering tools as a skill requiring problem framing, context, selection,
    orchestration, critical evaluation, verification, and judgement. Keep human accountability,
    confidentiality, privacy, and licensing explicit; avoid vendor-led or novelty-only claims.
