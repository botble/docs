---
title: Troubleshooting
description: Common problems and how to fix them.
---

# Troubleshooting

This page covers the issues that come up most often when working with Landing Funnel.

## Funnel URL returns 404

**Possible causes:**

- **Status is Draft** — only `Published` funnels are publicly visible. Set status in the funnel edit form's right sidebar.
- **Slug typo** — double-check the URL matches the funnel's slug exactly (lowercase, hyphens only).
- **Schedule window** — if `Starts at` is in the future or `Ends at` is in the past, the funnel returns 404. Clear the schedule fields or update them.
- **No product attached** — funnels without a `product_id` return 404. Attach a product in the Basics tab.
- **Product is unpublished or deleted** — verify the linked product still exists and is published.

## Checkout redirects to login after submitting the funnel form

**Symptom:** Visitor fills the form, clicks "Place order", lands on `/login` instead of `/checkout/{token}`.

**Cause:** Your store has guest checkout disabled, AND the `EnsureFunnelGuestCheckout` middleware isn't running.

**Fix:**

1. Verify the plugin's service provider registered the middleware. Check `app/Console/Kernel.php` or run:
   ```bash
   php artisan route:list | grep landing
   ```
2. Clear caches:
   ```bash
   php artisan config:clear && php artisan cache:clear && php artisan route:clear
   ```
3. Verify the funnel actually wrote an attribution cache key during `prepare()`. In Tinker:
   ```bash
   php artisan tinker --execute="dump(cache()->get('landing-funnel.attribution.YOUR_TOKEN'));"
   ```
   If the cache is empty, the prepare endpoint didn't reach `rememberAttribution()` — check the response status from the form submission.

[How the middleware works &rarr;](./usage/checkout-and-cod#conflict-safe-guest-checkout)

## Prepare endpoint returns 422 with "The email field is required"

**Cause:** Your ecommerce store config marks `email` as a mandatory checkout field. The funnel mirrors this — submissions without an email are rejected.

**Fix one of:**

- Make email mandatory in your funnel: visitors will see the email field as required (with red `*`)
- Make email optional in your store: **Admin > Ecommerce > Settings > Checkout > Mandatory fields** — uncheck `email`

The funnel form auto-renders email as required-or-optional based on the store config.

## "Digital products are not supported on this funnel"

**Cause:** The product linked to the funnel is digital. Digital products force a customer login at checkout (Ecommerce constraint), which is incompatible with the funnel UX.

**Fix:** Use a physical product. For selling digital products, set up a normal Botble product page with the standard add-to-cart flow.

## Country / state asks for input on the checkout page

**Symptom:** Visitor fills the funnel form, but on `/checkout/{token}` they're asked to fill country or state again.

**Cause:** Your store's `store_country` or `store_state` settings are blank.

**Fix:** **Admin > Ecommerce > Settings > General** — set your store's address. The funnel auto-fills these on every prepare.

## Custom CSS / JS not appearing on the funnel page

**Possible causes:**

- **Plugin-wide kill-switch is ON** — check **Settings > "Disable per-funnel Custom CSS + JS site-wide"**. When ON, neither field renders regardless of per-funnel content.
- **Permission missing for custom JS** — `custom_js` requires the `landing-funnel.use-custom-js` permission. Admins without it can edit funnels, but their `custom_js` submissions are silently stripped server-side. Grant the permission at **Roles > Permissions**.
- **CSP blocked the script** — open the browser DevTools console. If you see "Refused to load the script... violates the Content Security Policy directive: script-src...", your script is loading from a domain not in the CSP whitelist. Either move the script to a whitelisted domain or extend the CSP meta in `layout.blade.php`.

## Webhook never fires

**Possible causes:**

- **No webhook URL set** — verify the funnel has a URL in the Tracking tab.
- **Queue worker not running** — webhooks dispatch via Laravel jobs. Check that `php artisan queue:work` is running on your server.
- **Order didn't reach `is_finished=true`** — the listener fires on `OrderCreated`. Verify the order actually converted (not just sat as a pending checkout).

**Debugging:**

```bash
# Run the queue worker in the foreground to see job output
php artisan queue:work --tries=1
```

Then trigger a test conversion and watch for `DispatchFunnelConversionWebhookJob`.

## Webhook fires but my server rejects with "Invalid signature"

**Cause:** The HMAC-SHA256 signature on your end doesn't match.

**Checklist:**

1. The secret on both sides matches exactly (no leading/trailing whitespace)
2. You're hashing the **raw request body** (not the parsed JSON)
3. You're using `sha256` (not sha1 or sha512)
4. The signature header format is `sha256=<digest>` (the prefix matters)
5. You're using constant-time comparison (`hash_equals`)

[Webhook signature verification examples &rarr;](./usage/tracking-and-webhooks#verifying-the-signature-server-side)

## Visit counts in Reports look way too high

**Cause:** Bot traffic isn't being filtered.

**Fix:** **Settings > Bot user-agent keywords** — verify your list includes common crawlers. Default list covers Google, Bing, Facebook, TikTok, Ahrefs, Semrush. Add platform-specific bots you care about.

## Google Fonts don't load after setting heading/body font

**Cause:** The font family name has unusual characters (the plugin only accepts `[A-Za-z0-9 ]`, 2–60 chars).

**Fix:** Use the exact family name as shown on fonts.google.com — e.g. `Playfair Display`, not `Playfair-Display` or `PlayfairDisplay`. Spaces are allowed.

## Funnel page loads slowly

**Possible causes:**

- **Custom JS doing heavy work** — open DevTools Performance tab to profile
- **Tracking pixels** — Meta Pixel, GA4, TikTok each add ~30KB of JS. This is expected.
- **Theme assets bleeding through** — verify no `theme.css` is loaded on the funnel page. The plugin ships its own standalone layout — if you see theme styles, something is wrong with the layout extension.

The plugin's own CSS is one file, ~25 KB gzipped, with no external dependencies.

## After upgrading the plugin, the admin settings page errors

**Fix:**

```bash
php artisan view:clear
php artisan config:clear
php artisan cache:clear
composer dump-autoload
```

Then re-publish plugin assets:

```bash
php artisan vendor:publish --tag=plugin-landing-funnel --force
```

## Migrations fail on plugin activation

**Cause:** A previous failed migration left the schema in a half-state.

**Diagnosis:**

```bash
php artisan migrate:status | grep landing-funnel
```

If a migration shows as `Pending`, run it manually:

```bash
php artisan migrate --path=platform/plugins/landing-funnel/database/migrations
```

All landing-funnel migrations are idempotent (`hasTable` + `hasColumn` guards), so re-running them is safe.

## Still stuck?

- Check the [FAQ](/landing-funnel/faq)
- Check application logs at `storage/logs/laravel-*.log`
- Open a support ticket from your CodeCanyon downloads page
