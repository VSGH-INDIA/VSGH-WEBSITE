# CMS

Approved CMS: Sanity Growth (WEB-043).

```text
VSGH content team → Sanity Studio (admin, not public)
  → Sanity Content Lake
  → Next.js
  → www.vsgh.com
```

The CMS may hold only approved public information. It is not PLM, LIMS, QMS, or an IP repository.

Entity names from WEB-034 are listed in `src/sanity/entities.ts`. Schema files and `@sanity/client` are not installed until:

1. A VSGH Sanity project and dataset exist.
2. Information architecture conflicts are resolved (docs/CONFLICTS.md).
3. Publication workflow (WEB-008) is mapped to Sanity roles.

Environment variable names are in `.env.example`. Read tokens stay server-side.
