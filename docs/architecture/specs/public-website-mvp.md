# Public commercial website specification

- Status: proposed for owner review
- Related issue: [#1](https://github.com/StudioB22/website/issues/1)
- Product source: [`docs/product/product-brief.md`](../../product/product-brief.md)
- Positioning and offer: [`docs/product/positioning-and-offer.md`](../../product/positioning-and-offer.md)
- Information architecture: [`docs/product/site-map.md`](../../product/site-map.md)
- Gallery inventory: [`docs/product/gallery-inventory.md`](../../product/gallery-inventory.md)
- AI-assisted delivery policy: [`docs/product/ai-assisted-delivery.md`](../../product/ai-assisted-delivery.md)
- Decisions: ADR-0001, ADR-0002, ADR-0003, ADR-0004

## 1. Product boundary and actors

- **Visitor**: a French-speaking representative of a small organisation exploring a website project.
- **Prospect**: a visitor who deliberately prepares or submits a project enquiry. Prospect specialises
  Visitor and inherits the visitor's discovery goals.
- **Maintainer**: Benoît, responsible for truthful content, publication, operations, and final quality.

Supporting external systems are search engines and future approved submission, scheduling, and
measurement providers. They are not primary human actors and do not become active runtime dependencies
before their release-specific approval.

Collaborators and authenticated clients remain outside this product boundary. Their private workflows
belong to the future portal under ADR-0001.

## 2. Functional requirements

### REQ-PUB-001 — Understand the proposition

The homepage must let a visitor identify the service, primary audience, accountable founder, and
primary proof path from the first viewport and immediate continuation. Release 1.0 additionally exposes
the approved low-pressure project path; release 0.1 instead directs preview visitors to reviewed proof.

### REQ-PUB-002 — Explore truthful creations

The visitor can browse reviewed published entries by business sector and inspect a detail page. Every
entry declares its status: concept, mock-up, demonstrator, client work, or archived experiment.

### REQ-PUB-003 — Inspect publication evidence

Every gallery entry includes a title, sector, status, visual direction, demonstrated capabilities,
preview assets, factual credits, limitations, and review dates. A live demo link appears only after
maturity, security, rights, dependency, responsive, and content review.

### REQ-PUB-004 — Understand the modular offer

The visitor can distinguish the finite core website foundation from optional content, identity, visual,
conversion, visibility, commerce, support, and integration blocks. Responsibilities and exclusions are
visible. No public price appears until a sustainable floor and bounded reference scope are approved.

### REQ-PUB-005 — Understand the method

The visitor can review three phases and seven milestones, including decisions, client actions, scope
control, approvals, progressive payment principles, and handover without implying that online
contracting or payment is already operational.

### REQ-PUB-006 — Prepare a project orientation

In release 1.1, a prospect can complete a five-minute guided diagnostic using approved business-language
questions about context, goals, timing, investment orientation, and preferred next step. Every question
allows uncertainty. Results are non-binding and never presented as an automatic quote.

The orientation works locally without identity fields or server storage. Connected submission remains
disabled until REQ-DATA-001 and the release 1.1 gates pass.

### REQ-PUB-007 — Choose an operational next step

Release 1.0 exposes one genuinely monitored contact channel and describes what happens next. Form,
phone, scheduling, or other channels remain absent until each operating process is approved. A visitor
must never encounter a non-functional or misleading contact option.

### REQ-PUB-008 — Maintain catalogue content

The maintainer can add or update a gallery entry through a validated repository file. Publication is an
explicit allowlisted decision. No public admin interface, repository enumeration, or private-repository
runtime access is required.

### REQ-PUB-009 — Navigate stable public content

Release 1.0 implements the routes, navigation, indexing decisions, recovery path, and internal-linking
rules in the approved information architecture. URLs use semantic French terms and remain independent
from the provisional brand name.

### REQ-DATA-001 — Control enquiry data

Before any connected enquiry, scheduling, or measurement feature is activated, record and approve:

- the specific purpose and legal basis for each processing activity;
- required versus optional fields and the consequence of not supplying a required field;
- provider, recipients, storage location, transfers, processor terms, and access controls;
- TLS in transit, encryption at rest, and a preference for EU data residency;
- retention, deletion, backup, rights-request, incident, and operational ownership procedures;
- cookie or tracker assessment and consent behaviour where applicable;
- allowlist validation, length limits, abuse protection, generic errors, fail-closed behaviour, and logs
  containing no email address, message body, token, or other unnecessary personal data.

The proposed enquiry schema uses contact email, project goal or concise summary, and preferred next
step as the minimum submitted data. Contact name, organisation, sector, existing-site URL, timing range,
investment orientation, and free text are optional. There are no uploads. Free text warns against
submitting passwords, health, legal, financial, or other confidential or sensitive information.

Unsubmitted diagnostic answers stay in browser memory and are not sent to a server. Enquiry content is
not copied into analytics or reused for marketing. The candidate basis for a person-requested project
enquiry is pre-contractual action; it must be validated against the final flow before activation.
Non-client enquiry records are deleted 12 months after the last meaningful contact unless a documented
legal obligation or a resulting client relationship requires a separate policy.

## 3. Quality requirements

### REQ-A11Y-001 — Accessibility target

Target WCAG 2.2 Level AA through semantic structure, keyboard support, visible and unobscured focus,
contrast, text alternatives, understandable forms, target sizing, zoom and reflow, consistent help, and
reduced-motion support. Automated success must never be presented as a formal conformance claim.

### REQ-PERF-001 — Static-first performance

Generate useful content as static HTML, reserve image dimensions, use responsive optimised local assets,
minimise font variants, and hydrate JavaScript only where interaction requires it.

Provisional release 1.0 budgets on representative mobile pages are:

- no client JavaScript for purely editorial pages unless a measured interaction requires it;
- at most 75 KiB compressed initial client JavaScript where an island is justified;
- at most 1.5 MiB transferred for the homepage and gallery index on first load;
- lab targets of LCP at or below 2.5 seconds, total blocking time at or below 200 milliseconds, and CLS
  at or below 0.1 under the agreed mobile test profile;
- a production field target of INP at or below 200 milliseconds once enough representative data exists.

Budgets may be tightened after real content is available. An exception requires recorded evidence and
owner approval; it must not become a silent new baseline.

### REQ-SEO-001 — Search foundations

Provide crawlable URLs, one primary intent per indexable page, unique titles and descriptions,
canonical URLs, sitemap, intentional robots directives, internal links, and truthful structured data.
The first page/query map researches Grasse, the Alpes-Maritimes, and the Côte d'Azur without false
location pages, keyword stuffing, or unverified local claims.

### REQ-SEC-001 — Repository and delivery baseline

Use dependency review, secret detection, static analysis, pinned CI actions, no committed secrets,
minimal dependencies, and reviewed browser security headers. Public input endpoints require schema
validation, safe output handling, abuse protection, generic errors, least privilege, and privacy-safe
logging before activation.

### REQ-PRIV-001 — Data minimisation

Release 1.0 contains no first-party connected form, scheduling embed, marketing list, or required
analytics. Release 1.1 follows REQ-DATA-001 and the approved data-flow diagram. An external provider is
never added merely for convenience when a simpler no-collection path satisfies the need.

### REQ-HON-001 — Truthful commercial presentation

Do not invent clients, testimonials, metrics, premises, team members, availability, deadlines, prices,
or structured business data. Label demonstrations and generated conceptual imagery accurately. Empty
or embryonic repositories are backlog, not portfolio evidence.

### REQ-BRAND-001 — Replaceable identity

Keep the working identity in typed configuration and design tokens. Block public production while the
name, domain, email, legal identity, and required metadata remain provisional.

### REQ-AI-001 — Explain and govern AI-assisted delivery

The public site explains in plain French that effective use of artificial intelligence is a professional
skill: understand and frame the need, select and orchestrate appropriate tools, prepare useful context,
challenge uncertain output, cross-check, test, and decide. AI, automation, static analysis, testing,
accessibility, performance, security, and documentation tools can improve exploration, feedback speed,
verification, and maintainability when this expertise is applied. The message must not depend on one
vendor, promise novelty for its own sake, or imply that a model performs the project independently.

All generated or suggested output is treated as untrusted until reviewed and tested. Confidential
information, credentials, personal data, and unpublished client material are excluded from external AI
services unless a documented need, approved provider, appropriate contractual and data terms,
minimisation, and required client information or authorisation are in place.

## 4. Use cases

### UC1 — Understand the studio proposition (release 0.1 and later)

- **Primary actor**: Visitor.
- **Stakeholders and interests**: the visitor wants immediate relevance; the maintainer wants an honest,
  understandable promise.
- **Preconditions**: the preview or public site is reachable.
- **Minimal guarantee**: no unsupported claim is presented.
- **Success guarantee**: the visitor can state what is offered, for whom, who is accountable, and the
  release-appropriate next step.
- **Main success scenario**:
  1. The visitor opens the homepage.
  2. The visitor identifies the offer and primary audience.
  3. The visitor sees a truthful proof path and the founder's accountability.
  4. In release 0.1, the visitor can continue to reviewed creations; from release 1.0, the visitor can
     also identify the approved low-pressure contact path.
- **Extensions**: 3a. The visitor needs more trust, then follows method, about, FAQ, or project evidence.
- **Postcondition**: the visitor can continue to proof in release 0.1 and, from release 1.0, to the
  published offer, method, or monitored contact path without guessing.
- **Relationships**: none.

### UC2 — Explore relevant creations (release 0.1 and later)

- **Primary actor**: Visitor.
- **Stakeholders and interests**: the visitor wants relevant evidence; the maintainer must preserve
  truthful status and rights.
- **Preconditions**: at least one entry has passed publication review.
- **Minimal guarantee**: unpublished or incomplete inventory never appears as finished client work.
- **Success guarantee**: the visitor understands the status, purpose, and demonstrated capabilities of
  a relevant creation.
- **Main success scenario**:
  1. The visitor opens the gallery.
  2. The visitor optionally narrows entries by sector.
  3. The visitor opens a project detail page.
  4. The visitor reviews status, previews, capabilities, credits, and limitations.
  5. The visitor optionally opens a reviewed live demonstration.
- **Extensions**: 2a. No sector match exists, so the visitor browses visual directions; 5a. No approved
  demo exists, so the page presents previews without a broken placeholder.
- **Postcondition**: the visitor has inspected factual evidence without accessing a private repository.
- **Relationships**: none.

### UC3 — Compare service building blocks (release 1.0 and later)

- **Primary actor**: Visitor.
- **Stakeholders and interests**: the visitor wants scope clarity; the maintainer wants to avoid hidden
  assumptions and unlimited commitments.
- **Preconditions**: the proposed offer structure has been commercially reviewed.
- **Minimal guarantee**: no uncalculated price or unlimited scope is implied.
- **Success guarantee**: the visitor distinguishes the core foundation, optional blocks, responsibilities,
  and explicit exclusions.
- **Main success scenario**:
  1. The visitor reviews the outcomes of the core foundation.
  2. The visitor reviews what is included and what depends on the written proposal.
  3. The visitor compares optional blocks that can be added now or later.
  4. The visitor reviews client responsibilities and common exclusions.
- **Extensions**: 3a. The need is complex, so the visitor is directed to a scoped first exchange rather
  than an automatic package recommendation.
- **Postcondition**: the visitor can describe a plausible starting scope without treating the page as a
  binding quote.
- **Relationships**: none.

### UC4 — Review the delivery method (release 1.0 and later)

- **Primary actor**: Visitor.
- **Stakeholders and interests**: the visitor wants predictability; the maintainer wants clear decisions,
  feedback, scope control, and staged payment principles.
- **Preconditions**: the method describes only processes the studio can operate.
- **Minimal guarantee**: the page does not imply online contracting, payment, or guarantees that do not exist.
- **Success guarantee**: the visitor understands phases, milestones, approvals, responsibilities, changes,
  and handover.
- **Main success scenario**:
  1. The visitor reviews the three project phases.
  2. The visitor inspects the seven milestones and expected decisions.
  3. The visitor understands consolidated feedback and acceptance points.
  4. The visitor reviews how scope changes and staged payments are handled contractually.
  5. The visitor understands launch and post-launch responsibilities.
- **Extensions**: 4a. A detail depends on the future contract, so the page states that boundary instead of
  inventing a universal rule.
- **Postcondition**: the visitor can explain how the collaboration remains controlled.
- **Relationships**: none.

### UC5 — Prepare a project orientation (release 1.1)

- **Primary actor**: Prospect, specialising Visitor.
- **Stakeholders and interests**: the prospect wants clarity without commitment; the maintainer wants a
  useful but non-binding context that does not collect unnecessary data.
- **Preconditions**: local diagnostic rules, copy, accessibility, and the in-browser privacy boundary are
  approved. REQ-DATA-001, provider approval, and the submission operating process become additional
  preconditions only when connected submission or scheduling is enabled.
- **Minimal guarantee**: exiting or declining submission stores no server-side draft and exposes no
  identity data.
- **Success guarantee**: the prospect receives a non-binding orientation and understands unresolved points.
- **Main success scenario**:
  1. The prospect reads the diagnostic purpose and privacy boundary.
  2. The prospect answers short business-language questions or chooses uncertainty.
  3. Pure rules derive an orientation in the browser.
  4. The prospect reviews the orientation, assumptions, and unresolved points.
  5. The prospect optionally chooses an approved next step.
- **Extensions**: 2a. The prospect skips a non-essential answer; 3a. No responsible orientation exists, so
  the result recommends a human exchange; 5a. The prospect exits and nothing is submitted.
- **Postcondition**: the prospect has an orientation; personal data exists only if a separate explicit
  submission succeeds.
- **Relationships**: actor generalisation from Prospect to Visitor; optional continuation to UC6.

### UC6 — Request a first exchange (release 1.0 and later)

- **Primary actor**: Prospect, specialising Visitor.
- **Stakeholders and interests**: the prospect wants a reliable next step; the maintainer wants requests
  only through channels that can be monitored and answered.
- **Preconditions**: at least one contact channel and its response process are operational.
- **Minimal guarantee**: a failed or unavailable connected path does not lose submitted information or
  falsely claim success.
- **Success guarantee**: the prospect can initiate an exchange and understands what happens next.
- **Main success scenario in release 1.0**:
  1. The prospect opens contact information.
  2. The prospect sees the minimum useful context and expected response process.
  3. The prospect activates the monitored email path using their own email client.
  4. The prospect sends the request outside the site.
- **Extensions**: 3a. The email client cannot open, so the address remains copyable; in release 1.1, an
  approved form or scheduler may provide another tested path.
- **Postcondition**: the prospect has a usable manual channel or an accurate connected confirmation.
- **Relationships**: actor generalisation from Prospect to Visitor; may follow UC5 in release 1.1.

### UC7 — Publish a reviewed creation (release 0.1 and later)

- **Primary actor**: Maintainer.
- **Stakeholders and interests**: visitors need trustworthy evidence; the maintainer needs a repeatable,
  reviewable publication process.
- **Preconditions**: source, rights, status, content, responsive behaviour, security, and demo maturity
  have been assessed.
- **Minimal guarantee**: an invalid or incomplete entry remains unpublished.
- **Success guarantee**: build validation accepts the entry and a reviewed deployment can publish it.
- **Main success scenario**:
  1. The maintainer completes the catalogue metadata and adds approved assets.
  2. The maintainer records rights, status, limitations, and review dates.
  3. Schema, route, link, and asset checks pass.
  4. The maintainer reviews the generated page and any external demo.
  5. The maintainer explicitly marks the entry for publication.
- **Extensions**: 3a. Validation fails, so publication stops; 4a. A demo is unsafe or immature, so the entry
  publishes without the demo link; 5a. Evidence is insufficient, so the entry stays in the backlog.
- **Postcondition**: only an allowlisted, reviewed entry is eligible for the next deployment.
- **Relationships**: none.

## 5. Information architecture

The authoritative page and navigation map is [`docs/product/site-map.md`](../../product/site-map.md).
Release 1.0 includes home, gallery, project detail, services, method, about, contact, required legal and
privacy pages, a recovery page, and a FAQ only when its content justifies a separate page. Release 1.1
may add the project-orientation route and non-indexed confirmation route.

## 6. Delivery releases

### Release 0.1 — Private identity-and-proof preview

- Static project foundation and central provisional brand configuration.
- Homepage, gallery, project details, and founder accountability.
- Four to six initial entries from the reviewed publication queue.
- Preview-only deployment; no production domain, connected form, scheduling, or analytics requirement.

### Release 1.0 — First public commercial website

- Final identity, domain, monitored professional email, and legal publisher information.
- Services, optional blocks, method, about, FAQ when justified, and contact through monitored email.
- Legal and privacy pages appropriate to the active no-collection feature set.
- Technical SEO, accessibility, performance, security, and truthful-content launch checks.
- No dependency on the diagnostic, connected form, scheduling, or analytics.

### Release 1.1 — Qualification and measurement

- Validated local diagnostic rules and accessible results.
- Connected submission, scheduling, or measurement only when individually justified and approved.
- Data-flow, provider, privacy, security, retention, deletion, abuse, and operational verification.

### Separate future product — Authenticated client portal

Accounts, invitations, private project data, collaborators, approvals, documents, contracts, payments,
and signatures require their own issue, conception, threat model, data model, and deployment.

## 7. Release gates

### Release 0.1 preview gates

- Provisional identity is visibly controlled and cannot be mistaken for an approved public launch.
- Every previewed gallery entry passes the applicable truthfulness, rights, responsive, and maturity review.
- Static build, schema, route, link, accessibility smoke, and representative viewport checks pass.
- No search indexing, personal-data endpoint, production contact promise, or provider embed is enabled.

### Release 1.0 public gates

- Final name, domain, professional email, confusion check, and canonical metadata completed.
- Legal business identity and reviewed legal and privacy content available.
- One monitored contact channel and response process tested.
- Four to six representative moderated usability sessions completed; blocking findings corrected.
- Knowledgeable manual accessibility review and automated checks completed.
- Performance budgets pass on representative mobile and desktop pages.
- Canonical URLs, redirects, robots directives, sitemap, metadata, internal links, and structured data verified.
- Security workflows and repository settings active; no unresolved high or critical dependency risk.
- Production deployment and rollback procedure exercised.

### Release 1.1 activation gates

- REQ-DATA-001 and the data-flow diagram approved for each active provider.
- Diagnostic rules, submission, error, deletion, retention, scheduling, measurement, and rights paths tested
  end to end where applicable.
- Connected journeys pass keyboard, screen-reader, zoom, reflow, error-identification, and reduced-motion review.
- Provider outage and abuse scenarios have a documented manual fallback.
- Inactive optional providers ship no script, cookie, route, or misleading interface.

## 8. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Provisional name leaks into production | Typed identity configuration plus release-specific production gate. |
| Demonstrations appear to be real client work | Mandatory status labels, credits, limitations, and publication review. |
| Empty repository backlog weakens trust | Publish only explicit allowlisted entries from the review queue. |
| Broad audience produces generic copy | Use one primary local-small-organisation message and sector evidence as secondary paths. |
| Offer implies unlimited scope | Define the finite core, optional blocks, client responsibilities, and exclusions. |
| Future portal expands the website | Enforce ADR-0001 and open a separate conception issue when a signed-client need exists. |
| Diagnostic becomes an automatic quote | Keep results local, deterministic, non-binding, and subject to human confirmation. |
| Free text collects sensitive information | Avoid uploads, warn explicitly, limit length, and collect only after approved submission. |
| Third parties introduce tracking or outages | Review providers, ship no inactive SDK, offer manual alternatives, and document data flows. |
| SEO creates misleading location content | Use truthful local identity and substantive pages; prohibit mass city or thin sector pages. |
| AI messaging sounds like automation replaces expertise | Explain concrete benefits, human accountability, verification, confidentiality, and appropriate tool selection. |

## 9. Planned verification

- Schema tests for brand, route, offer, and catalogue data.
- Unit tests for deterministic diagnostic rules when introduced.
- Static route, metadata, canonical, sitemap, robots, structured-data, and broken-link checks.
- Representative browser journeys for navigation, gallery, contact, and later diagnostic completion.
- Automated accessibility checks plus manual keyboard, focus, zoom, reflow, screen-reader, and motion review.
- Mobile and desktop performance-budget checks on representative pages.
- Dependency audit, Gitleaks, CodeQL, dependency review, and browser-header review.
- Manual content, rights, truthfulness, privacy, provider, and release-readiness checklists.
- AI-assisted output review covering factual accuracy, licences, confidentiality, security, and human approval.
- Moderated comprehension tasks using the success criteria in the product brief.
