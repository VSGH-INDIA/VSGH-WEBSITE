# Specification conflicts

Cursor shall not silently pick a winner (VSGH-CURSOR-001 §7). Bootstrap used only the **approved WP03 Rev B** technology stack. The items below block further product UI.

## C-01 — Information architecture (blocks routes)

| Source         | Status | Structure                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WEB-002 (WP01) | Draft  | Top-level Materials, R&D, Applications, Insights. About includes Vision, Mission, Scientific Integrity, Quality, Leadership, Facilities, Corporate Structure. Technology has eight capability pages.                                                                                    |
| WEB-023 (WP02) | Draft  | URLs: `/about/*`, `/technology/*`, `/materials`, `/research`, `/applications`, `/sustainability`, `/insights/*`, `/careers`, `/contact`. About has vision and mission as separate URLs.                                                                                                 |
| WEB-062 (WP04) | Draft  | About drops Scientific Integrity, Quality, Corporate Structure; merges Vision & Mission. Technology becomes five items including Processing and Applications. Top-level **Aerospace & Advanced Applications**. **News / Insights**. No top-level Materials. R&D instead of `/research`. |

**Consequence:** Implementing either sitemap would override the others. No public routes beyond `/` until Corporate Communications / UX Architecture names the governing IA.

**Options:** (A) Freeze WEB-023 URLs and revise WP04 to match. (B) Freeze WEB-062 and issue a WEB-023 revision. (C) Produce a new approved sitemap that supersedes both.

## C-02 — WP04 is not a frozen baseline (blocks visual fidelity)

CURSOR-001 and CURSOR-005 treat WP04 as the frozen UX baseline. WEB-080 and the WP04 README state the package is **Draft** until design, IP, accessibility, and management approval. No high-fidelity prototype is in this folder (WEB-075 required pages are unspecified in pixels/typefaces).

WEB-065 defines token **roles** only — no approved hex values or typefaces.

**Consequence:** `src/styles/tokens.css` is labeled provisional. Do not treat it as brand.

## C-03 — Duplicate WP03 packages

`VSGH_Stage2_WP03_Technology_Stack_Infrastructure_Development_Environment` (evaluation; README says no final selection) sits beside `VSGH_Stage2_WP03_APPROVED_Technology_Baseline_REV_B` (Approved). Implementers can load the wrong tree.

**Option:** Archive or mark the evaluation package superseded by Rev B.

## C-04 — Accessibility target

WEB-071 and CURSOR-005: WCAG 2.2 AA. WEB-038: select and document the target before final verification. WEB-013: no version named.

**Proposed (not applied as a silent choice for legal claims):** document WCAG 2.2 AA in WEB-038 via a WP02 revision.

## C-05 — Email / forms / analytics vendors unset

WEB-058: corporate email architecture **TBD**. WEB-036: analytics, CAPTCHA, CRM, careers, maps are candidates, not selected. WEB-014: metrics required, no product. CURSOR-003: no unapproved analytics.

**Consequence:** no form backend, no tracking pixels, no CAPTCHA in this bootstrap.

## C-06 — WP01/WP02 still Draft vs WP03 Approved

WEB-005 says vendor choices remain implementation decisions. WP03 Rev B already selected them. Hierarchy (CURSOR-001) makes WP03 the stack authority; WP01/WP02 should be revised to “implemented by WEB-060” to avoid re-opening stack debates.

## C-07 — Design system documents overlap

WEB-004, WEB-025, and WEB-065 all claim design-system scope. Source of truth is WP04 after WEB-080 approval; until then there are three incomplete specs.
