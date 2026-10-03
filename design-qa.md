# VSGH aerospace editorial redesign — design QA

## Comparison target

- **Source visual truth:** https://www.1367studio.com/ — captured in the Codex in-app browser on 2026-10-03.
- **Implementation:** http://localhost:3000/ — captured in the Codex in-app browser on 2026-10-03.
- **Intentional adaptation:** this is not a literal clone. VSGH uses original aerospace copy, navigation, and an original generated aerospace-material hero asset. The comparison evaluates the borrowed interaction and editorial principles: split header, visual-first hero, oversized display type, dark exploration menu, capability sequence, and responsive density.

## Evidence and normalization

| State             | Source                                         | Implementation                               | Normalization                                                         |
| ----------------- | ---------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| Desktop home      | 1025 × 791 CSS px, in-app browser screenshot   | 1025 × 791 CSS px, in-app browser screenshot | Same browser, viewport, and top-of-home state.                        |
| Mobile home       | 390 × 844 CSS px, in-app browser screenshot    | 390 × 844 CSS px, in-app browser screenshot  | Same browser and requested mobile viewport.                           |
| Navigation        | Mobile fullscreen menu opened                  | Mobile fullscreen menu opened                | Both use a full-height dark navigation state.                         |
| Programme control | Source page has menu and linked project states | VSGH `Qualification` explorer tab selected   | VSGH-specific interactive state; source has no equivalent tab widget. |

Both desktop captures were reviewed together at the same CSS viewport and both mobile captures at 390 × 844. No density scaling was required; CUA browser screenshots use the CSS viewport size for the comparison.

## Required fidelity surfaces

- **Fonts and typography:** the source uses a compact grotesk display and mono metadata. VSGH uses IBM Plex Sans / Mono rather than copying the source font, with the same hierarchy: restrained technical labels, oversized display headline, compact actions. Wrapping remains intentional at desktop and mobile without clipping.
- **Spacing and layout rhythm:** VSGH follows the source's open, image-led above-the-fold framing, while retaining its own four-stage programme strip. The desktop grid and mobile single-column flow are aligned to the site gutter; no horizontal overflow is present at 390 px.
- **Colors and visual tokens:** source cream/orange is intentionally translated to VSGH graphite, technical blue, and restrained amber so the resulting design belongs to aerospace materials rather than a creative agency. Text and controls retain adequate high contrast on the dark image field.
- **Image quality and asset fidelity:** VSGH uses `/public/images/vsgh-aerospace-material-hero-v1.png`, an original generated 1024 × 1536 aerospace-material image. It is sharp at both tested crops and has no logos, source imagery, watermark, or placeholder treatment.
- **Copy and content:** all visible VSGH copy is aerospace-material and public-information-safe. No 1367 copy, names, logo, project claims, or customer marks were reused.

## Findings

### Resolved during this QA pass

- [P1] Mobile menu height was constrained to the header.
  - **Location:** `src/components/layout/site-header.tsx`.
  - **Evidence:** initial 390 × 844 browser capture showed `#mobile-nav` at 65 px high because the header's `backdrop-filter` created the containing block for the fixed overlay.
  - **Fix:** removed the header backdrop filter while retaining the opaque header surface.
  - **Post-fix evidence:** at 390 × 844, `#mobile-nav` measures 775 px high from `y=68.95` to viewport bottom; all nine primary links and the closing context statement are visible and scrollable.

### Final findings

No actionable P0, P1, or P2 design issues remain in the tested desktop or mobile states.

## Interaction and runtime checks

- Desktop menu opens and exposes all primary navigation paths.
- Mobile menu opens at full viewport height; browser console recorded no errors.
- The `Qualification` tab in the Capability Explorer changes the selected panel and sets `aria-selected="true"`.
- Mobile viewport has no horizontal overflow.
- `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` pass.

## Full-site redesign extension

The redesign was extended from the homepage through the shared route templates, so the following public route families use the same visual language:

- About: company, vision, mission, leadership, scientific integrity, quality, and facilities.
- Materials, technology, applications, research, sustainability, and careers via the capability-page template.
- Contact through its dedicated safe, non-transmitting enquiry surface.
- Insights lists, articles, and CMS page-builder blocks.
- Shared primary navigation, mobile overlay navigation, subsection navigation, programme-flow cards, related-content lists, CTAs, and footer.

