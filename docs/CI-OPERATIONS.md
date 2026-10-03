# CI operations

GitHub Actions runs the repository quality gate on pushes and pull requests, with manual dispatch available. The job uses a clean `npm ci`, then lint, typecheck, formatting check, tests, critical dependency audit, production build, SBOM creation, and SBOM artifact upload.

## Repository owner checklist

- Require the CI check before merging the production branch.
- Restrict who can change workflows, deployment configuration, and protected branches.
- Review failed build/audit output before retrying or bypassing a check.
- Retain SBOM artifacts according to the organization’s software-supply-chain policy.
- Add deployed E2E, accessibility, and performance checks only after they can run against an authenticated preview target without exposing secrets.

Local green checks do not confirm that GitHub Actions, Vercel, environment variables, or a public deployment are healthy. Verify those systems in their respective consoles for every release.
