# VSGH-ACCESSIBILITY-RESPONSIVE-QA-001

**Task:** TASK-012  
**Status:** Complete — accessibility and responsive verification and correction  
**Target:** WCAG 2.2 AA (engineering target, not a certification)

## Route coverage

All 29 WEB-081 informational routes share layout (skip link, header, footer) plus page `main#main`. Representative families: homepage, About, Materials/Technology (subnav + process), Applications/Research, leaf domains, Contact.

No automated axe/Pa11y suite is installed; this pass is source review plus existing contrast unit tests. It is not a formal WCAG audit.

## Findings and corrections

| ID   | Severity | Finding                                                                                   | Correction                                                               |
| ---- | -------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| B-01 | P1       | Escape closed the mobile menu without restoring focus                                     | Escape restores focus to the menu button                                 |
| B-02 | P1       | Route changes could leave the drawer open with `overflow: hidden`                         | Menu closes on pathname change and at the `xl` breakpoint                |
| B-03 | P2       | Process and status/related/principle labels were not headings; following titles were `h3` | Section labels are `h2`; process sequence is `h2`                        |
| B-04 | P2       | Primary, footer, and subnav links were shorter than 24px CSS on one axis                  | `min-h-11` (44px) tap/click targets                                      |
| B-05 | P2       | Seven-column process grids squeezed or left empty tracks                                  | `auto-fit` minmax columns                                                |
| B-06 | P2       | Long tokens could overflow at 360px                                                       | `overflow-wrap: break-word`; form controls `min-w-0`                     |
| B-07 | P2       | Contact must not imply a working channel                                                  | Disabled fieldset, status text, `type="button"` submit, no delivery copy |
| B-08 | P3       | Desktop primary nav could overflow nine labels                                            | Wrap within a max width at `xl`                                          |

## Keyboard

Tab order: skip link → logo → (desktop primary or menu button) → mobile links when open → main → footer. Escape closes the disclosure and returns focus to the button. Disabled contact controls are not tabbable. No keyboard trap (disclosure, not a modal dialog) so the close button remains reachable.

## Landmarks / semantics

`header`, `nav` (Primary / domain / Footer), `main#main`, `footer`. Media placeholders: `role="img"` + `aria-label`; inner grid is `aria-hidden`. One `h1` per page (Hero). Reduced motion: existing token rule zeros animation/transition duration.

## Contrast

Token tests remain: body/muted/accent on `#080c14` / `#0d131c` ≥ 4.5:1; focus `#8ec0ff` ≥ 3:1. Disabled submit uses muted inverse treatment (WCAG contrast exception for disabled controls). Palette not changed.

## Responsive matrix (layout review)

| Width              | Observation after fix                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| 360 / 390 / 414    | Single-column sections; hamburger; hero type via clamp; no page-level horizontal scroll (`overflow-x: clip`) |
| 768 / 820          | Two-column process/cards; subnav horizontal scroll if needed                                                 |
| 1024               | Hamburger until 80rem (existing header breakpoint)                                                           |
| 1280 / 1440 / 1920 | Desktop primary nav; process auto-fit                                                                        |

## Contact

Channel labelled “not connected”. Fieldset disabled. Submit `type="button"` disabled. No success copy. No backend.

## Remaining issues / limitations

- Not a lab-tested screen-reader certification.
- Desktop nav still starts at `xl` (80rem); 1024px uses the drawer by design.
- Placeholder media has no photographic `alt` (controlled `aria-label` only).
- Disabled field contrast is intentionally muted.

## Certification limitation

This document does **not** claim WCAG 2.2 conformance or certification.
