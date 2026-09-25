# uc — Public website — visitor and maintainer goals

> **Feature**: [issue #1 — Design the public commercial website MVP](https://github.com/StudioB22/website/issues/1)
>
> **Source specification**: [`public-website-mvp.md` § 4](../../specs/public-website-mvp.md#4-use-cases)
>
> **Related ADRs**: ADR-0001, ADR-0003

## Context

This diagram identifies actor-initiated goals inside the public website boundary. It does not model
page navigation, implementation components, the future client portal, or unavailable provider flows.

## Diagram

```mermaid
flowchart LR
  Visitor(("Visitor"))
  Prospect(("Prospect"))
  Maintainer(("Maintainer — Benoît"))

  subgraph SYSTEM ["Public commercial website"]
    subgraph Discover ["Discover"]
      UC1(("UC1 Understand the studio proposition"))
      UC2(("UC2 Explore relevant creations"))
    end
    subgraph Decide ["Decide"]
      UC3(("UC3 Compare service building blocks"))
      UC4(("UC4 Review the delivery method"))
    end
    subgraph Engage ["Engage"]
      UC5(("UC5 Prepare a project orientation"))
      UC6(("UC6 Request a first exchange"))
    end
    subgraph Publish ["Publish"]
      UC7(("UC7 Publish a reviewed creation"))
    end
  end

  Visitor --> UC1
  Visitor --> UC2
  Visitor --> UC3
  Visitor --> UC4
  Prospect --> UC5
  Prospect --> UC6
  Prospect -.->|"specialises"| Visitor
  Maintainer --> UC7
```

## Notes

- `Prospect` specialises `Visitor`, inherits its discovery goals, and owns only the additional enquiry goals.
- UC5 belongs to release 1.1. UC6 starts with monitored email in release 1.0; connected alternatives
  remain inactive until their privacy, security, provider, and operating gates pass.
- Authenticated client and collaborator goals are intentionally absent under ADR-0001.
