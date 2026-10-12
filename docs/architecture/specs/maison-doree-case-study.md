# Maison Doree case-study conception

Date: 2026-10-12. Owner: Benoit Bremaud.
Status: owner approved conception and local editorial implementation on 2026-10-12.
Implementation verified at source/build level; publication remains unauthorized.
Work item: present the concrete method and know-how behind a fictional bakery
demo while retaining independent repositories and truthful publication gates.

## Inputs and authoritative boundaries

Use the existing public-website-mvp, method-page-guide and
portfolio-method-consolidation specifications. This checkout is the documented
local integration reference, not an accepted production release.
The bakery repository's documentation/portfolio-case-study.md is the editorial
source; its project-brief and static-delivery records own implementation evidence.
The bakery is fictional. Development and reported checks are real, but they are
not a real client commission, business outcome or universal compliance claim.

Keep the source and deployment of boulangerie-01 independent. Do not copy it into
this Astro project, add an iframe, change the personal site, create a CMS/backend,
purchase a domain or publish a demonstration in this lot.
Existing dirty worktree changes and all other worktrees must be preserved.

## User goals and scenarios

Existing public use cases UC2 Explore relevant creations and UC4 Review the
delivery method remain applicable; this adds supporting editorial content,
not a new customer transaction or authenticated role.

### UC2: inspect a concrete project and its decisions

Primary actor: Visitor after future publication; Maintainer during local review.
Precondition: an explicitly eligible page is available for the current mode.
Minimum guarantee: drafts never become public due to narrative availability.
Main scenario: read fictional context and goal, inspect a decision and its
reason/example/evidence limits, then consult the general method.
Success guarantee: the reader can distinguish what was implemented, observed,
still pending, and not applicable. No revenue/SEO/performance guarantee is implied.
Extension: if screenshots are absent, an editorial local preview says so and
does not invent a thumbnail, captured version or visual proof.

### UC4: understand important method checkpoints

Precondition: method page available. Main scenario: read the case-specific
milestones, follow the method link and explore the existing fifteen steps.
Success guarantee: general process and project-specific completion are distinct.
Extensions: pending acceptance, launch and handover are explicitly pending;
owner observations are not representative customer research.
Navigation between pages is not UML include/extend.

## Content and data contract

Add an optional caseStudy to projectCoreSchema so existing catalogue entries
remain valid without modification. Content uses plain strings, not raw HTML:

- context: fictional setting and known evidence boundaries.
- objective: prioritized visitor tasks and scope.
- decisions: nonempty list of title, reason, example and evidenceLimit.
- milestones: nonempty list of title, methodSteps (integers 1-15),
  status (documented / partially-verified / pending / not-applicable),
  and explanation of the evidence or non-applicability.

No screenshot filename, public URL, review date or publication permission is
embedded in this narrative. Existing published schema requirements remain intact.
Statuses describe editorial evidence, not legal certification or a new workflow
engine. Schema validates structure; owner/source review verifies factual truth.
Use named schema/type exports and strict TypeScript, no any.

Maison Doree entry: slug maison-doree; sector artisans-et-metiers;
status demonstrator; published false. reviewedAt identifies an actual dated
source review, not passed final acceptance. Include existing credits and
limitations, 47-test/source/artifact evidence with proper boundaries, open dev
dependency reservation and outstanding browser/live checks.

Public copy is French. Explain visitor value before technical details; put
test counts and tooling names in supporting evidence, not the main promise.
Reuse the existing draft copy rather than inventing testimonials or AI claims.

## Presentation and capture decision

ProjectCaseStudy.astro is a static presentational component used by the public
detail template when a separately eligible published project has caseStudy.
Render semantic headings and lists; ordinary escaped text; no client script.
Use existing design tokens and responsive styles, adding only scoped layout
rules needed for the narrative.

For this first lot, add a development-only editorial route:
/atelier-local/etudes/maison-doree/.
getStaticPaths returns only drafts with caseStudy in development and an empty
list in production. The template explicitly says local draft, fictional
project, editorial preview without screenshots; it renders the shared narrative
and a link to /methode/. No local demo URL or image is necessary for reviewing
this content. Do not expose this route in a public sitemap/gallery.

