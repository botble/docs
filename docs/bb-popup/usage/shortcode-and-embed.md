---
title: Shortcode & embed
description: Placing popups by hand, the JavaScript API, and embedding on another site
---

# Shortcode & embed

Most popups are injected automatically through the theme's footer hook - you do not have to touch a template. This page covers the cases where you want to place one yourself.

## The shortcode

Every popup has a **Shortcode** slug on its Detail tab. Use it anywhere shortcodes are accepted - a page, a post, a static block, a widget:

```
[bb-popup code="flash-sale"][/bb-popup]
```

`code` is the only attribute. If the popup is missing, unpublished, or outside its start and end dates, the shortcode renders nothing.

::: tip Inline popups
A popup whose **Type** is *Inline (shortcode only)* is never injected automatically - the shortcode is the only way it appears, and it renders in the page flow rather than over it. Use it for an in-article signup block.
:::

A popup is only rendered once per page, so a shortcode and the automatic injector will not produce two copies.

## JavaScript API

The public runtime exposes `window.BbPopup`. Use it to open a popup from your own button.

| Method | Does |
|---|---|
| `BbPopup.has(id)` | Whether the popup is live on this page. |
| `BbPopup.open(id)` | Opens it. |
| `BbPopup.close(id)` | Closes it. |
| `BbPopup.reset(id)` | Clears this visitor's frequency record for the popup. |
| `BbPopup.markConverted(id)` | Records a conversion, and satisfies the *Until converted* frequency mode. |
| `BbPopup.refresh()` | Adopts popup markup added to the page after load. Returns how many were newly adopted. |

::: warning Always check `has()` first
If a popup's browser-side display rules excluded the visitor, it was never adopted and `open()` does nothing. A "show me the offer" button that skips this check looks broken to exactly the visitors the rules were written to exclude.

```html
<button id="show-offer" hidden>Show the offer</button>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('show-offer')

    if (window.BbPopup && BbPopup.has(3)) {
      button.hidden = false
      button.addEventListener('click', function () { BbPopup.open(3) })
    }
  })
</script>
```
:::

## Embedding on another site

The **Advanced** tab can expose a popup to other domains. Tick **Allow this popup to be embedded elsewhere** - it can be turned off to keep the popup on this site only.

### Script embed (recommended)

```html
<script src="https://your-site.com/vendor/core/plugins/bb-popup/js/embed.js"
        data-bb-popup="flash-sale"></script>
```

Paste it before `</body>` on the other site. The popup behaves exactly as it does here, including triggers, display rules and analytics.

### Iframe embed

```html
<iframe src="https://your-site.com/popup/flash-sale"
        style="border:0;width:100%;height:420px" loading="lazy"></iframe>
```

Use this only where the other site forbids third-party scripts. An iframe cannot cover the host page, so the popup renders inside the frame's box rather than over the page.

::: tip
Save the popup once before copying either snippet - both are built from its shortcode slug, which does not exist until the first save.
:::
