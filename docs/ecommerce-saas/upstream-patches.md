---
title: Upstream Botble changes
description: The small, additive set of core Botble changes multi-tenancy needs, why each exists, and how to verify they survive an upgrade.
---

# Upstream Botble changes

Multi-tenancy needs the small, additive set of upstream files enumerated below.
**All of them are now upstream in
Botble core itself** (`develop` branch), so a Botble upgrade that includes those commits
carries them along — there is nothing to re-apply by hand.

The patches are no longer marked with a `TENANCY PATCH` comment: they're written as
ordinary core behaviour, since none of them changes what a single-tenant install does.
Find them with the two filter constants instead:

```bash
git grep -n "FILTER_ROBOTS_TXT_PATH\|FILTER_THEME_STYLE_INTEGRATION_PATH"
```

Both filters are supplied by
`Botble\Tenancy\Providers\TenantAssetIsolationServiceProvider`, which registers them
inside `$this->app->booted()` — the constants are defined by the theme package's
helpers, so registering earlier would fatal if `ThemeServiceProvider` ever boots after
the tenancy provider.

## 1. Settings load order

**`platform/core/setting/src/Supports/SettingStore.php` — `load()`**

`$loaded` is set **before** `read()`, not after.

`read()` hydrates Eloquent models, and Botble's model layer calls `setting()` during
hydration. With the flag set afterwards, that nested call re-entered
`load() → read() → hydrate → load()` and recursed until the PHP process died — with no
error output at all.

Single-tenant installs never hit it: settings load once at boot, so the nested call
always short-circuited. Multi-tenancy reloads the store on every tenant switch, which
made it reachable.

`read()` is wrapped in try/catch: on failure `$loaded` goes back to `false` and the
exception is rethrown, so a failed read is never cached as "loaded" — otherwise every
later `get()` would silently answer with defaults for the rest of the request.

## 2. Mail config guard

**`platform/core/base/src/Providers/MailConfigServiceProvider.php` — mail guard**

`static $configured` (a closure-local static, unreachable from outside) is replaced
with the container flag `MailConfigServiceProvider::MAIL_CONFIGURED_FLAG`, which
`BotbleStateBootstrapper` forgets on every tenant switch.

Without it, the first tenant's SMTP credentials were frozen for the whole worker
process, so one customer's transactional email was delivered through another
customer's mail server.

## 3. Theme Options custom CSS — per-store file (4 files)

**`platform/packages/theme/src/Theme.php` — `getStyleIntegrationPath()`** is wrapped in
`apply_filters(FILTER_THEME_STYLE_INTEGRATION_PATH, ...)`. Theme Options custom CSS is
a single shared file, so one store saving CSS overwrote every other store's live
stylesheet. The filter suffixes the filename per store:
`style.integration.<tenantId>.css`.

A filter may rename the file but must keep it in the same folder — the public URL is
still resolved relative to the theme's `css` directory.

The write path centralises through that method, but the sites that emit the stylesheet
`<link>` built the URL from a hardcoded `css/style.integration.css`, so the suffixed
file was written and never served. They now link `'css/' . basename($file)`:

- `platform/packages/theme/src/Providers/HookServiceProvider.php` (front header)
- `platform/plugins/ecommerce/src/Providers/HookServiceProvider.php` (checkout header)
- `platform/plugins/marketplace/resources/views/themes/vendor-dashboard/layouts/header.blade.php`

Botble core carries a fourth one this project doesn't install:
`platform/plugins/member/resources/views/themes/dashboard/layouts/header.blade.php`.

## 4–8. `robots.txt` paths (5 files)

`public_path('robots.txt')` is wrapped in
`apply_filters(FILTER_ROBOTS_TXT_PATH, ...)` in:

- `platform/packages/theme/src/Http/Controllers/ThemeController.php`
- `platform/packages/theme/src/Forms/RobotsTxtEditorForm.php`
- `platform/packages/theme/src/Supports/AiCrawlerPolicy.php`
- `platform/packages/sitemap/src/Forms/Settings/SitemapSettingForm.php`
- `platform/packages/sitemap/src/Http/Controllers/SitemapSettingController.php`

One file can't serve N domains. The filter redirects it into the tenant's own storage
directory, which `FilesystemTenancyBootstrapper` already isolates.

`ThemeController::postRobotsTxt()` also writes the **uploaded** file through the same
path (stock Botble moved it to `public_path()` regardless), and refuses to write when
the upload can't be read, rather than truncating `robots.txt` to an empty file.

## 9. Login email prefill

**`platform/core/acl/src/Forms/Auth/LoginForm.php` — email prefill**

The username field falls back to an `?email=` query parameter (validated with
`filter_var()` before being reflected into the form).

The control plane's "find my store" flow redirects an owner from the platform domain to
their own store's login page. `old()` only reads session flash data, which can't cross
domains, so without this the email was silently dropped and the owner had to type it
twice.

## 10. Installer requirements filter

**`platform/packages/installer/src/Supports/RequirementsChecker.php`**

One line in `check()`:

```php
return apply_filters('cms_installer_requirements', $results);
```

That is the whole upstream change. The installer gains an extension point and no
knowledge of Redis — which is the point: a single-tenant Botble runs fine on the
default `file` cache, and requiring Redis upstream would block every ordinary
install. It follows the package's existing convention (`installer_steps`,
`cms_installer_themes`, `cms_installer_theme_presets`).

This build supplies the meaning, from
`Botble\Tenancy\Support\InstallerRequirements::add()`, registered in
`TenancyServiceProvider::advertiseCacheRequirementsInInstaller()`. It appends exactly
one advisory row under `$results['requirements']['recommended']` —
*redis reachable (faster cache & queue)* — and **never sets `$results['errors']`**.
A buyer with no Redis still sees the wizard render and can finish installing on
`file` or `database` cache. No view change was needed: `requirements.blade.php`
iterates whatever requirement types it is handed.

Listeners add rows under `$results['requirements'][<type>]` and may set
`$results['errors']` to block installation.

## Application-level (root) changes — none

The tenancy layer touches **no** root app files (`bootstrap/app.php`, `config/*`,
`phpunit.xml`). Everything lives in `platform/packages/tenancy`, so nothing here needs
re-applying after an upgrade or a fresh clone. Two things worth knowing:

- **Public disk URL** — Botble's stock `config/filesystems.php`
  `disks.public.url` bakes in the central host, which is wrong for a tenant. The
  package fixes this at runtime: `Botble\Tenancy\Bootstrappers\BotbleStateBootstrapper`
  recomputes the URL per tenant on every tenancy switch, so the stock config is left
  untouched.
- **Test suite** — the isolation tests run from a package-local PHPUnit config,
  `platform/packages/tenancy/phpunit.xml`, not the root `phpunit.xml`.

## Verifying the patches after an upgrade

```bash
php artisan tenancy:preflight
composer install    # release zips ship without dev dependencies or tests/
vendor/bin/phpunit -c platform/packages/tenancy/phpunit.xml
```

**Ten changes across thirteen files.** Working from a git clone, the test suite fails loudly if patch 1 (settings
load order), patch 2 (mail config guard) or the `MacroableModels` singleton regresses
— those three are silent data-leak bugs otherwise, so a green run is the confirmation
an upgrade didn't quietly drop one.

## Related

- [Artisan commands](./commands.md) — `tenancy:preflight` reference
- [Troubleshooting](./troubleshooting.md) — symptoms that trace back to a lost patch
