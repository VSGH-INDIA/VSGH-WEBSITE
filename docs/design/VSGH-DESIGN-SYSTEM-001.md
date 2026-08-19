# VSGH-DESIGN-SYSTEM-001 — Visual design system foundation

**Status:** VSGH DESIGN SYSTEM — REV A — IMPLEMENTATION DRAFT  
**Stack:** Next.js 16.2.12 · React 19.2.4 · Tailwind CSS 4.3.3  
**Governing requirements:** WP04 (WEB-064–WEB-071, WEB-080 frozen requirements), WEB-081 navigation, WP03 Rev B  
**Visual reference interpreted (not copied):** https://vsgh-enterprise-site.preview.emergentagent.com/

This is a **candidate implementation draft**. It is not a permanently frozen corporate brand identity.

## Visual principles

Interpreted from the reference, recreated natively:

- Dark technical field (near-navy charcoal), not a SaaS light dashboard
- Thin 1px rules, square mark, small radius
- Left-aligned editorial hero with oversized display type
- Mono labels / serial-style eyebrows
- White filled primary action, outline secondary
- Subtle blueprint grid for depth — no particles, HUD, or neon
- Metric strip with indexed columns
- Restrained motion; `prefers-reduced-motion` honored

## Colors (semantic)

| Token                             | Value                     | Role                  |
| --------------------------------- | ------------------------- | --------------------- |
| `--vsgh-color-background`         | `#080c14`                 | Page field            |
| `--vsgh-color-surface`            | `#0d131c`                 | Cards / sections      |
| `--vsgh-color-surface-elevated`   | `#141b26`                 | Raised panels         |
| `--vsgh-color-foreground`         | `#f4f6f8`                 | Primary text          |
| `--vsgh-color-foreground-muted`   | `#94a3b8`                 | Secondary text        |
| `--vsgh-color-border`             | `rgb(255 255 255 / 0.12)` | Rules                 |
| `--vsgh-color-accent`             | `#c5d0dc`                 | Emphasis in headlines |
| `--vsgh-color-accent-strong`      | `#ffffff`                 | Strong highlight      |
| `--vsgh-color-accent-muted`       | `#64748b`                 | Disabled / quiet      |
| `--vsgh-color-inverse-background` | `#f4f6f8`                 | Primary buttons       |
| `--vsgh-color-inverse-foreground` | `#080c14`                 | Text on primary       |
| `--vsgh-color-focus`              | `#8ec0ff`                 | Focus ring            |

Foreground and muted text on `#080c14` are intended to meet WCAG 2.2 AA. Focus is a 2px ring with offset.

## Typography

IBM Plex Sans (UI/display) and IBM Plex Mono (meta), loaded with `next/font`. Scales are CSS custom properties (`--vsgh-text-*`).

## Spacing / grid

4px-based scale `--vsgh-space-*`. Page gutter `--vsgh-gutter` (fluid). Content width 72rem / 80rem wide. Section padding `--vsgh-section-y`.

## Motion

`--vsgh-duration-fast` 120ms, `--vsgh-duration` 200ms, `--vsgh-ease` cubic-bezier(0.2, 0.7, 0.2, 1). Hover/border transitions only. Global reduced-motion override in `tokens.css`.

## Components

Under `src/components/`: Container, Section, Heading, Text, Button, ButtonLink, TextLink, Badge, Card, FeatureCard, Hero, SiteHeader, SiteFooter, MediaFrame, Divider, Metric, CtaBlock.

Navigation labels follow WEB-081. Destinations currently point at `/` because those pages are not implemented.

## Accessibility

Semantic header/nav/main/footer, visible `:focus-visible`, button disabled/loading states, mobile menu `aria-expanded`, keyboard-operable menu toggle, no color-only meaning.

## Responsive

Header collapses to a disclosure under `lg`. Hero CTAs stack on small screens. Metric strip becomes a stacked list, then four columns. Feature cards 1 → 3 columns.

## Provisional items

- IBM Plex is a production-safe stand-in until a locked brand typeface exists
- Demo metrics on `/` are labels for the system, not VSGH operational claims
- No photography; media is a framed placeholder
- `/` is a showcase, not the approved homepage (WEB-063 still pending execution)

See WP04 WEB-064, WEB-065, WEB-066, WEB-067, WEB-070, WEB-071, WEB-080 for requirements this draft implements.
