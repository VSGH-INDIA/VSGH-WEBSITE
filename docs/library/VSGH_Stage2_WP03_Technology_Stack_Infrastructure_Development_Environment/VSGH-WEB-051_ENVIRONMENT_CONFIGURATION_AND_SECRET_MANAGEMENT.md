---
document_id: VSGH-WEB-051
title: VSGH Website Environment Configuration and Secret Management
document_type: Security Standard
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Security Architecture Authority
approver: Security Authority
---

# VSGH-WEB-051 — Environment Configuration and Secret Management


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Environment Classes
- Development
- Test
- Staging
- Production

## 2. Configuration
Environment-specific configuration shall be externalized and controlled.

## 3. Secrets
Secrets shall be stored in an approved secret-management mechanism.

## 4. Prohibited
- Secrets in Git
- Secrets in frontend bundles
- Shared production credentials
- Plaintext credentials in documentation

## 5. Rotation
Sensitive credentials shall support controlled rotation and revocation.
