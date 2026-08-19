# VSGH-APPLICATIONS-RESEARCH-IMPLEMENTATION-001

**Task:** TASK-009  
**Status:** Implemented — Applications and Research domains

## Routes

### Applications (WEB-081)

- `/applications/aerospace`
- `/applications/defense`
- `/applications/space`
- `/applications/advanced-industrial`

No `/applications` index. Primary nav lands on aerospace.

### Research (WEB-081)

- `/research/overview`
- `/research/research-areas`
- `/research/publications`

No `/research` index. Primary nav lands on overview.

## Architecture

Reuses TASK-008 `CapabilityPageView`, `ProcessFlow`, `DomainSubnav`, `DomainJsonLd`, `pageMetadata`.

Content: `src/content/applications.ts`, `src/content/research.ts`.

Story: material capability → engineering requirements → application domain → qualification need → intended use. Research labels **Known / Validated (not posted) / Under development / Future**.

## Composition

Aerospace and space use process sequences. Defense and industrial use indexed principles. Research overview and publications use status bands. Publications list is empty by design.

## SEO / a11y / responsive

Unique metadata per route. WebPage + BreadcrumbList. Indexing off. One `h1`. Status/process modules stack on small screens.

## IP / content controls

No customers, certifications, programme names, weapons, heritage, performance figures, or invented papers. Defense page refuses operational detail. Publications refuse fabricated bibliography.

## Cross-links

Applications ↔ Materials, Technology, Research, Contact. Research ↔ Materials, Technology, Applications.

## Provisional / limitations

IBM Plex · placeholders · no parent indexes · empty publications · Sustainability/Insights/Careers/Contact still unpublished · noindex · no Sanity/analytics/forms.
