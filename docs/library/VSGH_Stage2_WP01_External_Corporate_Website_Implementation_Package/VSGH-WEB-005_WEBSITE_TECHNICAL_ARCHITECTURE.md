---
document_id: VSGH-WEB-005
title: VSGH Website Technical Architecture
document_type: Architecture
domain: Stage 2 / External Website
revision: B
status: DRAFT — REVIEW REQUIRED
classification: Restricted
owner: Digital Architecture Authority
approver: Security Authority
---

# VSGH-WEB-005 — Website Technical Architecture

## 1. Target Architecture

Internet → CDN/WAF → Web Application → CMS/API → Data/Media Storage.

## 2. Separation
The public website shall be logically and technically separated from sensitive VSGH internal systems.

## 3. Components
The architecture shall define:
- Frontend
- Backend/API
- CMS
- Database where required
- Media storage
- CDN
- WAF
- DNS
- TLS
- Monitoring
- Logging
- Backup
- CI/CD

## 4. Integration
External integrations shall use authenticated, least-privilege interfaces.

## 5. Internal Systems
No direct public access to:
- PLM
- LIMS
- ERP
- QMS
- IP repositories
- Engineering repositories
- Internal identity systems

unless a separately approved secure architecture explicitly requires it.

## 6. Technology Selection
Technology baseline superseded by VSGH WP03 Revision B (VSGH-WEB-060). Vendor and framework choices are **not** open implementation decisions for V1.

Approved V1 path: Hostinger registrar → Cloudflare DNS → Vercel Edge → Next.js 16.2.x → Sanity. Do not reopen technology selection from this document.
