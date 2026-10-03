# Contact enquiry operations

The public form is designed for business enquiries, not files or confidential/controlled information. It returns a real success only after Resend accepts delivery. Until configured it intentionally returns a visible HTTP 503 rather than dropping messages.

## Required production configuration

Configure these server-only values in the Vercel project for Production and Preview as appropriate:

```text
CONTACT_EMAIL_PROVIDER=resend
CONTACT_TO_EMAIL=<approved monitored mailbox>
CONTACT_FROM_EMAIL=<verified VSGH sender>
RESEND_API_KEY=<Resend API key>
UPSTASH_REDIS_REST_URL=<Upstash REST URL>
UPSTASH_REDIS_REST_TOKEN=<Upstash REST token>
```

Verify the sender domain in Resend before enabling delivery. The provider uses the submitter email only as `Reply-To`; it does not trust it as a sender.

For Turnstile, configure both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` for the same site. The widget is rendered only when the public site key exists; the endpoint verifies the corresponding server secret. Leave both unset if Turnstile has not been provisioned.

## Controls and monitoring

- Rate limit: five requests per source IP in ten minutes, via Upstash.
- Validation: strict schema, same-site origin, body cap, honeypot, form-age check, optional Turnstile.
- Logs: request ID, result, enquiry type, HTTP status, and latency only. Do not log message bodies, email addresses, keys, tokens, or complete IP addresses.
- Retention/access: define the mailbox access and retention policy with the business owner before launch.

## Release test

From the deployed site, submit one non-sensitive test enquiry. Confirm a 200 response, receipt in the approved mailbox, correct Reply-To, no duplicate delivery, and expected structured event. Then delete/label the test message according to the agreed retention policy. Test failed delivery, rate limiting, and Turnstile separately in a non-production environment.
