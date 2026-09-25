# Component diagram — public website — static delivery boundary

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

  subgraph Delivery ["Cloudflare Pages"]
    StaticSite["Static HTML, CSS, assets, and justified islands"]
    Headers["Caching and browser security headers"]
    StaticSite --> Headers
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
  Headers -->|"Public pages"| Visitor
  StaticSite -.->|"PII: approved enquiry fields"| Submission
  StaticSite -.->|"PII: approved booking fields"| Scheduling
  StaticSite -.->|"Aggregate consent-assessed events"| Measurement
  StaticSite -->|"Explicit reviewed link"| Demo
```

## Notes

- Private GitHub repositories never become runtime inputs.
- Dotted edges are inactive until provider-specific conception and approval are complete.
- Every PII-bearing edge is labelled so privacy review cannot be skipped.
- The future client portal is a separate system boundary under ADR-0001.
