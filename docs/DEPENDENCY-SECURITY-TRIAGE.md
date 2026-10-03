# Dependency security triage

Audit date: 2026-10-03. `npm audit --json` reported **0 critical, 14 high, and 5 moderate** findings in the dependency tree.

## Release decision

There are no critical findings and the production-only audit must remain green. High/moderate findings are not ignored: they are tracked as a time-boxed remediation item because the proposed automatic remediation requires incompatible major changes to the installed Sanity/Vitest tooling chain. No `npm audit fix --force` was run.

| Surface                         | Finding class                                                         | Why no blind upgrade was applied                                                                                                                   | Owner action / expiry                                                         |
| ------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Sanity Studio development chain | High transitive tooling findings (including archive/glob parser path) | Current Studio is `sanity@4.22.1`; moving to newer major packages requires a Studio, plugin, schema, preview and hosted-Studio compatibility test. | Platform owner: schedule tested Studio major migration; review by 2026-11-03. |
| Vitest / Vite development chain | Moderate dependency finding                                           | The suggested repair changes the test-runner major and must be validated against existing Vite/Studio peers.                                       | Engineering owner: test an isolated Vitest upgrade; review by 2026-11-03.     |
| Public runtime                  | No critical audit finding recorded                                    | Continue to run `npm audit --omit=dev --audit-level=critical` in release checks.                                                                   | Block release on any critical production finding.                             |

## Compensating controls

- The public Next runtime does not ship the Studio UI bundle.
- Studio is hosted separately and requires authenticated access.
- CI blocks critical vulnerabilities, uploads an SBOM, and retains the non-blocking high audit output for review.
- Dependency lock changes require typecheck, tests, production build, Studio build, and browser smoke verification before merge.

This is not a permanent waiver. A finding that becomes exploitable in the deployed public runtime, or any critical finding, is a release blocker.
