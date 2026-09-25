# Public website traceability matrix

| Requirement | Use case | Architecture realisation | Planned verification |
| --- | --- | --- | --- |
| REQ-PUB-001 | UC1 | Static editorial content, brand configuration, generated homepage | Content review, semantic check, moderated comprehension task |
| REQ-PUB-002 | UC2 | Validated catalogue and generated gallery routes | Schema tests, route tests, moderated gallery task |
| REQ-PUB-003 | UC2, UC7 | Catalogue publication schema and explicit demo links | Rights, status, content, link, and maturity checklist |
| REQ-PUB-004 | UC3 | Static service content | Content review and moderated comparison task |
| REQ-PUB-005 | UC4 | Static method content | Content review and moderated method task |
| REQ-PUB-006 | UC5 | Pure diagnostic rules plus justified interaction island | Rule unit tests, browser journey, privacy and copy review |
| REQ-PUB-007 | UC6 | Approved edge integration or manual contact alternative | End-to-end success/error tests and operational exercise |
| REQ-PUB-008 | UC7 | Versioned validated catalogue | Invalid-entry build tests and generated-page review |
| REQ-A11Y-001 | UC1–UC6 | Semantic generated HTML and accessible interactions | Automated checks plus manual keyboard, focus, zoom, reflow, and motion review |
| REQ-PERF-001 | UC1–UC6 | Static generation, local optimised assets, minimal islands | Page-weight budget and mobile/desktop Lighthouse evidence |
| REQ-SEO-001 | UC1–UC4 | Static routes, metadata, canonical origin, sitemap, robots, structured data | Build checks plus pre-launch crawl and search review |
| REQ-SEC-001 | UC5–UC7 | Security CI, headers, validated boundaries, least privilege | Gitleaks, CodeQL, dependency review, audit, and targeted manual review |
| REQ-PRIV-001 | UC5, UC6 | Deferred reviewed providers and labelled PII edges | Data-flow review, provider assessment, retention and rights-path exercise |
| REQ-HON-001 | UC1–UC7 | Truthful catalogue states and publication controls | Manual evidence and structured-data review |
| REQ-BRAND-001 | UC1–UC7 | Typed central brand configuration and production gate | Provisional-value build test and launch checklist |

## Coverage notes

- No sequence diagram is justified yet: provider integrations are deferred and simple static reads do not need one.
- No class diagram is justified yet: the domain model is not stable beyond small configuration schemas.
- No state diagram is justified yet: no lifecycle-bearing portal entity exists in this product boundary.
- The component diagram contains the necessary privacy-labelled egress view, so a separate data-flow
  diagram would duplicate the current conception. Add one when a concrete submission provider is selected.
