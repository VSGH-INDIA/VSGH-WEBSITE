---
document_id: VSGH-WEB-057
title: VSGH Website Software Dependency SBOM and Supply Chain Security Standard
document_type: Security Standard
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Software Security Authority
approver: Security Authority
---

# VSGH-WEB-057 — Software Dependency, SBOM and Supply Chain Security Standard


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Objective
Control third-party software risk.

## 2. Requirements
Where technically applicable:
- Dependency pinning
- Lock files
- Vulnerability scanning
- License review
- Secret scanning
- SBOM generation
- Dependency update process
- End-of-life monitoring

## 3. Critical Vulnerabilities
Critical vulnerabilities affecting production shall be assessed immediately and remediated according to risk.

## 4. Provenance
Production artifacts shall be traceable to controlled source and dependency versions.
