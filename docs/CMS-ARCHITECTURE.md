# CMS architecture

```text
Editor -> Sanity Studio -> Sanity Content Lake
                         | published lifecycle documents
                         v
                 Next.js server resolver -> typed fallback -> public route

Editor -> Studio preview URL -> /api/draft -> signed preview cookie
                                      -> draft fetch (no-store, noindex)

Sanity publish webhook -> /api/revalidate (secret) -> tag/path invalidation
```

Published queries require `lifecycle == "published"`. Preview uses a server-only read token and bypasses the public cache; the preview proxy sets no-store/noindex behavior. Public requests use published data and cache revalidation, with code content as a typed resilience fallback when Sanity is not configured or content is incomplete.

## Collections and controlled documents

| Content                                       | Purpose                                                               |
| --------------------------------------------- | --------------------------------------------------------------------- |
| Home / Business / Contact                     | controlled public singletons                                          |
| Business-line landing pages                   | three fixed-route documents with lifecycle and preview controls       |
| Site settings                                 | limited public company identity, metadata, verification, and labels   |
| Capability pages / insight articles / careers | existing public-content documents                                     |
| Image assets                                  | public-media metadata, approval, visibility, alt/decorative semantics |

## Environment boundary

Only `NEXT_PUBLIC_*` values are intentionally browser-visible. Sanity read tokens, preview/revalidation secrets, Resend keys, Upstash credentials, and Turnstile secret remain server-only. Do not put them in CMS content or Git.

## Migration and rollback

Migrate one page at a time: create the singleton, populate approved fields, preview, publish, verify the public page, then proceed. If a publication is wrong, unpublish or restore the previous document revision in Sanity and invoke the authenticated revalidation webhook. If an application release is wrong, use Vercel rollback to the prior verified deployment. See [CMS migration](CMS-MIGRATION.md).
