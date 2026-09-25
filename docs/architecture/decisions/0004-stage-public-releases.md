# ADR-0004: Stage public releases before connected qualification

- Status: accepted
- Date: 2026-09-25
- Related issue: [#1](https://github.com/StudioB22/website/issues/1)

## Context

The public concept includes a portfolio, service explanation, method, contact, guided diagnostic,
scheduling, and measurement. Treating every capability as a single launch gate would make a simple
commercial website depend on unselected providers and unnecessary personal-data processing.

## Decision

Deliver the public product through independently releasable boundaries:

- release 0.1 is a private identity-and-proof preview;
- release 1.0 is the first public website with one monitored contact channel and no required connected
  diagnostic, scheduling, or analytics;
- release 1.1 may add the browser-local diagnostic after its rules, copy, accessibility, and
  in-browser privacy boundary pass review; connected submission, scheduling, or measurement is added
  only after the specific integration's privacy, security, provider, retention, and operational gates
  pass;
- the authenticated client portal remains a separate product under ADR-0001.

Each release has its own acceptance gates. A deferred optional integration cannot block an earlier
release and must not appear as operational before activation.

A remotely deployed release 0.1 preview is private only when Cloudflare Access (or an equivalently
reviewed identity-aware proxy) denies access by default and allowlists named reviewers who must
authenticate. A secret URL, disabled indexing, `robots.txt`, or a shared password is not an access
control. If the access policy cannot be verified, review remains local and no remote preview is
published.

## Consequences

- The studio can publish a useful, honest site without collecting unnecessary data.
- Contact remains possible through a simple monitored channel.
- Qualification features receive a focused conception and data-flow review.
- The implementation must keep inactive routes, scripts, embeds, and provider SDKs out of earlier
  release bundles.
- Preview access must be tested as both an allowed reviewer and an unauthorised visitor, and the
  reviewer allowlist must be removed or replaced when the public release is approved.

## Rejected alternatives

- **Launch every planned capability together**: rejected because it creates a large critical path and
  couples the first public release to speculative providers.
- **Publish non-functional placeholders**: rejected because unavailable booking, forms, or accounts
  would weaken trust.
