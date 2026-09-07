---
title: Troubleshooting
description: Symptom, cause and fix for the most common operational problems on the platform.
---

# Troubleshooting

### Store stuck in `pending` or `provisioning`

**Cause:** no queue worker is running — this is the cause the vast majority of the
time. `pending`/`provisioning` both serve a 503 "being prepared" page.

**Fix:** start a queue worker, or re-run with `--sync` (`tenancy:create-tenant`) /
`TENANCY_PROVISION_SYNC=true` to provision inline while you diagnose the worker. A
`failed` store cannot be resumed — it has no schema; reprovision it.

### Provisioning failed with a sanitizer error

**Cause:** working as intended. The store's seeded content still referenced the demo
site, so provisioning refused to go live rather than launch a store that leaks the
source product's data.

**Fix:** check the dump — see the demo-dump rules in
[Adding a storefront theme](./adding-a-theme.md).

### Every image on a storefront is broken

Not to be confused with grey placeholders below — this is a broken-image icon,
including the logo, on an otherwise correct page.

**Cause:** the web server is serving `/tenancy/assets/…` as a static file.
Tenant uploads live outside `public/`, so the path must reach PHP. On nginx a
regex location for image extensions wins over `location /`, so the request is
looked up on disk, 404s, and `TenantAssetController` never runs.

**Fix:** add a prefix location with `^~` so it outranks the regex ones:

```nginx
location ^~ /tenancy/assets/ {
    try_files $uri /index.php?$args;
}
```

