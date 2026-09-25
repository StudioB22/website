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
- release 1.1 adds qualification and measurement only after their own privacy, security,
  accessibility, provider, retention, and operational gates pass;
- the authenticated client portal remains a separate product under ADR-0001.

Each release has its own acceptance gates. A deferred optional integration cannot block an earlier
release and must not appear as operational before activation.

## Consequences

- The studio can publish a useful, honest site without collecting unnecessary data.
- Contact remains possible through a simple monitored channel.
- Qualification features receive a focused conception and data-flow review.
- The implementation must keep inactive routes, scripts, embeds, and provider SDKs out of earlier
  release bundles.

## Rejected alternatives

- **Launch every planned capability together**: rejected because it creates a large critical path and
  couples the first public release to speculative providers.
- **Publish non-functional placeholders**: rejected because unavailable booking, forms, or accounts
  would weaken trust.
