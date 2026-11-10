# ADR-0005: Run every check locally and keep no GitHub workflow

- Status: accepted
- Date: 2026-11-10
- Related issue: [#17](https://github.com/StudioB22/website/issues/17)

## Context

Four GitHub workflows ran on every push and pull request: the quality gate (`npm run check`),
CodeQL, a dependency audit (`npm audit --audit-level=high`) and Gitleaks over the full history.
GitHub Actions minutes now bill the owner (Free plan quota exceeded in October and November 2026),
and the owner rule of 2026-11-07 (every repository, both accounts) states that every check runs
locally and that the only workflow allowed is a production deploy triggered by a signed release
tag. This repository deploys nothing through Actions: release 0.1 is a private preview reviewed
locally and release 1.0 will be promoted by a signed tag (ADR-0004). Tracked by
benoit-bremaud/agents-skills#259.

Every GitHub check already had a local or free open-source equivalent: `npm run check` is the
quality job itself; gitleaks runs over the full history in under a second; Semgrep Community
Edition covers SAST (the CodeQL CLI licence is limited to public repositories and the owner's rule
is free open-source tools only); `npm audit` is the exact command of the dependency job.

## Options and scoring

| # | Criterion | Weight | **A. Zero workflow, four local tiers** | B. Keep the GitHub-only job (CodeQL) | C. Keep every workflow, add the local tiers |
|---|---|---|---|---|---|
| 1 | Owner rule 2026-11-07 (no Actions minutes) | 35 | 5 | 2 (still bills on every push) | 0 |
| 2 | Fidelity of the checks (same tool, config, floor) | 25 | 4 (Semgrep CE replaces CodeQL) | 5 | 5 |
| 3 | Determinism and reproducibility (pinned toolchain, attested SHA) | 20 | 5 | 4 | 3 (two sources of truth) |
| 4 | Simplicity (one place to read and fix) | 20 | 5 | 3 | 1 |
| | **Total / 500** | **100** | **475** | 335 | 205 |

Sensitivity: with fidelity at 40 and the owner rule at 20, A still leads (A 460, B 380).

## Decision

- **A.** `.github/workflows/` is deleted entirely. The checks move to four `just` tiers (skill
  `local-ci`), tools pinned in `mise.toml` and `mise.lock`, hooks by lefthook (`just setup`
  installs both; `mise x -- just <tier>` when the shell does not activate mise):

  | Tier | Recipe | Trigger | Holds |
  |---|---|---|---|
  | L0 | `just fast` | pre-commit hook | staged secrets (gitleaks), eslint and prettier on the staged files; the commit-msg hook checks the Conventional Commits subject |
  | L1 | `just check` | pre-push hook, `review-local --push` | prettier, eslint, `astro check`, `lefthook validate`; Vitest with coverage ≥ 80 %, the production build and the generated-site test, doc coverage ≥ 90 %, the wiring and attestation tests; Semgrep CE (`p/javascript`, `p/typescript`) and `npm audit --audit-level=high`; gitleaks over the whole history |
  | L2 | `just gate` | `review-local` § 2b on the pushed head, before every merge | `npm ci`, `check`, `sonar-scanner` waiting for the quality gate, then the signed attestation of the head SHA |
  | L3 | `just nightly` | systemd user timer, 05:20 | `check`, TruffleHog (offline), toolchain drift |

- Mapping of the removed jobs: quality → `lint` + `test`; CodeQL → Semgrep CE in `security`;
  dependency audit → the same `npm audit --audit-level=high` in `security`; Gitleaks → the same
  gitleaks 8.30.1 in `fast` (staged) and `secrets` (history). The scheduled runs of the removed
  workflows become the nightly tier.
- `main` is merged only through `just merge <pr>`, which verifies the `gate` attestation
  (agents-skills ADR-0003: a signed git note on `refs/notes/gate` checked against
  `.github/allowed_signers` of `origin/main`, plus the `gate` commit status). The merge is a
  squash: one `main` commit per pull request, which carries no attestation of its own, so
  `just gate` runs again on `main` before any deploy.
- Branch protection on `main` requires the `gate` status only (`.github/branch-protection.md`).
  GitHub Free grants it on public repositories only: it is applied once the repository is public.
- Repository visibility: public, per agents-skills ADR-0005 (public by default), after the Public
  Release Checklist (gitleaks on the full history, no secret, placeholder-only `.env.example`) and
  the owner's explicit approval. MCDA: public 430, private with GitHub Pro 330, private with a
  derogation 255 (criteria: owner rule 30, protection of `main` 25, confidentiality 25, cost 10,
  effort 10).
- Bootstrap: the first merge of this change happens before `.github/allowed_signers` and
  `scripts/attest.sh` exist on `main`, so its attestation cannot be verified against `main`;
  that one merge goes through `gh pr merge --squash --match-head-commit <sha>` on the green
  `gate` status, recorded in `PROJECT_LOG.md`. Every later merge uses `just merge`.
- `scripts/{attest,test-attest,check-commit-msg,check-cassettes}.sh` are verbatim copies of
  `~/.claude/scripts` (skill `local-ci` § Apply, step 1), kept byte-identical (the wiring test
  compares them) so a fix lands in one place and is re-copied; `check-cassettes.sh` has no caller
  here (the site calls no third-party API) and stays with the set rather than diverging from it.
- Dropped without replacement: CodeQL itself (rule 4 of the skill). The Semgrep rulesets are
  fetched from the registry on each run, so `security` needs the network; accepted over vendoring
  the rules, which would freeze known-bad gaps and need its own update chore.
- **Fallback: B** if a check proves impossible to run locally.

## Consequences

- No Actions minute is spent; a push with a red `check` is refused by the pre-push hook, and a
  merge without a green `gate` on the exact head SHA is refused by `just merge`.
- The hooks must be installed (`just setup`) in every clone; a clone without them can push red
  code, which `gate` then refuses to attest.
- Vitest now measures coverage (`@vitest/coverage-v8`, floor 80 % in `vitest.config.ts`; Astro
  route handlers under `src/pages/` are excluded, the generated-site test exercises them), and
  every export under `src/` carries a doc block (floor 90 %).
- The `pipx:semgrep` entry is pinned by version only: its Python dependencies are resolved at
  install time, an accepted gap. System prerequisites outside mise: `uv` (the `pipx` backend of
  mise installs Semgrep through it) and `sonar-scanner`.
- `tests/local-preview.test.mjs` (`npm run test:local`) needs running demo servers and stays a
  manual check, outside the tiers.
- The traceability matrix maps REQ-SEC-001 to the local tiers instead of the removed workflows.

## Rejected alternatives

- **B. Keep CodeQL on GitHub**: rejected because it bills on every push and the owner rule leaves
  no workflow but a tag-driven production deploy, which this repository does not have.
- **C. Keep every workflow next to the local tiers**: rejected because two sources of truth drift
  and the minutes are still spent.
