# CMS publishing validation record

Status on 2026-10-03: **code and dry-run validated; controlled production publish blocked by owner-held credentials and approval authority.** No test content has been created or left in the production dataset.

## Evidence completed in this repository

- Published queries require `lifecycle == "published"`; preview queries exclude only archived content.
- Draft preview uses a server-only read token, validates Sanity’s preview secret, permits only known public routes, sends `Cache-Control: private, no-store`, and applies `noindex`.
- The seed script performed a no-write dry run and listed seven documents. Its apply mode creates missing documents only.
- Unit tests cover lifecycle filtering, route allowlisting, preview-secret flow, header restrictions, and role helpers.

## Controlled production test procedure

This test must be performed by an authorized Publisher with a written approval reference and a configured webhook. Use a reversible, approved non-material wording change—not a fabricated article, customer, certification, or test announcement.

1. Record operator, date, Sanity document ID, current revision, source approval reference, Vercel deployment ID, and expected public route.
2. Change the approved wording in Studio and set lifecycle to Review. Confirm the public route still shows the prior published text.
3. Obtain technical/IP approval, set lifecycle to Published as `vsgh-publisher` or `vsgh-super-admin`, then publish.
4. Confirm the authorized webhook response and the refreshed public page. Capture the published revision, timestamp, and response headers without exposing secrets.
5. Restore the original approved wording/revision, publish, revalidate, and verify the public page has returned to the original state.
6. Record the evidence in the organization’s change record. Remove any temporary draft created for the test.

## Preconditions owned outside the repository

- Sanity user, MFA, intended roles, API read token, write token, Studio CORS and preview origins.
- Vercel server environment variables `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, and preview origin settings.
- Sanity webhook with the authenticated revalidation secret and an approved test change.

Until this evidence exists, the CMS is not claimed as production publish-validated.
