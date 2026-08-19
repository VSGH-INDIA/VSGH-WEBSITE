# VSGH Sanity production configuration

**Document:** VSGH-SANITY-PRODUCTION-CONFIGURATION-001  
**Task:** TASK-016  
**Date:** 2026-08-19  
**Scope:** Public-content CMS administration, RBAC/MFA expectations, secure preview, webhook, Vercel env  
**Does not apply:** VSGH internal systems, bulk content migration, `/admin` on www.vsgh.com

Status labels used below: **VERIFIED** (repository or CLI evidence), **CONFIGURED** (code present), **MANUAL ACTION REQUIRED**, **NOT IMPLEMENTED**, **BLOCKED**.

This document does not contain secret values.

## Verification snapshot (this environment)

| Check                     | Status                           | Evidence                                                         |
| ------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| Sanity CLI login          | **BLOCKED**                      | `npx sanity debug`: User not logged in; projectId `unconfigured` |
| Vercel CLI login          | **BLOCKED**                      | `npx vercel whoami`: Logged out                                  |
| Cloudflare                | **NOT IMPLEMENTED** in this task | No Cloudflare API used                                           |
| Production CMS READY gate | **NOT IMPLEMENTED**              | External items below remain unverified                           |

Repository-side preview, publication filters, RBAC helpers, webhook endpoint, and env _names_ are **CONFIGURED**.

## 1. Architecture (CONFIGURED)

```text
Sanity identity + MFA (Sanity-hosted)
  → Studio (localhost:3333 or sanity.studio host — not www.vsgh.com)
  → Content Lake datasets (public website copy only)
  → Next.js
       published perspective, no token, lifecycle == published
       previewDrafts + Viewer token, only when Next draft mode is on
  → Vercel → Cloudflare DNS → www.vsgh.com
```

No second CMS. No custom auth database. No COSMOS/PLM/LIMS/ERP/MES/QMS/HRIS connectors.

## 2. Project and datasets

**MANUAL ACTION REQUIRED.** No live Sanity project id is in this checkout (`unconfigured` / empty `NEXT_PUBLIC_SANITY_PROJECT_ID`).

Recommended (do not destroy an existing single dataset):

| Environment    | Dataset       | Next/Vercel    |
| -------------- | ------------- | -------------- |
| Local          | `development` | `.env.local`   |
| Vercel Preview | `staging`     | Preview env    |
| Production     | `production`  | Production env |

If only `production` exists today: keep using it; create `development` and `staging` when the project is available; copy **public** documents only. Never migrate private corporate or engineering data.

Production dataset contents: public website documents of types listed in TASK-014 only.

## 3. Studio

**CONFIGURED** in repo: `sanity.config.ts`, `npm run studio` port 3333, `studioHost: undefined` (no public Next `/admin`).

**MANUAL ACTION REQUIRED:** Deploy Studio with `npx sanity deploy` after login, or use Sanity-hosted Studio on a private host. Intended URL shape: `https://<studioHost>.sanity.studio/` — not `https://www.vsgh.com/admin`.

Vision remains a Studio plugin (authenticated editors). Restrict via Sanity roles if the plan allows.

## 4. Administrator invitation

**MANUAL ACTION REQUIRED.** Do not guess emails.

1. https://www.sanity.io/manage → VSGH project → Members
2. Invite the designated website Super Admin (Sanity identity: Google/GitHub/email as provided by Sanity)
3. Role: Administrator (maps to Super Admin until custom roles exist)
4. The invitee completes Sanity signup; credentials stay in Sanity — never Git

This account administers **public website content only**. It is not an internal-systems account.

## 5. MFA

**MANUAL ACTION REQUIRED / PENDING** until verified in the Sanity org.

Use Sanity-managed MFA (account security / SSO). Do not implement custom MFA.

- Require MFA for all human members (org policy if available; otherwise instruct each user).
- Recovery: Sanity account recovery only. **Never store recovery codes in this repository.**
- After the first Super Admin enables MFA, mark this item VERIFIED in a later controlled record.

## 6. RBAC

**CONFIGURED** in Studio validation (`src/sanity/rbac.ts`): lifecycle `published` may be set only by Sanity `administrator` or custom ids `vsgh-publisher` / `vsgh-super-admin`.

**MANUAL ACTION REQUIRED** in manage.sanity.io (Growth custom roles if licensed):

| VSGH role            | Suggested Sanity role id                   | Intent                                              |
| -------------------- | ------------------------------------------ | --------------------------------------------------- |
| Super Admin          | `vsgh-super-admin` or native Administrator | Project, members, datasets                          |
| Editor               | `vsgh-editor` or native Editor             | Create/edit drafts; lifecycle draft/review/approved |
| Technical Reviewer   | `vsgh-technical-reviewer`                  | Review technical/public claims                      |
| IP/Security Reviewer | `vsgh-ip-reviewer`                         | Review disclosures                                  |
| Publisher            | `vsgh-publisher`                           | Set lifecycle published + Sanity publish            |

Closest least-privilege **without** custom roles: only Administrator sets `lifecycle` to Published (Studio validation). Native Editor can still Sanity-publish a document whose lifecycle is Draft — the **public site will not overlay it** (server GROQ). Technical vs IP reviewer distinction is then operational (two people, review queue in Studio).

Do not grant every user Administrator.

All roles: public website content only.

## 7. Publishing workflow

**CONFIGURED** as document field `lifecycle`: Draft → Review → Approved → Published → Archived.

