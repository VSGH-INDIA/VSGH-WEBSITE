---
document_id: VSGH-WEB-049
title: VSGH Website Source Control and Repository Architecture
document_type: Software Architecture
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Software Architecture Authority
approver: Digital Architecture Authority
---

# VSGH-WEB-049 — Source Control and Repository Architecture


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Objective
Define controlled source-code management for the website.

## 2. Repository
The website shall use a controlled version-control repository.

## 3. Recommended Logical Areas
- Application source
- Components
- Content schemas
- Infrastructure configuration
- Tests
- Documentation
- CI/CD configuration

## 4. Security
Repositories shall enforce:
- MFA
- Protected branches
- Code review
- Secret scanning
- Access control
- Audit logging

## 5. Secrets
Secrets shall not be committed to source control.

## 6. Release
Production releases shall be traceable to immutable or uniquely identifiable source revisions.