Do not weaken the existing local-project-preview schema: it currently requires
desktop/mobile captures and a 40-character sourceCommit. At conception time,
the bakery work was uncommitted; the editorial-only lot did not establish the
required capture evidence.
Keep its existing previews, capture endpoints and registries unchanged.
Later, add the visual preview with genuine revision/capture evidence under its
own approved plan. Once final acceptance and actual hosted destination are
verified, separately authorize gallery publication and public demo link.

The editorial route is a concrete temporary review need, not a general
alternative capture framework. No new registry, loader, database or service
is required: it selects from the existing validated project catalogue.

## Owner-approved file-level implementation plan

1. src/domain/project.ts: optional narrative schema/type and validation.
2. src/data/projects.ts: add the fictional draft and reviewed narrative.
3. src/components/ProjectCaseStudy.astro: shared static narrative rendering.
4. src/pages/realisations/[slug].astro: render optional narrative without
   changing publication filters, review evidence or existing demo semantics.
5. src/pages/atelier-local/etudes/[slug].astro: local-only editorial page.
6. src/styles/global.css: scoped narrative layout using existing tokens only.
7. tests/project.test.ts: old entries, valid/invalid narrative and no publication
   promotion from caseStudy. New focused rendered-content test as necessary.
8. tests/site-build.test.mjs: editorial/draft route absent in production,
   Maison Doree not public, no loopback URL leakage, published fixture narrative
   rendering, existing method/gallery/project regressions.
9. Conception/traceability records: link results without inventing gate passes.

Before editing production code read each file end-to-end, confirm a dedicated
branch strategy from main that preserves the existing consolidated work, and
obtain owner approval. Do not reset/switch dirty worktrees or silently include
unrelated changes in a future PR. No PR, push, CI or deployment authorized.

## Acceptance and traceability

| Criterion | Source/use case | Planned verification |
| --- | --- | --- |
| Draft stays nonpublic | REQ-PUB-008, REQ-HON-001, UC2 | Production build route/gallery assertions |
| Existing projects unchanged | REQ-PUB-002, UC2 | Schema and generated-site regressions |
| Concrete decisions understandable | REQ-PUB-003, UC2 | Plain-text rendered sections and owner copy review |
| All method steps remain available | REQ-PUB-005, UC4 | Existing fifteen-step method test and link check |
| No fabricated visual/version evidence | REQ-HON-001, UC2 | No screenshot/commit requirement bypass; editorial notice |
| No added backend/collection | REQ-PRIV-001 | Static markup/source inspection |
| Reusable, proportional rendering | REQ-A11Y-001 | Semantic HTML, existing token use; browser review pending |

## Four-pass conception review

1. Requirements/traceability: all owner goals map to existing UC2/UC4 and explicit
   tests. Proposed local editorial route closes the current evidence gap without
   fake captures or permission to publish.
2. Dependency/SOLID: Astro views consume validated content; validation does not
   import UI, filesystem or bakery code. Catalogue data carries actual narrative;
   one shared renderer prevents divergent public/local presentation.
3. KISS/YAGNI/DRY: optional field preserves existing records. No CMS, workflow
   engine, new capture registry, business layer or unrelated page rewrite.
4. Pattern fit: static composition and structural validation suffice. No
   Strategy/Factory/Repository pattern is warranted by this content feature.

Existing public use-case diagram remains applicable. A minimal component view
clarifies the new rendering boundary. No class/state/data-flow/sequence diagram
is justified for plain static reading with no new PII, runtime or entity lifecycle.
The owner subsequently approved the reviewed conception and local implementation.
Diagram render verification remains unclaimed; the component view is a structural
index. Implementation evidence below does not imply visual/publication acceptance.

## Implementation and verification record, 2026-10-12

