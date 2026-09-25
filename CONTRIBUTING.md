# Contributing

## Workflow

1. Start every change from `main` on a dedicated branch.
2. Link the change to an issue with explicit acceptance criteria.
3. Keep conception and implementation in separate pull requests.
4. Run the checks relevant to every touched area.
5. Review the complete diff against `origin/main` before pushing.
6. Obtain owner approval before creating or merging a pull request.

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
- [ ] Accessibility, security, privacy, performance, and SEO impacts reviewed
- [ ] Full diff reviewed locally against `origin/main`

Refs #<issue>
```

## Metadata

- Assign the pull request to `benoit-bremaud`.
- Use the repository's available labels; do not invent milestone or project routing.
- Request the configured automated reviewer on implementation pull requests when available.
- Do not merge without explicit owner approval.
