# Deployment

Production hosting: Vercel Pro (WEB-046). CI: GitHub Actions, then Vercel preview/production (WEB-052).

## Pipeline

```text
Commit → PR review → lint → typecheck → tests → dependency scan → build
  → preview → E2E/a11y (later) → UAT → production approval → Vercel production
```

This repository currently implements the quality-gate job. Preview production wiring waits for the GitHub org, Vercel project, and domain cutover (Cloudflare DNS).

The contact endpoint requires configured server-only Resend and Upstash values and returns an explicit unavailable response until they are present. Configure it only through the host environment; see [contact enquiry operations](CONTACT-ENQUIRY-OPERATIONS.md). The full deployed sign-off is [production validation](PRODUCTION-VALIDATION.md).

## Rollback

Use Vercel instant rollback to the previous production deployment. Record the release identifier against the Git commit (WEB-049).

## Production rule

Cursor may prepare production code. Formal production release remains a VSGH acceptance decision (VSGH-CURSOR-001 / WEB-080).
