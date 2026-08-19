---
document_id: VSGH-WEB-056
title: VSGH Website Identity Access and Administrative Security Architecture
document_type: Security Architecture
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Security Architecture Authority
approver: Security Authority
---

# VSGH-WEB-056 — Identity, Access and Administrative Security Architecture


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Scope
Covers:
- Domain registrar
- DNS
- Hosting
- CMS
- Source control
- CI/CD
- Monitoring
- Cloud/provider consoles

## 2. Principles
- Least privilege
- MFA
- Named accounts
- No shared privileged credentials
- Separation of duties
- Periodic access review
- Prompt revocation

## 3. Privileged Access
Privileged access shall be restricted, logged, and reviewed.

## 4. Break-Glass
Emergency access shall have a controlled break-glass procedure.
