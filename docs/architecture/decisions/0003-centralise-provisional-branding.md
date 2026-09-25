# ADR-0003: Centralise provisional branding

- Status: accepted
- Date: 2026-09-25
- Related issue: [#1](https://github.com/StudioB22/website/issues/1)

## Context

The final agency name has not passed availability, confusion, trademark, domain, email, and handle
validation. Naming must not block product conception, but a working label must not silently become
the production identity through source-code duplication.

## Decision

Centralise the working name, descriptor, founder, contact channels, canonical origin, social links,
and default metadata in one typed brand configuration. Visible content may refer to the founder and
the provisional StudioB22 label, but production deployment remains blocked until verified values
replace every provisional field.

## Consequences

- A future rebrand is a controlled content and token change rather than a structural rewrite.
- The build can fail when required production identity values remain provisional.
- Project copy must avoid wordplay or navigation labels that depend on the temporary name.
- URLs use semantic service and content terms rather than the working brand.

## Rejected alternatives

- **Wait for naming before all conception**: rejected because visitor needs and architecture do not
  depend on the final wordmark.
- **Scatter placeholders throughout pages**: rejected because it creates missed replacements and
  inconsistent metadata.
