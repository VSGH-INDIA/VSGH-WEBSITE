---
document_id: VSGH-WEB-048
title: VSGH Domain DNS and Certificate Implementation Specification
document_type: Infrastructure Specification
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Infrastructure Authority
approver: Security Authority
---

# VSGH-WEB-048 — Domain, DNS and Certificate Implementation Specification


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Domain
Primary registered domain:
**vsgh.com**

Canonical public website:
**www.vsgh.com**

Registrar:
**Hostinger**

## 2. Canonicalization
vsgh.com shall redirect to the canonical website origin unless an approved alternative is established.

## 3. DNS
DNS records shall be:
- Documented
- Minimal
- Controlled
- Auditable

## 4. TLS
Production website traffic shall use valid TLS certificates and secure configuration.

## 5. Administrative Security
Registrar and DNS administrative accounts shall use MFA and controlled access.

## 6. Changes
DNS changes shall be configuration-controlled.
