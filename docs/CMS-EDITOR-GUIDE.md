# CMS editor guide

Open Studio with `npm run studio`. It is an administrative surface, not a public route. Use an account with the least privilege required and MFA enabled.

## Daily publishing sequence

1. Use **Dashboard** to review missing SEO, image alt text, lifecycle counts, and recently changed items.
2. Open the relevant controlled document: Home, Business, a fixed-route Business line, Contact, or Site settings. Do not create a second singleton.
3. Enter only approved public wording. VSGH is a connector/promoter and programme-coordination business; do not imply manufacturing, certification, customer, export-control, or technical-performance claims without written approval.
4. Complete title, description, image alt text, and asset approval/visibility fields. Mark an image decorative only when it conveys no information.
5. Set lifecycle to **In review**, have an authorized reviewer approve it, then set **Published** and publish the document.
6. Check the production URL/preview and relevant public page. If it is not fresh after a publish, use the documented revalidation webhook flow; never expose its secret in a browser.

## Content rules

- Keep Business to its three approved lines. Each line has one fixed public route: Aerospace Systems & Components, Imports & Exports, or Global Programmes. The page is commercial context, not a product catalogue.
- On a Business line document, keep the route selector unchanged, complete all three connection-journey stages, and select the other two approved lines as related content. Do not use the page to state confidential programme details, unapproved counterparties, certifications, or manufacturing claims.
- Site settings hold only limited public identity, SEO, verification, and contact labels. Canonical origin, tokens, recipients, and sender credentials remain deployment configuration.
- Do not upload confidential drawings, programmes, personal data, controlled data, unpublished results, or executable files.
- Preserve the existing public fallback while a CMS document is incomplete. A missing required CMS field should not result in a broken public page.

## Editorial evidence

Record the source/approval reference in the team’s approved change record before publishing material factual changes. The CMS is not a source of truth for engineering or quality records.
