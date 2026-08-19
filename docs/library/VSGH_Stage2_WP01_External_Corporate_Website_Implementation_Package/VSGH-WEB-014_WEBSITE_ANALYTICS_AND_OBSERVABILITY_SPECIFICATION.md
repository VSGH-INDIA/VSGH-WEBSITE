---
document_id: VSGH-WEB-014
title: VSGH Website Analytics and Observability Specification
document_type: Specification
domain: Stage 2 / External Website
revision: B
status: Approved
classification: Restricted
owner: Digital Operations Authority
approver: Privacy/Data Authority
---

# VSGH-WEB-014 — Website Analytics and Observability Specification

## 1. Purpose
Measure website reliability, performance, usage, and business effectiveness while respecting privacy.

## 2. Operational Metrics
- Availability
- Response time
- Error rate
- Traffic
- Form failures
- Security events
- Deployment health

## 3. Business Metrics
Where appropriate:
- Qualified enquiries
- Technology enquiries
- Partnership enquiries
- Recruitment conversions
- Content engagement

## 4. Privacy
Analytics shall collect only information justified by the approved purpose and applicable requirements.

## 5. Monitoring
Security and operational alerts shall be separated from marketing analytics.

## 6. V1 analytics hold (VSGH-CURSOR-TASK-001)
**ANALYTICS: NOT APPROVED / NOT IMPLEMENTED.**

Do not add Google Analytics, Meta Pixel, Hotjar, session recording, behavioral tracking, or unapproved tracking scripts.

This is a V1 hold. It does not mean analytics is forbidden forever. A later controlled architecture decision may evaluate a privacy-respecting product.

Operational telemetry may use approved platform sources (Vercel, Cloudflare DNS, Sanity project activity) without marketing analytics.
