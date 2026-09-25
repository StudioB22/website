# ADR-0001: Separate the public website and client portal

- Status: accepted
- Date: 2026-09-25
- Related issue: [#1](https://github.com/StudioB22/website/issues/1)

## Context

The public website is predominantly an indexable publishing and qualification surface. The
future portal would process authenticated identities, project data, approvals, documents,
payment state, and collaborator access.

## Decision

Treat the public website and future client portal as separate products and deployment
boundaries. The public MVP contains no client account creation, application authentication, private
project data, payment, signature, or portal placeholder that implies availability. This exclusion does
not prohibit the identity-aware perimeter authentication required to protect a remotely deployed
release 0.1 preview; that boundary authenticates named reviewers, not public-site or client accounts.

## Consequences

- Public delivery stays static, fast, and low risk.
- Portal conception cannot be bypassed by gradually adding private features to the public site.
- A future portal may reuse brand tokens and links, but not the public site's deployment boundary.
- Cross-product navigation and identity will be specified only when the portal exists.

## Rejected alternatives

- **Build one full-stack application now**: rejected as speculative complexity and an unnecessary
  security surface.
- **Embed a non-functional portal preview**: rejected because it would imply a service that is not
  operational.
