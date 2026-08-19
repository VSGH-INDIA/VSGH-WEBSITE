# CMS

Approved CMS: Sanity Growth (WEB-043).

Administration surface: **Sanity Studio** (`npm run studio`, port 3333). It is not a public www.vsgh.com route and is not mounted at `/admin`.

```text
VSGH content team → Sanity Studio (admin, not public)
  → Sanity Content Lake
  → Next.js server fetch (published + lifecycle=published)
  → www.vsgh.com
```

The CMS may hold only approved public information. It is not PLM, LIMS, QMS, COSMOS, HRIS, or an IP repository.

Schemas, fetch fallbacks, revalidation, and RBAC intent: [VSGH-PUBLIC-CONTENT-ADMINISTRATION-001](cms/VSGH-PUBLIC-CONTENT-ADMINISTRATION-001.md).

WEB-034 names: `src/sanity/entities.ts`. `src/content/*` remains the runtime fallback until a VSGH project is configured and documents are published.

Environment variable names are in `.env.example`. Read tokens stay server-side. No write tokens in the Next.js app.
