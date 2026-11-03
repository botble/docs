# Audit: saas-license (ecommerce-saas + license-manager)

## Scope + HEADs
- Docs: `docs/ecommerce-saas/*` (51 pages), `docs/license-manager/*` (27 pages). Not synced.
- ecommerce-saas `9b58d54f 2026-10-26` (core.json 1.0.2, composer.json "version" 1.0.1, php `^8.3|^8.4`, Laravel ^13, theme amerce 1.0.10 w/ 20 presets)
- license-manager `3646b1c3 2026-10-28` (core.json 1.1.10, plugin license-manager 2.1.1, php `^8.3|^8.4|^8.5`)
- license-server `6da2e60c5 2026-10-30` (checked only for licensebox-legacy-api)
- Lead's PHP 8.3.0 change respected; nothing reintroduced.

## ecommerce-saas

Code root: `platform/packages/tenancy/` (abbrev `T/`)

| page | claim in docs | code evidence | action |
|---|---|---|---|
| commands.md | `verify-domains --domain=` "repeatable" | `T/src/Console/VerifyTenantDomainsCommand.php:22` single-value option | fixed |
| commands.md | create-tenant options list lacks `--reprovision` | `T/src/Console/CreateTenantCommand.php:31,127` | fixed (option row + signature) |
| commands.md | no `tenancy:install-preset-media` | `T/src/Console/InstallPresetMediaCommand.php:21` | fixed (summary row + section) |
| environment.md | STRIPE_WEBHOOK_SECRET "for `/stripe/webhook`" | Cashier routes ignored `T/src/Providers/TenancyServiceProvider.php:172`; route `_tenancy/stripe/webhook` `T/routes/central.php:53,87` | fixed |
| environment.md | `TENANCY_DEFAULT_THEME` = "Theme preset" | it's the theme; preset is `TENANCY_DEFAULT_PRESET` `T/config/general.php:44` | fixed + added DEFAULT_PRESET row |
| environment.md | `TENANCY_PRESET_MEDIA`, `_URL`, `_TIMEOUT` missing | `T/config/general.php:250-252` | fixed (new "Preset demo media" subsection) |
| api.md | `GET /stores/{id}/usage?refresh=1` scope `read`; `POST /stores/{id}/usage/refresh` missing | `T/routes/api.php:72-76`; write-scope assert `T/src/Http/Controllers/Api/V1/StoreActionController.php:90-99` | fixed |
| api.md, webhooks.md | example preset `"fashion"` | preset ids are `home-*` (`platform/themes/amerce/theme.json`); `fashion` fails ThemePreset rule | fixed → `home-fashion` |
| webhooks.md | headers table lacks `X-Tenancy-Delivery-Id`; `X-Tenancy-Delivery` called "delivery id" | `T/src/Services/Webhooks/WebhookSigner.php:17-25,79-89` (Delivery = event id, Delivery-Id = row id) | fixed |
| releases.md | latest listed 1.0.1 | `platform/core/core.json` 1.0.2; `CHANGELOG.md:61` 1.0.2 — 2026-10-08 | fixed (added 1.0.2 summary from CHANGELOG) |
| environment/cronjob/commands | all other env defaults, 27 webhook events, API routes, scopes, rate limits, retry schedule, operator sidebar labels, plan fields, preflight checks, add-on hooks, file paths | verified against `T/config/general.php`, `T/src/Support/WebhookEvents.php`, `T/routes/*.php`, `T/resources/lang/en/operator.php:21-51`, `T/src/Models/Plan.php:35` | ok |
| installation-requirements.md | `^8.3.0 \| ^8.4` | composer `^8.3\|^8.4` (no 8.5, unlike CMS baseline) | needs decision (equivalent; just FYI) |

## license-manager

Code root: `platform/plugins/license-manager/` (abbrev `LM/`)

