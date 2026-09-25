# cmp — Public website — static delivery boundary

> **Feature**: [issue #1 — Design the public commercial website MVP](https://github.com/StudioB22/website/issues/1)
>
> **Source specification**: [`public-website-mvp.md` § 2–3](../../specs/public-website-mvp.md#2-functional-requirements)
>
> **Related ADRs**: ADR-0001, ADR-0002, ADR-0003

## Context

This diagram shows the build-time and runtime boundaries of the public product. Deferred external
services appear only to make the future egress points explicit; they are not selected or implemented.

## Diagram

```mermaid
flowchart LR
  Maintainer(("Maintainer"))
  Visitor(("Visitor"))
  Reviewer(("Named preview reviewer"))

  subgraph Repository ["StudioB22/website repository"]
    Brand["Typed brand configuration"]
    Catalogue["Validated public catalogue"]
    Content["French editorial content"]
    Rules["Pure diagnostic rules — deferred"]
    Generator["Astro static generator"]
    Checks["Build and quality checks"]

    Brand --> Generator
    Catalogue --> Generator
    Content --> Generator
    Rules --> Generator
    Generator --> Checks
  end

  subgraph Delivery ["Cloudflare Pages — static releases 0.1 and 1.0"]
    StaticSite["Static HTML, CSS, assets, and justified islands"]
    Headers["Caching and browser security headers"]
    StaticSite --> Headers
  end

  subgraph PreviewBoundary ["Conditional access boundary — remote release 0.1 only"]
    Identity["Approved identity provider"]
    Access["Deny-by-default policy and named-reviewer allowlist"]
    Identity --> Access
  end

  subgraph External ["Approved external boundaries — deferred"]
    Submission["Submission endpoint"]
    Scheduling["Scheduling provider"]
    Measurement["Privacy-reviewed measurement"]
  end

  subgraph Showcases ["Published demonstrations"]
    Demo["Reviewed demo deployments"]
  end

  Maintainer -->|"Versioned content update"| Repository
  Checks -->|"Verified static artefact"| StaticSite
  Reviewer -->|"PII: allowlisted identifier and authentication evidence"| Identity
  Access -->|"Authorised preview request"| Headers
  Headers -->|"Private preview pages — release 0.1"| Reviewer
  Headers -->|"Public pages — release 1.0 after preview boundary removal"| Visitor
  StaticSite -.->|"PII: approved enquiry fields"| Submission
  StaticSite -.->|"PII: approved booking fields"| Scheduling
  StaticSite -.->|"PII: consent-assessed technical identifiers and aggregate events"| Measurement
  StaticSite -->|"Explicit reviewed link"| Demo
```

## Notes

- Private GitHub repositories never become runtime inputs.
- A remotely deployed release 0.1 routes requests through the approved identity-aware access boundary;
  without that boundary, preview review remains local. The boundary is removed for the public release
  only after the release 1.0 gates pass.
- Dotted edges are inactive until provider-specific conception and approval are complete.
- Inactive integrations contribute no route, embed, script, cookie, or SDK to earlier releases.
- Every PII-bearing edge is labelled so privacy review cannot be skipped.
- The future client portal is a separate system boundary under ADR-0001.
