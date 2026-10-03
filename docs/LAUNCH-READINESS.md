# Launch readiness

## What the repository now provides

- A 29-route public information architecture with sitemap and robots support.
- Server-rendered public content with Sanity published-content overlays, one-hour revalidation, preview mode, and safe static fallbacks.
- Dynamic editorial articles and dynamic career-vacancy rendering when approved Sanity documents exist.
- An accessible interactive capability navigator on the homepage; it uses public capability descriptions only and does not disclose proprietary process data.
- Security headers, safe internal-link validation, public-media validation, and a production-only HSTS policy.

## Launch blockers outside this repository

These items require VSGH decisions, verified provider access, or approved business facts. They must not be fabricated in code.

1. **Contact channel:** Select the recipient/service, data controller, retention period, anti-abuse control, and an approved published contact method. The current form intentionally remains disabled until those decisions are made.
2. **Public content:** Approve photography, leadership/facility details, legal identity, contact details, Insights articles, and any vacancies. Do not publish unverified customer, certification, production, or performance claims.
3. **CMS operations:** Confirm Sanity administrator access, MFA, editor/publisher roles, Studio host, schema deployment, preview token, and revalidation webhook.
4. **Hosting and domain:** Confirm Vercel project, Cloudflare DNS, canonical-host redirect, TLS, environment variables, and rollback ownership.
5. **Release evidence:** Run UAT on the deployed domain, keyboard/screen-reader checks, automated accessibility scans, performance checks, security-header verification, sitemap inspection, and a real enquiry delivery test after the channel exists.

## Deliberate exclusions

- No analytics or third-party tracker until separately approved.
- No connection to VSGH internal systems.
- No public Sanity Studio route.
- No fake activity feed, visitor counters, fabricated vacancies, or unapproved engineering data.
