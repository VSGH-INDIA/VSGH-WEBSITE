# CMS migration plan

Use this plan for controlled public migration only; it is not permission to import internal records.

1. Confirm the business owner has approved the wording and supplied approved public imagery.
2. In Studio, create or update one singleton/document at a time. Preserve the fixed public fallback until that document is complete.
3. Classify every image: approval status, public visibility, meaningful alt text, or decorative. Do not publish an unapproved/non-public asset.
4. Complete SEO title/description and any approved social image. Keep claims factual and non-confidential.
5. Preview through the authenticated preview link. Check desktop/mobile layout, links, metadata, and noindex preview behavior.
6. Have an authorized reviewer set the lifecycle to Published, publish, and verify the production page after revalidation.
7. Record document IDs, reviewer, timestamp, source approval, and deployed commit in the release record.

## Rollback

Restore the last approved Sanity revision or unpublish the bad document, then trigger the authenticated revalidation webhook. The typed fallback remains available for missing/unconfigured content; it is not a substitute for restoring an approved revision.

## Asset-library migration boundary

The current public-image metadata is embedded with content. Before migrating a large library, design a reusable `mediaAsset` document and update every reference/query in a separate reviewed change. Do not bulk-rewrite existing content without a dry run, backup/export, and rollback record.
