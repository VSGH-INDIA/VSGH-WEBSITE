---
document_id: VSGH-WEB-081
title: VSGH V1 Sitemap and Information Architecture Decision Record
document_type: Decision Record
domain: Stage 2 / Website Information Architecture
revision: A
status: APPROVED
classification: Internal
owner: Corporate Communications Authority
approver: Digital Experience Authority
effective_date: 2026-08-19
authority: VSGH-CURSOR-TASK-001
---

# VSGH-WEB-081 — V1 Sitemap and Information Architecture Decision Record

## 1. Purpose

Establish the single authoritative V1 public sitemap and information architecture for the VSGH external corporate website.

## 2. Approval

**Status: APPROVED — Revision A**

Approval authority for this decision record is delegated by controlled implementation task **VSGH-CURSOR-TASK-001**. This is a sitemap/IA baseline decision. It does not approve production launch, visual design, brand tokens, or page implementation.

## 3. Decision

The V1 public information architecture shall be the tree in §5. No other sitemap shall be used for V1 route planning.

## 4. Documents superseded (IA portions only)

This record **supersedes the conflicting information-architecture / sitemap portions** of:

| Document     | Package | What is superseded                                                                   |
| ------------ | ------- | ------------------------------------------------------------------------------------ |
| VSGH-WEB-002 | WP01    | Primary navigation and About / Technology / Materials / R&D / Applications structure |
| VSGH-WEB-023 | WP02    | Primary sitemap and URL tree                                                         |
| VSGH-WEB-062 | WP04    | Primary information architecture tree                                                |

Those documents are **retained** (not deleted). Non-IA content (principles, journeys, content rules, IP rules) remains in force unless a later record says otherwise.

**SUPERSEDED BY:** VSGH-WEB-081 (this document), for sitemap and public URL architecture only.

## 5. Approved V1 sitemap

```text
/
├── about/
│   ├── company
│   ├── vision
│   ├── mission
│   ├── leadership
│   ├── scientific-integrity
│   ├── quality
│   └── facilities
│
├── materials/
│   ├── overview
│   ├── material-development
│   ├── metallurgy
│   ├── processing
│   └── qualification
│
├── technology/
│   ├── resource-recovery
│   ├── purification
│   ├── alloy-development
│   ├── advanced-materials
│   └── manufacturing
│
├── applications/
│   ├── aerospace
│   ├── defense
│   ├── space
│   └── advanced-industrial
│
├── research/
│   ├── overview
│   ├── research-areas
│   └── publications
│
├── sustainability/
│
├── insights/
│
├── careers/
│
└── contact/
```

## 6. URL rules

- Lowercase, hyphenated, hierarchical, stable public paths.
- Canonical production origin: `https://www.vsgh.com`.
- No public route shall be implemented until a later implementation task authorizes it.
- Indexable URLs shall not depend on internal database identifiers.

## 7. Explicitly not in V1 top-level navigation

The following appeared in earlier drafts and are **not** V1 top-level items unless later authorized:

- Combined “Vision & Mission” as a single node (V1 uses `/about/vision` and `/about/mission`)
- `/about/corporate-structure`
- Top-level “Aerospace & Advanced Applications” (V1 uses `/applications/aerospace` and siblings)
- `/technology/characterization` as a top-level technology child (characterization remains a capability to be described inside approved pages, not a V1 URL)
- `/research` vs `/rd` naming: V1 uses `/research`
- Insights children (`/insights/news`, publications, technical-insights) are not frozen in this record; `/insights/` is the V1 node

## 8. Implementation hold

**NO WEBSITE PAGE IMPLEMENTATION is authorized by this record.**

Routes listed here are documentation only until a subsequent Cursor task is issued.

## 9. Related authorities

- Technology stack: WP03 Revision B (WEB-060) — unchanged
- UX requirements baseline: WP04 / WEB-080 — frozen as requirements, not as executed visual design
- Cursor governance: CURSOR-020
