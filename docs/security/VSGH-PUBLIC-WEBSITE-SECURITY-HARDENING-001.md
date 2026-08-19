# VSGH public website security hardening

**Document:** VSGH-PUBLIC-WEBSITE-SECURITY-HARDENING-001  
**Task:** TASK-015  
**Date:** 2026-08-19  
**Scope:** Public Next.js website and public-content CMS boundary  
**Does not apply:** VSGH internal systems (COSMOS, PLM, LIMS, ERP, MES, QMS, HRIS, IP, engineering/lab/manufacturing databases)

No secrets are recorded in this file.

## 1. Threat model

The public site is a mostly static Next.js App Router application. Attackers can request published pages, hit three API routes, and (when a Sanity project is configured) influence cache via an authenticated webhook. CMS editors can change public copy, internal paths, and public media metadata.

In-scope assets: published HTML, public Sanity documents, ISR cache, preview cookies, webhook secret, optional read token, Vercel/Cloudflare edge.

Out of scope: Studio identity (Sanity-hosted), registrar/DNS accounts, internal corporate systems (none are connected).

Assumptions: Hostinger registrar → Cloudflare DNS → Vercel; HTTPS at the edge; production indexing remains disabled; Contact has no backend.

## 2. Attack surface

| Surface                  | Notes                                                                        |
| ------------------------ | ---------------------------------------------------------------------------- |
| Informational routes     | WEB-081 pages; static fallbacks; CMS overlay when `lifecycle == "published"` |
| `POST /api/revalidate`   | Cache invalidation; secret header                                            |
| `GET /api/draft`         | Enables Next.js draft mode; query secret                                     |
| `GET /api/draft/disable` | Clears draft mode; redirects to `/`                                          |
| Sanity CDN images        | `https://cdn.sanity.io` only, when used                                      |
| Sanity Studio            | Separate process (`npm run studio`); **not** in the Next.js route tree       |
| Contact form             | Disabled fieldset; no `action`; no API                                       |

No generic URL proxy. No write/mutate Sanity client. No `/admin`. No analytics scripts in application source.

## 3. Findings

### P0 Critical

None identified in source. `.env` files are gitignored (`.env.example` tracked, names only). No committed private keys or token values found. No unexpected internal-system integrations.

### P1 High

| ID   | Issue                                                                                                                                     | Disposition                                                                                                         |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| P1-1 | CMS CTA/related `href` overlay could reach `Link` without rejecting `javascript:`, `data:`, or `//` paths. Studio regex allowed `//host`. | **Fixed:** `isSafeInternalPath` / `isSafeHref`, overlay sanitization, Studio custom validation, render-time filter. |
| P1-2 | Revalidation treated invalid JSON/path as homepage purge (`revalidatePath("/")`).                                                         | **Fixed:** allowlisted `path` only; unknown/missing `path` is tag-only; invalid `path` → 400.                       |
| P1-3 | Draft redirect used `new URL(path, origin)` after a weaker allowlist.                                                                     | **Fixed:** same path allowlist plus origin check.                                                                   |

### P2 Medium

| ID   | Issue                                                                                                              | Disposition                                                                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2-1 | Published Sanity client attached `SANITY_API_READ_TOKEN` when set, exceeding least privilege for a public dataset. | **Fixed:** published client uses CDN + `published` perspective with **no** token. Token remains only on the unused `previewDrafts` client.                                                                          |
| P2-2 | Secret compare returned early on length mismatch.                                                                  | **Fixed:** SHA-256 then `timingSafeEqual`. Secrets shorter than 32 characters are treated as unconfigured (501).                                                                                                    |
| P2-3 | Security headers lacked CSP, HSTS (production), COOP/CORP, and `X-Robots-Tag`.                                     | **Fixed** with policies compatible with Next.js inline runtime, self-hosted fonts, and Sanity image CDN. `'unsafe-eval'` is not used. `'unsafe-inline'` remains for Next.js scripts/styles (nonce CSP not adopted). |
| P2-4 | Revalidate accepted GET with no handler (framework 405 varies).                                                    | **Fixed:** explicit GET 405 JSON. Body size cap 64 KiB.                                                                                                                                                             |

### P3 Low

