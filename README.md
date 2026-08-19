# VSGH Website

Private implementation repository for the VSGH external corporate website.

**Stack (WEB-060 Rev B):** Next.js 16.2.x · React 19.2.x · TypeScript · Tailwind CSS · Sanity (not wired until a VSGH project exists) · Vercel · GitHub Actions.

This bootstrap satisfies VSGH-CURSOR-003. It does **not** authorize production launch or public indexing.

**V1 sitemap authority:** [WEB-081](docs/decisions/VSGH-WEB-081_V1_SITEMAP_AND_INFORMATION_ARCHITECTURE_DECISION_RECORD.md) (routes are **not** implemented yet).

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
