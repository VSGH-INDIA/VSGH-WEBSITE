---
document_id: VSGH-CURSOR-001
title: VSGH Cursor AI Website Implementation Governance Master Specification
document_type: Governance Specification
domain: Stage 2 / Cursor AI Implementation Governance
revision: B
status: Approved
classification: Restricted
owner: Digital Architecture Authority
approver: Managing Authority
---

# VSGH-CURSOR-001 — Cursor AI Website Implementation Governance Master Specification

## 1. Purpose

Define the rules under which Cursor AI may implement the VSGH external website.

## 2. Fundamental Principle

Cursor is an **implementation agent**, not the VSGH design authority, architecture authority, IP authority, security authority, or business authority.

Cursor shall implement approved requirements and shall not independently redefine them.

## 3. Governing Hierarchy

```text
VSGH Corporate Documentation Baseline
        ↓
Stage 2 Website Governance
        ↓
WP01
        ↓
WP02
        ↓
WP03 Approved Technology Baseline
        ↓
WP04 Frozen UX/Design *Requirements* Baseline (visual design not executed; V1 sitemap = WEB-081)
        ↓
Cursor Governance Package
        ↓
Implementation Task
        ↓
Cursor Code
```

## 4. Architecture Authority

ChatGPT, acting as the designated VSGH technical/design guidance layer for this project, translates governing requirements into controlled implementation tasks and reviews deviations.

## 5. Human Authority

Corporate/business/IP/legal/security approvals remain human decisions.

## 6. Non-Override Rule

Cursor shall not override a governing requirement merely because another implementation appears easier, newer, faster, or more popular.

## 7. Conflict Rule

If requirements conflict, Cursor shall stop the affected implementation task and report:
- Conflicting documents
- Conflicting clauses
- Affected files
- Technical consequences
- Proposed options

It shall not silently choose one.
