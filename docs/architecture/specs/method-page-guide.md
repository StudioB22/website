# Method page guide integration

- Work item: extend REQ-PUB-005 / UC4 locally; no remote issue mutation.
- Owner approval: editorial draft and implementation plan approved in this chat on 2026-10-10.
- Scope: `/methode/` only. Personal-site summary remains a subsequent change.
- Lifecycle source: website-project-method guide, version 1.1, 2026-10-10.

## Acceptance criteria

1. Keep three public phases and seven existing milestones.
2. Group steps 1-4, 5-12 and 13-15 in three native, initially closed disclosures.
3. Each step explains the work and output; each phase names client responsibilities.
4. Explain that steps may overlap or combine, not fifteen mandatory meetings or payments.
5. Cover scope changes, explicit publication approval, conditional maintenance and responsible AI use.
6. Ship static French HTML with no new script, provider, dependency, collection or publication.
7. Preserve preview/indexing gates; never link to an absent contact page.
8. Use existing design tokens, visible focus and mobile-first scoped layout.

## Approved visual alignment

Owner approved local alignment with the current portfolio design on 2026-10-10.
Reference: `website-local-project-preview/src/styles/global.css`, read without modification.
The consolidated portfolio now supplies the ink, muted, accent, accent-dark and border tokens
and 88rem content width globally. The method inherits them without local palette overrides.
Its wide display-title treatment and responsive layout remain page-scoped.
Keep the existing system-font stack; no font download, image, provider or animation is added.

Layout: wide left-aligned headline, compact phase rows, native disclosures, single-column reading on
small screens and two-column detailed steps from 62rem. The AI section remains an unboxed split
section. Numbering communicates actual progression, not decoration. Review against the brief:
no blue panel, no card grid or decorative motion, no global stylesheet migration.

## Realisation and existing UML

The existing [UC4 view](../diagrams/public-website/01-use-case.md) already models the visitor's goal.
Only its static page content changes. No new actor, component, data flow, state machine or sequence
is introduced; additional diagrams would duplicate the existing conception.

## Four-pass design review

- Requirements: criteria above map to REQ-PUB-005, REQ-AI-001, REQ-HON-001 and REQ-A11Y-001.
- Dependencies/SOLID: editorial literals stay in the page; HTML rendering depends on them, with no IO.
- KISS/YAGNI/DRY: native `details` and `summary`, one rendering loop, no accordion controller or CMS.
- Patterns: none warranted. No speculative service, adapter or shared component is introduced.

## Verification and boundaries

Generated-page tests cover three disclosures, fifteen ordered steps, seven milestones, unique heading
targets, client roles, static output and an available next step. Run repository checks after building.
Manual browser keyboard, viewport and zoom checks remain separate evidence, not an accessibility
certification. No push, pull request, deploy or production approval is implied.

Keep conception documentation separate from any later implementation PR, per CONTRIBUTING.md.

## Local verification record (2026-10-10)

- Branch: `codex/method-page-guide`, created from local `main` at `8e53a4c`.
- Existing preview/gallery/newsletter worktrees are unchanged by this task.
- `npm run check`: formatting, lint and Astro diagnostics passed (zero errors/warnings/hints).
- 34 unit tests and 7 generated-site tests passed; static build generated five routes.
- `git diff --check` passed.
- Chrome DevTools could not start a headful browser without an X server.
- Browser extension access to the local URL was denied. No browser workaround was attempted.
- Manual visual, keyboard and zoom verification remains pending, not passed.
- Local preview: `http://127.0.0.1:4331/methode/`. No deployment or PR was created.

### After corrections and visual alignment

- Removed the AI panel treatment and the global minimum body width; ignored the local dependency symlink.
- Scoped the updated palette, title scale, compact spacing and responsive grids to the method page.
- `npm run check` passed: 34 unit tests and 9 generated-site tests, zero Astro diagnostics.
- Regression checks include both inline HTML styles and emitted CSS assets, accounting for Astro output.
- `git diff --check` passed. Browser access remains blocked by the saved permission setting;
  no screenshot, keyboard or zoom result is claimed for this revision.
- Other worktrees, shared layout, newsletter and deployment configuration were not changed.
