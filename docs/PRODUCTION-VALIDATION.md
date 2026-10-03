# Production validation checklist

Complete this against the deployed production URL, recording date, operator, deployment ID, and evidence.

## Before release

- [ ] Approved factual content, legal/privacy text, contact addresses, images, and business wording.
- [ ] Sanity project/dataset roles, MFA, CORS origins, preview secret/read token, and revalidation webhook configured.
- [ ] Resend sender verified; Upstash database provisioned; contact delivery and rate limit tested.
- [ ] Vercel environment variables configured without exposing server secrets.
- [ ] GitHub CI green and SBOM retained.

## Deployed checks

- [ ] Primary routes, navigation, skip link, keyboard flow, mobile layout, and reduced-motion behavior.
- [ ] Home Business, Why VSGH, trust-pillar, and programme CTAs lead to the expected routes/contact preselection.
- [ ] Draft preview is noindex/no-store and cannot be opened without the correct secret.
- [ ] Published Sanity change reaches the public route after authenticated revalidation.
- [ ] Contact success, validation failure, rate-limit response, and provider-failure behavior are verified with non-sensitive data.
- [ ] `robots.txt`, sitemap, canonical URLs, and search verification tags are correct.
- [ ] Vercel Analytics and Speed Insights are visible in the intended project and consent handling is approved.
- [ ] Browser console/network has no unexpected errors; accessibility and performance evidence meets the release standard.

## Rollback readiness

- [ ] Previous Vercel deployment is identifiable and rollback authority is available.
- [ ] Previous approved Sanity revision is identifiable.
- [ ] Contacts for editorial, technical, and business approval are recorded.
