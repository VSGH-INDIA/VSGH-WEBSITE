# Platform completion V&V audit

Date: 2026-10-03  
Directive baseline: `fe4eb99dd8b95cf6f91e27f926a6f559315e020e`  
Working branch: `codex/platform-completion-vv`

## Recorded starting state

| Area                  | Evidence-backed status                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application revision  | `fe4eb99` was both local `origin/main` and the recorded directive baseline before this branch was created.                                                                                                                |
| Production deployment | Vercel `dpl_5MZ68uTFundqkyt9ucxcifGmEJm4`, `READY`, production target, aliases `vsghindia.com` and `www.vsghindia.com`.                                                                                                   |
| Public routing        | 33 implemented routes, including the three `/business/*` landing pages.                                                                                                                                                   |
| Unit tests            | 20 test files / 76 tests passed at the starting checkout.                                                                                                                                                                 |
| CMS architecture      | Separate Sanity Studio, published-only server fetches, typed fallback content, preview/revalidation endpoints, lifecycle field, editorial dashboard, and a hosted Studio app ID.                                          |
| Contact architecture  | Same-site JSON endpoint, schema validation, timing/honeypot checks, optional Turnstile, Upstash adapter, and Resend adapter. Delivery is deliberately unavailable unless owner-held environment variables are configured. |
| CI                    | Lint, typecheck, format, unit tests, critical audit, build, and SBOM are configured. E2E, axe, Lighthouse, and Studio build are not yet CI jobs.                                                                          |
| Visual editing        | Not implemented at the starting checkout. Draft preview exists but was not a Presentation Tool integration.                                                                                                               |
| Accessibility         | Component and contrast checks exist. No browser-level automated accessibility suite exists.                                                                                                                               |
| Performance           | Vercel Analytics and Speed Insights are instrumented. No repeatable Lighthouse run or documented numeric budgets exists.                                                                                                  |
| Dependencies          | `npm audit` reported 0 critical, 14 high, and 5 moderate findings. High findings are primarily Studio/dev tooling transitive dependencies; triage and remediation remain required.                                        |

## External dependencies at the start

- Sanity browser login, CORS/origin approval, member roles, and authenticated draft-preview token are account-held controls.
- Immediate production CMS refresh requires the configured Sanity webhook and `SANITY_REVALIDATE_SECRET` in Vercel.
- Contact delivery and rate limiting require verified Resend and Upstash production credentials. Turnstile is optional and must be configured separately if enabled.
- Search Console, Bing, Vercel Analytics, and Speed Insights account-side validation cannot be inferred from source code.

## Completion rule

This audit distinguishes source-code evidence from account-side proof. No external integration is recorded as complete unless it is directly verified during this completion branch.
