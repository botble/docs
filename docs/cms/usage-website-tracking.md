# Website Tracking (GTM, GA4, Pixels)

All analytics and marketing tags — Google Tag Manager, Google Analytics 4, Meta Pixel, TikTok Pixel, Hotjar, Clarity —
are configured from a single screen:

**Admin → Settings → Website Tracking**

The values are stored in the database, so they survive updates and are not lost when you switch themes.

::: danger Do not paste tracking code into Appearance → Custom HTML
**Admin → Appearance → Custom HTML** runs every field through the HTML sanitizer, which **strips `<script>`, `<style>`
and `<iframe>` tags on save**. If you paste a GA4/GTM/AdSense snippet there, it will silently disappear when you save.
That is by design, not a bug — the field's own helper text says "no special tags: script, style, iframe".

Use **Settings → Website Tracking** instead. It does not sanitize the input, so scripts survive.
:::

::: warning Settings → Google Analytics is a different thing
**Admin → Settings → Google Analytics** (the Analytics plugin) takes a Property ID and a service-account JSON so the
**admin dashboard widgets** can read your traffic reports. It does **not** inject any tracking script into your
frontend. See [Analytics](/cms/usage-analytics).
:::

## Choosing a mode

The page offers three mutually exclusive modes. Pick one with the radio buttons at the top.

| Mode | When to use | What you enter |
| --- | --- | --- |
| **Google Tag Manager** | You want one container that manages GA4, Meta Pixel, Ads, and everything else. Recommended. | GTM container ID (`GTM-XXXXXXX`) |
| **Google Tag ID** | You only need GA4 and do not want a tag manager. | Measurement ID (`G-XXXXXXXXXX`) |
| **Custom tracking** | Any other vendor, or several snippets at once. | Raw HTML/JS for the `<head>` and for the top of `<body>` |

### Google Tag Manager mode

Enter the container ID and the CMS renders both the `<head>` script and the `<body>` `<noscript>` fallback for you.

Two extra toggles are available in this mode:

| Toggle | Default | Purpose |
| --- | --- | --- |
| **GTM debug mode** | Off | Emits extra console output so you can trace the dataLayer while building tags. Turn it off in production. |
| **Send user data** | Off | Includes user data in the dataLayer for GTM tags that consume it. Review your privacy policy before enabling. |

The page also embeds setup, "add GA4 to your container", and verification guides inline — follow them in order.

### Google Tag ID mode

Enter only the GA4 measurement ID (`G-` prefix). The CMS renders the standard `gtag.js` loader. Use this when you have
no other vendor to manage.

### Custom tracking mode

Two code boxes:

- **Header JavaScript** — injected just before `</head>`. Use it for loader scripts (Meta Pixel, TikTok Pixel, Hotjar,
  Clarity, Ahrefs, etc.).
- **Body HTML** — injected right after `<body>` opens. Use it for `<noscript>` fallbacks and pixel `<img>` tags.

Paste the vendor's snippet verbatim, including the `<script>` tags.

## Ecommerce event tracking

On ecommerce products, the CMS also pushes standard ecommerce events into the dataLayer (`view_item`, `add_to_cart`,
`view_cart`, `begin_checkout`, `purchase`) and fires the native Meta Pixel equivalents (`ViewContent`, `AddToCart`,
`InitiateCheckout`, `Purchase`, …) with catalog parameters — `content_ids`, `content_type`, `value`, `currency`.

Two things to be aware of:

- **There is no built-in TikTok pixel.** TikTok events are expected to be configured as a tag inside *your own* GTM
  container, reading from the dataLayer that the CMS publishes. If TikTok reports "Content ID missing" or an empty
  `contents` array, the mapping in your GTM tag is incomplete — it is not a CMS-side setting.
- **No server-side conversions API and no hashed PII.** Events fire client-side with product data only. Meta CAPI,
  TikTok Events API, and GA4 Enhanced Conversions (`user_data` with hashed email/phone) are not part of core and
  require custom development.

## Verifying your setup

1. Save the settings, then clear caches at **Admin → Platform Administration → Cache Management**.
2. Open your site in a private window and view source — the snippet should appear in `<head>`.
3. For GTM, use **GTM Preview** mode; for GA4, use **DebugView** in the GA4 admin.
4. If a CDN sits in front of the site (Cloudflare, LiteSpeed, Varnish), purge its cache too — the old HTML without your
   tag can stay cached for hours.

## Troubleshooting

### The snippet disappears after saving

You pasted it into **Appearance → Custom HTML**. Move it to **Settings → Website Tracking → Custom tracking**. See the
warning at the top of this page.

### The tag does not appear in the page source

- Clear the CMS cache, then the CDN cache.
- Confirm you saved the mode you edited — switching the radio button hides, but does not clear, the other modes' values.
- Check that the page you are inspecting is not being served from a full-page cache. See
  [Public Cache Control](/cms/usage-public-cache-control).

### Events fire twice in GTM Preview

Check that you are not *also* loading the same tag from a second place — a theme option, a Custom JS snippet, or a
hard-coded snippet in a child theme. Each source fires its own event.

## Related

- [Analytics](/cms/usage-analytics) — admin dashboard reporting (different feature)
- [Custom CSS/JS](/cms/usage-custom-css-js)
- [SEO Helper](/cms/seo-helper)
