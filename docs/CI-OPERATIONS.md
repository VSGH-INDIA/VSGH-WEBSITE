# CI operations

GitHub Actions runs the repository quality gate on pushes and pull requests, with manual dispatch available. The job uses a clean `npm ci`, then lint, typecheck, formatting check, unit tests, the Sanity Studio build, production build, desktop/mobile Playwright E2E, axe accessibility scans, critical dependency audit, SBOM creation, and release-evidence artifact upload.

## Repository owner checklist

- Require the CI check before merging the production branch.
- Restrict who can change workflows, deployment configuration, and protected branches.
- Review failed build/audit output before retrying or bypassing a check.
- Retain SBOM artifacts according to the organization’s software-supply-chain policy.
- The manual **Lighthouse budget check** accepts an explicit public HTTPS URL and uses PageSpeed Insights; it does not need CMS or deployment secrets. Record its output alongside the release.

Local green checks do not confirm that GitHub Actions, Vercel, environment variables, or a public deployment are healthy. Verify those systems in their respective consoles for every release.
