---
document_id: VSGH-WEB-058
title: VSGH Website Technology Stack Decision Matrix
document_type: Decision Matrix
domain: Stage 2 / WP03
revision: C
status: Approved
classification: Restricted
owner: Digital Architecture Authority
approver: Managing Authority
---

# VSGH-WEB-058 — Technology Stack Decision Matrix

## 1. Approved Decisions

| Layer | Selected Technology | Decision |
|---|---|---|
| Domain | vsgh.com | SELECTED |
| Registrar | Hostinger | SELECTED |
| Canonical website | www.vsgh.com | SELECTED |
| DNS | Cloudflare DNS | SELECTED |
| Edge/CDN | Vercel Edge | SELECTED |
| Frontend | Next.js 16.2.x | SELECTED |
| React | 19.2.x | SELECTED |
| Language | TypeScript | SELECTED |
| Styling | Tailwind CSS + VSGH Design System | SELECTED |
| CMS | Sanity | SELECTED |
| CMS Plan | Growth | SELECTED |
| Backend | Next.js server/API capabilities | SELECTED |
| Database V1 | None separate from CMS | SELECTED |
| Future relational DB | PostgreSQL | RESERVED |
| Hosting | Vercel Pro | SELECTED |
| Source control | GitHub Team | SELECTED |
| CI/CD | GitHub Actions + Vercel | SELECTED |
| Monitoring | Platform + application monitoring | SELECTED |
| Email | Separate corporate email architecture | TBD |

## 2. Decision Basis

Primary weighting:
- Security — 20%
- Maintainability — 15%
- Performance — 15%
- Reliability — 10%
- Developer productivity — 10%
- Scalability — 10%
- Cost/TCO — 10%
- Portability/vendor independence — 10%

## 3. Architecture Principle

The selected stack provides a strong V1 balance of security, performance, maintainability, operational simplicity and future extensibility without unnecessary enterprise complexity.

## 4. Exceptions

Any deviation from the selected stack requires documented architecture review and approval.

## 5. V1 deferred integrations (VSGH-CURSOR-TASK-001)

These rows are **not** technology-stack reopenings. They record V1 holds:

| Item | V1 status | Notes |
| --- | --- | --- |
| Marketing analytics | NOT APPROVED / NOT IMPLEMENTED | Not “never required.” |
| Contact email architecture | TBD / NOT SELECTED | Do not pick a vendor in code until an ADR exists. |
| CAPTCHA | NOT SELECTED | |
| CRM | NOT SELECTED | |
| Contact form backend | NOT IMPLEMENTED | |

Do not add Google Analytics, Meta Pixel, Hotjar, session recording, or unapproved tracking.
