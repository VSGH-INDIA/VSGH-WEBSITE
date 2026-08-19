> **SUPERSEDED / HISTORICAL.** WP03 Revision B is the approved technology baseline. This evaluation package shall not be used for implementation.

# VSGH Stage 2 — WP03
# Technology Stack, Infrastructure & Development Environment

## Purpose

WP03 converts the approved WP02 Website Architecture & Design into a concrete technology, infrastructure, security, repository, development, CI/CD, testing, monitoring, and recovery decision framework.

## Package Contents

1. WEB-041 — Technology Stack Selection Master Specification
2. WEB-042 — Frontend Framework and Application Stack Evaluation
3. WEB-043 — CMS Selection and Content Platform Evaluation
4. WEB-044 — Backend API and Service Runtime Selection
5. WEB-045 — Database and Data Storage Selection
6. WEB-046 — Hosting Platform and Compute Selection
7. WEB-047 — CDN/WAF/Edge/DDoS Protection Selection
8. WEB-048 — Domain/DNS/Certificate Implementation Specification
9. WEB-049 — Source Control Repository Architecture
10. WEB-050 — Development Environment Standard
11. WEB-051 — Environment Configuration and Secret Management
12. WEB-052 — CI/CD Pipeline Implementation Specification
13. WEB-053 — Test Automation and Quality Toolchain
14. WEB-054 — Observability, Logging and Monitoring
15. WEB-055 — Backup/Restore/Recovery Implementation
16. WEB-056 — Identity/Access/Administrative Security
17. WEB-057 — Dependency/SBOM/Supply Chain Security
18. WEB-058 — Technology Stack Decision Matrix
19. WEB-059 — Development Repository and Project Structure
20. WEB-060 — Technology and Development Baseline

## Known Domain Constraint

VSGH has purchased **vsgh.com through Hostinger**.

Canonical public website:
**https://www.vsgh.com**

The registrar choice does not automatically determine the application hosting architecture.

## Dependency

**Corporate Documentation Baseline**
→ **WP01 Website Implementation Specifications**
→ **WP02 Website Architecture & Design**
→ **WP03 Technology / Infrastructure / Development Baseline**
→ **WP04 UX/Visual Design & Prototype**
→ **Implementation**
→ **Verification**
→ **Security Testing**
→ **UAT**
→ **Production Release**

## Critical Principle

The public website remains isolated from VSGH sensitive internal systems.

No direct public trust relationship shall be established with:
- PLM
- LIMS
- ERP
- QMS
- IP repositories
- Engineering/R&D repositories
- Sensitive internal identity systems

unless separately approved.

## Technology Selection Principle

Technology choices shall be made through documented evaluation rather than preference or convenience.

## WP03 Gate

WEB-060 is the proposed technology/development baseline.

After its approval, the selected stack becomes the controlled implementation baseline for development.

## Status

Revision A — Draft.

No final technology selection is implied by this package. Candidate evaluation and formal decision are required before WEB-060 is approved.
