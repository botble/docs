---
title: Tracking & Webhooks
description: Per-funnel pixels, UTM capture, attribution cache, and HMAC-signed conversion webhooks.
---

# Tracking & Webhooks

Every funnel can fire ad-platform pixel events and emit a server-side webhook on conversion. Pixel IDs and webhook URLs are configured per funnel; plugin-wide defaults pre-fill new funnels.

## Tracking Pixels

The plugin supports three platforms out of the box:

| Platform | Field format |
|---|---|
| Facebook (Meta) Pixel | 15–16 digits |
| TikTok Pixel | 20 uppercase alphanumeric (e.g. `C8XXXXXXXXXXXXXXXXXX`) |
| Google Analytics 4 | `G-` + 10 uppercase alphanumeric (e.g. `G-XXXXXXXXXX`) |

Set them per funnel under the **Tracking** tab. Leave any field blank to inherit the plugin-wide default from **Settings**.

### Events Fired

| Event | When |
|---|---|
| `PageView` | Funnel page loads |
| `ViewContent` | Same as PageView, with product `value` + `content_ids` populated |
| `InitiateCheckout` | Visitor focuses the inline form for the first time |
| `Purchase` | Standard ecommerce success page fires the conversion pixel (from the standard ecommerce module) |

::: info
`Purchase` events are fired by the standard ecommerce Pixel integration on the order success page, not by Landing Funnel itself. This means existing Pixel setups for organic checkouts also cover funnel conversions automatically.
:::

### Where Pixels Render

Pixels are injected into the funnel page `<head>` and `<body>` via the layout's `@yield('tracking-head')` and `@yield('tracking-body')` hooks. Each pixel's script is built by `Botble\LandingFunnel\Services\TrackingPixelBuilder` — formatted, escaped, and only emitted if the pixel ID validates.

### UTM Parameter Capture

Every funnel page visit records the visitor's UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) in the `landing_funnel_visits` table. These travel with the visit through the attribution cache and end up on the converted order's webhook payload.

This means your CRM can see exactly which ad set, creative, and keyword generated each order — without any client-side cookies or third-party trackers.

## Attribution

When a visitor's session converts via standard checkout:

1. The `OrderCreated` event fires
2. `RecordFunnelOrderListener` resolves the funnel:
   - First checks the 48-hour attribution cache key (`landing-funnel.attribution.{token}`)
   - Falls back to the order session data if the cache key expired
3. Writes a row to `landing_funnel_orders` with the funnel ↔ order link, snapshot of price + currency
4. If a webhook URL is set, dispatches `DispatchFunnelConversionWebhookJob` to a queue

[Attribution cache mechanics &rarr;](./checkout-and-cod#attribution-cache)

## Webhooks

The webhook is the integration point for your CRM, email service, fulfillment system, or anything else.

### Setup

In the funnel's **Tracking** tab:

- **Conversion webhook URL** — full HTTPS URL (max 500 chars)
- **Webhook signing secret** — optional. When set, payloads carry an HMAC-SHA256 signature

### Webhook Payload

```json
{
  "event": "funnel.conversion",
  "funnel": {
    "id": 1,
    "slug": "summer-sale-hoodie",
    "name": "Summer Sale — Hoodie"
  },
  "order": {
    "id": 1234,
    "code": "ORD-1234",
    "token": "abc123...",
    "subtotal": "29.99",
    "currency": "USD",
    "status": "pending"
  },
  "customer": {
    "name": "Alex Buyer",
    "email": "alex@example.com",
    "phone": "+1 555 000 0001",
    "address": "1 Main St",
    "city": "HCM"
  },
  "utm": {
    "source": "facebook",
    "medium": "cpc",
    "campaign": "summer-sale-2026",
    "content": "creative-A",
    "term": null
  }
}
```

### Request Headers

```http
POST /your-webhook-endpoint HTTP/1.1
Content-Type: application/json
User-Agent: LandingFunnel-Webhook/1.0
X-LF-Event: funnel.conversion
X-LF-Signature: sha256=<hmac_sha256_digest>
```

`X-LF-Signature` is only present when the funnel has a signing secret configured.

### Verifying the Signature (Server Side)

In your webhook receiver, compute the HMAC-SHA256 over the raw request body using the same secret, then compare against the header value:

```php
// PHP example
$body = file_get_contents('php://input');
$expected = 'sha256=' . hash_hmac('sha256', $body, $secret);

if (! hash_equals($expected, $_SERVER['HTTP_X_LF_SIGNATURE'] ?? '')) {
    http_response_code(401);
    exit('Invalid signature');
}
```

```javascript
// Node.js example
const crypto = require('crypto');
const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(req.rawBody)
    .digest('hex');

if (! crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers['x-lf-signature']))) {
    return res.status(401).send('Invalid signature');
}
```

::: tip
Always use a constant-time comparison (`hash_equals` / `crypto.timingSafeEqual`) to prevent timing attacks.
:::

### Retry Behavior

- **3 attempts** total (1 initial + 2 retries)
- **30s backoff** between attempts
- **15s response timeout** per attempt; 8s connect timeout
- Failures (non-2xx response, timeout, network error) are logged with the full response status and error message

The delivery log is visible in admin under **Landing Funnels > Webhooks** with the full payload, response status, attempt count, and a manual **Retry** action.

### Manual Retry

For delivery failures (or just to replay an event during development):

1. Go to **Admin > Landing Funnels > Webhooks**
2. Find the failed delivery
3. Click **Retry**

The retry uses the original payload and signing secret — so you can fix the receiver and replay without losing data.

## Bot Filtering

To keep your conversion analytics clean, visits from common crawlers are excluded from the `landing_funnel_visits` table.

The filter compares the visitor's `User-Agent` against a newline-separated keyword list at **Settings > Bot user-agent keywords**. Defaults cover Google, Bing, Facebook, TikTok, Ahrefs, Semrush, and common scrapers. Add or remove keywords as needed.

::: info
Pixel events still fire for bot traffic — they're handled by the ad platforms' own filters. The bot list only affects the internal `landing_funnel_visits` log used for the Reports page.
:::

## Visit Log Retention

The `landing_funnel_visits` table grows quickly under heavy ad traffic. Schedule the purge command on cron:

```bash
# Daily at 03:00 — retains the last N days where N = "Visit log retention" setting
0 3 * * * php /var/www/your-app/artisan landing-funnel:purge-visits
```

Set retention days to `0` in **Settings** to disable auto-purge entirely. The conversion data in `landing_funnel_orders` is never auto-purged — only visit-level analytics get pruned.

[Back to usage overview &rarr;](/landing-funnel/usage/)
