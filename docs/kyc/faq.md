---
title: FAQ
description: Frequently asked questions about the KYC Verification plugin's design and usage.
---

# FAQ

## General

### Does this plugin work with any Botble theme?
Yes. The customer-facing submission flow is rendered in a plugin-owned standalone layout. There are no theme views to copy, no blade partials to override, and no CSS to merge. You only add **one or two dashboard links** to your theme's customer/vendor pages.

### Can I use it without ecommerce or marketplace?
`plugins/ecommerce` is required for the **customer** scope because the macro is attached to `Ecommerce\Customer`. `plugins/marketplace` is optional — only needed for the **vendor** scope.

If you want KYC for a completely custom subject model (not Customer or Store), use the [Extending KYC](./developer/extending.md) guide to register your own scope in `config/kyc.php`.

### Why two scopes?
Customer identity verification (buyer) and vendor business verification (seller) are separate compliance paths with **different document types**, **different gates**, and **different expiry rules**. A single unified flow would force you to pick one set of tradeoffs; two scopes let you tune each independently.

## Workflow

### Can I bulk-approve submissions?
No — by design. Every approval is a compliance action that must be reviewed case by case. Bulk approvals are almost always a sign of a misconfigured process.

### Can a single customer be BOTH customer-verified AND vendor-verified?
Yes. The scopes are independent. A customer who also owns a marketplace store usually completes both — customer KYC for checkout, vendor KYC for listing.

### What happens if I reject the same person 3 times?
They are auto-locked. They see a "verification locked" page with your support email. An admin must click **Unlock** on any of their submissions to reset the counter.

### Does approving one submission approve all future ones?
Approval is tied to the **submission row**, not the subject. If a subject's approved submission later expires or is revoked via Unverify, they are no longer approved — they must submit a new one.

### Can customers re-submit after being approved?
Yes. If they do, the new submission enters the queue as `pending` while their existing approved record stays in effect. Only when the new one is acted on does the subject's effective KYC status change.

## Security

### Where are the files stored?
By default, on the local disk at `storage/app/private/kyc/{subject_hash}/{token}` with no file extension. Files are served exclusively through the `kyc.file.show` route behind multi-guard auth and 15-minute signed URLs.

### Can files be stored on S3 or DigitalOcean Spaces?
Yes. Change `storage.disk` in `config/kyc.php` to any disk configured in `config/filesystems.php`. The disk **must be private** — never point KYC storage at a public bucket.

### Can customers see other customers' files?
No. The `KycFileController::canAccess()` method checks that the authenticated guard is either:
- An admin with the `kyc.submissions.file` permission, OR
- The subject-owner themselves (verified via the subject registry)

Anyone else gets a 403.

### What security headers are applied to file responses?
Every response from `kyc.file.show` carries:
- `Content-Security-Policy: default-src 'none'`
- `X-Content-Type-Options: nosniff`
- `Cache-Control: no-store`
- `Referrer-Policy: no-referrer`
- `X-Frame-Options: DENY`

### Are signed URLs safe to share?
No. Signed URLs expire after 15 minutes but during that window anyone who has the URL **and** is authenticated in the correct guard can fetch the file. Treat them as short-lived bearer tokens.

## Compliance

### Is this GDPR-compliant?
The plugin ships everything you need to comply with **Article 15 (right of access)** via the self-service JSON export and **Article 17 (right to erasure)** via the admin delete action + automatic retention cleanup.

**However**, full GDPR compliance is a legal and procedural matter — you are responsible for maintaining a privacy policy, obtaining the correct lawful basis for processing, and responding to DSRs within 30 days.

### How long are files retained?
Default **7 days** for both rejected submissions (row + files) and approved submissions (files only — row kept as audit trail). Configurable 1–365 days in **Admin → KYC Verification → Settings**.

### Can I extend retention for audit purposes?
Yes — increase the **Approved file retention** setting to the window required by your policy (e.g. 365 days for annual audits). The row itself is kept indefinitely regardless.

### Do you share data with third parties?
The plugin does not send data anywhere by default. If you configure a webhook URL, the plugin POSTs to **that URL only**. If you add an integration with Onfido / IDNow / Persona via the event system, disclose it in your privacy policy.

## Technical

### Does activation modify `Customer` or `Store` models?
No. The plugin attaches methods via `MacroableModels::addMacro()` at runtime. Neither `Botble\Ecommerce\Models\Customer` nor `Botble\Marketplace\Models\Store` is touched on disk — you can upgrade host plugins freely.

### Can I deactivate and re-activate without losing data?
Yes. Migrations are idempotent and no cleanup runs on deactivation. Submissions, lockout state, and webhook endpoints survive.

### Does it work with PHP 8.3?
Yes. Tested on PHP 8.1, 8.2, and 8.3.

### Does it work with Laravel Octane?
Yes — the plugin is stateless at the request level. Macros are registered in `boot()` which runs once per Octane worker.

### Does it work with Horizon?
Yes. Webhook dispatch and queued emails go through the `kyc` queue which Horizon picks up automatically.

## Licensing

### Can I use the plugin on more than one domain?
A regular CodeCanyon license covers **one end-product per domain**. For multiple domains, purchase multiple licenses or an extended license.

### Can I resell the plugin as part of my own SaaS?
No. A regular license does not permit reselling. See Envato's licensing terms.

### Do I get free updates?
Yes — bug fixes and feature updates are free for the lifetime of the product. Download the latest version from your CodeCanyon **Downloads** page.

## Next step

- [Troubleshooting](./troubleshooting.md)
- [Changelog](./changelog.md)
