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

## Dependency posture

Next.js is pinned to 16.3.8 after the former 16.2.12 line reported a critical advisory. Sanity Studio and Vision are development-only packages; the public runtime uses `@sanity/client` only. `npm audit --omit=dev --audit-level=critical` currently reports no production vulnerabilities. Re-run it for every dependency update and investigate any production dependency finding before release. Do not use a forced audit upgrade without compatibility testing.

The development CSP includes `unsafe-eval` only while `NODE_ENV=development`, as required by React's debugging tooling. Production and preview CSPs do not include it.

## Internal systems

Do not connect this application to PLM, LIMS, ERP, QMS, COSMOS, HRIS, MES, or engineering repositories.

Sanity is limited to publicly publishable website content. The Next.js app holds no Sanity write token. Studio is not served from the public route tree.
