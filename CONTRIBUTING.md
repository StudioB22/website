# Contributing

## Workflow

1. Start every change from `main` on a dedicated branch.
2. Link the change to an issue with explicit acceptance criteria.
3. Keep conception and implementation in separate pull requests.
4. Run `just setup` once per clone; the hooks then run `just fast` on commit and `just check` on
   push (ADR-0005). `just check` is the pre-push floor, not a substitute for reading the diff.
5. Review the complete diff against `origin/main` before pushing.
6. Obtain owner approval before creating a pull request. Merge through `just merge <pr>` only,
   once `just gate` has attested the pushed head (owner rule 2026-11-07: a green local gate merges
   without a further question; a red, skipped or waived step asks the owner).

## Branches and commits

- Use concise branches such as `docs/public-website-conception` or
  `feat/public-website-foundation`.
- Use Conventional Commits.
- Write repository artefacts, commit messages, and pull request descriptions in English.

## Pull request description

```markdown
## Summary

- <change>

## Verification

- [ ] Documentation links and diagrams validated
- [ ] Typecheck passes when applicable
- [ ] Tests pass when applicable
- [ ] Production build passes when applicable
- [ ] `just check` passed locally; `just gate` attests the pushed head before the merge
- [ ] Accessibility, security, privacy, performance, and SEO impacts reviewed
- [ ] Full diff reviewed locally against `origin/main`

Refs #<issue>
```

## Metadata

- Assign the pull request to `benoit-bremaud`.
- Use the repository's available labels; do not invent milestone or project routing.
- No GitHub-hosted reviewer or CI (owner rule 2026-11-07): the review is the local `review-local`
  gate with the adversarial reviewer.
- Merge only through `just merge <pr>` on a verified `gate` attestation (ADR-0005; the bootstrap
  merge of ADR-0005 itself is the one exception). SSH signing must be configured in git.
