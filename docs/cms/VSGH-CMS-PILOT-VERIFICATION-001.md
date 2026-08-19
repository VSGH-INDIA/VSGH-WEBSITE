# VSGH CMS Insights pilot verification

**Document:** VSGH-CMS-PILOT-VERIFICATION-001  
**Task:** TASK-017  
**Date:** 2026-08-19  
**Pilot domain:** `/insights` only  
**Live accounts this session:** Sanity CLI **not logged in**; Vercel CLI **logged out**; project id `unconfigured`.

Labels: **VERIFIED** | **CONFIGURED** | **MANUAL ACTION REQUIRED** | **FAILED** | **NOT TESTED** | **BLOCKED**.

No secrets are recorded here. No bulk migration was performed.

## CMS connection

**BLOCKED.** No authenticated Sanity project. Repository fetch remains a no-op until `NEXT_PUBLIC_SANITY_PROJECT_ID` matches `[a-z0-9]{8}`.

Published reads: still **no** API token (TASK-015). Viewer `SANITY_API_READ_TOKEN` is required only for draft preview.

## Pilot schema

**CONFIGURED / VERIFIED in repo:** existing `insightArticle` (title, slug, summary, structured body, category, publicationDate, media, SEO, lifecycle). No duplicate schema. No schema change required for the pilot.

## Pilot content

**NOT TESTED / MANUAL ACTION REQUIRED.** Do not invent customers, certifications, or results.

After a project exists, create **one** Studio document, then unpublish/delete it after the smoke test unless approved as real public copy:

- `_type`: `insightArticle`
- `title`: `CMS pipeline test — not a public article`
- `slug.current`: `cms-pipeline-test`
- `category`: `Announcement`
- `summary`: `Temporary VSGH public-content pipeline record. Not a technical result, customer story, or certification.`
- `body[0].body`: `This record exists only to prove Draft → Preview → Review → Approved → Published → webhook → /insights. It contains no proprietary data.`
- `lifecycle`: start `draft`; only Publisher/Admin may set `published`
- `seoTitle` / `description`: same non-claim language
- Media: omit, or a harmless public test image (not VSGH proprietary files)

## Preview

**CONFIGURED** in code (TASK-016): `/api/draft` secret ≥32, header preferred, allowlisted path `/insights`, same-origin redirect, uncached preview GROQ, noindex, exit `/api/draft/disable`.

**NOT TESTED** live (no preview secret / project). Unit tests cover invalid secret, path allowlist, publication filter.

## Review / approval

**CONFIGURED** as `lifecycle` field + Studio review queue. Custom roles **NOT TESTED** (Sanity members/MFA **MANUAL ACTION REQUIRED**, TASK-016).

## Publish / public `/insights`

**CONFIGURED:** `resolveInsightArticles` → published GROQ `lifecycle == "published"` → list on `/insights`. Empty `src/content` list + emptyState when none.

**NOT TESTED** against a live published document.

## Webhook / revalidation

**CONFIGURED:** existing `POST /api/revalidate`. For this pilot, payload `{ "path": "/insights" }` plus tag `sanity`.

**NOT TESTED** live (no webhook, Vercel logged out).

## Cache A→B

**NOT TESTED** (requires live publish + webhook).

## Unpublish / rollback

**CONFIGURED** in design: unpublished/non-published documents fail the public filter; emptyState returns. Sanity history is the rollback mechanism.

**NOT TESTED** live.

## Fallback

**VERIFIED in code:** unconfigured project / fetch catch → `[]` articles → emptyState. Static `insightArticles` remains `[]`. Errors are not surfaced to the page.

## SEO

**CONFIGURED:** page metadata from insights chrome; `robots` noindex globally and on preview. Canonical `/insights`. Article SEO fields stored but nested `/insights/[slug]` is not in WEB-081 V1.

## Security regression (repo)

**VERIFIED in code/tests:** no published-read token; no `NEXT_PUBLIC_` secrets; draft rows dropped by published normalizer; unsafe slugs dropped; structured text only; no contact backend; no internal systems.

## Performance

**CONFIGURED:** server components; published list uses tagged `unstable_cache`; preview uncached. Informational routes remain static at build when Sanity is unconfigured.

## Tests (this task)

`npm run lint`, `typecheck`, `test`, `build` — run at commit.

## Bulk migration gate

| Item                          | Status                     |
| ----------------------------- | -------------------------- |
| Sanity production connection  | **BLOCKED**                |
| Admin authentication          | **BLOCKED**                |
| MFA                           | **MANUAL ACTION REQUIRED** |
| Required RBAC                 | **MANUAL ACTION REQUIRED** |
| Draft preview (live)          | **NOT TESTED**             |
| Published-only public fetch   | **VERIFIED** (code/tests)  |
| Review/approval (live)        | **NOT TESTED**             |
| Publishing (live `/insights`) | **NOT TESTED**             |
| Webhook                       | **NOT TESTED**             |
| Revalidation                  | **NOT TESTED**             |
| Rollback/unpublish            | **NOT TESTED**             |
| Static fallback               | **VERIFIED** (code/tests)  |
| Security checks               | **VERIFIED** (repo)        |
| Public smoke test             | **BLOCKED**                |

**BULK MIGRATION = NOT AUTHORIZED.**

## Manual actions required

1. `sanity login` / create project; set `NEXT_PUBLIC_SANITY_PROJECT_ID` and dataset.
2. Invite Super Admin; enable MFA.
3. Vercel env: project id, dataset, `SANITY_PREVIEW_SECRET`, `SANITY_REVALIDATE_SECRET`, Viewer token for preview only.
4. Webhook → `POST /api/revalidate` with header secret.
5. Create the pipeline-test `insightArticle`; walk TEST 1–12 in TASK-017; then unpublish/delete the test record.
6. Repeat cache A→B and unpublish on `/insights` before opening any other domain.

## Blockers

No Sanity or Vercel session in this environment. Live end-to-end smoke tests cannot run. Production CMS connectivity is **not** claimed.
