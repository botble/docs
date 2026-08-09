---
title: Troubleshooting
description: What to check when a popup does not appear, or appears when it should not
---

# Troubleshooting

## The popup does not appear at all

Work down this list in order - most reports end at one of the first three.

### 1. Is it published and in date?

Draft popups never render. Check **Status** on the Detail tab, and that today falls inside **Starts at** / **Ends at** if you set them.

### 2. Have you already seen it?

Frequency capping is per browser, in local storage. If the popup is set to *Once ever* or *Once per session* and you have already seen or closed it, it will not come back.

Clear the site's local storage, use a private window, or call the reset from the browser console:

```js
BbPopup.reset(3)   // 3 = the popup id
```

### 3. Do the display rules exclude you?

Use **Test against a URL** on the Display Rules tab for the server-side rules. Browser-side rules - device, login status, visitor history, referrer, UTM, cookie, page views - depend on the real visitor, so check them by hand:

```js
BbPopup.has(3)   // false = the runtime never adopted this popup for you
```

`false` means either the browser rules excluded you, or the popup was never delivered to this page at all.

### 4. Is another popup winning?

Only the highest-**priority** eligible popup is shown per page view. If a second popup should follow the first, turn on **Show the next eligible popup after one is closed** in **Popups → Settings**.

### 5. Are popups disabled globally?

**Disable all popups on mobile** in Settings is a global off-switch for phones. Check it before debugging a rule.

### 6. Is the trigger reachable?

- **Exit intent** is desktop only. On a phone it never fires - tick **Also show after a time delay** as a fallback.
- **On click** needs a CSS selector that actually matches something on the page.
- **After scrolling** needs a page long enough to scroll to that percentage.

## The popup appears on the wrong pages

With no display rules a popup shows everywhere. Add a **URL path** rule - remembering that `*` matches across slashes, so `/blog*` also matches `/blog/2026/post`.

If you are using **Match ANY**, one passing rule is enough. Check whether you meant **Match ALL**.

## Nothing happens when I click my own "show offer" button

Check `BbPopup.has(id)` before wiring the button. If the popup's browser-side rules excluded the visitor, it was never adopted and `open()` is a no-op. See [Shortcode & embed](./usage/shortcode-and-embed.md#javascript-api).

## The wrong visitors see it on a cached site

Server-side rules (URL, page type, language, schedule) are baked into the cached HTML; browser-side rules are applied afterwards. That combination is correct for full-page caching.

If your cached HTML must not contain popup markup at all, turn on **Cache-safe delivery** in Settings. See [Display rules](./usage/display-rules.md#caching).

## I cannot create or edit popups

Activate your license in **Popups → Settings**. Existing popups keep rendering without it - only creating and editing are gated.

## Reports are empty

- Confirm the popup is actually being displayed, using the checks above
- Daily buckets use the **site** time zone, not yours - widen the date range
- Statistics older than the retention window are deleted nightly

## Old statistics are never deleted

Pruning runs through Laravel's scheduler. Confirm the cron entry exists, or run it by hand:

```bash
php artisan bb-popup:prune-stats
```

## Styling looks wrong after an update

Clear your browser cache. The plugin's CSS and JavaScript are cache-busted by version, so a hard refresh is usually enough. If you deploy with a build step, re-run:

```bash
php artisan cms:publish:assets
```
