# Maison Marceau — local publication-readiness audit

Date: 2026-10-02. Verdict: local technical checks passed with outstanding release gates. Not authorised for public deployment or catalogue publication.

## Candidate and scope

Repository: StudioB22/barbier-01. Local worktree: barbier-01-image-review, base commit 2600fe308c4d8214168f0c8ac7c8c3e16cb66900, with existing uncommitted deployment preparation.

This differs from the capture package's committed candidate. No application source, deployment configuration, dependencies or CI was modified by this audit.

Tracked deployment diff SHA-256 (git diff --binary HEAD over .gitignore, README.md, angular.json, package.json, src/index.html):
3dadda0762ff8622b42f4aa5952924b25141ea1335eb8a3466a7a2dbd56e5030.

Untracked deployment file SHA-256:

- public/_headers: cd7893acb2385887041c6002963275dd04838893555017ba4e455e42989628f9.
- public/robots.txt: e5c4b84484ee4216e9373be99380320c25dd94805f99f0a805846f087636553f.
- tests/deployment-build.test.mjs: d839fe07bf1bda6abac5348b3da0d85a14bb3d576d6c39347955c962ae31aad8.

These identify a local snapshot, not a frozen release commit. Commit and reverify the approved final candidate before deployment.

## Confirmed checks

- Fresh Angular production build passed.
- All 16 Angular Chrome Headless tests passed.
- All four deployment-output tests passed: noindex shell, copied header policy, local external scripts/styles without inline JavaScript, and crawler/SPA-fallback configuration.
- npm audit returned zero known vulnerabilities across the installed dependency report. This is a point-in-time advisory check, not proof of vulnerability absence.
- Gitleaks history scan and src directory scan completed with exit code zero and redacted output, with no findings.
- Source search found no document.cookie, localStorage/sessionStorage, fetch/HttpClient, unsafe HTML bypass or HTTP resource references in src.
- Under a loopback diagnostic server applying the prepared headers, direct visits to Home, Services, About, Gallery and Contact rendered at 390px with equal document client/scroll widths (375px). All five pages had their expected primary heading and no forms.
- The native preview reported no recent console errors or failed requests during those page visits.
- On Contact, no external DOM resource URLs, cookie values or local/session storage entries were observed. This does not assess host access logging or all future third-party services.

The diagnostic server is an approximation for browser-policy checks, not Cloudflare. It serves the built output, applies the prepared header values and uses a local SPA fallback. It adds no-store caching for the audit. HTTPS, actual platform routing, caching and header delivery remain unverified.

## Local Lighthouse measurements

Lighthouse 13.5.0, sequential runs on Home/mobile, Contact/mobile, Home/desktop, using the CSP diagnostic server. One sample per profile.

| Profile | Performance | Automated accessibility | Best practices | LCP | CLS |
| --- | --- | --- | --- | --- | --- |
| Home/mobile | 83 | 100 | 100 | 3.78 s | 0 |
| Contact/mobile | 83 | 100 | 100 | 3.50 s | 0 |
| Home/desktop | 99 | 100 | 100 | 0.82 s | 0 |

All three console-error audits passed with no entries. Automated accessibility scores do not certify conformance or replace keyboard, zoom and assistive-technology checks.

SEO scored 58: indexing is intentionally disabled. The robots diagnostic also failed because Lighthouse's resource fetch was blocked by connect-src none; its explanation explicitly says CSP violation. Independent HTTP retrieval returned the intended plain-text robots content. Do not describe this diagnostic as proof that robots.txt is malformed, and do not weaken the policy solely to raise a score.

Raw temporary reports: /tmp/barbier-audit-home-mobile.json, /tmp/barbier-audit-contact-mobile.json, /tmp/barbier-audit-home-desktop.json. The durable metrics and diagnostic explanations are recorded here; the temporary reports are not permanent archives.

## Findings and next actions

### P2 — Project CI release controls incomplete

Local candidate has no .github directory. GitHub's read-only workflow inventory shows an active Smoke Runner workflow at .github/workflows/smoke-runner.yml. Its contents check runner diagnostics and SonarQube availability, not installation/build/application tests/deployment tests, secret detection or dependency review. Checkout is tag-pinned rather than SHA-pinned.

CodeQL default-setup lookup returned HTTP 403: Advanced Security must be enabled. Its actual configuration was therefore not established. Do not assume this can be enabled without checking account availability and cost.

Recommendation: obtain approval for a dedicated CI plan covering build/test/deployment-output checks, secrets and dependency review, with a licensed/applicable SAST route and SHA-pinned actions. Preserve existing runner work. Acceptance: required checks are visible and pass on the final release candidate.

### P2 — Mobile loading remains above the target

Observed LCP is 3.50–3.78s against the internal 2.5s target. Home's LCP image is inserted by client rendering rather than discoverable in the initial HTML, and has no high fetch priority. The image-delivery diagnostic estimates only about 20KiB savings on a secondary image. Render-blocking global CSS adds an estimated 150ms.

These observations are candidates for a focused optimisation experiment, not established root causes. Previous measurements used different build/serving conditions; no causal regression claim is made. Do not re-enable critical-CSS inline handlers without reconsidering the CSP.

Acceptance: repeat comparable measurements, trial the smallest change, and verify no CSP, responsive-image, layout-shift or visual regression.

### P2 — Final acceptance and real-host evidence missing

The mobile-first candidate still needs renewed real-keyboard and 200%/400% zoom acceptance, final capture approval, and the applicable wider accessibility review. The eventual HTTPS host must be checked for certificate/redirects, header enforcement, direct route reloads, actual caching, plain-text robots delivery and runtime errors.

No remote deployment URL or public release approval is established. No screenshot is moved into public assets and no catalogue review date is marked complete from these local scores.

## Documentation verification

[Cloudflare headers](https://developers.cloudflare.com/pages/configuration/headers/) confirms that _headers is parsed from static output and does not apply to Function-generated responses. [Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/) remains the source for native SPA fallback. Both were checked on 2026-10-02. The existing demo-publication document remains the build/deployment contract.

## Authority and tracking limits

This audit used website-audit, security-policy and security-ci-baseline guidance. It retained findings locally: creating external issues, modifying CI/CD, opening a PR or deploying require explicit approval. No issue or pipeline mutation was performed, and no full security certification is claimed.
