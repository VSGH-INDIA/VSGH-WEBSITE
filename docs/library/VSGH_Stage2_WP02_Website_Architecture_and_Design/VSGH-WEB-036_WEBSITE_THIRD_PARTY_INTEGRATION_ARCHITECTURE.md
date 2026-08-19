---
document_id: VSGH-WEB-036
title: VSGH Website Third Party Integration Architecture
document_type: Integration Architecture
domain: Stage 2 / WP02 Website Architecture and Design
revision: B
status: DRAFT — REVIEW REQUIRED
classification: Restricted
owner: Digital Architecture Authority
approver: Security Authority
---

# VSGH-WEB-036 — Third-Party Integration Architecture

## 1. Candidate Integrations
- Analytics
- Email
- CAPTCHA/bot protection
- CRM
- Careers/HR
- Search
- Maps
- Monitoring
- CDN/WAF
- Social publishing where required

## 2. Integration Classification
Each integration shall be classified:
- Required
- Optional
- Prohibited
- Pending assessment

## 3. Review
Third parties shall be assessed for:
- Security
- Privacy
- Data location
- Availability
- Contractual terms
- Vendor dependency
- Exit strategy

## 4. Principle
Third-party convenience shall not override VSGH security, privacy, IP, or continuity requirements.

## 5. V1 integration status (VSGH-CURSOR-TASK-001)

| Integration | V1 status | Meaning |
| --- | --- | --- |
| Marketing analytics | NOT APPROVED / NOT IMPLEMENTED | Do not install. Not “never required.” |
| Contact email provider | TBD / NOT SELECTED | Do not select a vendor in implementation tasks until an ADR exists. |
| CAPTCHA / bot protection | NOT SELECTED | Do not install. |
| CRM | NOT SELECTED | Do not integrate. |
| Contact backend | NOT IMPLEMENTED | Forms shall not be wired until authorized. |
| CDN/WAF/monitoring | Selected via WP03 Rev B | Cloudflare DNS + Vercel Edge + platform telemetry |

“Not selected” means no V1 product is chosen. It does not mean the capability is prohibited forever.
