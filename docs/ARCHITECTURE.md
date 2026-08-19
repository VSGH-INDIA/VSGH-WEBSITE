# Architecture

Approved V1 path (WEB-047 / WEB-048 / WEB-060):

```text
Hostinger registrar (vsgh.com)
  → Cloudflare DNS
  → Vercel Edge
  → Next.js App Router
  → Sanity Content Lake (public content only)
```

Canonical URL: `https://www.vsgh.com`. Apex shall redirect to www.

The public site is isolated from VSGH internal systems. No V1 PostgreSQL database; Sanity is the content store. PostgreSQL is reserved for future transactional work.

## Repository layout

```text
src/app/          App Router (server components by default)
src/styles/       Design tokens — PROVISIONAL — NOT FINAL VSGH BRAND TOKENS
src/lib/          Shared typed utilities
src/sanity/       CMS entity names only (WEB-034); no live client
docs/             Index, hierarchy, conflicts, decision records
docs/library/     Versioned copies of library files changed in VSGH-CURSOR-TASK-001
.github/          CI quality gates
```

V1 public sitemap: **WEB-081**. Implemented: `/`, About children, Materials children, Technology children, Applications children, Research children, `/sustainability`, `/insights`, `/careers`, `/contact`. Parent indexes for nested folders are not built.

## Not in this bootstrap

- Nested Insights children (not frozen in WEB-081)
- Sanity Studio as a public route
- Analytics (NOT APPROVED / NOT IMPLEMENTED)
- Contact form backend (email TBD / not selected)
