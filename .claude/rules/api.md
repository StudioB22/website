---
paths:
  - "src/api/**/*.ts"
  - "src/server/**/*.ts"
---

# API conventions

The public website has no API in its initial delivery slice. These rules apply only if a later,
separately approved feature introduces files under the paths above.

- Validate every untrusted input before processing it.
- Return a stable success or error shape without exposing internal details.
- Use HTTP status codes consistently and document non-obvious error cases.
- Emit structured, privacy-safe production logs; never log credentials or unnecessary personal data.
- Apply abuse protection and rate limiting to every public endpoint.
- Keep the endpoint outside the static website boundary when an approved managed service is safer.
