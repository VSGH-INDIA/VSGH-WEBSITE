# VSGH-WHOLE-SITE-ARCHITECTURE-QA-001

**Task:** TASK-011  
**Status:** Complete — cross-route architecture QA and correction  
**Scope:** All implemented public App Router pages (29 informational routes; 33 static outputs including `/robots.txt` and `/_not-found`)

## Route inventory

WEB-081 V1 pages implemented exactly:

`/`, seven About children, five Materials children, five Technology children, four Applications children, three Research children, `/sustainability`, `/insights`, `/careers`, `/contact`.

Not implemented (correct): parent indexes (`/about`, `/materials`, `/technology`, `/applications`, `/research`), Insights children, Sanity Studio.

`IMPLEMENTED_ROUTES` is now an exact allow-list. Prefetch no longer treats unknown `/about/*` (or similar) paths as published.

## Findings and corrections

| ID   | Severity | Finding                                                                                                                                         | Correction                                                                              |
| ---- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| A-01 | P1       | Homepage Applications CTA targeted unpublished `/applications`                                                                                  | Link to `/applications/aerospace`                                                       |
| A-02 | P2       | Breadcrumb JSON-LD duplicated the landing URL on domain first children (Overview / Resource recovery / Aerospace / Research overview / Company) | `breadcrumbItems` collapses when `parentPath === path`                                  |
| A-03 | P2       | About used a separate JSON-LD module with the same graph shape                                                                                  | About now uses shared `DomainJsonLd`                                                    |
| A-04 | P2       | Root layout set canonical and OG URL to `/` for every page                                                                                      | Homepage-only metadata on `src/app/page.tsx`; inner routes keep `pageMetadata`          |
| A-05 | P2       | Homepage JSON-LD was Organization only                                                                                                          | `@graph` adds WebPage + Home breadcrumb. No Article. Organization remains homepage-only |
| A-06 | P2       | Homepage copy still said About pages “will be published”; section CTAs did not reach implemented domains                                        | Copy updated; CTAs to Materials, Aerospace, Research, Quality, Sustainability, Company  |
| A-07 | P2       | Homepage “Research collaboration” jumped to an in-page hash after Research existed                                                              | Link to `/research/overview`                                                            |
| A-08 | P3       | No visible breadcrumb UI                                                                                                                        | JSON-LD only. Not added (not a redesign; subnav covers sibling orientation)             |

No P0 (security, data loss, backend leakage).

## Navigation

Header, mobile drawer, footer, and domain subnav share `PRIMARY_NAV` / domain nav arrays. `aria-current="page"` is set for primary items via `isPrimaryNavCurrent` and for subnav exact path. Unpublished parent indexes are not in nav. Keyboard/Escape/focus restoration of the mobile menu is deferred to TASK-012 except as already implemented (Escape closes, body scroll lock).

## SEO / structured data

Every inner page uses `pageMetadata` (title, description, canonical, OG, Twitter, `noindex`). Homepage canonical is `/`. `robots.ts` still disallows `/`. JSON-LD scripts escape `<`. Empty Insights still has no Article schema.

## Content / IP

Content remains in `src/content/*`. Existing IP tests still run. No certifications, customers, patents, or environmental metrics added. Contact remains frontend-only.

## Static rendering

Only `SiteHeader` is a client component. Informational pages stay server-rendered. No not-found customization (framework default retained).

## Remaining provisional items

IBM Plex · media placeholders · empty Insights/vacancies · unconnected contact channel · `noindex` · no Sanity live client · no production RUM.

## Tests

`src/lib/site-architecture.test.ts` locks WEB-081 inventory, unpublished parents, internal hrefs, and breadcrumb URLs.
