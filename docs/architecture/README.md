# Architecture overview

## Context

The product begins as a French-first public commercial website. Its job is to explain
the offer, demonstrate credible work, describe the delivery method, and provide a safe
path to a first conversation. It is not the future client portal.

## Current container view

The accepted conception uses one statically generated public website and a repository-owned
catalogue. Published demonstrations remain separate deployable artefacts. External contact,
scheduling, and measurement services are introduced only after focused privacy, security,
and operational validation.

ADR-0004 separates the private preview, first public website, and connected qualification. The first
public release remains useful without a form, scheduler, analytics provider, or server runtime.

The future portal is outside the public website boundary and receives its own conception,
threat model, data model, and deployment when a real signed-client need activates it.

## Dependency direction

- Page and component code may consume validated catalogue and brand data.
- Catalogue and orientation rules are framework-independent data or pure logic.
- External services are called only through narrow integration points at the edge.
- Content and domain rules never import Cloudflare, scheduling, analytics, or email SDKs.

This is a deliberately flat architecture. Ports, repositories, services, or a full Clean
layer stack are not justified until a real second implementation or testability pressure exists.

## Authoritative sources

- [Product brief](../product/product-brief.md)
- [Positioning and modular offer](../product/positioning-and-offer.md)
- [Information architecture](../product/site-map.md)
- [Gallery inventory](../product/gallery-inventory.md)
- [Responsible AI-assisted delivery](../product/ai-assisted-delivery.md)
- [Decision register](../product/decision-register.md)
- [Public website specification](specs/public-website-mvp.md)
- [Architecture decisions](decisions/)
- [Traceability matrix](traceability-matrix.md)
