# ADR-0002: Use a static, content-first public architecture

- Status: accepted
- Date: 2026-09-25
- Related issue: [#1](https://github.com/StudioB22/website/issues/1)

## Context

The public MVP consists mainly of French editorial content, a structured gallery, project detail
pages, and a small amount of justified interaction. Content changes are initially maintained by
the owner through version control. There is no current publication volume requiring a CMS.

## Decision

Use Astro with strict TypeScript to generate static Cloudflare Pages output. Keep catalogue data,
brand configuration, and deterministic diagnostic rules independent from UI components. Add client
JavaScript only to interaction islands that require it.

Cloudflare now positions Workers as its primary platform for new applications, while Pages remains a
supported and familiar static Git deployment path. Retain Pages for release 0.1 and 1.0 because the
accepted product has no server runtime. Re-evaluate Workers rather than layering Pages Functions onto
the site when a real edge-runtime requirement is approved.

## Consequences

- Pages remain crawlable without client-side rendering.
- Runtime attack surface and dependency count stay small.
- Gallery entries receive schema validation during the build.
- A contact or diagnostic submission endpoint remains a separately approved boundary.
- A CMS is added only if repository editing becomes an observed bottleneck.
- The delivery choice is revisited if approved server logic, bindings, or deployment constraints make
  Workers materially simpler.

## Rejected alternatives

- **Plain hand-authored HTML for every page**: viable for a single page, but it would duplicate
  gallery structure and metadata as the catalogue grows.
- **Next.js full-stack application**: familiar but heavier than the present requirement; the future
  portal does not justify coupling the public site to a server runtime today.
- **CMS from launch**: rejected because it adds authentication, maintenance, security, and governance
  before a real editorial need exists.
- **Cloudflare Workers static assets from the first preview**: technically valid and Cloudflare's current
  strategic direction, but it adds no product value for the accepted static-only releases. Reconsider
  it when a concrete runtime or platform-migration benefit exists.
