# Site and interaction audit

**Date:** 2026-10-03  
**Scope:** homepage hero and scroll behavior, shared visual transitions, navigation consistency, and the public Contact journey.

## Browser evidence

1. **Homepage, desktop:** `http://localhost:3000/` — verified the revised VSGH lockup, visual hero composition, and WebGL motion field.
2. **Homepage after scroll:** `http://localhost:3000/` — verified that the first content section enters after it reaches the viewport and that the hero field remains visually integrated at the transition edge.
3. **Contact:** `http://localhost:3000/contact` — verified published company locations, Business and Company actions, and the removal of disabled submission controls.

## Findings and changes

| Priority | Finding                                                                                                                        | Resolution                                                                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1       | The hero updated React state for every pointer event; movement was limited to a CSS highlight rather than the programme story. | Replaced it with a dynamically imported Three.js field. It reacts to pointer and scroll position, renders only on capable desktop viewports, pauses when out of view, and respects `prefers-reduced-motion`. |
| P1       | Shared `vsgh-reveal` effects ran at page load instead of when content entered the viewport.                                    | Added a site-wide Intersection Observer controller for measured, scroll-triggered reveals without hiding content when JavaScript or motion is unavailable.                                                   |
| P2       | Repeated labels described visual assets as generic “visual reference” placeholders.                                            | Removed the visible placeholder treatment while retaining accessible image descriptions.                                                                                                                     |
| P2       | The homepage repeated the same “Resource to application” narrative in consecutive sections.                                    | Distinguished the interactive Capability Explorer from the wider engineering sequence in copy and hierarchy.                                                                                                 |
| P1       | The Contact route presented a visibly disabled, non-submitting form.                                                           | Removed the dead-end interface and centered the route on published India and Europe company locations, enquiry classes, and real Business / Company navigation.                                              |

## Verification

- `npm run typecheck` — passed
- `npm run lint` — passed
- `npm test -- --run` — 67 tests passed
- `npm run format:check` — passed
- `npm run build` — passed
- `npm audit --omit=dev` — no production dependency vulnerabilities reported

## Remaining product decision

The website now avoids a fake or disabled enquiry workflow. Publishing a working email address, telephone number, or CRM-backed form requires an approved destination and privacy/retention policy; none was supplied, so this was intentionally not invented.