Studio **Review queue** lists `review` and `approved` documents.

**NOT IMPLEMENTED:** Sanity Content Releases / custom workflow backend. Growth features stay in the Sanity project UI if licensed.

Sensitive path (operational): Editor → Technical review → IP/Security review → Approved → Publisher sets Published → Sanity publish.

Public retrieval **VERIFIED in code**: `lifecycle == "published"` plus `published` perspective. Not UI-only.

## 8. Preview

**CONFIGURED** in the Next.js app.

Flow: editor opens preview → `GET` or `POST` `/api/draft` with secret → Next.js draft mode cookie → `previewDrafts` GROQ (uncached) → overlay on `src/content` fallback → banner “Preview — not public”.

- Secret ≥ 32 characters; hashed compare.
- Preferred: header `x-vsgh-preview-secret` or `Authorization: Bearer` (`POST` JSON `{ "path": "/contact" }`).
- `GET ?secret=` remains for Studio “Open preview”; **limitation:** secret may appear in Referer/logs. Redirect target does **not** include the secret.
- Path allowlist + same-origin redirect.
- Draft client uses `SANITY_API_READ_TOKEN` (Viewer). Published client still has **no** token.
- If the token is unset, draft mode still enables but preview GROQ is skipped (fallback/published only).
- Exit: `GET /api/draft/disable` always redirects to `/` on the request origin (query `next=` ignored).
- Indexing: site-wide noindex + `X-Robots-Tag` on preview responses and the Next.js proxy when `__prerender_bypass` is present.
- Cookies: Next.js `draftMode().enable()` sets `__prerender_bypass` (framework HttpOnly bypass cookie). Not reimplemented.

**MANUAL ACTION REQUIRED:** set `SANITY_PREVIEW_SECRET` and Viewer `SANITY_API_READ_TOKEN` in Vercel; optionally `SANITY_STUDIO_PREVIEW_ORIGIN` + `SANITY_STUDIO_PREVIEW_SECRET` for Studio productionUrl.

## 9. Webhook / revalidation

**CONFIGURED** endpoint: existing `POST /api/revalidate` (GET 405). Do not add a second route.

**MANUAL ACTION REQUIRED** in Sanity → API → Webhooks:

- URL: `https://www.vsgh.com/api/revalidate` (and Preview deployment URL if used)
- HTTP method: POST
- HTTP header: `x-vsgh-revalidate-secret` = Vercel `SANITY_REVALIDATE_SECRET` (value only in secret stores)
- Trigger: create/update/delete on public types, including publish
- Projection: optional `{ "path": path }` when the document has `path`; omit `path` for tag-only revalidation
- Filter: `_type in ["homepage","aboutPage","capabilityPage","contactPage","insightArticle","careerVacancy"]`

## 10. Vercel environments

**MANUAL ACTION REQUIRED** (CLI logged out).

| Name                            | Production           | Preview        | Development   | Public?    |
| ------------------------------- | -------------------- | -------------- | ------------- | ---------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes                  | yes            | yes           | yes (id)   |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`         | `staging`      | `development` | yes (name) |
| `SANITY_API_VERSION`            | yes                  | yes            | yes           | no         |
| `SANITY_API_READ_TOKEN`         | Viewer, preview only | Viewer         | Viewer        | **no**     |
| `SANITY_REVALIDATE_SECRET`      | yes                  | yes (distinct) | local         | **no**     |
| `SANITY_PREVIEW_SECRET`         | yes                  | yes (distinct) | local         | **no**     |

Never `NEXT_PUBLIC_SANITY_API_READ_TOKEN`. No write token on Vercel.

## 11. Schema deployment

**CONFIGURED** in repo: homepage, aboutPage, capabilityPage, contactPage, insightArticle, careerVacancy, publicImage, emptyState.

**MANUAL ACTION REQUIRED:** `npx sanity schema deploy` / Studio deploy after the project exists. Not run here (not logged in).

No bulk `src/content` migration in this task. Fallbacks remain.

## 12. Publication and security boundary

| Actor       | Access                                                   |
| ----------- | -------------------------------------------------------- |
| Public site | Read published overlay or static fallback. No CMS write. |
| Editor      | Studio drafts                                            |
| Publisher   | lifecycle published                                      |
| Super Admin | Sanity project admin                                     |
| Next.js     | No mutation token                                        |

Fallback: CMS outage or unconfigured project id → `src/content/*`. **CONFIGURED.**

## 13. Manual configuration checklist

1. Create Sanity project (Growth as approved) — **MANUAL**
2. Datasets `production` (+ `development`/`staging` when ready) — **MANUAL**
3. Invite Super Admin — **MANUAL** (do not guess identity)
4. Enable MFA — **MANUAL / PENDING**
5. Custom roles or Administrator-only Published — **MANUAL**
6. `sanity schema deploy` / Studio deploy — **MANUAL**
7. Webhook to `/api/revalidate` — **MANUAL**
8. Vercel env vars as table above — **MANUAL**
9. Studio host not on www.vsgh.com — **MANUAL**
10. Preview token + secrets; smoke-test draft vs public — **MANUAL** after 8–9

## 14. Remaining blockers

- No authenticated Sanity or Vercel session in this agent environment.
- Production CMS cannot be marked READY.
- Preview of unpublished Sanity drafts needs a Viewer token in the host env.
- GET preview secret-in-URL limitation until Studio uses header/POST only.
- Custom reviewer roles depend on Sanity plan.
