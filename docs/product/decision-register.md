# Public website decision register

This register contains implementation-scoping decisions for the new repository. It does not
erase the broader discovery history maintained before this repository was created.

| ID | Status | Decision | Rationale |
| --- | --- | --- | --- |
| WEB-001 | Accepted | Keep `StudioB22` as a working label and defer final naming without blocking conception. | The product promise and information architecture are stable enough to design independently from the final brand. |
| WEB-002 | Accepted | Create a dedicated `StudioB22/website` repository. | The personal site, public commercial site, gallery demonstrations, and future portal have different responsibilities and release cycles. |
| WEB-003 | Accepted | Keep the public website separate from the future authenticated client portal. | The portal introduces identity, personal data, payments, and operational risks that are not required to validate the public journey. |
| WEB-004 | Accepted | Use a static, content-first architecture for the first public implementation. | The MVP is primarily editorial and portfolio content; static delivery minimises runtime, dependencies, attack surface, and page weight. |
| WEB-005 | Accepted | Store the public gallery as a reviewed catalogue in the repository. | Publication volume does not yet justify a CMS or admin interface, and private repositories must not become a public runtime dependency. |
| WEB-006 | Accepted | Centralise all provisional brand values. | Naming remains open, so one controlled substitution point prevents brand assumptions from leaking through source and content. |
| WEB-007 | Accepted | Separate the private preview, first public website, connected qualification, and future portal into independent release boundaries. | A useful static website must not be blocked by unselected providers or unnecessary personal-data processing. |
| WEB-008 | Accepted | Keep the first implementation private or preview-only until production launch gates pass. | Domain, legal identity, professional contact channels, data processing, and final content are not ready for an indexable commercial launch. |
| WEB-009 | Accepted | Do not migrate, rename, or delete the existing sector repositories as part of the website foundation. | The catalogue can reference only reviewed work; a mass repository migration adds risk without visitor value. |
| WEB-010 | Accepted | Implement the public website with Astro and strict TypeScript, producing static output for Cloudflare Pages. | Astro fits a content-led multi-page gallery while shipping JavaScript only for justified interactions. Pages remains the simplest known static delivery path; reconsider Workers when a real runtime requirement appears. |
| WEB-011 | Accepted | Address owners of small local organisations as the primary audience and use sector examples as secondary paths. | The studio may accept broader work without weakening the homepage with a message aimed at everyone. |
| WEB-012 | Accepted | Present one finite core website foundation plus optional building blocks, responsibilities, and exclusions. | Modular growth supports evolving client needs without implying unlimited scope or premature fixed packages. |
| WEB-013 | Accepted | Treat the 157-repository inventory as a progressive, multi-month proof programme. | Four to six reviewed entries are sufficient to launch; additional sectors improve the site only after each creation meets the publication standard. |
| WEB-014 | Accepted | Keep release 1.0 free of required connected forms, scheduling, and analytics. | A monitored email path serves the first need with less personal-data and operational risk; release 1.1 has a separate data gate. |

## Open decisions

- Final agency name, trademark/confusion clearance, domain, email identity, and handles.
- Sustainable service price floors and public investment ranges.
- Final selection and remediation of the first four to six gallery entries.
- Diagnostic questions, deterministic orientation rules, provider, data flow, retention, and abuse protection.
- Scheduling, analytics, professional phone, and form-delivery providers.
- Final legal notices, privacy information, business identity, and insurance readiness.
- Final French copy validated against representative customer language.
