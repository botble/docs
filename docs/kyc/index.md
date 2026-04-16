---
title: KYC Verification for Botble
description: Identity verification plugin for Botble CMS — works across e-commerce, real estate, job board, and car rental/listing scripts. Customer ID checks, vendor business verification, agent & employer verification, admin review queue, signed-URL file storage, GDPR export, and HMAC webhooks.
---

# KYC Verification

Professional identity verification for any Botble script — e-commerce, real estate, job board, and car rental/listing.

The **KYC Verification** plugin lets customers upload identity documents and vendors upload business documents, then gives administrators a dedicated queue to review, approve, or reject them. Approved submissions can optionally unlock gated actions such as **checkout** (customer KYC) or **product listing** (vendor KYC).

![Admin review queue](./images/kyc-admin-queue.png)

## Highlights

- **Dual-scope verification** — customer identity (buyer) AND vendor business verification (seller), each with its own settings, document types, and gating rules.
- **Plugin-owned UI** — customer-facing screens are rendered in a standalone Tabler-based layout shipped by the plugin. Works with **any** Botble theme out of the box; no theme views to copy or override.
- **Private token-based storage** — files live in `storage/app/private/kyc/` with 32-char hex filenames, served through 15-minute signed URLs behind multi-guard authentication.
- **Admin review queue** — dual filter (status + subject type), submission history, approve/reject/unverify/unlock actions, per-action permissions.
- **Auto-lock at 3 rejections** — configurable threshold prevents spam; admin can manually unlock.
- **7-day retention** — rejected submissions (row + files) and approved files (row kept as audit trail) are purged nightly by a scheduled command.
- **Expiry handling** — documents with `expires_at` flip to `expired` status on a nightly schedule.
- **Email notifications** — admin gets notified on every new submission; subjects receive approval/rejection emails.
- **HMAC-signed webhooks** — optional POST to external compliance systems on submit / approve / reject / expire.
- **GDPR self-service export** — subjects can download their own KYC data as JSON (rate limited).
- **42-language support** — English source + 41 machine-translated locales.
- **Zero host-plugin edits** — integrates with `plugins/ecommerce` Customer and `plugins/marketplace` Store via Eloquent macros. Upgrade host plugins freely.

## Who should use this plugin

| You run… | You get… |
|---|---|
| **Vanilla ecommerce** (Shofy, Nest, Farmart…) | Customer identity verification gate on checkout |
| **Marketplace** (Martfury, Shopwise…) | Customer + vendor verification, with listing gate for sellers |
| **Real estate** (Homzen, Hasa, Flex-Home) | Agent identity verification gate on property publishing |
| **Job board** (Jobcy, Jobzilla) | Employer company business verification + optional candidate identity checks |
| **Car dealer / rental** (Auxero, Carento) | Renter, buyer, and dealer identity verification — integrates with `plugins/car-manager`. See [Car Rental / Listing](./integration/car-rental.md). |
| **Regulated vertical** (finance, crypto, age-restricted goods) | Full audit trail, HMAC webhooks for downstream compliance systems |

## How it works

![Customer submission form](./images/kyc-customer-form.png)

1. A logged-in customer (or vendor) opens the KYC link from their dashboard.
2. They land on the plugin's own submission page — chosen document type, front / back / selfie uploads, terms checkbox.
3. On submit, files are stored privately, a `kyc_submissions` row is created with status `pending`, and the admin is emailed.
4. Admin opens **Admin → KYC Verification → Submissions**, reviews the files (via signed URLs), and clicks **Approve** or **Reject** with an optional note.
5. The subject receives an email:
   - **Approved** → dashboard CTA
   - **Rejected** → resubmit link + reviewer note
6. After 3 rejections the subject is auto-locked until an admin unlocks them.
7. Optional: an HMAC-signed webhook is delivered to your external system on every lifecycle event.

## Next steps

- [Requirements](./requirements.md) — server, PHP, and Botble version matrix
- [Installation](./installation.md) — upload and activate
- [Initial Configuration](./configuration.md) — pick which scopes to enable
- [Ecommerce Integration](./integration/ecommerce.md) — Shofy-style stores
- [Marketplace Integration](./integration/marketplace.md) — Martfury-style stores
