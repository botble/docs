---
title: Routes Reference
description: Every route registered by the KYC Verification plugin.
---

# Routes Reference

Every route the plugin registers, grouped by audience.

## Admin routes

All admin routes live under the admin prefix (configured in Botble `core/base` settings) and the `web` guard.

| Method | URI | Route name | Permission |
|---|---|---|---|
| GET/POST | `kyc/submissions` | `kyc.submissions.index` | `kyc.submissions.view` |
| GET | `kyc/submissions/{id}` | `kyc.submissions.view` | `kyc.submissions.view` |
| POST | `kyc/submissions/{id}/approve` | `kyc.submissions.approve` | `kyc.submissions.approve` |
| POST | `kyc/submissions/{id}/reject` | `kyc.submissions.reject` | `kyc.submissions.reject` |
| POST | `kyc/submissions/{id}/unverify` | `kyc.submissions.unverify` | `kyc.submissions.unverify` |
| POST | `kyc/submissions/{id}/unlock` | `kyc.submissions.unlock` | `kyc.submissions.unlock` |
| GET | `kyc/settings` | `kyc.settings.edit` | `kyc.settings.edit` |
| PUT | `kyc/settings` | `kyc.settings.update` | `kyc.settings.edit` |
| POST | `kyc/license/activate` | `kyc.license.activate` | `kyc.settings.edit` |
| POST | `kyc/license/deactivate` | `kyc.license.deactivate` | `kyc.settings.edit` |
| GET | `kyc/webhooks` | `kyc.webhooks.index` | `kyc.webhooks.index` |
| GET | `kyc/webhooks/create` | `kyc.webhooks.create` | `kyc.webhooks.create` |
| POST | `kyc/webhooks` | `kyc.webhooks.store` | `kyc.webhooks.create` |
| GET | `kyc/webhooks/{id}/edit` | `kyc.webhooks.edit` | `kyc.webhooks.edit` |
| PUT | `kyc/webhooks/{id}` | `kyc.webhooks.update` | `kyc.webhooks.edit` |
| DELETE | `kyc/webhooks/{id}` | `kyc.webhooks.destroy` | `kyc.webhooks.destroy` |
| POST | `kyc/webhooks/test` | `kyc.webhooks.test` | `kyc.webhooks.edit` |

The review queue `index` route accepts both GET (page render) and POST (Botble DataTables AJAX JSON). The controller dispatches on `$request->ajax()` internally.

## Customer / vendor routes

Customer-facing routes live under the `/account/kyc/{subjectKey}` prefix with the `customer` guard. `{subjectKey}` is validated by the `SubjectRegistry` inside the controller — unknown keys return 404 from `EnsureKycEnabled` middleware.

| Method | URI | Route name | Middleware |
|---|---|---|---|
| GET | `account/kyc/{subjectKey}` | `kyc.submission.index` | `web`, `customer`, `throttle:30,1`, `kyc.enabled` |
| POST | `account/kyc/{subjectKey}` | `kyc.submission.store` | `web`, `customer`, `throttle:5,1`, `kyc.enabled` |
| GET | `account/kyc/{subjectKey}/locked` | `kyc.submission.locked` | `web`, `customer`, `throttle:30,1`, `kyc.enabled` |
| GET | `account/kyc/{subjectKey}/export` | `kyc.submission.export` | `web`, `customer`, `throttle:10,60`, `kyc.enabled` |

## Private file route

Accessible from both admin and customer guards. Authorisation is performed inside `KycFileController::canAccess()`.

| Method | URI | Route name | Middleware |
|---|---|---|---|
| GET | `kyc/file/{id}/{field}` | `kyc.file.show` | `web`, `kyc.enabled`, `throttle:60,1`, `signed` |

- `{id}` — `kyc_submissions.id`
- `{field}` — one of `front_image`, `back_image`, `selfie_image`, or `extra_files.{index}`

## Middleware reference

| Alias | Class | Purpose |
|---|---|---|
| `kyc.enabled` | `EnsureKycEnabled` | Abort 404 when no subject is enabled, or the given scope is disabled |
| `kyc.required` | `KycRequiredMiddleware` | Gate route on `hasApprovedKyc()` for a given scope and context — see [Gates](../integration/gates.md) |

## Viewing registered routes

```bash
php artisan route:list | grep kyc
```

Expected output (truncated):

```
GET|HEAD   account/kyc/{subjectKey}               kyc.submission.index
POST       account/kyc/{subjectKey}               kyc.submission.store
GET|HEAD   account/kyc/{subjectKey}/locked        kyc.submission.locked
GET|HEAD   account/kyc/{subjectKey}/export        kyc.submission.export
GET|HEAD   kyc/file/{id}/{field}                  kyc.file.show
GET|HEAD   admin/kyc/submissions                  kyc.submissions.index
POST       admin/kyc/submissions                  kyc.submissions.index
GET|HEAD   admin/kyc/submissions/{id}             kyc.submissions.view
POST       admin/kyc/submissions/{id}/approve     kyc.submissions.approve
POST       admin/kyc/submissions/{id}/reject      kyc.submissions.reject
POST       admin/kyc/submissions/{id}/unverify    kyc.submissions.unverify
POST       admin/kyc/submissions/{id}/unlock      kyc.submissions.unlock
GET|HEAD   admin/kyc/settings                     kyc.settings.edit
PUT        admin/kyc/settings                     kyc.settings.update
POST       admin/kyc/license/activate             kyc.license.activate
POST       admin/kyc/license/deactivate           kyc.license.deactivate
```

## Next step

- [Webhook Schema](./webhooks.md) — outgoing webhook payload format
- [Translations](./translations.md) — localise routes and labels