Confirm with `curl -I https://acme.yourdomain.com/tenancy/assets/general/logo.png` —
a 404 with `Content-Type: text/html` from the web server means the request never
reached PHP. See [Wildcard DNS and TLS](./installation-dns-tls.md#serving-with-nginx).

### A storefront's main menu renders empty

The header, logo and products are fine, but the navigation has no links — while
the store's menus are all present in its database.

**Cause:** `LanguageManager` is a singleton that latches `$supportedLocales`, and
when the languages table is empty it falls back to a hardcoded `en_US`. The
central database has no languages, so a resolution during provider boot — before
tenancy swaps the connection — freezes `en_US` for the whole process. Tenant rows
use the real code (`en`), and the front-end language filter compares
`language_meta.lang_meta_code` against the latched value, so every language-aware
query matches nothing.

**Fix:** ensure `BotbleStateBootstrapper` resets `LanguageManager` on tenant
switch (it does from the version that added `forgetLanguage()`), and that it is
registered **after** `DatabaseTenancyBootstrapper` in `config/tenancy.php`.

To confirm the diagnosis rather than guess, check the locale the store actually
resolved against the codes its data uses:

```sql
SELECT lang_code, lang_locale FROM languages;                       -- tenant DB
SELECT DISTINCT lang_meta_code FROM language_meta;                  -- tenant DB
```

If those say `en` while the store behaves as though the locale were `en_US`, this
is the bug. The same latch affects any language-filtered model, not only menus.

### Where a store's logs are

Not in `storage/logs/`. `storage_path()` is rebound per tenant, so a store's log
lines land in:

```text
storage/tenants/tenant<id>/logs/laravel-<date>.log
```

Worth knowing before concluding "nothing was logged". For the same reason, code
that writes debug output to `/tmp` may be invisible if PHP-FPM runs with
`PrivateTmp=yes` — write under `storage_path()` instead.

### Demo images are grey placeholders

**Cause:** expected. Media binaries are never shipped with a theme's demo dump — only
the SQL is.

**Fix:** none needed; this is by design. See step 3 of
[Adding a storefront theme](./adding-a-theme.md).

If you are building a **showcase** store and want the real photography, the demo
dump's media paths match the theme's own demo site one-for-one, so the files can
be fetched over HTTP and dropped into that store's storage:

```bash
# for one path; script the loop over the paths your pages reference
curl -o "storage/tenants/tenant<id>/app/public/<path>" \
     "https://<theme-demo-host>/storage/<path>"
chown -R www-data:www-data storage/tenants/tenant<id>/app/public
```

Collect the paths from the rendered pages (`/tenancy/assets/…`), not just from
`media_files` — the theme references generated thumbnail sizes such as
`gallery/gallery-37-800x800.jpg` that only exist as rendered URLs. Note that PHP's
stat cache keeps serving the placeholder for up to ~120s after the files appear.

### Webhook deliveries are not retrying

**Cause:** almost always a missing cron entry. `tenancy:webhooks-deliver` is the
**only** retry driver — the queued job makes just the first attempt, and every retry
after that depends on this command reading `next_attempt_at` off the row.

**Fix:** add the cron entry and confirm it's actually running:

```cron
* * * * * cd /path/to/app && php artisan tenancy:webhooks-deliver
```

See [Artisan commands](./commands.md) and [Webhooks](./webhooks.md) for delivery
states and the retry schedule.

### An endpoint got auto-disabled

**Cause:** 25 consecutive failures across events (`TENANCY_WEBHOOK_DISABLE_AFTER`)
switches the endpoint off and stamps `disabled_at`. Auto-disable never touches
`is_active` — the operator's own switch is left exactly as set, so the console still
shows it as **on** with no visible off switch to find.

**Fix:** fix the receiver, then re-enable it — open the endpoint and save it with
**Active** still on, or `PATCH /api/platform/v1/webhooks/{id}` with
`{"is_active": true}`. Saving with `is_active` true is what clears `disabled_at` and
resets `consecutive_failures` to `0`. Deliveries that came due while disabled were
closed `exhausted` with `error: endpoint_disabled` and are **not** replayed
automatically — retry the ones that still matter by hand.

### `APP_KEY` rotation broke every webhook delivery

**Cause:** endpoint secrets are stored with Laravel's `encrypted` cast. Rotating
`APP_KEY` makes them undecryptable, so every delivery starts failing with a decryption
error.

**Fix:** rotate the secret of **every** webhook endpoint and update the receivers in
the same maintenance window. API keys are unaffected — they're sha256 hashes, not
encrypted values.

### Theme assets missing after a deploy

**Cause:** `public/themes` is shared by every store and no customer request may write
there, so an unpublished theme after a deploy renders an unstyled storefront and
nothing self-heals.

**Fix:** `php artisan tenancy:publish-theme-assets` — put it in your deploy script, not
just your memory. See [Artisan commands](./commands.md).

### A store's apps are out of sync with its plan

**Cause:** the catalog was curated or an app's plan assignment changed after the store
was already running — apps and themes on a plan are deliberately **not** frozen, so
changes should reach existing stores, but a store's own `activated_plugins` only
updates when something writes it.

**Fix:**

```bash
php artisan tenancy:backfill-plugins              # dry run
php artisan tenancy:backfill-plugins --write --enable-all
```

See [Apps and themes catalog](./usage-apps-themes.md).

### Domain verification failing

**Cause:** unverified custom domains are deliberately unroutable and get no TLS
certificate — this protects against serving a certificate for a domain the store
doesn't actually control yet.

**Fix:** confirm the TXT/CNAME records match exactly what the store's Domains screen
shows, then `php artisan tenancy:verify-domains` (add `--all` to also re-check domains
already verified).

### Settings or cache bleeding between stores

**Cause:** almost always a lost [upstream patch](./upstream-patches.md) after a Botble
upgrade — patch 1 (settings load order) and patch 2 (mail config guard) exist
specifically to stop state from one tenant surviving into the next request.

**Fix:** run the isolation regression suite — it fails loudly if either patch
regressed:

```bash
composer install    # release zips ship without dev dependencies or tests/
vendor/bin/phpunit -c platform/packages/tenancy/phpunit.xml
```

If the symptom is specifically stale product images pointing at the control-plane
domain, check that `BotbleStateBootstrapper` is registered **after**
`DatabaseTenancyBootstrapper` in `config/tenancy.php` — that's what recomputes
`disks.public.url` per tenant on every switch.

### Admin "Clear cache" clears every store's cache at once

**Cause:** the `Clear cache` action in the operator console issues the underlying driver's real flush — `FLUSHDB` on Redis, a full table truncate on `database`, a full flush on Memcached. None of those respect the tenant prefix, so it clears every store's cache at once, including the central store.

**Fix:** this is a known regression; see [Cache: pick any store, Redis is a recommendation](./installation-requirements.md#cache-pick-any-store-redis-is-a-recommendation) in Requirements. The only exception is `file` cache, which flushes only that tenant's own directory and stays scoped. If this behavior is unacceptable on production, use `CACHE_STORE=file` or avoid using the admin "Clear cache" action.

## Related

- [Upstream Botble changes](./upstream-patches.md) — the patches most of these failures trace back to
- [Artisan commands](./commands.md) — full reference for every command mentioned here
- [Webhooks](./webhooks.md) — delivery states, retry schedule, auto-disable
- [Apps and themes catalog](./usage-apps-themes.md) — the entitlement model behind plan/app drift
