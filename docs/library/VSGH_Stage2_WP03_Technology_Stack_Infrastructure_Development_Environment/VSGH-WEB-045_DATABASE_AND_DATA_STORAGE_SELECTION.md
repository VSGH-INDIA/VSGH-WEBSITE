---
document_id: VSGH-WEB-045
title: VSGH Website Database and Data Storage Selection
document_type: Technology Evaluation
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Data Architecture Authority
approver: Digital Architecture Authority
---

# VSGH-WEB-045 — Database and Data Storage Selection


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Objective
Select storage technologies for public website content and operational data.

## 2. Data Classes
- CMS content
- Media metadata
- Contact enquiries
- Configuration
- Operational telemetry
- Analytics data where retained

## 3. Requirements
- Encryption
- Backup
- Recovery
- Access control
- Integrity
- Availability
- Migration capability
- Monitoring

## 4. Separation
Public website data shall remain separated from VSGH internal engineering datasets.

## 5. Decision
Database technology shall be selected based on actual workload and CMS/application requirements rather than unnecessary complexity.