### Full-site evidence

- **Materials overview, desktop:** `http://localhost:3000/materials/overview` rendered with the new editorial hero, original material macro image, current subsection navigation, programme sequence, and footer.
- **Facilities, desktop:** `http://localhost:3000/about/facilities` rendered with the new About navigation and structured facilities view.
- **Contact, desktop and 390 × 844 mobile:** `http://localhost:3000/contact` rendered with the research-facility image, enlarged editorial hierarchy, responsive actions, and no horizontal overflow.
- **Runtime:** the mobile Contact browser console contained no errors. Homepage menu and capability-tab checks from the prior pass remain valid after the shared-template redesign.

### Content and media check

- Replaced decorative wireframes and visible placeholder framing with original VSGH visual assets.
- Added original laboratory, material-macro, and aerospace-assembly image treatments in addition to the original hero image.
- Removed residual visible `placeholder` labelling from public media descriptions. Safety copy remains intentionally conservative: visual reference is not presented as evidence of a named facility, programme, or performance claim.

## Follow-up polish

- [P3] Replace the remaining lower-page content placeholders with commissioned programme, laboratory, or materials photography when available; the above-the-fold placeholder is resolved.

## Implementation checklist

- [x] Original aerospace hero asset added and optimized for responsive composition.
- [x] Editorial split navigation and accessible fullscreen menu implemented.
- [x] Dynamic pointer-responsive hero treatment implemented with reduced-motion fallback inherited from global styles.
- [x] Dynamic capability explorer retained and visually integrated.
- [x] Desktop, mobile, menu, and tab interactions browser-verified.

final result: passed

---

# Header logo lockup refinement — 2026-10-03

## Comparison target

- **Source visual truth:** `/Users/vaibhavkumarn/Downloads/VSGH Aerospace Branding Logo.png` — supplied 1536 × 1536 VSGH India Pvt Ltd brand artwork.
- **Implementation:** `http://localhost:3000/business` — captured in the Codex in-app browser at the desktop header state.
- **Viewport and state:** 1296 × 712 CSS px, desktop, navigation closed, Business route active.

## Focused comparison evidence

The supplied artwork's blue V insignia is the source of truth. The implementation uses its top-centre V region directly as a tightly framed 48 × 40 px mark, rather than displaying the full square asset as a miniature image. The focused header capture was reviewed alongside the source artwork: the blue V remains recognisable, the black source background blends into the graphite header, and the image no longer introduces a thumbnail border or unrelated logo text at unreadable scale.

## Required fidelity surfaces

- **Fonts and typography:** the lockup uses the established display face for `VSGH` and mono face for `INDIA PVT LTD`; the intentional uppercase tracking keeps the hierarchy compact and legible at navigation scale.
- **Spacing and layout rhythm:** the mark, divider, and wordmark align to one 40 px optical row with a measured 14 px gap. The centered lockup remains balanced against the split navigation.
- **Colors and visual tokens:** the original electric-blue mark is retained; the divider uses a subdued technical blue that belongs to the existing dark header palette.
- **Image quality and asset fidelity:** the visible mark is a direct crop of the supplied original logo, not a recreated glyph, inline SVG, or substitute asset. Its source scale preserves sharpness at the rendered size.
- **Copy and content:** the label reads `VSGH` and `INDIA PVT LTD`, matching the requested company naming.

## Findings

### Resolved during this refinement

- [P1] The prior header rendered the full square logo inside a bordered 36 px thumbnail.
  - **Impact:** the brand mark became visually ambiguous and looked dropped into the navigation rather than designed into it.
  - **Fix:** reframed the actual V insignia without a thumbnail border, then introduced an aerospace-style divider and intentional wordmark hierarchy.
  - **Post-fix evidence:** the rendered desktop header presents a clean V mark and readable company lockup with no visible thumbnail treatment.

## Verification

- Desktop browser verification confirms About, Business, and Materials remain intact on the left of the header; Careers and Contact remain on the right.
- `npm run typecheck`, `npm run lint`, `npm run test -- --run`, and `npm run build` pass after the refinement.

final result: passed
