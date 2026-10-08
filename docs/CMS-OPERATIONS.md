# CMS operations

The VSGH CMS is a separate Sanity Studio at `https://vsgh-india-cms.sanity.studio/`; it is not exposed under the public website route tree. It publishes only approved public website content.

## Access and roles

The Sanity project owner must enforce MFA and grant the least privilege necessary. The source defines these intended role identifiers; they must be created and assigned in the Sanity project before relying on lifecycle controls:

| Role                      | Responsibility                                     | May set lifecycle to `published` |
| ------------------------- | -------------------------------------------------- | -------------------------------- |
| `vsgh-editor`             | Creates and edits approved public drafts           | No                               |
| `vsgh-technical-reviewer` | Checks factual / technical wording                 | No                               |
| `vsgh-ip-reviewer`        | Checks public disclosure and IP wording            | No                               |
| `vsgh-publisher`          | Releases reviewed approved website content         | Yes                              |
| `vsgh-super-admin`        | Account, schema, role and emergency administration | Yes                              |

The Studio validation is a guardrail, not a replacement for project permissions. Review accounts and recent access at least quarterly; remove users immediately when their role ends.

## Controlled content

The public platform uses fixed singleton IDs for Home, Business, Contact and Site settings, plus exactly three fixed Business-line routes. Do not create duplicate singleton documents. A published CMS document is used only when required fields are complete; otherwise the website retains its typed, approved fallback instead of rendering a broken page.

### Global Programmes partner directory

Use **Website pages → Partner companies** to manage cards for `/business/global-programmes`. A company is displayed only when all of the following are true:

1. Its lifecycle is **Published**.
2. **Display on Global Programmes** is enabled.
3. Its logo is Public and Approved, with meaningful alternative text.
4. The public profile contains its company name, overview, services, official HTTPS website, public contact, and at least one public address.

Use only company information, logos, contacts, and services that the company has approved for public publication. Set **Global Programmes display order** to arrange cards; lower numbers appear first. The profile opens in a public modal, so avoid confidential programme details, non-public personal data, customer names, export-control information, or unverified claims.

A public email address is required. A named contact and telephone number are optional and may be added only after the individual and company approve their public display.

Media is embedded only after it is marked **Public**, **Approved**, and has meaningful alternative text (or is explicitly decorative). The Studio is not an asset archive: do not upload drawings, models, source files, controlled data, unpublished research, or personal information.

## Draft preview / Presentation Tool

1. Set `SANITY_STUDIO_PREVIEW_ORIGIN` to the website preview target and `SANITY_STUDIO_ORIGIN` to the hosted Studio origin. Set `SANITY_API_READ_TOKEN` only in the website’s server environment.
2. Configure the Sanity project CORS origin for the target website and log into Studio.
3. Use **Visual preview** in Studio. The server validates Sanity’s short-lived preview secret, allows only a public-route allowlist, enables Next draft mode, and returns a no-store/noindex response.
4. Only the approved Studio origin may frame a draft preview. Normal public pages retain `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
5. Exit preview with Studio’s disable control. Never share draft-preview links outside approved editorial workflows.

Presentation routing is configured for Home, Business, each Business line, Contact, and public About/Capability pages. The current Studio major supports the route resolver and secured preview. Full click-to-edit overlays are intentionally deferred until the Studio can be upgraded through a separately tested compatibility migration; the current `@sanity/visual-editing` package has an unresolved Vite peer conflict with the installed Studio 4 line, so this repository does not bypass it with a forced dependency installation.

## Seed baseline content

`npm run cms:seed` is a dry run and makes no network write. It lists the Home, Business, three Business-line, Contact, and Site Settings documents that would be created from the approved code fallback.

To create only missing documents, an authorized operator supplies a server-only write token and runs:

```sh
SANITY_API_WRITE_TOKEN='…' npm run cms:seed -- --apply
```

The script uses `createIfNotExists`; it never patches, replaces, deletes, or publishes a document that already exists. Review created content in Studio before changing any content.

## Publish and rollback

1. Editor prepares only factual, approved public wording and moves lifecycle to Review.
2. Technical and IP reviewers approve the content through the organization’s evidence record.
3. Publisher changes lifecycle to Published, publishes, previews the exact route, and records the Sanity revision and approval reference.
4. Sanity’s authenticated webhook calls `/api/revalidate` with the server-only `SANITY_REVALIDATE_SECRET`; verify the public route refreshed.
5. If content is wrong, restore the previous Sanity revision or unpublish it, revalidate, and record the rollback. For an application defect, roll Vercel back to the prior verified deployment.

Do not use this process to publish manufacturing, certification, customer, performance, programme, export-control, or confidential claims unless the exact claim has written approval.
