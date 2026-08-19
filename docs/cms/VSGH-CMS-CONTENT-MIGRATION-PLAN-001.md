# VSGH CMS content migration plan

**Document:** VSGH-CMS-CONTENT-MIGRATION-PLAN-001  
**Task:** TASK-017  
**Status:** Plan only — **DO NOT execute bulk migration** until the bulk migration gate in VSGH-CMS-PILOT-VERIFICATION-001 is VERIFIED.

Sanity holds **public website content only**. Never migrate COSMOS, PLM, LIMS, ERP, MES, QMS, HRIS, engineering, laboratory, manufacturing, restricted IP, or private documents.

Presentation (CSS, tokens, layout, components) stays in Next.js. CMS fields are copy, structured text, public media metadata, SEO strings, and lifecycle.

## Common pipeline (every document)

```text
src/content/*.ts  →  Studio document (schema)  →  lifecycle Draft
  → authenticated preview (/api/draft)
  → Review → Approved
  → Publisher sets lifecycle = published + Sanity publish
  → webhook POST /api/revalidate (header secret, optional { "path" })
  → public resolver overlay  →  existing page view
```

Rollback: set lifecycle to `archived` or unpublish in Sanity, then webhook tag `sanity` (and path if present). Next.js falls back to `src/content` when the published overlay is missing. Sanity document history is the revision log — no custom database.

Validation: Studio field rules + server GROQ `lifecycle == "published"` + URL sanitization (`isSafeHref`). Fallback remains if Sanity is unconfigured or fetch throws (errors swallowed).

## Domain mapping (future — not executed here)

| Source                                        | Schema                             | Resolver                                                         | View                                      | Notes                                                 |
| --------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| `src/content/insights.ts` + `insightArticles` | `insightArticle`                   | `resolveInsightArticles` + `resolveCapabilityPage(insightsPage)` | `/insights` (`CapabilityPageView` + list) | **Pilot domain (TASK-017)**                           |
| `src/content/home.ts`                         | `homepage`                         | `resolveHomepage` (not wired to UI)                              | `/`                                       | **Do not migrate in 017**                             |
| `src/content/about.ts`                        | `aboutPage`                        | `resolveAboutPage`                                               | `/about/*`                                | One document per WEB-081 child `path`                 |
| `src/content/materials.ts` etc.               | `capabilityPage`                   | `resolveCapabilityPage`                                          | capability routes                         | `path` must match `IMPLEMENTED_ROUTES`                |
| `src/content/sustainability.ts`               | `capabilityPage`                   | same                                                             | `/sustainability`                         |                                                       |
| `src/content/careers.ts`                      | `capabilityPage` + `careerVacancy` | page + `fetchPublishedCareerVacancies` (UI list not rendered)    | `/careers`                                | No fake vacancies; no applicant collection            |
| `src/content/contact.ts`                      | `contactPage`                      | `resolveContactPage`                                             | `/contact`                                | Copy only. **No form backend, CRM, email, PII store** |

## Field mapping (typical capability/about)

| Source                        | Sanity                          | Notes                              |
| ----------------------------- | ------------------------------- | ---------------------------------- |
| `seoTitle`, `description`     | `seoTitle`, `description`       | Also OG overrides if set           |
| `eyebrow`, `headline`, `lede` | same                            |                                    |
| `sections[]`                  | `sections[]{title,body}`        | Structured text, not HTML          |
| `cta.*` + hrefs               | `primaryHref` / `secondaryHref` | Internal paths only; sanitized     |
| `related[]`                   | `relatedLink`                   | Unsafe hrefs dropped               |
| `emptyState`                  | `emptyState`                    |                                    |
| Media                         | `publicImage` + `mediaLabel`    | Public assets only; no executables |

## Insights article mapping (pilot)

| Source / intent | Field                                    |
| --------------- | ---------------------------------------- |
| Title           | `title`                                  |
| Slug            | `slug.current`                           |
| Category        | `category`                               |
| Summary         | `summary`                                |
| Date            | `publicationDate` (real dates only)      |
| Author          | `author` (approved public name or empty) |
| Body            | `body[]{title,body}`                     |
| SEO             | `seoTitle`, `description`                |
| Lifecycle       | `lifecycle`                              |

No nested `/insights/[slug]` routes in WEB-081 V1; articles render on `/insights`.

## SEO

CMS `seoTitle` / `description` overlay page metadata. Canonical remains the implemented path. **Global noindex stays on.** Preview forces noindex. Do not enable production indexing in this plan.

## Review / approval

Editor drafts → Technical / IP review (roles when configured) → Approved → Publisher sets Published → Sanity publish. Custom RBAC is Sanity-project configuration (see TASK-016).

## Performance

Keep App Router server components, `unstable_cache` + tag `sanity` for published reads, uncached `previewDrafts` only in draft mode. Do not convert the site to a client-rendered app.
