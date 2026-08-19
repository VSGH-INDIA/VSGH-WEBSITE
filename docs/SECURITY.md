# Security

## Baseline

- VSGH-CURSOR-007, WEB-006, WEB-032, WEB-051
- No secrets in source, prompts, or screenshots
- Separate credentials per environment
- Production secrets in Vercel / provider secret stores

## Headers

`src/lib/security-headers.ts` (applied in `next.config.ts`) sets CSP (`frame-ancestors 'none'`), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP, `X-Robots-Tag`, and production-only HSTS. Details: [public website security hardening](security/VSGH-PUBLIC-WEBSITE-SECURITY-HARDENING-001.md).

## Analytics

Unapproved analytics/tracking is prohibited (VSGH-CURSOR-003). WEB-014 and WEB-036 list analytics as a requirement/candidate but do not select a vendor. None is installed.

## Known dependency findings (bootstrap)

`npm audit` on Next.js 16.2.12 currently reports high issues via `postcss` and `sharp` (transitive). They are inside the approved framework line. Do not jump to Next 16.3 without a WP03 deviation. Track and re-audit on each dependency update.

## Internal systems

Do not connect this application to PLM, LIMS, ERP, QMS, COSMOS, HRIS, MES, or engineering repositories.

Sanity is limited to publicly publishable website content. The Next.js app holds no Sanity write token. Studio is not served from the public route tree.
