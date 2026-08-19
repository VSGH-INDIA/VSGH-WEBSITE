# VSGH-DESIGN-SYSTEM-VERIFICATION-001

**Task:** TASK-004  
**Against:** TASK-003 commit `1bbea36766ec39c6d1e63f32949535cfaa6954a7`  
**Reference:** https://vsgh-enterprise-site.preview.emergentagent.com/  
**Result:** **PASS with corrections** — candidate baseline after the refinements below. Not a formal WCAG certification.

## Scope

Visual language, tokens, components, WEB-081 navigation shell, WCAG 2.2 AA _intent_, responsive behavior, and performance of the `/` design-system showcase. No production homepage. No additional routes.

## Visual findings

Language matches the reference at the design-system level: dark field, blueprint grid, editorial display type, mono eyebrows, white/outline CTAs, thin rules, indexed metrics. No neon, HUD, or particles.

Issues vs reference / WP04:

- Header used frosted `backdrop-blur` (generic SaaS glass); reference bar is a solid dark rule.
- Duplicate “Contact” (nav + filled CTA) crowded WEB-081 labels.
- Desktop nav appeared from `lg`, so nine items overflowed typical tablet/laptop widths.

## Token findings

Single system in `src/styles/tokens.css` + Tailwind `@theme`. `src/lib/tokens.ts` is a role list, not a second palette.

- Hero min-height and grid size were hard-coded (`78vh`, `72px`).
- Metric values used Tailwind `text-3xl` / `text-4xl` instead of type tokens.
- `--vsgh-color-accent-muted` is 4.11:1 on the page field — **below 4.5:1**. Used only on **disabled** primary fill (WCAG 1.4.3 inactive exemption). Left unchanged; not used for body copy.
- Success/warning tokens unused in UI; retained for future form states.

## Accessibility findings

- Missing skip link and `main` id.
- Mobile menu lacked Escape to close.
- Nav `title` is not a reliable accessible name for “page not implemented.”
- TextLink was not underlined until hover (color-only affordance).
- Body/muted/heading/inverse pairs meet 4.5:1 on documented fields.
- Disabled primary contrast is exempt.

## Responsive findings

- CTA stack and feature grid were acceptable.
- Nine WEB-081 items required hamburger below `xl`.
- Metric strip already stacked, then four columns.

## Performance findings

- Header remains a client component (menu state only) — justified.
- No new dependencies.
- No images; MediaFrame is CSS.
- Fonts: `next/font` IBM Plex (provisional).

## Corrections made

- Solid header background; remove blur.
- Remove extra header Contact button; WEB-081 list only.
- Desktop nav from `xl`; hamburger below.
- Escape closes mobile nav; `aria-label` notes unimplemented pages.
- Skip link + `#main`.
- Persistent underline on TextLink.
- Primary hover via opacity (visible on white fill).
- Tokens: `--vsgh-hero-min`, `--vsgh-grid-size`, `--vsgh-control`.
- Metric type uses `--vsgh-text-h1`.
- Remove redundant footer `Divider`.
- Contrast unit test for body/muted/inverse pairs.

## Unresolved / provisional

- IBM Plex is not the frozen brand typeface.
- `/` remains a showcase, not WEB-063 homepage.
- WEB-081 destinations still `/` (pages not built).
- Disabled control contrast not AA (allowed).
- Formal accessibility audit / certification not performed.

## Verification result

**PASS (candidate baseline)** after TASK-004 corrections.
