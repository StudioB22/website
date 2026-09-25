# Public website information architecture

- Status: proposed for owner review
- Canonical language: French
- URL principle: stable, descriptive, and independent from the provisional brand name

## Navigation model

The primary navigation remains short:

1. Réalisations
2. Services
3. Méthode
4. À propos
5. Contact

The primary call to action is `Parler de mon projet`. The diagnostic replaces neither contact nor a
human conversation and appears only in release 1.1.

## Release 1.0 routes

| Route | Primary visitor intent | Required content | Indexing |
| --- | --- | --- | --- |
| `/` | Decide whether the studio appears relevant and trustworthy | Proposition, audience, selected proof, offer summary, method summary, founder accountability, primary action | Index |
| `/realisations/` | Find a relevant example | Sector filters, truthful status labels, project summaries, visual directions | Index |
| `/realisations/[slug]/` | Assess one creation in detail | Context, status, sector, objectives, demonstrated capabilities, previews, credits, limits, reviewed demo link when available | Index when publication review passes |
| `/services/` | Understand the core foundation and optional blocks | Outcomes, included work, options, responsibilities, exclusions, pricing position | Index |
| `/methode/` | Understand how a project stays controlled | Three phases, seven milestones, approvals, feedback, scope changes, staged payment principles, handover, responsible use of AI and automation | Index |
| `/a-propos/` | Identify who is accountable and how the studio works | Benoît's factual introduction, principles, human accountability, modern-tooling position, capacity model, collaborator policy without invented team claims | Index |
| `/contact/` | Request a first exchange | One monitored channel, expected response process, minimum information, privacy notice | Index |
| `/questions-frequentes/` | Resolve common objections | Scope, content, timing, ownership, providers, maintenance, payments, changes, accessibility | Index if content is substantial; otherwise integrate into services |
| `/mentions-legales/` | Identify the publisher and host | Validated legal identity and required notices | Indexing decision at launch review |
| `/confidentialite/` | Understand data use and exercise rights | Purposes, legal bases, fields, recipients, providers, retention, rights, contact, trackers | Indexing decision at launch review |
| `/404/` | Recover from an invalid URL | Clear explanation and links to home, gallery, and contact | No index |

## Release 1.1 routes

| Route | Primary visitor intent | Activation condition | Indexing |
| --- | --- | --- | --- |
| `/preparer-mon-projet/` | Receive a non-binding project orientation | Diagnostic rules, accessibility, privacy, provider, retention, abuse protection, and operational handling approved | Index only if the page has substantive standalone value |
| `/merci/` | Confirm an accepted request and explain the next step | Submission path tested end to end | No index |

Booking may remain an external reviewed link rather than a dedicated page. No route is reserved for
the future client portal until that separate product is conceived.

## Homepage argument order

1. **Proposition** — what is created, for whom, and with what working relationship.
2. **Relevant proof** — a small selection of labelled creations, not an unfiltered repository dump.
3. **Useful outcomes** — credibility, clarity, contact, and maintainability rather than technology.
4. **Offer structure** — the core foundation and optional building blocks.
5. **Method** — visible phases, decisions, and responsibilities.
6. **Modern tools with human responsibility** — practical benefits of AI, automation, tests, and
   verification without vendor theatre.
7. **Founder accountability** — the person responsible for the work and quality.
8. **Objection handling** — concise answers or a link to the FAQ, including transparent AI use.
9. **Calm next step** — contact without urgency or commitment pressure.

## Internal linking rules

- Every published project links to its sector and the demonstrated service capabilities.
- Services link to relevant creations only when the evidence genuinely supports the claim.
- Method and FAQ pages link to contact after explaining the expected next step.
- No generated city pages, thin sector pages, or duplicate visual-style pages.
- Breadcrumbs appear on project details and any later deep content hierarchy.

## Search planning

The initial page/query map must be based on observed search language before final copy. Local intent
may mention Grasse, the Alpes-Maritimes, and the Côte d'Azur where factually relevant, but the site
must not claim offices, service areas, clients, rankings, or results that cannot be proven.
