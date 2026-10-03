# VSGH Website

Implementation repository for the VSGH external corporate website.

**Stack:** Next.js 16.3.8 · React 19.2.x · TypeScript · Tailwind CSS · Sanity · Vercel · GitHub Actions.

The public-site application includes the V1 route set, CMS-backed content resolution with static fallbacks, preview/revalidation endpoints, public sitemap/robots generation, and an interactive homepage capability navigator. It does not invent business facts, contact channels, customer claims, or technical results.

**V1 sitemap authority:** [WEB-081](docs/decisions/VSGH-WEB-081_V1_SITEMAP_AND_INFORMATION_ARCHITECTURE_DECISION_RECORD.md). Public indexing is enabled in source; production publication still requires the release gates below.

**Design tokens in `src/styles/tokens.css`:** PROVISIONAL — NOT FINAL VSGH BRAND TOKENS.

## Setup

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run format:check
npm test
npm run build
```

## Release gates

The repository is not evidence that the public domain has been deployed. Before a production release, complete and record:

- Approved photography, company/contact details, and any legal/privacy content.
- A real public enquiry channel with recipient, spam protection, privacy/retention policy, and delivery testing.
- Sanity administrator, MFA, editorial workflow, deployed Studio, preview credentials, and revalidation webhook.
- Vercel/Cloudflare/domain configuration, production environment secrets, preview/UAT, and release approval.
- E2E, accessibility, and performance verification against the actual deployment.

See [launch readiness](docs/LAUNCH-READINESS.md) for the operational checklist.

## Documentation

- [Documentation index](docs/INDEX.md)
- [Setup](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [CMS](docs/CMS.md)
- [Security](docs/SECURITY.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Specification conflicts](docs/CONFLICTS.md) — **read before adding pages**

## Rules

- Do not connect PLM, LIMS, ERP, QMS, or engineering repositories.
- Do not add analytics or third-party trackers without an approved integration.
- Do not publish proprietary process data, formulations, or unpublished results.
- Secrets never go in Git.
