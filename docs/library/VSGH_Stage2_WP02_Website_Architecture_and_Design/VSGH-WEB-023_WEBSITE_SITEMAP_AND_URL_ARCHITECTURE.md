---
document_id: VSGH-WEB-023
title: VSGH Website Sitemap and URL Architecture
document_type: Architecture
domain: Stage 2 / WP02 Website Architecture and Design
revision: B
status: Approved
classification: Internal
owner: UX/Information Architecture Authority
approver: Corporate Communications Authority
---

# VSGH-WEB-023 — Website Sitemap and URL Architecture

> **SITEMAP SUPERSEDED BY: VSGH-WEB-081.** The tree below is historical. Implementers shall use WEB-081 only. File retained.

## 1. Primary Sitemap

```text
/
├── about/
│   ├── company/
│   ├── vision/
│   ├── mission/
│   ├── scientific-integrity/
│   ├── quality/
│   ├── leadership/
│   └── facilities/
│
├── technology/
│   ├── advanced-materials/
│   ├── metallurgy/
│   ├── resource-recovery/
│   ├── refining/
│   ├── alloy-development/
│   ├── process-development/
│   ├── characterization/
│   └── qualification/
│
├── materials/
│
├── research/
│
├── applications/
│
├── sustainability/
│
├── insights/
│   ├── news/
│   ├── publications/
│   └── technical-insights/
│
├── careers/
│
└── contact/
```

## 2. URL Rules
- Lowercase
- Human-readable
- Stable
- Hierarchical
- No unnecessary query parameters for canonical content
- Permanent redirects for changed public URLs
- Canonical URL defined for indexable pages

## 3. Rule
URL architecture shall remain independent from internal database identifiers.
