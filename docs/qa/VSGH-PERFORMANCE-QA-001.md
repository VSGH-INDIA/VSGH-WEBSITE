# VSGH-PERFORMANCE-QA-001

**Task:** TASK-013  
**Status:** Complete — performance review and measured, source-backed optimizations

## Methodology

**LOCAL/BUILD MEASUREMENTS** (this document):

- Source audit of App Router rendering, client boundaries, fonts, CSS, prefetch, media, motion
- `next build` static generation of 29 informational routes (+ `/robots.txt`, `/_not-found`)
- `.next/static` size after TASK-012 build: ~952 KB (hashed assets; not a field RUM budget)

**NOT MEASURED HERE:**

- Production LCP / INP / CLS field data (CrUX / RUM)
- Lab Lighthouse on a deployed origin
- TTFB of Cloudflare/Vercel edge vs laptop `next start`

Do not treat local numbers as production Core Web Vitals.

## Route coverage

Shared layout means one client island (`SiteHeader`) for all routes. Representative classes: homepage (largest section count), About/Materials (subnav), Contact (disabled form, still SSR), leaf domains (CapabilityPageView).

## Findings and corrections

| ID   | Severity | Finding                                                                         | Correction                                                                                          |
| ---- | -------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| C-01 | P2       | Header remounted on every pathname (`key={pathname}`), extra hydration/INP cost | Stable header instance; close drawer on document `a[href]` click and Escape                         |
| C-02 | P2       | Header, footer, and domain subnav prefetched every published sibling            | `prefetch={false}` on chrome/subnav; in-page `ButtonLink` still prefetches implemented destinations |
| C-03 | P2       | IBM Plex Mono loaded 400+500 though UI uses regular mono only                   | Mono 400 only; `preload: false` so Sans remains the primary preload                                 |
| C-04 | P3       | Reveal animation on sections                                                    | Left as opacity CSS; already gated by `prefers-reduced-motion`                                      |

No P0. No new packages. No analytics. No backend.

## Core Web Vitals (observations, not field claims)

| Vital | Source observation                                                                                                                      |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- |
| LCP   | Likely the compact/display heading or hero text; no raster LCP image. MediaFrame holds aspect ratio so a future image can reserve space |
| INP   | Only header event handlers + link navigation. Removed per-route header remount                                                          |
| CLS   | `display: swap` can still shift glyphs (provisional IBM Plex). Media placeholders use aspect boxes. Metrics/grid are in-flow            |
| TTFB  | Static `○` prerender; actual TTFB is hosting-dependent                                                                                  |

## JavaScript

Dependencies remain `next`, `react`, `react-dom`. One `"use client"` file: `site-header.tsx`. Pages and domain views stay server components.

## CSS

Token file + Tailwind v4 `@theme`. Reveal keyframes are opacity-only. `overflow-x: clip` retained. No second styling system.

## Fonts

IBM Plex remains **provisional**. Sans 400/500/600 (normal, medium buttons, semibold headings). Mono 400. Self-hosted via `next/font`. `display: "swap"`.

## Media

Placeholders only. `MediaFrame` aspect ratio is the CLS contract for later approved assets. No random images added. Sanity CDN host remains in `next.config` for a future approved pipeline; unused at runtime.

## Prefetch

Unpublished paths still must not prefetch (`ButtonLink` + `isPublishedPath`). Chrome links no longer prefetch nine (or more) RSC payloads on every page.

## Static rendering / security / a11y

Informational routes remain static. Security headers unchanged. `noindex` / `robots` disallow `/` unchanged. Focus/Escape/reduced-motion behavior from TASK-012 preserved (drawer still closes on navigation via click).

## Remaining limitations

- No production RUM
- Font swap CLS not eliminated (`optional` would hide the typeface)
- Homepage section count is larger than inner pages; expected
- Future photography must keep width/height or aspect to protect CLS
