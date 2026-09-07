---
title: Localization
description: How the tenancy package's strings are organized, how many locales it ships, and how to override a translation without editing the package.
---

# Localization

Every string the tenancy package shows — to store owners, to shoppers on the marketing
site, and to platform operators — resolves through
`trans('packages/tenancy::file.key')`, under the `packages/tenancy::` namespace.

## One file per surface

The English source lives at `platform/packages/tenancy/resources/lang/en/`, one file
per surface:

| File | Surface |
|---|---|
| `api.php` | Control-plane API responses |
| `apps.php` | The store owner's Apps screen |
| `billing.php` | The store owner's Billing screen |
| `domains.php` | The store owner's Domains screen |
| `emails.php` | Lifecycle emails (store ready, trial ending, payment failed, …) |
| `marketing.php` | The marketing site, signup flow and parked page |
| `operator.php` | The operator console |
| `tenancy.php` | Shared/general tenancy strings |
| `themes.php` | The store owner's Themes screen |

Every other locale under `resources/lang/` mirrors these same file and key names.

## Locale coverage

The package ships the same 42 locales as the ecommerce plugin, plus the English source
— 43 locale directories in total under `resources/lang/`. A store's admin language
switch follows the same locale Botble already uses for the rest of the admin, so
switching it also switches every tenancy screen (Apps, Billing, Domains, Themes) to
match.

## Overriding a translation

To adjust a translation without editing the package directly, place the same file
under:

```text
lang/vendor/packages/tenancy/{locale}/{file}.php
```

For example, to change a string in the operator console for Spanish, create
`lang/vendor/packages/tenancy/es/operator.php` with just the keys you want to override
— Laravel's vendor-override lookup falls back to the package's own file for any key
you don't redefine.

::: tip Adding a new key
When a new key is added to `en/`, the missing translations across every other locale
are filled by a translate script that only fills gaps — it never overwrites an existing
translation.
:::

## Related

- [Botble CMS localization](/cms/localization) — the underlying translation system this package builds on
