# Public website traceability matrix

| Requirement | Use case | First release | Architecture realisation | Diagram | Planned verification |
| --- | --- | --- | --- | --- | --- |
| REQ-PUB-001 | UC1 | 0.1 | Static editorial content, brand configuration, generated homepage | Use case, component | Content review, semantic check, moderated comprehension task |
| REQ-PUB-002 | UC2 | 0.1 | Validated allowlisted catalogue and generated gallery routes | Use case, component | Schema tests, route tests, moderated gallery task |
| REQ-PUB-003 | UC2, UC7 | 0.1 | Publication schema, reviewed assets, explicit demo links | Use case, component | Rights, status, content, responsive, link, and maturity checklist |
| REQ-PUB-004 | UC3 | 1.0 | Static service content sourced from the approved offer structure | Use case, component | Content review and moderated comparison task |
| REQ-PUB-005 | UC4 | 1.0 | Static method content | Use case, component | Content review and moderated method task |
| REQ-PUB-006 | UC5 | 1.1 | Pure local diagnostic rules plus one justified interaction island | Use case, component, data flow | Rule unit tests, browser journey, accessibility, privacy, and copy review |
| REQ-PUB-007 | UC6 | 1.0 | Monitored email path with approved mailbox lifecycle; later approved edge integration | Use case, component, data flow | Manual mailbox, retention, deletion, and rights-path exercise; later end-to-end success and error tests |
| REQ-PUB-008 | UC7 | 0.1 | Versioned validated catalogue with explicit publication flag | Use case, component | Invalid-entry build tests and generated-page review |
| REQ-PUB-009 | UC1–UC6 | 1.0 | Approved route map, navigation, recovery, and internal links | Use case, component | Route, navigation, breadcrumb, indexing, and broken-link checks |
| REQ-DATA-001 | UC5, UC6 | 1.1 | Approved managed boundary, field schema, retention, deletion, and rights process | Component, data flow | Provider assessment, field review, retention and deletion exercise, abuse tests |
| REQ-A11Y-001 | UC1–UC6 | 0.1 | Semantic generated HTML and accessible interactions | Use case, component | Automated checks plus manual keyboard, focus, zoom, reflow, screen-reader, and motion review |
| REQ-PERF-001 | UC1–UC6 | 0.1 | Static generation, responsive assets, minimal islands, explicit budgets | Component | Page-weight and Core Web Vitals budget evidence on representative pages |
| REQ-SEO-001 | UC1–UC4 | 1.0 | Static routes, page/query map, metadata, canonical origin, sitemap, robots, structured data | Component | Build checks plus pre-launch crawl and search review |
| REQ-SEC-001 | UC5–UC7 | 0.1 | Security CI, headers, validated boundaries, least privilege | Component, data flow for 1.1 | Gitleaks, CodeQL, dependency review, audit, and targeted manual review |
| REQ-PRIV-001 | UC5, UC6 | 1.0 | No connected web form in the first public release; reviewed mailbox boundary and deferred optional providers | Component, data flow | Release inventory, provider assessment, retention and rights-path exercise |
| REQ-HON-001 | UC1–UC7 | 0.1 | Truthful catalogue states, exclusions, and publication controls | Use case, component | Manual evidence, claims, credits, and structured-data review |
| REQ-BRAND-001 | UC1–UC7 | 0.1 | Typed central brand configuration and production gate | Component | Provisional-value build test and release checklist |
| REQ-AI-001 | UC1, UC3, UC4 | 1.0 | Public AI-assisted delivery policy, method content, and human review controls | Use case, component | Copy review, claims review, confidentiality checklist, and moderated trust-comprehension task |

## Diagram index

- **Use case**: `docs/architecture/diagrams/public-website/01-use-case.md`
- **Component**: `docs/architecture/diagrams/public-website/02-component.md`
- **Preview, mailbox, and release 1.1 data flow**: `docs/architecture/diagrams/public-website/06-data-flow-qualification.md`

## Coverage notes

- No sequence diagram is justified for releases 0.1 or 1.0: their journeys are static reads, local
  navigation, repository publication, or an external email-client handoff.
- A provider-specific submission sequence becomes mandatory when a release 1.1 provider is selected.
- No class diagram is justified yet: current types are small configuration and catalogue schemas.
- No state diagram is justified yet: publication is a validated flag, not a complex lifecycle, and the
  future portal remains outside this boundary.
