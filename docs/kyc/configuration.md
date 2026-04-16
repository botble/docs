---
title: Initial Configuration
description: Enable the customer and vendor KYC scopes, then point the plugin at your admin notification email.
---

# Initial Configuration

After [installing](./installation.md) and [activating](./activation.md) the plugin, you need to decide **which verification scopes to enable** and **how submissions should be reviewed**.

## Open the settings page

Go to **Admin → KYC Verification → Settings** (or **Admin → Settings → KYC Verification**).

![Settings page](./images/kyc-settings.png)

## Minimum configuration checklist

For a first-time setup, enable at least these fields:

| Field | Recommended value |
|---|---|
| **Enable customer KYC** | `ON` — if you want customers to verify their identity |
| **Enable vendor KYC** | `ON` — only if you run `plugins/marketplace` |
| **Admin notification email** | Your own email, or leave blank to use the system admin |
| **Customer dashboard URL** | The URL your customers use to reach their account page (used in email CTAs) |

Save.

## Decide on gating

The plugin does **not** block checkout or vendor product listings until you explicitly opt in:

- **Required for checkout** (customer scope) → blocks the checkout POST for customers without an approved KYC submission.
- **Required for product listings** (vendor scope) → blocks vendors without an approved store from publishing products.

Both are OFF by default. Start with them OFF, verify the submission flow works, then turn the gating ON once admins have practised reviewing submissions.

See [Checkout & Listing Gates](./integration/gates.md) for the route-level middleware setup.

## Retention & lockout

| Setting | Default | What it does |
|---|---|---|
| **Rejected retention (days)** | `7` | Rejected rows + files purged after N days |
| **Approved file retention (days)** | `7` | Approved files purged after N days (row kept as audit trail) |
| **Max rejections before lock** | `3` | Subject is auto-locked after N rejections |

You can leave defaults. Increase retention only if your compliance policy requires longer evidence preservation.

## Form style

The customer-facing submission form comes in **six visual presets**. Pick the one that matches your brand — the plugin renders in its own standalone layout, so these presets cover the customer's entire submission experience:

- **Classic** — neutral white card, safe default
- **Emerald** — green accent, fintech feel
- **Violet** — purple accent, modern SaaS
- **Sunset** — warm amber accent
- **Minimal** — ultra-light, no background gradient
- **Midnight** — dark mode

You can also toggle **Use multi-step form** for a wizard-style 3-step flow (document type → upload → review) instead of a single long page.

## Webhooks (optional)

If you have an external compliance system that needs to receive events, configure:

- **Webhook URL** — `https://your-system.example.com/kyc-hook`
- **Webhook signing secret** — a random 32+ character string

The plugin will POST a signed JSON payload on every lifecycle event. See [Webhook Schema](./developer/webhooks.md) for details.

Alternatively, create multiple outgoing endpoints from **Admin → KYC Verification → Webhooks** with independent secrets and active flags.

## Next step

- Vanilla ecommerce? → [Ecommerce Integration](./integration/ecommerce.md)
- Marketplace? → [Marketplace Integration](./integration/marketplace.md)
- Full settings reference → [Settings Reference](./usage/settings.md)
