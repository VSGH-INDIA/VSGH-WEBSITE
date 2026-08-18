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
src/styles/       Design tokens (provisional until WP04 approval)
src/lib/          Shared typed utilities
src/sanity/       CMS entity contract (WEB-034), no live client yet
docs/             Setup, security, CMS, deployment, conflicts
.github/          CI quality gates
```

## Not in this bootstrap

- Full sitemap routes (blocked by IA conflict; see CONFLICTS.md)
- Sanity Studio as a public route
- Analytics
- Contact form backend (corporate email architecture is TBD in WEB-058)
- High-fidelity UI (WEB-080 not approved; no prototype supplied)
