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
- [Decision register](../product/decision-register.md)
- [MVP specification](specs/public-website-mvp.md)
- [Architecture decisions](decisions/)
- [Traceability matrix](traceability-matrix.md)
