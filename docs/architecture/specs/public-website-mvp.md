# Public commercial website MVP specification

- Status: proposed for owner review
- Related issue: [#1](https://github.com/StudioB22/website/issues/1)
- Product source: [`docs/product/product-brief.md`](../../product/product-brief.md)
- Decisions: ADR-0001, ADR-0002, ADR-0003

## 1. Actors

- **Visitor**: a French-speaking representative of a small organisation exploring a website project.
- **Prospect**: a visitor who deliberately prepares or submits a project enquiry.
- **Maintainer**: Benoît, responsible for truthful content, publication, and final quality.
- **Search engine**: discovers intentionally public content and follows declared indexing rules.
- **Approved service provider**: a future scheduling, submission, or measurement processor that has
  passed a focused review.

Collaborators and authenticated clients are not actors in this MVP because their private workflows
belong to the future portal.

## 2. Functional requirements

### REQ-PUB-001 — Understand the proposition

The homepage must let a visitor identify the service, intended audience, founder, primary proof path,
and low-pressure project path from the first viewport and immediate continuation.

### REQ-PUB-002 — Explore truthful creations

The visitor can browse published entries by business sector and then inspect a detail page. Every
entry declares its status: concept, mock-up, demonstrator, client work, or archived experiment.

### REQ-PUB-003 — Inspect publication evidence

Every gallery entry includes a title, sector, status, visual direction, demonstrated capabilities,
preview assets, and factual credits. A live demo link is optional and appears only after maturity,
security, rights, dependency, and content review.

### REQ-PUB-004 — Understand the offer

The visitor can distinguish the complete core showcase offer from optional content, identity, visual,
commercial, visibility, and support blocks. The site publishes no price until a sustainable floor is
accepted.

### REQ-PUB-005 — Understand the method

The visitor can review three phases and seven milestones, including decisions, client actions, scope
control, approvals, and progressive payment principles without implying that commercial contracting
is already operational.

### REQ-PUB-006 — Prepare a project

The visitor can complete a five-minute guided diagnostic that collects only approved context, goals,
timing, investment orientation, and preferred next step. It provides a non-binding orientation and
always allows uncertainty. The connected submission is deferred until REQ-DATA-001 passes.

### REQ-PUB-007 — Choose an operational next step

The visitor can use only contact paths that are genuinely monitored. Scheduling, phone, and form
submission remain hidden or explicitly unavailable until their provider and operating process are
approved.

### REQ-PUB-008 — Maintain catalogue content

The maintainer can add or update a gallery entry through a validated repository file. No public admin
interface or private-repository runtime access is required.

## 3. Quality requirements

### REQ-A11Y-001 — Accessibility target

Target WCAG 2.2 Level AA through semantic structure, keyboard support, visible focus, contrast, text
alternatives, understandable forms, zoom and reflow, and reduced-motion support. Automated success
must never be presented as a formal conformance claim.

### REQ-PERF-001 — Static-first performance

Generate useful content as static HTML, reserve image dimensions, optimise local assets, minimise
fonts and JavaScript, and introduce a performance budget before production acceptance.

### REQ-SEO-001 — Search foundations

Provide crawlable URLs, one primary intent per indexable page, unique titles and descriptions,
canonical URLs, sitemap, intentional robots directives, internal links, and truthful structured data.
The first page/query map prioritises Grasse, the Alpes-Maritimes, and the Côte d'Azur without false
location pages or claims.

### REQ-SEC-001 — Repository and delivery baseline

Use dependency review, secret detection, static analysis, pinned CI actions, no committed secrets,
minimal dependencies, and reviewed browser security headers. Public input endpoints require validation,
safe output handling, abuse protection, generic errors, and privacy-safe logging before activation.

### REQ-PRIV-001 — Data minimisation

Do not store unsubmitted diagnostic drafts on the server. Do not reuse enquiry data for marketing.
Connected forms, analytics, embeds, and scheduling require a documented purpose, lawful basis,
provider, fields, recipients, retention, rights path, and cookie or tracker assessment.

### REQ-HON-001 — Truthful commercial presentation

Do not invent clients, testimonials, metrics, premises, team members, availability, deadlines, prices,
or structured business data. Label demonstrations and generated conceptual imagery accurately.

### REQ-BRAND-001 — Replaceable identity

Keep the working identity in typed configuration and design tokens. Block production while the name,
domain, email, legal identity, and required metadata remain provisional.

## 4. Use cases

### UC1 — Understand the studio proposition

- Primary actor: Visitor
- Preconditions: the public preview or site is reachable.
- Success guarantee: the visitor can state what is offered, for whom, and who is accountable.
- Main scenario: open homepage, read proposition, identify founder, identify creations and project paths.
- Extension: if trust is insufficient, inspect method, principles, FAQ, and technical proof.

### UC2 — Explore relevant creations

- Primary actor: Visitor
- Preconditions: at least one entry has passed publication review.
- Success guarantee: the visitor sees truthful status and evidence for a relevant example.
- Main scenario: open gallery, choose a sector, inspect a project, optionally open a reviewed demo.
- Extension: browse across sectors for visual inspiration.

### UC3 — Compare service building blocks

- Primary actor: Visitor
- Success guarantee: the visitor understands what belongs to the core offer and what may be added later.
- Main scenario: inspect core offer, optional blocks, responsibility boundaries, and phased delivery.

### UC4 — Review the delivery method

- Primary actor: Visitor
- Success guarantee: the visitor understands phases, milestones, decisions, and scope-control behaviour.
- Main scenario: inspect method, approval approach, payment principles, feedback, and post-launch support.

### UC5 — Prepare a project orientation

- Primary actor: Prospect
- Preconditions: diagnostic rules and privacy information have been approved.
- Success guarantee: the prospect receives a non-binding orientation and understands unresolved points.
- Main scenario: answer short business-language questions, review orientation, choose a next step.
- Extensions: select uncertainty; save nothing and exit; use an alternative contact path.

### UC6 — Request a first exchange

- Primary actor: Prospect
- Preconditions: at least one monitored contact channel is operational.
- Success guarantee: the prospect receives an accurate confirmation or clear manual next step.
- Main scenario: choose an available channel, supply minimum information, confirm the request.
- Extension: no suitable appointment exists, so request a manual alternative.

### UC7 — Publish a reviewed creation

- Primary actor: Maintainer
- Preconditions: source, rights, status, content, security, and demo maturity have been reviewed.
- Success guarantee: build validation accepts the entry and the next deployment can publish it.
- Main scenario: add validated metadata and assets, run checks, review generated pages, approve publication.
- Extension: keep the entry unpublished when any required evidence is missing.

## 5. Delivery increments

### Increment A — Identity and proof

- Static project foundation and central provisional brand configuration.
- Homepage, gallery, project details, and founder accountability.
- Initial reviewed catalogue entries only.

### Increment B — Trust and conversion

- Services, optional blocks, method, FAQ, contact alternatives, and required legal structure.
- No public prices or non-operational contact channels.

### Increment C — Qualification

- Validated diagnostic rules and results.
- Approved submission and scheduling integrations.
- Privacy, security, retention, abuse, and operational verification.

## 6. Launch gates

- Final name, domain, email identity, and confusion/trademark checks completed.
- Legal business identity and validated legal/privacy content available.
- Every published gallery entry passes truthfulness, rights, security, and maturity review.
- Diagnostic, contact, scheduling, analytics, and deletion paths verified end to end.
- Automated checks and knowledgeable manual accessibility review completed.
- Mobile performance and page-weight budgets pass on representative pages.
- Canonical URLs, redirects, robots directives, sitemap, metadata, and structured data verified.
- Security workflows and repository settings active; no unresolved high or critical dependency risk.
- Five to seven representative moderated usability sessions completed and blocking findings corrected.

## 7. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Provisional name leaks into production | Typed identity configuration plus a production readiness check. |
| Demonstrations appear to be real client work | Mandatory status labels, credits, and publication review. |
| Repository sprawl becomes the catalogue | Maintain one explicit allowlisted catalogue; never enumerate private repositories at runtime. |
| Future portal expands the MVP | Enforce ADR-0001 and open a separate conception issue when a signed-client need exists. |
| Diagnostic becomes an automatic quote | Keep deterministic results non-binding and require human confirmation. |
| Third parties introduce tracking or outages | Review providers, minimise embeds, offer manual alternatives, and document data flows. |
| SEO creates misleading location content | Use truthful local identity and substantive service pages; prohibit mass city pages. |

## 8. Planned verification

- Schema tests for brand and catalogue data.
- Unit tests for deterministic diagnostic rules when introduced.
- Static route, metadata, sitemap, robots, and broken-link checks.
- Representative browser journeys for gallery navigation and diagnostic completion.
- Automated accessibility checks plus manual keyboard, focus, zoom, reflow, and reduced-motion review.
- Mobile and desktop Lighthouse checks on representative pages.
- Dependency audit, Gitleaks, CodeQL, and dependency review.
- Manual content, rights, truthfulness, privacy, and launch-readiness checklists.
