# CMS

Approved CMS: Sanity Growth (WEB-043).

Administration surface: **Sanity Studio** (`npm run studio`, port 3333). It is not a public vsghindia.com route and is not mounted at `/admin`.

```text
VSGH content team → Sanity Studio (admin, not public)
  → Sanity Content Lake
  → Next.js server fetch (published + lifecycle=published)
  → vsghindia.com
```

The CMS may hold only approved public information. It is not PLM, LIMS, QMS, COSMOS, HRIS, or an IP repository. Controlled singletons include Home, Business, Contact, and Site settings. The Business overview and its three fixed-route landing documents are limited to Aerospace Systems & Components, Imports & Exports, and Global Programmes.

Schemas, fetch fallbacks, revalidation, and RBAC intent: [VSGH-PUBLIC-CONTENT-ADMINISTRATION-001](cms/VSGH-PUBLIC-CONTENT-ADMINISTRATION-001.md). Production admin, preview, webhook, and manual account steps: [VSGH-SANITY-PRODUCTION-CONFIGURATION-001](cms/VSGH-SANITY-PRODUCTION-CONFIGURATION-001.md). Insights pilot and bulk-migration gate: [VSGH-CMS-PILOT-VERIFICATION-001](cms/VSGH-CMS-PILOT-VERIFICATION-001.md).

WEB-034 names: `src/sanity/entities.ts`. `src/content/*` remains the runtime fallback until a VSGH project is configured and documents are published.

Environment variable names are in `.env.example`. Published fetches do not use a read token. No write tokens in the Next.js app.

Use the [editor guide](CMS-EDITOR-GUIDE.md) for the publish sequence, [architecture](CMS-ARCHITECTURE.md) for preview/cache boundaries, and [migration plan](CMS-MIGRATION.md) for controlled rollout and rollback.
