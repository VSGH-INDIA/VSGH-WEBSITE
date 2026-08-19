# VSGH website documentation index

Canonical git repository: **VSGH-WEBSITE** (`/Users/vaibhavkumarn/Desktop/VSGH/VSGH-WEBSITE`).

Source documentation library (not this git root):  
`/Users/vaibhavkumarn/Desktop/VSGH/VSGH WEBSITE `  
(folder name has a **trailing space**; do not treat that path as the canonical repo name).

See [PATHS.md](PATHS.md) and [HIERARCHY.md](HIERARCHY.md).

## Authoritative documents

| Authority                        | Document                                                                                     | Status                             |
| -------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| Technology                       | WP03 Revision B / WEB-060                                                                    | **APPROVED**                       |
| UX / design **requirements**     | WP04 / WEB-080                                                                               | **FROZEN — REQUIREMENTS BASELINE** |
| V1 sitemap / IA                  | [WEB-081](decisions/VSGH-WEB-081_V1_SITEMAP_AND_INFORMATION_ARCHITECTURE_DECISION_RECORD.md) | **APPROVED**                       |
| Cursor implementation governance | CURSOR-020                                                                                   | **APPROVED / BASELINE**            |
| Conflict register                | [CONFLICTS.md](CONFLICTS.md)                                                                 | Controlled record                  |
| Corporate approval audit         | [CAR-025](decisions/VSGH-CAR-025_CORPORATE_DOCUMENTATION_APPROVAL_STATUS_AUDIT.md)           | **DRAFT — REVIEW REQUIRED**        |

## Governing hierarchy (summary)

0. VSGH Corporate Documentation Baseline
1. Stage 2 Website Governance
2. WP01 — Website requirements / master specification
3. WP02 — Website architecture / UX architecture
4. **WP03 Revision B — Approved technology baseline**
5. **WP04 — Frozen UX / visual design _requirements_ baseline**
6. Cursor AI Website Implementation Governance Rev A
7. Individual implementation tasks

A lower-level document shall not override a higher-level approved baseline. WEB-081 governs V1 sitemap even where WP01/WP02/WP04 still contain historical IA trees.

## Corporate documentation

Phases 0–27 live in the documentation library. They are **not** bulk-approved.

Status audit: [CAR-025](decisions/VSGH-CAR-025_CORPORATE_DOCUMENTATION_APPROVAL_STATUS_AUDIT.md).

**ID note:** Task VSGH-CURSOR-TASK-001 asked for `VSGH-CAR-003` as this audit. That ID is already **VSGH-CAR-003 — Documentation Hierarchy and Supremacy Standard**. This audit is issued as **VSGH-CAR-025** to avoid a duplicate ID.

## Stage 2 website

| Package          | Library folder                                                             | Authority                                                  |
| ---------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| WP01             | `VSGH_Stage2_WP01_External_Corporate_Website_Implementation_Package`       | Requirements; **DRAFT — REVIEW REQUIRED** at package level |
| WP02             | `VSGH_Stage2_WP02_Website_Architecture_and_Design`                         | Architecture; **DRAFT — REVIEW REQUIRED** at package level |
| WP03 Rev B       | `VSGH_Stage2_WP03_APPROVED_Technology_Baseline_REV_B`                      | **APPROVED technology authority**                          |
| WP03 evaluation  | `VSGH_Stage2_WP03_Technology_Stack_Infrastructure_Development_Environment` | **SUPERSEDED / HISTORICAL**                                |
| WP04             | `VSGH_Stage2_WP04_UX_Visual_Design_Prototype`                              | **FROZEN requirements**; visual execution not done         |
| Decision records | this repo `docs/decisions/`                                                | WEB-081, CAR-025                                           |

## Cursor governance

Library folder: `VSGH_CURSOR_AI_WEBSITE_IMPLEMENTATION_GOVERNANCE_REV_A`  
Authority: **CURSOR-020**.

## Decision records

- [WEB-081](decisions/VSGH-WEB-081_V1_SITEMAP_AND_INFORMATION_ARCHITECTURE_DECISION_RECORD.md)
- [CAR-025](decisions/VSGH-CAR-025_CORPORATE_DOCUMENTATION_APPROVAL_STATUS_AUDIT.md)

## Historical / superseded

WP03 evaluation package (WEB-041–WEB-060 Draft copies) — **SUPERSEDED** by WP03 Revision B. Files are retained.

IA trees in WEB-002, WEB-023, WEB-062 — **SUPERSEDED** (IA portions) by WEB-081. Files are retained.

## Implementation repository docs

- [SETUP.md](SETUP.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [CMS.md](CMS.md)
- [SECURITY.md](SECURITY.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
