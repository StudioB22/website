# Branch protection — `main`

`main` only moves through pull requests whose head carries a verified `gate` attestation. This
file documents the protection to apply and the exact commands; the configuration itself lives
on GitHub, not in the repository.

## Policy

| Setting                                    | Value                                                                                                                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Require a pull request before merging      | yes                                                                                                                                                                        |
| Required status checks                     | `gate` — the commit status written by `just gate` on the pushed head together with its signed note (ADR-0005, skill `local-ci`); branch up to date before merge (`strict`) |
| Required approving reviews                 | 0 (see below)                                                                                                                                                              |
| Dismiss stale approvals on new commits     | yes                                                                                                                                                                        |
| Apply to administrators (`enforce_admins`) | yes — the owner is bound by a gate they can satisfy                                                                                                                        |
| Force push                                 | blocked                                                                                                                                                                    |
| Branch deletion                            | blocked                                                                                                                                                                    |
| Push restrictions                          | none (solo repository)                                                                                                                                                     |

The required check is a commit status, not a workflow job: no GitHub workflow runs (ADR-0005).
`scripts/attest.sh write gate`, run by `just gate`, posts `gate` = success through the REST Statuses API, last, after
the signed note is pushed, so a green status always has its note; `just merge <pr>` verifies both
on the exact head SHA before `gh pr merge`. `app_id` stays omitted: the status is posted by the
owner's `gh`, not by an app. Run `just merge` from an up-to-date `main` checkout, so the `merge`
recipe itself is the trusted one.

The `gate` status alone is a plain API write that anyone with push access could post; the signed
note, verified against the trust store of `origin/main`, is the real control, and only `just merge`
checks it. The owner therefore merges through `just merge` only, never the GitHub button (the
bootstrap merge of ADR-0005 is the one exception); the protection below enforces the status, the
`just merge` rule stays a discipline.

### Required reviews: 0

No GitHub-hosted review runs on this repository (owner rule 2026-11-07: the review is the local
`review-local` gate with the `adversarial-reviewer` agent). With one human and no reviewer counted
by GitHub, `required_approving_review_count: 1` would make every PR unmergeable without an admin
bypass, and a gate bypassed on every merge is worse than none.

### When to apply

GitHub Free offers branch protection on public repositories only (the API answers 403 on a private
one). The repository goes public under agents-skills ADR-0005 after the Public Release Checklist;
apply the protection right after that change of visibility, then verify. Until then `just merge`
is the only control, which is why it is the only merge path used.

## Apply (one-time, by owner)

```bash
gh api repos/StudioB22/website/branches/main/protection \
  --method PUT \
  --input - <<'EOF2'
{
  "required_status_checks": {
    "strict": true,
    "checks": [
      { "context": "gate" }
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF2
```

`required_status_checks`, `enforce_admins`, `required_pull_request_reviews` and `restrictions`
are mandatory keys of this endpoint (each nullable), which is why `restrictions` is sent as
`null`. `checks[].context` is the current field for a required check.

## Verify

```bash
gh api repos/StudioB22/website/branches/main/protection \
  --jq '{checks: [.required_status_checks.checks[].context], strict: .required_status_checks.strict, reviews: .required_pull_request_reviews.required_approving_review_count, admins: .enforce_admins.enabled, force_push: .allow_force_pushes.enabled, deletion: .allow_deletions.enabled}'
```

Expected: `{"checks":["gate"],"strict":true,"reviews":0,"admins":true,"force_push":false,"deletion":false}`.

## Remove (emergency only)

```bash
gh api repos/StudioB22/website/branches/main/protection --method DELETE
```

Re-apply immediately after the emergency; log the reason in `PROJECT_LOG.md`.
