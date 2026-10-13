# Component diagram — local project preview

## Context

Source specification: ../../specs/local-project-preview.md. UC1 lets the maintainer inspect
a draft without publishing it. No lifecycle or personal-data model is introduced.

## Diagram

```mermaid
flowchart LR
  subgraph Portfolio["cmp — Local project preview"]
    Pages["Astro gallery and local routes — development only"]
    View["Local preview configuration"]
    Catalogue["Draft catalogue metadata"]
    Validator["Pure loopback URL validation"]
    Captures["Documented capture files"]
    Pages --> View
    View --> Catalogue
    View --> Validator
    Pages --> Captures
  end
  Pages -. "User opens a separate tab" .-> Demo["Independent Angular demo"]
```

## Notes

- Production emits no local route or capture endpoint.
- The portfolio never imports or builds the Angular application.
- Capture bytes remain outside public/ and are served only by guarded local endpoints.
