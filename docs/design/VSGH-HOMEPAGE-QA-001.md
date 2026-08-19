# VSGH-HOMEPAGE-QA-001

**Task:** TASK-006  
**Against:** TASK-005 commit `b67d844abc71f7668c6407bb1ff557cca6c19d3f`  
**Reference:** https://vsgh-enterprise-site.preview.emergentagent.com/  
**Result:** **PASS with corrections** — homepage hardened. Not a formal WCAG certification. Not a production-launch authorization.

## Scope

Visual, responsive, accessibility, SEO, performance, lightweight security, and IP review of `/` only. Shared design-system fixes only where they caused homepage defects. No other routes. No CMS, analytics, CRM, CAPTCHA, or email.

## Visual QA

Language remains dark editorial aerospace: navy field, blueprint grid, IBM Plex (provisional), white/outline CTAs, indexed metrics, thin rules.

Findings vs reference / first-viewport intent:

- Hero `min-height: 78vh` pushed the process metrics below the fold on typical laptop heights. Corrected to `min(68vh, 42rem)`.
- Decorative hamburger glyph was font-dependent. Replaced with 1px rules (close uses ×).

No neon, HUD, particles, or palette change.

## Responsive QA

Checked conceptually and in-browser at 390px and 1920px; overflow-x clipped at the document root.

- No horizontal overflow at 390 / 1920.
- Desktop nav remains `xl+`; hamburger below.
- CTA stack, metric stack, transformation 1→2→7 unchanged and acceptable.
- Mobile menu now closes at the `xl` breakpoint and locks body scroll while open.

## Accessibility QA

- Landmarks, skip link (fixed, above sticky header), one `h1`, logical `h2`/`h3`.
- Mobile disclosure: `aria-expanded`, `aria-controls` now always references `#mobile-nav` (`hidden` when closed), Escape, body scroll lock.
- Home mark has an accessible name (`VSGH home`).
- Media frames: visible caption is `aria-hidden`; name remains on `role="img"`.
- Contrast: body/muted/accent ≥ 4.5:1 on `#080c14`; focus `#8ec0ff` ≥ 3:1 vs field. Disabled primary remains WCAG 1.4.3 inactive.
- Reduced motion: global override in `tokens.css` plus reveal gated on `prefers-reduced-motion: no-preference`.

Automated unit tests cover contrast pairs and JSON-LD parse. No axe suite in-repo (no new dependency).

## SEO QA

- Title, description, canonical `https://www.vsgh.com/`, Open Graph, Twitter summary.
- Organization JSON-LD (`@type` Organization, escaped `<`).
- `robots` metadata and `src/app/robots.ts` both **disallow indexing**.
- Viewport / theme-color exported.
- Internal WEB-081 links remain unpublished (404 by design). Prefetch disabled for those hrefs.

## Performance observations

- `/` remains static.
- Client JS still limited to `SiteHeader`.
- Unused IBM Plex Sans 700 removed (headings use 600).
- No raster images; LCP remains typography.
- Prefetch of unpublished routes disabled.

## Security observations

- No secrets in source. `.env.example` names only.
- JSON-LD is constant serialization with `<` escaped.
- Existing headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. `poweredByHeader` already false.
- Strict CSP with nonces not added (would be new infrastructure; Next inline runtime needs a nonce pipeline).
- Unused Sanity image hostname in `next.config.ts` retained for future CMS; not used on `/`.

## Content / IP findings

No invented certifications, customers, grades, tests, capacity, patents, or environmental metrics.

Copy that described internal implementation tasks was rewritten (CTA, company). Footer still states inner pages are not implemented (accurate, not a claim).

## Corrections

| Severity | Defect                                                     | Fix                                                 |
| -------- | ---------------------------------------------------------- | --------------------------------------------------- |
| P1       | Mobile `aria-controls` targeted a missing node when closed | Keep `#mobile-nav` in the DOM; `hidden` when closed |
| P1       | Skip link could sit under sticky header / shift layout     | `focus:fixed` + `z-[60]`                            |
| P1       | Media `role="img"` double-named inner text                 | Caption `aria-hidden`                               |
| P1       | CTA/company copy leaked task language                      | Public wording                                      |
| P2       | First viewport too tall                                    | `--vsgh-hero-min: min(68vh, 42rem)`                 |
| P2       | Possible horizontal bleed                                  | `overflow-x: clip` on `html, body`                  |
| P2       | Prefetch of 404 destinations                               | `prefetch={false}` on WEB-081 links                 |
| P2       | Unused font weight                                         | Drop Sans 700                                       |
| P2       | Menu stayed open across `xl`                               | `matchMedia` close; body scroll lock                |
| P2       | JSON-LD / indexing / viewport incomplete                   | Escape, `robots.ts`, `viewport`, stronger noindex   |
| P2       | Logo name noisy                                            | `aria-label="VSGH home"`                            |
| P3       | Hamburger glyph                                            | CSS rules                                           |

## Remaining provisional items

- IBM Plex not frozen brand type
- Media placeholders
- `robots` / `robots.ts` noindex until launch task
- WEB-081 destinations unpublished
- No analytics, CMS, or contact backend
- No formal accessibility certification

## Final result

**PASS (hardened homepage)** after TASK-006 corrections.