| ID   | Issue                                                                                            | Disposition                                                                                        |
| ---- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| P3-1 | Preview secret in query string may appear in Referer or access logs.                             | Documented; do not log the query. Prefer header-based preview later if Studio hosting requires it. |
| P3-2 | Draft GROQ is not wired. Enabling draft mode does not currently fetch drafts.                    | Intentional (TASK-014). Do not invent draft queries.                                               |
| P3-3 | Transitive `npm audit` highs in Next (`postcss`, `sharp`) and Sanity Studio (`adm-zip`, `uuid`). | Not upgraded: would force Next 16.3 or Sanity 6, outside WP03 pin. Re-audit on approved upgrades.  |

## 4. Fixes applied

- Safe URL helpers and CMS overlay sanitization (known fallback keys only; no `_`-prefixed Sanity metadata overlay).
- Published Sanity client without a token.
- Revalidate/draft/disable hardening.
- Security headers module used by `next.config.ts`.
- `productionBrowserSourceMaps: false`; `images.dangerouslyAllowSVG: false`.
- Focused tests for headers, URLs, webhook parse, overlay, GROQ lifecycle, secret naming.

## 5. Security headers

Applied to `/:path*`:

| Header                       | Value (summary)                                                                                                                                                                                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Security-Policy      | `default-src 'self'`; `frame-ancestors 'none'`; `object-src 'none'`; `script-src`/`style-src` `'self' 'unsafe-inline'`; `img-src` self + data/blob + `https://cdn.sanity.io`; `font-src 'self'`; `connect-src 'self'`; `form-action 'self'`; `base-uri 'self'`; `upgrade-insecure-requests` in Vercel production |
| X-Frame-Options              | DENY                                                                                                                                                                                                                                                                                                             |
| X-Content-Type-Options       | nosniff                                                                                                                                                                                                                                                                                                          |
| Referrer-Policy              | strict-origin-when-cross-origin                                                                                                                                                                                                                                                                                  |
| Permissions-Policy           | camera, microphone, geolocation, payment, usb, interest-cohort disabled                                                                                                                                                                                                                                          |
| Cross-Origin-Opener-Policy   | same-origin                                                                                                                                                                                                                                                                                                      |
| Cross-Origin-Resource-Policy | same-origin                                                                                                                                                                                                                                                                                                      |
| X-DNS-Prefetch-Control       | off                                                                                                                                                                                                                                                                                                              |
| X-Robots-Tag                 | noindex, nofollow, noarchive (indexing not approved)                                                                                                                                                                                                                                                             |
| Strict-Transport-Security    | 2 years + includeSubDomains **only** when `VERCEL_ENV === production`                                                                                                                                                                                                                                            |
| X-Powered-By                 | disabled                                                                                                                                                                                                                                                                                                         |

HSTS is not set in local or Vercel preview. Certificate management stays at Cloudflare/Vercel, not in Next.js.

## 6. CMS security

- Public app: **read published content only**. No mutation token, no Studio credentials, no dataset-admin APIs.
- Intended production: **public dataset** so published queries need no token. If a dataset is private, `SANITY_API_READ_TOKEN` must be Viewer/read-only, server-only, ≥32 characters; it is still not used for published fetches in this codebase.
- GROQ always includes `lifecycle == "published"` (and vacancies `vacancyStatus == "open"`). Query `path` parameters are restricted to implemented routes.
- Media schema is `publicImage` (publication-safe). Sanity media is public; do not store restricted documents there.
- Structured text fields, not raw HTML. JSON-LD is `JSON.stringify` with `<` escaped.
- Studio hosting: local `npm run studio` or a **separate** Sanity-hosted Studio with SSO/MFA. Do not mount Studio on www.vsgh.com.

### Recommended Sanity project settings (manual — not changed by this task)

- Dataset `production`: public (or authenticated read only if explicitly required).
- Separate `development` dataset.
- No write tokens issued to Vercel.
- Revalidate token: HTTP header secret, not a Sanity write token.
- Roles: Super Admin, Editor, Technical Reviewer, IP/Security Reviewer, Publisher — **enforced in the Sanity project**, not in Next.js.
- MFA / SSO for all human members.
- History/revisions remain on (Sanity default).
- Webhook: POST to `/api/revalidate`, header `x-vsgh-revalidate-secret`, trigger on publish of public types only. Projection optional; extra JSON keys are ignored. Do not send secrets in query strings.

