# VSGH Stage 2 — WP03 APPROVED TECHNOLOGY BASELINE

## Status

**APPROVED — REVISION B** — this is the **only** authoritative WP03 technology baseline.

The sibling folder `VSGH_Stage2_WP03_Technology_Stack_Infrastructure_Development_Environment` is **SUPERSEDED / HISTORICAL**.

V1 sitemap is **not** defined here; see VSGH-WEB-081.

This package converts WEB-042 through WEB-060 from proposed technology decisions into the approved V1 website technology and development baseline.

## Approved Stack

- Domain: `vsgh.com`
- Registrar: Hostinger
- Canonical website: `https://www.vsgh.com`
- DNS: Cloudflare DNS
- Edge: Vercel Edge
- Frontend: Next.js 16.2.x
- React: 19.2.x
- Language: TypeScript
- Styling: Tailwind CSS + VSGH Design System
- CMS: Sanity Growth
- Backend: Next.js server/API capabilities
- Database V1: none separate from Sanity
- Future database: PostgreSQL reserved
- Hosting: Vercel Pro
- Source control: GitHub Team
- CI/CD: GitHub Actions + Vercel

## Architecture

Hostinger Registrar
→ Cloudflare DNS
→ Vercel Edge
→ Next.js
→ Sanity

The public website remains isolated from VSGH internal PLM, LIMS, QMS, ERP, MES, IP, and R&D systems.

## Current Gate

WP03 is now technically baselined.

The next work package may proceed to **WP04 — UX / Visual Design & Prototype**, using this approved technology baseline.

## Important

The exact dependency patch versions shall be pinned in the implementation repository and maintained through security-controlled dependency updates.

The technology baseline does not itself authorize production launch.
