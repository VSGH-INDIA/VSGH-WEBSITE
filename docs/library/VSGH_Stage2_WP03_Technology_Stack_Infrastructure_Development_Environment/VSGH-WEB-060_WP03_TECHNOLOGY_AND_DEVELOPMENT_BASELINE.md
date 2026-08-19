---
document_id: VSGH-WEB-060
title: VSGH Website Technology and Development Baseline
document_type: Baseline Specification
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Digital Architecture Authority
approver: Managing Authority
---

# VSGH-WEB-060 — Technology and Development Baseline


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Purpose
Establish the approved implementation technology and development environment baseline for the VSGH external website.

## 2. Baseline Inputs
This baseline shall incorporate approved versions of:
- WEB-041 Technology Stack Selection Master Specification
- WEB-042 Frontend Framework Evaluation
- WEB-043 CMS Evaluation
- WEB-044 Backend/API Runtime Selection
- WEB-045 Database/Data Storage Selection
- WEB-046 Hosting Selection
- WEB-047 CDN/WAF/Edge Selection
- WEB-048 Domain/DNS/TLS Implementation
- WEB-049 Repository Architecture
- WEB-050 Development Environment
- WEB-051 Secret Management
- WEB-052 CI/CD
- WEB-053 Test/Quality Toolchain
- WEB-054 Observability
- WEB-055 Backup/Recovery
- WEB-056 Identity/Administrative Security
- WEB-057 Supply Chain Security
- WEB-058 Technology Decision Matrix
- WEB-059 Repository/Project Structure

## 3. Mandatory Baseline Fields
The approved baseline shall identify:
- Domain
- DNS architecture
- Hosting platform
- Frontend framework
- CMS
- Backend/runtime
- Database
- Storage
- CDN/WAF
- Source control
- CI/CD
- Testing
- Monitoring
- Security tooling
- Development runtime
- Production runtime

## 4. Domain
Canonical website:
**https://www.vsgh.com**

Registrar:
**Hostinger**

## 5. Baseline Rule
Production development shall use only approved baseline technologies or formally approved deviations.

## 6. Change Control
Post-baseline technology changes shall be configuration-controlled and assessed for security, compatibility, cost, migration, and operational impact.

## 7. Gate
Approval of WEB-060 authorizes implementation against the technology baseline but does not by itself authorize public production launch.
