# Setup

## Runtime

- Node.js 20.9 or later (`.nvmrc` pins major 20 for CI)
- npm 10 or later
- Git

## Install

```bash
npm ci
cp .env.example .env.local
```

`.env.local` is gitignored. Fill Sanity values only after a VSGH Sanity project is provisioned.

## Commands

| Command             | Purpose                |
| ------------------- | ---------------------- |
| `npm run dev`       | Local Next.js server   |
| `npm run build`     | Production build       |
| `npm start`         | Serve production build |
| `npm run lint`      | ESLint                 |
| `npm run typecheck` | `tsc --noEmit`         |
| `npm test`          | Vitest                 |
| `npm run format`    | Prettier write         |
| `npm run sbom`      | CycloneDX SBOM         |

## CMS

Sanity Studio must not be mounted on the public site. Local studio setup is deferred until project IDs exist. See `docs/CMS.md`.