Owner selected the detailed plan with a local editorial preview without captures.
Implementation continues in the existing dedicated codex/portfolio-method-consolidation
integration branch, which is descended from main; other worktrees and pre-existing
dirty changes remain intact. No commit, PR, push, CI or deployment operation.

Implemented the optional typed narrative, Maison Doree draft, shared static renderer,
local-only editorial route and scoped token-based responsive styles. Existing
visual capture registry/schema is unchanged. Public route generation still selects
published entries only. No local bakery URL, invented capture or commit is introduced.

Verification: npm run check passes formatting, ESLint, zero Astro diagnostics,
81 unit tests, the five-page static build and 11 generated-site tests. The synthetic
public fixture exercises real schema validation and shared narrative rendering,
pending milestone labels, method navigation and escaped script-like plain text.
It contains a test-only generated pixel and invented test evidence, never a real
published catalogue entry. Actual drafts, including Maison Doree, remain absent
from both preview-channel and synthetic public-channel production output.

The positive published fixture exposed an existing asset-path bug masked by an
all-draft catalogue: import.meta.url pointed into relocated prerender chunks.
Resolve public/ from the build working directory instead, preserving real missing-
asset rejection. The fixture initially failed, then passed after this necessary
catalogue-file correction. Builds must run from the project root as documented.

No automated visual/browser/local-HTTP result is claimed. Tests establish schema
and generated static output, not final viewport acceptance. Existing bakery G12
reservations and its dependency advisory remain separate and open.

## Owner-approved editorial refinement, 2026-10-12

The owner approved the three text-only refinements after the editorial review:
explain design terminology, relate technical decisions to practical visitor
benefits, and clarify independent delivery. Wireframes are described as page
structure sketches; mockups are graphical previews. Responsive image wording
describes available sizes and browser selection, not measured loading gains.
Independent delivery describes separate code and hosting-ready files, not
completed hosting, handover, ownership transfer or a maintenance commitment.

This refinement changes catalogue copy only, with this decision record. Schema,
renderer, layout, five decisions, all fifteen method steps, credits, pending
milestones and publication filters remain unchanged. The copywriting skill's
clarity, concrete examples and honest-evidence principles guide the wording;
no customer research, commercial outcome or compliance certification is added.

Verification after the refinement: npm run check passed formatting, ESLint,
Astro diagnostics (33 files, zero errors/warnings/hints), 81 unit tests,
the five-page static build and all 11 generated-site tests. git diff --check
also passed. These checks do not constitute a rendered browser review or
authorize publication.

## Conditional local case-study navigation, 2026-10-12

Owner approved the proposed conditional link and focused tests. The visual local
preview offers a same-tab "Comprendre les choix de conception" link only when
its existing draft has caseStudy. Its target matches the editorial route's slug
and eligibility condition. Existing projects without narratives gain no link.
No duplicated narrative, dependency, script, styling or capture placeholder is
introduced. Maison Doree remains unregistered in the visual preview catalogue
until genuine captures are supplied. Production route exclusions remain intact.

Verification uses the actual Astro visual template in a disposable static-build
fixture with and without a narrative. The synthetic page exists only in the
temporary test directory, never in the real catalogue or production output.
This verifies generated link markup, not browser navigation or visual acceptance.

Result: npm run check passed formatting, lint, zero Astro diagnostics, 81 unit
tests, the five-page production build and 12 generated-site tests. The positive
and negative navigation cases pass, and real production output still excludes
all local draft routes. No portfolio commit, push or publication was performed.

## Current evidence status, 2026-10-12

The owner approved this documentation correction after the local consolidation
review. The independent bakery source is now recorded at local commit
`534e0ba43551c79e871241c034df1026cc846490`. This supersedes the conception-time
uncommitted-source limitation, not the missing visual evidence.

Current-version desktop/mobile captures and their provenance remain pending in
[the capture preparation record](../../product/reviews/maison-doree/README.md).
The editorial case study is implemented and source/build checks have passed;
that does not establish current-version visual acceptance, completed browser
checks or publication approval. Earlier verification records above describe
their respective work lots and remain historical evidence.
