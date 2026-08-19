---
document_id: VSGH-WEB-050
title: VSGH Website Development Environment Standard
document_type: Standard
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Internal
owner: Software Architecture Authority
approver: Digital Architecture Authority
---

# VSGH-WEB-050 — Development Environment Standard


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Objective
Ensure reproducible developer environments.

## 2. Requirements
Define and control:
- Runtime version
- Package manager
- Dependency versions
- Environment variables
- Local services
- Formatting
- Linting
- Testing
- Build commands
- Documentation

## 3. Reproducibility
A new authorized developer shall be able to create a working environment using controlled instructions.

## 4. Local Secrets
Development secrets shall be separated from production secrets.

## 5. Tooling
The selected development toolchain shall support automated quality and security checks.
