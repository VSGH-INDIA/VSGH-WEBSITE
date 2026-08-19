# VSGH-SUSTAINABILITY-INSIGHTS-CAREERS-CONTACT-IMPLEMENTATION-001

**Task:** TASK-010  
**Status:** Implemented — remaining WEB-081 public leaf routes

## Routes

WEB-081 V1 nodes (no nested children, no extra indexes):

- `/sustainability`
- `/insights`
- `/careers`
- `/contact`

Insights children (`/insights/news` and similar) remain unfrozen and unimplemented.

## Architecture

Reuses `CapabilityPageView`, `ProcessFlow`, `DomainJsonLd`, `Hero`, `MediaPlaceholder`, `pageMetadata`, header/footer, and tokens from prior tasks.

`CapabilityPageView` now accepts optional `nav` (omitted on single-route domains) and optional `emptyState`. `DomainJsonLd` omits a duplicate Home crumb when `parentPath` is `/`.

Contact uses `ContactPageView` (server component). No client form handler.

## Content

| File                            | Role                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/content/sustainability.ts` | Capability page: resource → recovery → purification → material development → engineering value → application |
| `src/content/insights.ts`       | Index page fields + `insightArticles: []` (CMS-shaped `InsightArticle`)                                      |
| `src/content/careers.ts`        | Why / disciplines / culture + `careerVacancies: []`                                                          |
| `src/content/contact.ts`        | Enquiry classes, reserved fields, privacy notice                                                             |

## Empty states

- Insights: “Insights are being developed.” No Article JSON-LD.
- Careers: “No public openings are posted.” No application collection.

## Contact backend boundary

Frontend only. Fieldset and submit are disabled. No email, SMTP, Resend, SendGrid, Formspree, CRM, CAPTCHA, database, server action, or analytics. The UI does not claim that a message was sent. No address, telephone, or email is published.

## SEO / structured data

Unique title, description, canonical, OG, Twitter per route. Indexing remains off. WebPage + BreadcrumbList only. Organization JSON-LD stays on the homepage.

## Accessibility / responsive

One `h1` per page. Contact enquiry items are `h3` under an `h2`. Form labels associate with controls. Reserved fields are in a disabled fieldset with a status description. Layouts reuse homepage gutters and stack on small screens.

## Shared-component notes

Optional domain subnav and two-level breadcrumbs were required for these leaf routes and apply to future single-route pages. Existing nested domains still pass `nav`.

## Provisional / limitations

IBM Plex · media placeholders · empty insights/vacancies · contact channel not connected · noindex · no Sanity live client · no vendor enquiry backend.
