---
document_id: VSGH-WEB-047
title: VSGH CDN WAF Edge and DDoS Protection Selection
document_type: Security/Infrastructure Evaluation
domain: Stage 2 / WP03 Technology Stack, Infrastructure and Development Environment
revision: A
status: SUPERSEDED
superseded_by: VSGH-WEB-060 (WP03 Revision B approved copy)
classification: Restricted
owner: Security Architecture Authority
approver: Security Authority
---

# VSGH-WEB-047 — CDN, WAF, Edge and DDoS Protection Selection


> **HISTORICAL / NON-AUTHORITATIVE.** SUPERSEDED by WP03 Revision B. Retain for history. Do not implement from this copy.

## 1. Objective
Select the edge security and delivery architecture for www.vsgh.com.

## 2. Functions
Evaluate:
- CDN
- WAF
- DDoS mitigation
- TLS termination
- Rate limiting
- Bot controls
- Caching
- Geographic performance
- Security logging

## 3. Architecture
Internet → DNS → Edge/CDN/WAF → Application.

## 4. Requirement
Origin infrastructure shall not be unnecessarily exposed.

## 5. Decision
The selected service shall support VSGH security, performance, availability, and observability requirements.
