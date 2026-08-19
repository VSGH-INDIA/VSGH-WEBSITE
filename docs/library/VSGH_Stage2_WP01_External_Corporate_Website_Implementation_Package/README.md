# VSGH Stage 2 — Work Package 01
# External Corporate Website Implementation Package

## Status

**Approved** (package; VSGH-CURSOR-TASK-002). Technology: WP03 Revision B. V1 sitemap: WEB-081. Accessibility: WCAG 2.2 AA. Historical IA in WEB-002 is superseded by WEB-081.

## Purpose

This package establishes the specification and governance foundation required to design, build, verify, deploy, and operate the VSGH external corporate website.

It is intentionally separate from the already-approved VSGH Corporate Documentation Baseline. These are implementation-level artefacts derived from that baseline.

## Package Contents

1. VSGH-WEB-001 — External Corporate Website Master Specification
2. VSGH-WEB-002 — Website Information Architecture
3. VSGH-WEB-003 — Website Content Architecture and Content Model
4. VSGH-WEB-004 — Website Brand Visual and Design System Specification
5. VSGH-WEB-005 — Website Technical Architecture
6. VSGH-WEB-006 — Website Security Architecture and Threat Model
7. VSGH-WEB-007 — IP, Trade Secret and Technical Disclosure Control
8. VSGH-WEB-008 — Content Approval and Publication Workflow
9. VSGH-WEB-009 — Website Privacy and Data Governance Specification
10. VSGH-WEB-010 — Website CMS Requirements Specification
11. VSGH-WEB-011 — Hosting Infrastructure and Deployment Requirements
12. VSGH-WEB-012 — SEO Search and Discoverability Specification
13. VSGH-WEB-013 — Accessibility and Usability Requirements
14. VSGH-WEB-014 — Analytics and Observability Specification
15. VSGH-WEB-015 — Backup Disaster Recovery and Business Continuity Plan
16. VSGH-WEB-016 — Website Test and Verification Plan
17. VSGH-WEB-017 — Deployment Release and Rollback Procedure
18. VSGH-WEB-018 — Change Configuration and Version Control Standard
19. VSGH-WEB-019 — Operations Maintenance and Lifecycle Plan
20. VSGH-WEB-020 — Website Launch Readiness and Acceptance Checklist

## Implementation Sequence

**Corporate Baseline**
→ **Website Requirements**
→ **Information Architecture**
→ **Content Model**
→ **Brand/UX**
→ **Technical Architecture**
→ **Security Architecture**
→ **IP/Disclosure Controls**
→ **CMS/Infrastructure Selection** (completed by WP03 Revision B; do not reopen)
→ **Design**
→ **Development**
→ **Content Population**
→ **Verification**
→ **Security Testing**
→ **IP/Legal Approval**
→ **UAT**
→ **Launch**
→ **Operations**

## Critical Security Boundary

The public website shall remain isolated from VSGH sensitive internal systems.

The website must not become a gateway into:
- PLM
- LIMS
- ERP
- QMS
- IP repositories
- Engineering repositories
- Sensitive R&D environments

unless a separately approved secure integration architecture exists.

## Critical IP Principle

The website communicates VSGH's **capabilities, technology domains, materials philosophy, research direction, and approved achievements**.

It shall not disclose protected:
- formulations
- process parameters
- process windows
- unpublished experimental data
- engineering drawings
- source code
- customer information
- confidential supplier information
- unreleased inventions

## Content Release Principle

**Create → Technical Review → IP Review → Legal Review → Security Review where applicable → Communications Approval → Publish → Monitor → Review**

## Relationship to Phase 27

Phase 27 closed the corporate documentation architecture.

This package does not reopen that baseline. It implements one external-facing system under the approved architecture.

## Next Work

The next execution work should be:

1. Review and approve the website implementation specifications.
2. Define VSGH website visual direction and sitemap in detail.
3. Select the technical stack and hosting architecture.
4. Build the development environment.
5. Implement the website page-by-page.
6. Populate approved content.
7. Execute verification and security testing.
8. Conduct final IP/legal/publication review.
9. Launch only after VSGH-WEB-020 is satisfied.

## Status

Revision A — Draft.

No production deployment is authorized solely by approval of these documents; implementation must satisfy the verification and launch controls.
