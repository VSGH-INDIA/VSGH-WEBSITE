# Production CMS completion audit

Date: 2026-10-03. Baseline inspected: `5d30b7b` (the public interactive-site release). This work is on `codex/production-cms-completion`; it is not evidence of a Vercel production deployment.

## Delivered in the repository

- Sanity has controlled singleton documents for Home, Business, Contact, and Site settings. Business is modelled as exactly three approved commercial lines: Aerospace Systems & Components, Imports & Exports, and Global Programmes.
- The public server resolves published CMS content first and keeps typed code fallbacks for incomplete or unconfigured Sanity content. Draft preview remains server-only and no-store.
- Studio has a task-oriented structure, publishing/review lists, asset library, and a dashboard for lifecycle, SEO, image-alt, and recent-edit checks. `sanity.cli.ts` explicitly shares the app `@/` alias with Studio builds.
- Public media supports approval status, visibility, decorative images, and conditional alt text. A CMS image is not public unless it is approved, public, and has alt text unless marked decorative.
- The contact endpoint validates a strict JSON payload, same-site origin, message size, minimum form age, honeypot, per-IP Upstash rate limiting, optional Turnstile verification, and server-only Resend delivery. It never pretends an unconfigured delivery channel succeeded.
- Vercel Analytics and Speed Insights are included once in the root layout. Their production collection is platform-dependent.
- GitHub Actions runs install, lint, typecheck, formatting, tests, production build, critical audit, SBOM generation, and artifact upload.

## Verified locally

- `npm run typecheck`
- `npm run lint`
- `npm test -- --run` — 19 files / 73 tests at the completion check
- `npm run build`
- `npx sanity build --output-path <temporary-directory>`
- `git diff --check`

## Owner actions still required

No credentials, DNS, email, Sanity project role, webhook, search-console property, or Vercel setting was created by this code change. Before release, the owner must configure the entries in `.env.example`, publish/approve factual CMS documents, configure Sanity CORS and webhook delivery, verify a Resend sender domain, provision Upstash, and complete deployed smoke/a11y/performance testing. See the linked runbooks below.

## Known boundaries

- The Studio dashboard identifies document-level image-alt/SEO gaps. A reusable media-document migration would be required for asset-level lifecycle filtering across every embedded image.
- Analytics and Speed Insights are instrumented but do not prove consent compliance, collection, or reporting until enabled and verified on the deployed Vercel project.
- Contact mail is deliberately unavailable (HTTP 503) until both abuse protection and Resend delivery credentials are configured.

## Operational references

- [CMS editor guide](CMS-EDITOR-GUIDE.md)
- [CMS architecture](CMS-ARCHITECTURE.md)
- [Contact enquiry operations](CONTACT-ENQUIRY-OPERATIONS.md)
- [Search engine setup](SEARCH-ENGINE-SETUP.md)
- [CI operations](CI-OPERATIONS.md)
- [Production validation](PRODUCTION-VALIDATION.md)