| page | claim in docs | code evidence | action |
|---|---|---|---|
| cronjob.md, commands.md | schedule: expirations daily (08:00 in examples), activity-log monthly, download-log quarterly; add to `app/Console/Kernel.php` | plugin self-registers: expirations `dailyAt('02:00')`, blacklist hourly, both log clears **weekly** `LM/src/Providers/ConsoleServiceProvider.php:43-58`; no Kernel.php in L13 app | fixed (tables, removed Kernel snippets, "built in" tip, truncation warning) |
| commands.md | log clear "Remove old entries" | `LM/src/Commands/ActivityLogClearCommand.php` truncates whole table | fixed |
| commands.md, cronjob.md | "License Manager → Manual Cron: select command, Run" | menu label "Run Manual Cron"; single Run runs expirations + blacklist `LM/src/Http/Controllers/ManualCronController.php:22-50` | fixed |
| commands.md | blacklist thresholds default 0 | command default 0 `LM/src/Commands/ProcessAutoBlacklistCommand.php:17`, form pre-fills 200/100 `LM/src/Forms/Settings/ApiSettingForm.php:52,61` | fixed (documented both) |
| commands.md | missing `generate`, `send-license-details`, `notify-domain-switch`, `scan-domain-violations` | `LM/src/Commands/*` | fixed (sections added) |
| api.md | activate `client_name` "No" | `required` `LM/src/Http/Requests/Api/LicenseActivateRequest.php` | fixed |
| api.md | verify_type `non_envato|envato|gumroad` | default `direct`, `non_envato` deprecated alias `LM/src/Enums/VerifyType.php` | fixed (+ examples switched to `direct` in api/activations/quick-start/integration) |
| api.md | list licenses `?search=&product_reference_id=&customer_id=` | only `keyword` (required; license_code/invoice LIKE) `LM/src/Http/Requests/ProductLicenseSearchRequest.php`, `.../Api/Internal/ProductLicenseController.php:18-25` | fixed |
| api.md | create license body `"type"`, `"is_valid": true`, `"is_envato"` | request maps `license_type`→type (type ignored), `is_valid` inverted `LM/src/Http/Requests/ProductLicenseRequest.php:16-17`; is_envato not in rules | fixed (body + warning) |
| api.md | missing `POST product-licenses/{id}/type`, customers CRUD, internal connection-check | `LM/routes/api.php:27,51,59-62` | fixed |
| api.md | activated-product-activations POST/DELETE = create/delete | toggles `is_active` `.../ActivatedProductActivationController.php:22,46` | fixed |
| webhooks.md | webhooks only from daily cron, "not real-time"; 3 events | 5 real-time events (created/blocked/unblocked/activated/deactivated) via queued job `LM/src/Listeners/SendLicenseWebhookListener.php`, `LM/src/Jobs/SendLicenseWebhookJob.php:24` | fixed (needs queue worker noted) |
| hooks.md | Lemon Squeezy attaches via `lm_activation_license_resolvers` | only envato/gumroad register resolvers; LS only webhook-generates | fixed |
| quick-start.md | PHP client sends `X-URL` / `X-IP` | headers are `X-API-URL` / `X-API-IP` | fixed |
| quick-start, integration, index | activate() without client_name / default `''` (fails required) | see above | fixed (+ form field) |
| examples.md | PHP `LicenseManagerExternalAPI.php` class w/ named args | examples repo php/ has only `sample-app.php`, `sample-app-internal.php` (local clone 1c393df) | fixed |
| gumroad-integration.md | no mention of companion plugin | Gumroad split into `license-manager-gumroad` plugin | fixed (prereq) |
| licenses.md | form: Type, Is Valid, Is Envato; no Uses/Expiration Days | `LM/src/Forms/ProductLicenseForm.php`; labels "Total Use Limit", "Expiration Days", "Block License" (lang en:401,409,424) | fixed |
| products.md | Envato ID core field; no License Defaults | Envato/Gumroad/LS fields come from companions; License Defaults section `LM/src/Forms/ProductForm.php` | fixed |
| installation-requirements.md | ext list lacks GD | composer `ext-gd` | fixed |
| changelog.md | latest 1.1.3 | core.json 1.1.10; release commit `ab734b0a chore(release): license-manager 1.1.10` | needs decision |
| faq.md | plugin mode needs Botble CMS v7.5.0+ | plugin.json `minimum_core_version` 7.3.0 | needs decision |
| migration-from-licensebox.md | `licensebox-legacy-api` plugin + Settings → Legacy Migration | plugin + form only in license-server repo, not in LM product | needs decision |

## Undocumented features
- ecommerce-saas: none major beyond the fixes; `tenancy:install-preset-media` / preset media is under CHANGELOG "Unreleased" (now documented since it's in HEAD).
- license-manager: **Lemon Squeezy companion plugin** (no page; webhook `POST /api/external/webhooks/lemon-squeezy`, signing secret, variant mapping); **Envato companion plugin** (no dedicated page); `cms:lb:setting:sync` command (internal?); API call counts per endpoint/day, update download logs screen; product version extra per-target files (commit fb91b266).

## Needs decision
1. LM changelog.md stops at 1.1.3; product is 1.1.10 — need real per-version notes (not derivable from core.json history).
2. LM faq "Botble CMS v7.5.0+" vs plugin.json minimum_core_version 7.3.0 (L13 likely needs newer core; which is true?).
3. LM migration guide depends on `licensebox-legacy-api` plugin not shipped in LM repo — how do buyers get it?
4. LM code bug: internal API `is_valid` inverted (`ProductLicenseRequest.php:17`) — doc now warns; recommend fixing code (separate `is_blocked` for form) then revert warning.
5. LM code: weekly auto-truncation of activity + download logs; blacklist default 0 vs form 200/100 — intended?
6. ecommerce-saas composer.json `"version": "1.0.1"` vs core.json 1.0.2 (code inconsistency); php constraint lacks ^8.5.
7. ecommerce-saas upgrade.md uses `queue-worker` / `tenancy-queue-worker:*` unit names vs cronjob.md `saas-queue`; also `git pull origin main` for zip buyers. Cosmetic, left.
8. ecommerce-saas add-on minimum versions (Loyalty 1.0.20+, Live Chat 1.0.10+, SMS 1.0.36+, Gifts 1.0.7+, Wholesale 1.0.17+) — add-on code not in repo, unverified.

## Unresolved questions
- Is local `license-manager-examples` clone (dirty, 23 modified files) representative of GitHub `develop`? Only PHP section changed based on it.
- LM index "License Types - Perpetual, subscription, trial" is marketing-ish (type is free text); left.
