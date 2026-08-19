---
document_id: VSGH-CURSOR-005
title: VSGH Cursor Design System and UI Implementation Standard
document_type: UI Implementation Standard
domain: Stage 2 / Cursor AI
revision: B
status: Approved
classification: Restricted
owner: Digital Experience Authority
approver: Software Architecture Authority
---

# VSGH-CURSOR-005 — Design System and UI Implementation

## 1. Source of Truth

WP04 is the governing UX/design **requirements** baseline (WEB-080). It is not evidence that final visual design, brand tokens, or a high-fidelity prototype already exist.

V1 sitemap authority: VSGH-WEB-081.

## 2. Implementation

Cursor shall implement:
- Central design tokens
- Typography
- Color roles
- Spacing
- Grid
- Component states
- Responsive behavior
- Motion rules
- Accessibility states

## 3. Components

Components shall be reusable and composable.

## 4. No Page-Specific Drift

Do not create visually inconsistent one-off components when an approved component/pattern already exists.

## 5. Visual Fidelity

Implementation shall match the approved prototype **once the prototype is supplied**. Until then, do not invent final brand tokens. Any CSS in the implementation repo is **PROVISIONAL — NOT FINAL VSGH BRAND TOKENS**.

## 6. Accessibility

UI implementation shall target WCAG 2.2 AA.
