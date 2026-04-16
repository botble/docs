---
title: Changelog
description: Release history of the KYC Verification plugin for Botble CMS.
---

# Changelog

All notable changes to the KYC Verification plugin. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] — pending

### Added
- **Real-estate agent scope** (`realestate_account`) — works with Homzen, Hasa, and Flex-Home themes. Eloquent macros on `Botble\RealEstate\Models\Account`, settings toggles, optional publishing gate.
- **Job-board employer scope** (`jobboard_company`) — works with Jobcy and Jobzilla. Walks the `Account → Company` many-to-many pivot; default picks `->first()`, optional `?company_id=N` query param targets a specific company (verified against the authenticated account's owned set).
- **Job-board candidate scope** (`jobboard_candidate`) — optional identity verification for job seekers. Shares the Account model with the employer scope but disambiguates via a declarative `type_filter` on the subject definition (`type === JOB_SEEKER`).
- **Host-column mirror listeners** — `SetAccountVerifiedListener` / `SetJobBoardCompanyVerifiedListener` write `is_verified + verified_at + verified_by` back to the host model on `KycApproved` so the existing real-estate / job-board admin badges reflect the KYC decision without any host edits.
- **Query-based rejection clearing** — the unverify listeners clear `is_verified` only when no other approved KYC submission remains for the same subject. No sentinel strings, no host schema changes.
- **Car rental / listing support (`plugins/car-manager`)** — Auxero, Carento, and other Botble car scripts integrate via the ecommerce customer scope (renters / buyers) and a dedicated vendor scope for car dealers.
- **Six new settings toggles** — real-estate enable + publishing gate; job-board company enable + posting gate; job-board candidate enable + applying gate.
- **Three new integration guides** — real-estate, job-board, and car rental / listing.
- **Type filter support** in `SubjectRegistry` for shared-model subjects (Account with employer / candidate role).
- **Collection-aware owner resolver** — `SubjectRegistry::authenticatedSubject()` now handles many-to-many pivot relations in addition to single-result relations.

## [1.0.0] — 2026-04-15

### Added
- Initial release
- Polymorphic `kyc_submissions` table with `verifiable_type` + `verifiable_id` columns
- `kyc_subject_states` lockout table — auto-lock at 3 rejections, admin unlock action
- `KycStatusEnum` — `pending` / `approved` / `rejected` / `expired`
- `KycDocumentTypeEnum` — 9 document types split across customer and vendor scopes
- Zero-host-edit integration via Eloquent macros on `Customer` and `Store`
- Customer-facing submission flow rendered in plugin-owned standalone layout — no theme dependency
- Admin review queue with dual filter (status + subject type) and submission history
- Private token-based file storage with 15-minute signed URL delivery
- Multi-guard file access control — admin with `kyc.submissions.file` permission plus subject-owner
- Security headers on every file response: CSP, nosniff, no-store, no-referrer, X-Frame-Options
- Three email notifications — admin received, subject approved, subject rejected
- HMAC-SHA256 signed webhook dispatch, optional, setting-gated
- Multi-endpoint webhook management with per-endpoint events, secrets, and active flag
- GDPR self-service export endpoint with 10-request-per-hour rate limit
- 11 configurable settings — customer/vendor enable flags, checkout & listing gate flags, multi-step form toggle, form-style preset, lockout threshold, rejected + approved retention windows, admin contact email, customer dashboard URL
- 11 granular permissions for delegated administration
- Nightly `kyc:cleanup` command — two-pass: rejected row+files, approved files only
- Nightly `kyc:expire` command — flip approved → expired when `expires_at` reached
- `kyc:demo-seed` Artisan command for dev/demo environments
- Six visual form presets — classic, emerald, violet, sunset, minimal, midnight
- Multi-step 3-page wizard mode for the customer submission form
- 51 feature tests — submission flow, admin review, lockout, signed URLs, retention, polymorphic macros, slug sanitization, GDPR export
- English source translations for all UI strings
- 41-locale machine-translated set — ar, bg, bn, cs, da, de, el, es, et, fi, fil, fr, he, hi, hr, hu, id, it, ja, ka, ko, lt, lv, ms, nl, no, pl, pt, pt_BR, ro, ru, sk, sl, sr, sv, th, tr, uk, vi, zh, zh_HK
- Integration guides for ecommerce (Shofy-style) and marketplace (Martfury-style) scripts
- Envato license activation and deactivation flow

---

For earlier development snapshots prior to the 1.0.0 release, see the source control history.

## Upgrade notes

### Upgrading to 1.0.0

This is the initial public release — no upgrade path required.

## How to upgrade

1. Download the latest ZIP from your CodeCanyon Downloads page.
2. Extract and replace `platform/plugins/kyc/` on your server.
3. Run migrations (the plugin runs them automatically on activation):
   ```bash
   php artisan migrate --path=platform/plugins/kyc/database/migrations
   ```
4. Clear caches:
   ```bash
   php artisan config:clear
   php artisan route:clear
   php artisan cache:clear
   ```
5. Check **Admin → KYC Verification → Settings** for any new settings introduced in the release.

::: tip
Always back up your database before upgrading a plugin that manages compliance data.
:::
