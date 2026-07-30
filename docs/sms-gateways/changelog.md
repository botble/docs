---
title: Changelog
description: SMS Gateways release history and version updates.
---

# Changelog

All notable changes to SMS Gateways are documented here.

## Version 1.0.35 — 2026-07-30

### Added

- **New setting: Send SMS inline (bypass the queue)** (Admin → SMS Gateways → Settings, default off). Turn this on for shared hosting that drives the queue worker from a once-per-minute cron. Since v1.0.33 dispatches SMS to a dedicated `sms-gateways` queue, and the cron line most hosts hand out (`php artisan queue:work --stop-when-empty --max-time=55`) reads only the `default` queue, switching `QUEUE_CONNECTION` from `sync` to `database` on those installs silently stopped SMS altogether — with `queue:failed` empty and `queue:work --once` reporting "nothing to process", because nothing was ever wrong with the jobs, they were simply in a queue nobody read. Inline mode sends SMS during the request so OTP arrives instantly, while order emails, vendor notifications and the invoice PDF stay on the database queue. Leave it off on a VPS running a continuous worker. See [Queue Setup](./usage/queue.md#shared-hosting-with-a-cron-worker-turn-on-inline-mode).

### Fixed

- **System Health showed a green cron status for a cron that had stopped running.** The cron-alive age was computed with `now()->diffInSeconds()`, which is signed in Carbon 3, so a past heartbeat produced a negative age that passed every staleness threshold.

## Version 1.0.34 — 2026-05-22

### Fixed

- **OTP expired the moment it was created on MySQL/MariaDB installs where `explicit_defaults_for_timestamp` is OFF** (the default on MariaDB &lt;10.10, which CloudPanel ships). Under that flag the first `NOT NULL TIMESTAMP` column in a table silently acquires `ON UPDATE CURRENT_TIMESTAMP` — for `smsg_otps` that column is `expires_at`, so the follow-up write that links the delivery log rewrote the expiry to the current timestamp. Customers entered the correct code and got "OTP is incorrect / no active OTP" regardless of the configured TTL. An idempotent migration re-declares the column with an explicit `DEFAULT` and no `ON UPDATE`. PostgreSQL and SQLite installs were never affected and the migration no-ops there.

## Version 1.0.33 — 2026-05-16

### Changed

- **Async SMS sending is now opt-in via `QUEUE_CONNECTION` — no plugin file edits required.** `DispatchSmsJob` and `RetryFailedSmsJob` implement Laravel's `ShouldQueue` and target a dedicated `sms-gateways` queue. Shared-hosting installs keep `QUEUE_CONNECTION=sync` (Laravel default) and jobs continue to run inline — the behaviour you had on v1.0.32 is unchanged for those installs. VPS / dedicated installs set `QUEUE_CONNECTION=database|redis|sqs`, point a worker at `--queue=sms-gateways,default`, and the checkout / login response returns immediately instead of waiting on the carrier HTTP call. See the new [Queue Setup](./usage/queue.md) page for the worker / Supervisor recipe.

### Notes

- Until v1.0.32, customers who wanted async had to manually patch `DispatchSmsJob` to add `implements ShouldQueue` — that edit was wiped on the next plugin update. v1.0.33 makes async a config switch and ships the right defaults for both hosting models.
- `$tries = 1` on both jobs keeps Laravel's worker from auto-retrying on top of the plugin's existing retry ladder (`SmsRetryCommand` + `RetryFailedSmsJob`).

## Version 1.0.5 — 2026-04-28

### Added

- **SSL Wireless preset** for the Custom HTTP Driver — Bangladesh's largest enterprise SMS aggregator (banks, government, insurance). One-click pre-fill at `Admin → SMS Gateways → Custom Drivers → Create?preset=sslwireless`. See [SSL Wireless driver guide](./drivers/sslwireless.md).
- **BulkSMSDhaka preset** for the Custom HTTP Driver — Bangladeshi SMS provider on the `bulksmsdhaka.net` domain (different vendor from BulkSMSBD). One-click pre-fill at `?preset=bulksmsdhaka`. See [BulkSMSDhaka driver guide](./drivers/bulksmsdhaka.md).
- Structural unit tests for the preset registry covering required-key set, HTTP method / auth type / phone format enums, HTTPS endpoint, and JSON-validity for POST_JSON body templates.
- Placeholder-validity test that catches typos in `body_template` referencing unknown variables (`{whatever}`) the runtime renderer cannot substitute.

### Notes

- Both new presets are **starter configs**: the form pre-fills endpoint, headers, body template, and success indicators, but the API key and sender ID still need to be entered before saving.
- `BulkSMSDhaka` description explicitly disambiguates the vendor from `BulkSMSBD` (`bulksmsbd.net`) and `BulkSMS Bangladesh` (`bulksmsbd.com`) to prevent admins from routing traffic to the wrong provider.

## Version 1.0.4 — 2026-04-28

### Added

- Post-registration phone verification page at `GET /otp/verify` — proper controller, view, routes plus migrations adding `phone_verified_at` to `ec_customers`, `members`, and real-estate / job-board account tables (idempotent guards on `Schema::hasColumn`).

### Fixed

- OTP intercept middleware no longer hijacks Botble's JS validator probes — was previously surfacing "Whoops" errors and burning real OTP SMS on every keystroke during live field validation.
- `EnsurePhoneVerified` middleware redirects to a real route and preserves `url.intended`. Was previously redirecting to a non-existent route causing 404s on every page load after registration.
- `EnsurePhoneVerified` skips the admin (`web`) guard so admins are not forced through SMS verification on every backend page load.

## Version 1.0.0 — 2026-04-16

Initial public release.

### Features

- **7 built-in SMS drivers**: Twilio, Vonage (formerly Nexmo), AWS SNS, Plivo, Msg91, Fast2SMS, BulkSMSBD
- **OTP verification**: Phone verification with TTL, rate limiting, and attempt tracking
- **SMS templates**: Admin-editable templates with variable injection and character preview
- **Delivery logs**: Comprehensive SMS tracking with filters, retry, and export
- **Consent management**: STOP/START handling, opt-in/opt-out audit logs, GDPR erasure
- **Outbound webhooks**: Real-time delivery notifications with HMAC-SHA256 verification
- **Host integrations**: Ecommerce, Marketplace, Real Estate, Job Board, Car Manager, Hotel
- **Scheduled commands**: Automatic cleanup, retry, and purge tasks
- **GDPR compliance**: Data export, cascade delete, per-subject erasure, retention policies
- **42 languages**: English source + 41 machine-translated locales
- **Shared hosting support**: Works on cPanel, Plesk without queue workers
- **Role-based permissions**: Admin gating for all SMS features

### Known limitations

- Fast2SMS and Msg91 require DLT template registration (India regulation)
- BulkSMSBD supports only domestic SMS (Bangladesh)
- AWS SNS does not support delivery confirmation (marked as "Sent" only)
- Queue workers only supported on VPS/dedicated servers (not shared hosting)

### Breaking changes

None (initial release).

## Support

- **Documentation**: [docs.botble.com/sms-gateways](https://docs.botble.com/sms-gateways)
- **Issues**: Open a CodeCanyon support ticket
- **Feature requests**: Submit via CodeCanyon support
