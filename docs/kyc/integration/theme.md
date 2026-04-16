---
title: Theme Integration
description: Optional theme-level customisations for the KYC Verification plugin.
---

# Theme Integration

The plugin is designed to work with **any** Botble theme out of the box — the customer-facing submission flow is rendered in a plugin-owned standalone layout, so you don't need to create a single blade view in your theme.

This page documents the **optional** hooks for themes that want to go further.

## Zero-config path

For 99% of stores you only need to add the dashboard link(s) from [Ecommerce Integration](./ecommerce.md) or [Marketplace Integration](./marketplace.md). Everything else — styling, layout, fonts, error pages — is provided by the plugin.

## Form style presets

Match the form to your brand by picking one of the six visual presets in **Admin → KYC Verification → Settings → Form style**:

| Preset | When to use |
|---|---|
| `classic` | Neutral white card — safe default |
| `emerald` | Green accent — fintech feel |
| `violet` | Purple accent — modern SaaS |
| `sunset` | Warm amber accent |
| `minimal` | No background gradient |
| `midnight` | Dark mode |

The preset affects the entire plugin-owned flow: submission form, status page, locked page, and GDPR export link.

## Optional: multi-step wizard

Toggle **Use multi-step form** in Settings to render the submission form as a 3-step wizard (document type → upload → review) instead of a single page.

## Override blade views (advanced)

If you need finer control — e.g. to change the hero copy on the submission page or add a custom disclaimer — publish the plugin views and edit the copies in your theme:

```bash
php artisan vendor:publish --tag=kyc-views
```

Copies are placed at `resources/views/vendor/plugins/kyc/`. Laravel loads them **before** the plugin's own views for the same key.

Commonly overridden views:

| View | Purpose |
|---|---|
| `customer.submission.form` | The main submission page |
| `customer.submission.status` | Shown after submit while pending |
| `customer.submission.locked` | Shown when the subject is locked |
| `layouts.standalone` | The outer chrome (header, footer, assets) |

::: warning
If you override a view, you own it — future plugin upgrades won't touch your copy. Keep a note of what you changed so you can merge upstream fixes manually.
:::

## Override the standalone layout

The plugin renders its pages inside `layouts.standalone.blade.php`, which pulls in Botble core assets (Tabler + jQuery) via `Assets::renderHeader(['core'])` and the configured `kyc_form_style` CSS preset.

To replace the chrome (header logo, footer, favicon, custom CSS) without forking the whole plugin:

1. Publish the views as above.
2. Edit `resources/views/vendor/plugins/kyc/layouts/standalone.blade.php`.
3. Keep the required `@yield('content')` block and the CSS preset loader.
4. Do not load assets from a CDN — Envato themes must be CDN-free.

See Botble's [Standalone Layouts guardrail](/cms/theme-development/theme-assets) for the full rules.

## Add a custom homepage banner

If you want to promote your KYC program from the homepage or product detail pages, you can check the customer's KYC status in any Blade view:

```blade
@if (auth('customer')->check())
    @php
        $status = auth('customer')->user()->kycStatus('customer');
    @endphp

    @if ($status?->getValue() === 'pending')
        <div class="alert alert-warning">
            Your identity verification is under review.
        </div>
    @elseif ($status === null)
        <a href="{{ route('kyc.submission.index', ['subjectKey' => 'customer']) }}"
           class="btn btn-primary">
            Verify your identity
        </a>
    @endif
@endif
```

## Translations

All customer-facing strings live in `platform/plugins/kyc/resources/lang/en/kyc.php` and the per-locale counterparts. See [Translations](../developer/translations.md) if you need to adjust copy.

## Theme-level JS events

The plugin does **not** emit custom JS events from the submission form — it submits via a plain `<form>` POST and redirects. If you need client-side analytics hooks, add them directly in the published view or attach an event listener on the `<form>` element.

## Next step

- [Checkout & Listing Gates](./gates.md) — route middleware
- [Developer → Extending KYC](../developer/extending.md) — beyond theme integration
