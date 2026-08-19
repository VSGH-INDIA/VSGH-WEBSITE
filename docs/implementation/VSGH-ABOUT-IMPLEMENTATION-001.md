# VSGH-ABOUT-IMPLEMENTATION-001

**Task:** TASK-007  
**Status:** Implemented — About & corporate identity domain  
**Design system:** Rev A candidate baseline (TASK-003/004)  
**Visual continuity:** Homepage (TASK-005/006)

## Implemented routes

Exact WEB-081 About children. No `/about` index (not in this task’s route list).

| Path                          | Purpose                                                           |
| ----------------------------- | ----------------------------------------------------------------- |
| `/about/company`              | Identity, capability, resource-to-material philosophy             |
| `/about/vision`               | Long-term direction (ambition as direction, not forecast)         |
| `/about/mission`              | Method: discipline, rigor, transformation, qualification          |
| `/about/leadership`           | Structure only; no invented biographies                           |
| `/about/scientific-integrity` | Evidence, traceability, data integrity, public vs internal record |
| `/about/quality`              | Quality philosophy; **no certification claims**                   |
| `/about/facilities`           | Capability classes; no addresses or inventories                   |

Primary nav **About** points to `/about/company` so the label is not a 404 until a parent `/about` page is authorized.

## Architecture

- `src/content/about.ts` — structured static copy (Sanity-ready records, no CMS client)
- `src/components/about/about-page-view.tsx` — shared composition
- `src/components/about/about-subnav.tsx` — in-domain navigation
- `src/components/about/about-json-ld.tsx` — WebPage + BreadcrumbList (not a second Organization)
- `src/app/about/<slug>/page.tsx` — one file per route, metadata + view
- Site header/footer unchanged in role; About current-state and published-path prefetch updated

Page variants: `standard` (editorial + principles), `leadership` (placeholder portraits), `facilities` (featured category + indexed list). Not a repeated three-card grid.

## Reusable components

About-only: `AboutPageView`, `AboutSubnav`, `AboutJsonLd`. Design-system reuse: Hero (`compact`, `heading="hero"`), Container, Section, Heading, Text, Badge, ButtonLink, CtaBlock, MediaPlaceholder.

## Content model

Each page record: `path`, `seoTitle`, `description`, hero fields, `sections[]`, optional `principles[]` / `facilities[]` / `leadershipNote`, `cta`. Copy is IP-safe: no grades, customers, dates, counts, certifications, or process parameters.

## SEO

Unique title + description per route. Canonical `https://www.vsgh.com{path}` via `metadataBase` + `alternates.canonical`. Open Graph + Twitter summary. Indexing remains disabled (root robots + page metadata). JSON-LD: WebPage + BreadcrumbList (About crumb uses `/about/company` as the implemented parent).

## Accessibility

One `h1` (compact hero). Logical `h2`/`h3`. Landmarks from root layout + `main`. About subnav `aria-current`. Media frames named via `role="img"`. Contrast and reduced motion inherit the design system. Not certified.

## Responsive

Subnav scrolls horizontally on small screens. Hero stacks; CTAs stack. Leadership 1→3 portrait frames. Facilities split then stacked media/text rows. `overflow-x: clip` on document.

## Performance

Server components only for About. Header remains the sole layout client component. Prefetch enabled for published `/` and `/about/*` only.

## Provisional items / limitations

- IBM Plex still provisional
- Media and leadership portraits are placeholders
- `/about` parent route not built
- Materials, technology, applications, research, contact still unpublished (links 404 by design)
- No Sanity, analytics, or forms
- Indexing off until a launch task

No other website domains were implemented in this task.
