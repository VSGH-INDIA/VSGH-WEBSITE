# Specification conflict register

Controlled record for VSGH-CURSOR-TASK-001. Historical analysis is retained below the resolution table.

**Date:** 2026-08-19  
**Revision:** C (TASK-002 corporate status approval recorded)

TASK-002 did not reopen C-01–C-07. WP01/WP02 were status-approved after consistency review. Residual historical IA text remains in WEB-002/WEB-023/WEB-062 and is governed by WEB-081. WP04 visual execution remains unexecuted (C-02 remaining action).

## Resolution summary

| ID   | Original conflict                                         | Affected documents                       | Decision                                                                                                                           | Governing document                 | Status                        | Remaining action                                          |
| ---- | --------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------- | --------------------------------------------------------- |
| C-01 | Three incompatible sitemaps                               | WEB-002, WEB-023, WEB-062                | New V1 tree; do not silently edit one of the three into “the” sitemap                                                              | **WEB-081** (APPROVED)             | **Resolved (documentation)**  | Do not implement routes until a later task                |
| C-02 | WP04 called frozen vs Draft; no prototype                 | CURSOR-001/005, WEB-080, WP04 README     | WP04 is **FROZEN as requirements/governance**, not as executed visual design                                                       | WEB-080 Rev B                      | **Resolved (terminology)**    | Visual design / tokens / prototype remain unexecuted      |
| C-03 | Two WP03 trees, duplicate WEB-041–060 IDs                 | WP03 evaluation folder vs **WP03 Rev B** | Rev B is authoritative; evaluation copies marked **SUPERSEDED** (retained)                                                         | WEB-060 Rev B                      | **Resolved**                  | Humans should ignore evaluation folder for implementation |
| C-04 | Accessibility target unnamed vs 2.2 AA                    | WEB-013, WEB-038, WEB-071, CURSOR-005    | V1 target frozen as **WCAG 2.2 AA**                                                                                                | WEB-038 Rev B, WEB-071, CURSOR-005 | **Resolved**                  | Verification evidence still required later                |
| C-05 | Email / analytics / CAPTCHA / CRM unset                   | WEB-014, WEB-036, WEB-058, CURSOR-003    | Analytics **not approved / not implemented**. Email **TBD**. CAPTCHA **not selected**. CRM **not selected**. Not “never required.” | WEB-036 Rev B, WEB-058             | **Resolved (explicit holds)** | Later ADRs if VSGH evaluates vendors                      |
| C-06 | WP01 said stack is still an implementation decision       | WEB-005, WP01 README                     | Obsolete. **WP03 Revision B** is the technology baseline                                                                           | WEB-005 Rev B, WEB-060             | **Resolved**                  | Do not reopen stack selection                             |
| C-07 | Grayscale tokens vs brand; overlapping design-system docs | tokens.css, WEB-004, WEB-025, WEB-065    | Tokens labeled **PROVISIONAL — NOT FINAL VSGH BRAND TOKENS**. Final identity is a later phase                                      | WEB-065, tokens.css                | **Resolved (labeling)**       | Dedicated visual design task                              |

C-01 reference: [WEB-081](decisions/VSGH-WEB-081_V1_SITEMAP_AND_INFORMATION_ARCHITECTURE_DECISION_RECORD.md).

---

## Historical analysis (bootstrap, retained)

Cursor shall not silently pick a winner (VSGH-CURSOR-001 §7). Bootstrap used only the **approved WP03 Rev B** technology stack. The items below originally blocked further product UI.

### C-01 — Information architecture (blocks routes)

| Source         | Status | Structure                                                                                                                                                                                                                                                                               |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WEB-002 (WP01) | Draft  | Top-level Materials, R&D, Applications, Insights. About includes Vision, Mission, Scientific Integrity, Quality, Leadership, Facilities, Corporate Structure. Technology has eight capability pages.                                                                                    |
| WEB-023 (WP02) | Draft  | URLs: `/about/*`, `/technology/*`, `/materials`, `/research`, `/applications`, `/sustainability`, `/insights/*`, `/careers`, `/contact`. About has vision and mission as separate URLs.                                                                                                 |
| WEB-062 (WP04) | Draft  | About drops Scientific Integrity, Quality, Corporate Structure; merges Vision & Mission. Technology becomes five items including Processing and Applications. Top-level **Aerospace & Advanced Applications**. **News / Insights**. No top-level Materials. R&D instead of `/research`. |

**Original consequence:** Implementing either sitemap would override the others. No public routes beyond `/` until Corporate Communications / UX Architecture names the governing IA.

**Original options:** (A) Freeze WEB-023 URLs and revise WP04 to match. (B) Freeze WEB-062 and issue a WEB-023 revision. (C) Produce a new approved sitemap that supersedes both.

**Decision taken:** (C) via WEB-081. Routes still not implemented.

### C-02 — WP04 is not a frozen _visual_ baseline

CURSOR-001 and CURSOR-005 treat WP04 as the frozen UX baseline. WEB-080 originally stated Draft until design, IP, accessibility, and management approval. No high-fidelity prototype was supplied.

WEB-065 defines token **roles** only — no approved hex values or typefaces.

**Decision taken:** Terminology corrected: frozen **requirements**, not executed design.

### C-03 — Duplicate WP03 packages

`VSGH_Stage2_WP03_Technology_Stack_Infrastructure_Development_Environment` (evaluation; README said no final selection) sits beside `VSGH_Stage2_WP03_APPROVED_Technology_Baseline_REV_B` (Approved).

**Decision taken:** Evaluation package marked SUPERSEDED; files retained.

### C-04 — Accessibility target

WEB-071 and CURSOR-005: WCAG 2.2 AA. WEB-038: select later. WEB-013: no version named.

**Decision taken:** WCAG 2.2 AA frozen for V1.

### C-05 — Email / forms / analytics vendors unset

WEB-058: corporate email architecture **TBD**. WEB-036: analytics, CAPTCHA, CRM as candidates. WEB-014: metrics, no product. CURSOR-003: no unapproved analytics.

**Decision taken:** Explicit V1 holds; no vendors installed.

### C-06 — WP01 technology language

WEB-005 said vendor/framework choices remain implementation decisions. WP03 Rev B already selected them.

**Decision taken:** WEB-005 updated; stack not reopened.

### C-07 — Design tokens / design-system overlap

WEB-004, WEB-025, and WEB-065 all claim design-system scope. Repository CSS uses grayscale placeholders.

**Decision taken:** Label provisional tokens; do not invent brand.
