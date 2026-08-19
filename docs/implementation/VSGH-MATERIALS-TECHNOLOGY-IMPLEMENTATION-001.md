# VSGH-MATERIALS-TECHNOLOGY-IMPLEMENTATION-001

**Task:** TASK-008  
**Status:** Implemented — Materials and Technology domains

## Routes

### Materials (WEB-081)

- `/materials/overview`
- `/materials/material-development`
- `/materials/metallurgy`
- `/materials/processing`
- `/materials/qualification`

No `/materials` index. Primary nav lands on overview.

### Technology (WEB-081)

- `/technology/resource-recovery`
- `/technology/purification`
- `/technology/alloy-development`
- `/technology/advanced-materials`
- `/technology/manufacturing`

No `/technology` index. Primary nav lands on resource recovery.

## Architecture

- Content: `src/content/materials.ts`, `src/content/technology.ts`, shared `src/content/types.ts`
- Presentation: `CapabilityPageView` + `ProcessFlow` + `DomainSubnav` + `DomainJsonLd`
- About subnav now wraps `DomainSubnav`

Materials describes **what** is developed. Technology describes **how the engineering sequence is structured**. Both refuse catalogues, grades, and parameters.

## Components

New, reused across these domains: `DomainSubnav`, `DomainJsonLd`, `ProcessFlow`, `CapabilityPageView`. No second token system.

## Content structure

`CapabilityPageContent`: SEO, hero, sections, optional `stages` (process flow), `principles` (indexed disciplines), `related` links, CTA. Sanity-shaped; no CMS client.

## SEO / a11y / responsive

Per-route metadata via `pageMetadata`. JSON-LD WebPage + BreadcrumbList. Indexing still off. One `h1`, `h2`/`h3`, process flow as an ordered list (usable stacked on small screens). Prefetch only published prefixes (`/`, `/about/`, `/materials/`, `/technology/`).

## Cross-links

Materials ↔ Technology. Links to Applications/Research/Contact exist; unpublished destinations 404 until later tasks.

## Provisional / limitations

IBM Plex · media placeholders · no parent indexes · no specs/grades/status · Applications/Research not yet built at the time of this task · noindex · no Sanity/analytics/forms.

## IP control

No compositions, strengths, capacities, certifications, customers, or process windows.
