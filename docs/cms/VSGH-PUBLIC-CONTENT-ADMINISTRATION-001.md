# VSGH-PUBLIC-CONTENT-ADMINISTRATION-001

**Task:** TASK-014  
**Status:** Foundation implemented — public content only  
**Studio:** separate Sanity Studio (`npm run studio`, port 3333) — **not** mounted at `/admin` or on vsghindia.com

## Architecture

```text
Editors (Sanity Auth)
  → Sanity Studio (localhost:3333 / hosted Studio, not the public site)
  → Sanity Content Lake (public dataset, publication-safe documents)
  → Next.js server fetch (@sanity/client, published perspective)
  → existing page views / design system
  → Vercel
```

`src/content/*` remains the verified fallback. CMS documents overlay a page only when `lifecycle` is `published` and required fields (headline + CTA where applicable) are present.

No PostgreSQL CMS. No Strapi/WordPress/Supabase. No PLM/LIMS/ERP/MES/QMS/HRIS/COSMOS connectors.

## Schemas

| Type             | Role                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `homepage`       | Singleton id `homepage`                                                                      |
| `aboutPage`      | WEB-081 About children                                                                       |
| `capabilityPage` | Materials, Technology, Applications, Research, Sustainability, Insights index, Careers index |
| `contactPage`    | Singleton id `contactPage` — copy only                                                       |
| `insightArticle` | Future articles — none seeded                                                                |
| `careerVacancy`  | Future vacancies — none seeded                                                               |
| `publicImage`    | Publication-safe media + alt                                                                 |
| `emptyState`     | Controlled empty copy                                                                        |

WEB-034 `contactEnquiry` is **not** implemented (would be an enquiry store). Contact form remains disabled and non-submitting.

## Workflow

Document field `lifecycle`: Draft → Review → Approved → Published → Archived.

Public fetch requires **Sanity published perspective** and `lifecycle == "published"`. Draft/review/approved never overlay `src/content`.

Sanity document history/revisions are the audit log. Content Releases / custom workflow backends are not implemented; Growth-plan workflow features (if licensed) are configured in the Sanity project, not in this repository.

## RBAC (intended — configured in Sanity, not in source)

| Role                 | Intent                                        |
| -------------------- | --------------------------------------------- |
| Super admin          | Project settings, members, datasets           |
| Editor               | Create/edit draft public copy                 |
| Technical reviewer   | Review capability/technology language         |
| IP/security reviewer | Reject restricted or claim-unsafe copy        |
| Publisher            | Set lifecycle to published and Sanity-publish |

No accounts or passwords are in git. MFA is enabled on Sanity user accounts / SSO in the Sanity-managed identity flow.

## Authentication

Sanity Studio login only. No custom password table. No tokens in client bundles. Read token (optional, **not** attached to published fetches; public dataset is the intended model) is `SANITY_API_READ_TOKEN` (server). There is **no write token** in the Next.js app. Hardening: [VSGH-PUBLIC-WEBSITE-SECURITY-HARDENING-001](../security/VSGH-PUBLIC-WEBSITE-SECURITY-HARDENING-001.md).

## Next.js integration

Server-only client: `src/sanity/client.ts` (`import "server-only"`). Pages use `resolve*` helpers; unconfigured project id skips the network and keeps static fallbacks. Design-system components unchanged. No Portable Text HTML passthrough — body is titled text blocks.

Homepage UI still reads `src/content/home.ts`. Homepage schema exists; overlay of home section components is deferred so the homepage is not redesigned in this task.

Insights/vacancies lists remain empty in the UI until published CMS records exist **and** a later task renders them. Fetch helpers exist (`fetchPublishedInsightArticles`, `fetchPublishedCareerVacancies`).

## Preview / revalidation

- `POST /api/revalidate` with header `x-vsgh-revalidate-secret` → `revalidateTag("sanity")` and an optional allowlisted `path`. GET is 405. Returns 501 if secret unset/short, 401 if mismatch, 400 if `path` is present but not allowlisted.
- `GET /api/draft?secret=&path=` enables Next.js draft mode and redirects to an implemented path. Draft **content** fetch is not yet wired (pages still resolve published/fallback). Cookie does not change robots (`noindex` remains).
- `GET /api/draft/disable` clears draft mode.
- ISR: 3600s + tag `sanity` when a real project id is configured.

Webhook (Sanity → Vercel) must send the revalidate secret. Not auto-wired without a project.

## Environments

| Env             | Dataset (typical) | Notes                                            |
| --------------- | ----------------- | ------------------------------------------------ |
| development     | `development`     | Local Studio + `.env.local`                      |
| preview/staging | `staging`         | Vercel Preview; remain noindex                   |
| production      | `production`      | vsghindia.com; noindex until launch authorization |

Do not point production at a development dataset.

## Security / IP

- CMS is not an IP repository. Schema descriptions repeat the public-only rule.
- No confidential notes fields, no formulation fields, no customer fields.
- Media is `publicImage` only.
- Revalidate/draft secrets compared with `timingSafeEqual`.
- Global indexing remains disabled in layout/`robots.ts`. SEO fields do not include an editor-controlled index toggle.

## Environment variables

See `.env.example`. Never commit `.env.local`.

## Manual setup still required

1. Create a VSGH Sanity project (Growth) and datasets.
2. Invite members and assign roles; enable MFA/SSO in Sanity.
3. Set Vercel env vars (project id, dataset, read token if needed, revalidate/preview secrets).
4. Host Studio separately (Sanity-hosted or internal URL) — not on the public Next routes.
5. Add a Sanity webhook to `POST https://<preview-or-prod>/api/revalidate`.
6. Optionally migrate `src/content` into Studio after review — not done in this task.

## Known limitations

- No Sanity project is verified in this environment; fetch is a no-op until a project id is configured.
- Homepage sections not CMS-driven in the UI.
- Insight/vacancy cards not rendered (empty by design until real records).
- Growth workflow UI and custom RBAC ids depend on the Sanity plan / manage UI.
- `contactEnquiry` entity remains unimplemented on purpose.
- MFA, member invites, webhooks, and Vercel secrets: [VSGH-SANITY-PRODUCTION-CONFIGURATION-001](VSGH-SANITY-PRODUCTION-CONFIGURATION-001.md).