RBAC is not implemented as custom authentication in this repository.

## 7. Preview security

- `SANITY_PREVIEW_SECRET` required (≥32 chars) or 501.
- Constant-time compare (hashed).
- Path must be an implemented WEB-081 route and a safe internal path.
- Redirect stays on the request origin.
- Next.js draft cookies are framework-managed (HttpOnly bypass cookie). Site-wide robots and `X-Robots-Tag` remain noindex.
- Draft **content** is not fetched yet; ordinary users without the cookie still see published/fallback copy.

## 8. Revalidation security

- POST only (GET 405).
- Header `x-vsgh-revalidate-secret` compared with `SANITY_REVALIDATE_SECRET`.
- CSRF: secret is not a cookie; a cross-site POST without the header fails. Appropriate for a machine webhook.
- `path` if present must be allowlisted; otherwise tag `sanity` only. No arbitrary tags, no arbitrary URLs.
- Errors return `{ ok: false }` with 400/401/413/501 — no stack traces or secret echo.
- Rate limiting: **not** in application code. Configure Cloudflare WAF / rate limit on `/api/revalidate` and `/api/draft*` in production (manual).

## 9. Environment and secrets

| Name                            | Public?        | Use                                        |
| ------------------------------- | -------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | Yes            | Origin for local/canonical helpers         |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes            | Project id (not a secret)                  |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes            | Dataset name                               |
| `SANITY_API_VERSION`            | Server         | API date                                   |
| `SANITY_STUDIO_PROJECT_ID`      | Studio process | Studio config                              |
| `SANITY_API_READ_TOKEN`         | **Secret**     | Unused published path; preview client only |
| `SANITY_REVALIDATE_SECRET`      | **Secret**     | Webhook                                    |
| `SANITY_PREVIEW_SECRET`         | **Secret**     | Draft enable                               |

Never `NEXT_PUBLIC_` for the three secrets. Never hard-code values. Store production values in Vercel env, not git.

## 10. Dependencies

`npm audit --omit=dev` (2026-08-19): highs in transitive Next `postcss`/`sharp` and Studio `adm-zip`/`uuid`. Fixes advertised by `npm audit fix --force` jump to Next 16.3.1 or Sanity 6 — **not applied**. Track on the next approved stack bump.

Sentry appears as a Studio transitive package, not as site analytics.

## 11. URL and content security

- Internal paths only for CMS hrefs.
- External `https:` links are not a current schema feature; if added later they must be explicit, `rel="noopener noreferrer"`, and protocol-allowlisted.
- No SSRF: Sanity client uses configured project/dataset only; fetch `path` params are allowlisted.
- Contact remains backend-free (no mail, CRM, or PII store).

## 12. Manual infrastructure configuration required

These are **not** claimed active unless operators configure them:

1. Cloudflare: DNS only as designed; TLS; optional WAF/bot fight on `/api/*`; apex → www.
2. Vercel: Production vs Preview env separation; Deployment Protection for previews; secrets in Production/Preview env groups; no Studio on the public project routes.
3. Sanity: dataset visibility, tokens, members, MFA, webhook as above.
4. Confirm HTTPS end-to-end before relying on HSTS (header is production-only).
5. Rotate any secret if it was ever pasted into chat, tickets, or screenshots.

## 13. Remaining risks

- `'unsafe-inline'` CSP (Next.js App Router default constraint without nonce plumbing).
- Preview secret in URL query.
- Transitive dependency advisories in pinned Next 16.2.12 / Sanity 4.
- Public CMS media is public by design (editor trust + review roles).
- No in-app rate limiter (serverless); abuse of a leaked webhook secret could purge ISR until the secret is rotated — Cloudflare should rate-limit.
- Draft GROQ not wired; when it is, it must stay behind draft mode + token and never use the published client.

## 14. Acceptance (TASK-015)

Secrets not in source or client naming; no CMS write credentials; published reads least-privilege; revalidate authenticated and path-allowlisted; preview protected; drafts not in public GROQ; preview not indexable; unsafe URLs rejected; no raw CMS HTML; no SSRF/open-redirect primitives; headers reviewed; HTTPS/HSTS assumptions documented; errors generic; dependencies audited; Contact backend-free; no analytics; no internal systems; public media boundary; admin roles/MFA documented as Sanity-project work; tests and build required at commit.
