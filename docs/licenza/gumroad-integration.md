# Gumroad Integration

Verify Gumroad license keys during activation. When a customer activates your software with their Gumroad license key, Licenza calls Gumroad's API in real time, rejects refunded/chargebacked/cancelled purchases, and auto-creates a local `ProductLicense` so subsequent verifications are served from the local database — no further Gumroad calls.

::: tip Same flow as Envato
If you've integrated Envato licenses, the Gumroad flow is identical. Only the `verify_type` and the product ID field change.
:::

## Prerequisites

1. A **Gumroad seller account** with at least one product.
2. **License keys enabled** on the product — toggle **Generate a unique license key per sale** in the Gumroad product editor (under *Content → Customize the buyer's experience*).
3. The **Gumroad Product ID** for that product. Find it in Gumroad → *Products → your product → Share → API*. It's a short alphanumeric string (e.g. `WJ3xqLN8aPbnaTRsSrU8oA==`).
4. A **Licenza server** with an external API key configured.

::: warning Pre-2023-01-09 products
For products created before 9 January 2023, Gumroad originally used `product_permalink`. The newer `product_id` is now displayed in the dashboard for all products and is what this integration uses. If you can't find a `product_id`, contact Gumroad support.
:::

## Server-side setup

### 1. Enable Gumroad integration

Log into the Licenza admin panel:

**Settings → Licenza → General → Gumroad Integration**

| Field | Required | Description |
|---|---|---|
| **Enable Gumroad Integration** | Yes | Master toggle. When off, the Gumroad Product ID field is hidden on the Product form. |
| **Gumroad Access Token** | No | Personal access token with `edit_products` scope. Only needed if you want Licenza to remotely **disable** a license on Gumroad. Public license **verification** does NOT require a token. Create one at [gumroad.com/settings/advanced](https://gumroad.com/settings/advanced). |
| **Increment Gumroad Uses Counter** | No (default on) | When on, every successful verify bumps Gumroad's per-license usage counter visible in your Gumroad dashboard. Turn off if you don't want Gumroad's counter to track activations. |
| **Default Gumroad License Uses Limit** | No | Default `uses` value for auto-created licenses. Leave blank or `0` for unlimited. |
| **Default Gumroad Parallel Uses Limit** | No | Default number of concurrent activations allowed per license. Leave blank for unlimited. |

### 2. Map the Gumroad Product ID on your local Product

**Licenza → Products → your product → Edit**

A new **Gumroad Product ID** field appears once the integration is enabled. Paste the Gumroad product ID from your Gumroad dashboard.

::: tip One local Product = one Gumroad product
If you sell the same software on Gumroad and (say) Envato, create ONE local Product and fill in both `envato_id` and `gumroad_product_id`. Licenza picks the right provider based on the `verify_type` the client sends.
:::

## Client-side: activating a license

Your client app sends the user's Gumroad license key to your Licenza server. Set `verify_type` to `gumroad`:

```http
POST /api/external/license/activate
X-API-KEY: external-key
X-API-URL: https://customer-site.com
X-API-IP: 192.168.1.100
Content-Type: application/json

{
  "verify_type": "gumroad",
  "product_id": "PROD-001",
  "license_code": "GUMROAD-LICENSE-KEY",
  "client_name": "Buyer Name"
}
```

**Successful response (HTTP 200):**

```json
{
  "status": true,
  "is_active": true,
  "message": "Activated.",
  "lic_response": "<encrypted-license-data>",
  "data": {
    "license_data": "<encrypted-license-data>"
  },
  "expires_at": null,
  "updates_until": null,
  "support_until": null
}
```

Store `lic_response` locally; use it for subsequent `/verify` and `/deactivate` calls (same as any other license).

### Rejection responses

| Scenario | HTTP | `message` |
|---|---|---|
| Product has no `gumroad_product_id` configured | 400 | `This product is not configured for Gumroad verification.` |
| Gumroad returns 404 / invalid key / `success:false` | 400 | `Your license code is invalid.` |
| Purchase refunded / chargebacked / disputed (and not won) | 400 | `Your license code is invalid.` |
| Subscription cancelled / failed / ended | 400 | `Your license code is invalid.` |

## How verification works

```
User enters Gumroad key
        │
        ▼
┌──────────────────────────────────────┐
│ Local DB has license with this key?  │
└──────────────────────────────────────┘
   YES │                          │ NO
       │                          │
       │                          ▼
       │            ┌────────────────────────────┐
       │            │ verify_type = gumroad ?    │
       │            └────────────────────────────┘
       │                            │ YES
       │                            ▼
       │            ┌────────────────────────────────┐
       │            │ POST api.gumroad.com           │
       │            │ /v2/licenses/verify            │
       │            └────────────────────────────────┘
       │                            │
       │            ┌───────────────┴───────────────┐
       │            │ success && !refunded          │
       │            │ && !chargebacked              │
       │            │ && !subscription_ended ?      │
       │            └───────────────┬───────────────┘
       │                            │ YES
       │                            ▼
       │            ┌────────────────────────────────┐
       │            │ Auto-create ProductLicense     │
       │            │ provider='gumroad'             │
       │            │ external_reference=<sale_id>   │
       │            └────────────────────────────────┘
       │                            │
       ▼                            ▼
┌──────────────────────────────────────┐
│ Run unified validation:              │
│  - is_valid                          │
│  - expires_at                        │
│  - parallel_uses cap                 │
│  - domain restriction                │
│  - IP restriction                    │
└──────────────────────────────────────┘
        │
        ▼
   Create ProductActivation
   Return encrypted license_data
```

### Why we cache the license locally

Once Gumroad confirms the key, Licenza creates a `ProductLicense` row. Every subsequent activation against the same key — whether from the same customer adding a new domain or a different customer reusing the key (caught by the parallel-uses cap) — reads from the local DB. **Gumroad is only contacted on first sight of a key**, not on every activation. This keeps Gumroad API traffic low and avoids hitting their rate limits.

### Invalid-purchase detection

Licenza rejects activation if Gumroad's response contains any of:

- `purchase.refunded === true`
- `purchase.chargebacked === true`
- `purchase.disputed === true` and `purchase.dispute_won !== true`
- `purchase.subscription_cancelled_at` is set
- `purchase.subscription_failed_at` is set
- `purchase.subscription_ended_at` is set

If a sale is later refunded *after* the local license was created, the local license stays valid until an admin marks it invalid manually. Consider scheduling a periodic re-verify if you sell subscriptions — Gumroad's webhook is a better fit for that case.

## Pre-create licenses via Gumroad ping webhook (recommended)

Instead of waiting for the customer's first activation to call Gumroad's verify API, you can have **Gumroad push every sale** to Licenza. Each sale creates a local `ProductLicense` row immediately, so:

- All sold licenses appear in the admin panel before any customer activates.
- The first activation skips the Gumroad API call (the license is already local).
- You see every Gumroad sale in your Licenza dashboard.

### 1. Set a webhook secret in Licenza

**Admin → Settings → Licenza → General → Gumroad Integration → Gumroad Ping Webhook Secret**

Paste a long random string (min 16 chars). The form helper shows the full ping URL — copy it.

::: tip
Generate a strong secret quickly with: `openssl rand -hex 32`
:::

### 2. Configure Gumroad

In Gumroad: **Settings → Advanced → Ping**

Paste:

```
https://<your-licenza-domain>/api/external/webhooks/gumroad/<your-secret>
```

(Replace `<your-secret>` with the value you saved above.)

### Behavior

| Scenario | Licenza response |
|---|---|
| New sale with `license_key`, matched `gumroad_product_id` | Creates `ProductLicense` row; returns 200 |
| Same sale re-sent (Gumroad retries) | Returns 200 with `Already exists.` (idempotent by `license_code`) |
| Sale without `license_key` (product has no license keys enabled) | Returns 200 with `Ignored: …` — Gumroad won't retry |
| `product_id` doesn't match any local Product's `gumroad_product_id` | Returns 200 with `Ignored: product not configured.` |
| Wrong/missing secret in URL | Returns 404 — Gumroad will retry, then give up |

### Security model

Gumroad's ping does NOT sign requests (no HMAC). Authentication is via the secret embedded in the URL path. Licenza uses a timing-safe `hash_equals()` comparison. To rotate the secret, change it in admin AND update the Gumroad ping URL — keep both in sync.

### Limitations

- Only the **sale** event is handled. Refunds, disputes, and subscription cancellations are NOT automatically reflected in the local `ProductLicense.is_valid` flag. Customers attempting to re-activate a refunded license get rejected at activate-time (Gumroad's verify API still catches it). If you need real-time refund handling, implement it via Gumroad **Resource Subscriptions** (OAuth-based; out of v1 scope).
- The webhook does NOT create activations — it only creates `ProductLicense` rows. The customer still needs to enter the license key in your app to record an activation.

## Optional: remote disable

When you mark a license as invalid in the admin panel, Licenza only deactivates LOCAL activations by default. To also push **disable** to Gumroad (so the same key cannot be reused), set the **Gumroad Access Token** in settings, then call from a tinker shell:

```php
app(\Botble\LicenseManager\Gumroad::class)->disableLicense(
    $product->gumroad_product_id,
    $license->license_code
);
```

Auto-pushing on `is_valid=false` is intentionally NOT wired — silently mutating an external system is risky. Wire it via a `ProductLicense.updated` listener if you want automatic behavior.

## Troubleshooting

### "This product is not configured for Gumroad verification."

The local Product is missing `gumroad_product_id`. Open the Product in admin and fill the field. Make sure **Enable Gumroad Integration** is on or the field is hidden.

### "Your license code is invalid." for a real license

In order of likelihood:

1. **Wrong Gumroad Product ID** on the local Product. Double-check in Gumroad → Share → API.
2. **License keys not enabled** for the Gumroad product. Toggle it on in Gumroad's product editor and re-test.
3. **Purchase was refunded / chargebacked**. Check the sale on Gumroad.
4. **Subscription cancelled**. Active subscriptions only — cancelled subs fail the guard even before expiry.
5. **Network**: the Licenza server cannot reach `api.gumroad.com`. From SSH: `curl -I https://api.gumroad.com/`.

### A duplicate-key error

Each `license_code` must be globally unique in `lm_licenses`. If a manual license already owns the same string, the Gumroad auto-create returns 400 (`Your license code is invalid.`). Delete or rename the manual row to free the code.

### Verifying token scope

Disable / enable / decrement_uses_count require an access token with `edit_products` scope. Verify a token at:

```bash
curl https://api.gumroad.com/v2/user?access_token=YOUR_TOKEN
```

If the response includes your user info, the token is valid. Token scopes are set when you create the token in Gumroad → Settings → Advanced.

## API summary

Licenza calls these Gumroad endpoints:

| Endpoint | Method | Auth | When |
|---|---|---|---|
| `https://api.gumroad.com/v2/licenses/verify` | POST | none | First activation per key |
| `https://api.gumroad.com/v2/licenses/disable` | PUT | `access_token` (`edit_products`) | Manual admin trigger only |

For the full External API (activate / verify / deactivate / check) see the [API Reference](api.md).

## Limitations

- Variant-scoped licensing is not supported in v1. Different Gumroad variants of the same product are treated as one license pool.
- Buyer-name matching is NOT enforced (unlike Envato, which matches against `purchase.buyer`). Gumroad's `purchase.full_name` is often blank and unreliable.
- Pre-2023-01-09 products that only have a `product_permalink` are not supported. Find your `product_id` in the Gumroad dashboard.

## FAQ

**Q: Do I need a Gumroad access token?**
No, not for verification. The token is only needed if you want Licenza to remotely disable license keys on Gumroad.

**Q: Will every activation hit Gumroad?**
No. Only the first activation per license key. After that, the key is stored locally and validated from the local DB.

**Q: Can I mix Gumroad and Envato licenses on the same Product?**
Yes. Fill both `envato_id` and `gumroad_product_id` on the local Product. The client picks the provider by sending `verify_type=gumroad` or `verify_type=envato`.

**Q: What happens when a Gumroad subscription is cancelled?**
The next activation attempt against that key is rejected. Existing local activations remain valid until an admin marks the license invalid manually.

**Q: Can I use Gumroad without their counter being incremented?**
Yes — turn off **Increment Gumroad Uses Counter** in settings. Licenza still tracks activations locally; Gumroad's per-license counter just stays at zero.

**Q: Does this work with Gumroad's test mode?**
Yes. Test purchases return `success:true` with `purchase.test:true`. The integration treats test sales the same as live sales.
