# Local review — StudioB22/website (branch diff origin/main...ci/17-local-ci-no-workflows)

- Date: 2026-11-10
- Commit: 3f5bc04
- Scope: branch diff origin/main...HEAD (`--push` mode, #17)
- Checks run: adversarial (Opus, 3 rounds) · design · docs · tests · security · correctness
- Verdict: ship as-is · Must 0 · Should 0 · Nice 1

## Adversarial review (#236)

- Round 1 on `4395fe1`: Must 3 · Should 8 · Nice 5 · unverified 0 · Push gate: closed
- Round 2 on `29422e4`: 13 fixed · 2 not fixed · 0 regressed · new Must 1 · Push gate: closed
- Round 3 on `3f5bc04`: 5 fixed · 0 not fixed · 0 regressed · new Must 0 · **Push gate: open**
- Optional second review (owner's OpenAI account): ChatGPT/Codex not run (never a gate step)

## Pre-merge gate (head SHA 3f5bc04)

| Step | Result |
|---|---|
| 0 CI mirror | n/a: no PR workflow left (`.github/workflows/` removed by this branch) |
| 1 Tests | ✅ 84 Vitest · ✅ generated-site test · ✅ 123 wiring cases · ✅ 31 attestation cases |
| 2 Coverage | tests 99 % stmts / 93.65 % branches / 100 % funcs / 98.98 % lines (thresholds 95/90/95/95, floor 80) · docs 100 % (28/28, floor 90) |
| 3 SonarQube | ✅ PASSED (`studiob22-website`, scan on 4395fe1; re-run by `just gate` on the pushed head) |
| 4 Secrets | ✅ gitleaks clean (whole history, 63 commits) · no tracked .env · diff read: nothing sensitive |
| 5 E2E/smoke | ⏸ deferred to the pre-merge run (`--push`); no E2E suite yet, the generated-site test is the smoke |

- Gate: **pre-push green** — `mise x -- just check` passed on 3f5bc04, `just gate` (SonarQube on the pushed head, attestation) deferred to the pre-merge run

## 🔴 Must Have

_None._

## 🟡 Should Have

_None._

## 🔵 Nice to Have

- `PROJECT_LOG.md:15` `[adversarial]` · said "pinned" for caret overrides · reworded to "floored" in the report commit.

## ⚪ Disagree / Intentional

- `src/**/*.ts` doc blocks on small exports `[docs]` · the 90 % doc-coverage floor measures them · precedent: owner rule 2026-10-16, skill `documentation-coverage`.
- `package.json:38-42` `[correctness]` · caret overrides kept instead of `npm update` · npm 11 `edgesOut` bug on this lockfile; `overridesNote` gives the removal condition.

## Per-dimension summary

- Adversarial: 3 Must in round 1 (`.scannerwork/` not ignored, stale `npm run check` in README, stale REQ-SEC-001 text), all fixed; gate open in round 3 · Design: justfile tiers and scripts proportional, no abstraction added · Docs: ADR-0005, README, CONTRIBUTING, spec and traceability aligned with the tiers · Tests: wiring test covers every gate path, signing preflight, doc-coverage logic; coverage ratchet set · Security: Semgrep CE, `npm audit` high, gitleaks clean; SSH-signed attestation, trust store read from `origin/main` · Correctness: `just check` green, tree clean after the run.
