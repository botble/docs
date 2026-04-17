---
title: Installation
description: Upload and install the SMS Gateways plugin in Botble CMS.
---

# Installation

The **SMS Gateways** plugin is a standard Botble CMS plugin. You can install it in two ways.

## Option A — Upload via Admin Panel (recommended)

1. Download the plugin ZIP from your CodeCanyon purchase page.
2. Log in to your Botble admin panel.
3. Go to **Admin → Platform Administration → Plugins**.
4. Click **Add new** in the top-right corner.
5. Upload the `sms-gateways.zip` file.
6. Once uploaded, the plugin appears in the list with an **Activate** button.
7. Click **Activate**.

![SMS Gateways plugin activation](./images/sms-install-panel.png)

## Option B — Manual upload (SFTP / Git)

1. Extract `sms-gateways.zip` locally.
2. Upload the extracted folder to your server at `platform/plugins/sms-gateways/`.
3. Log in to the admin panel.
4. Go to **Admin → Platform Administration → Plugins**, find **SMS Gateways**, and click **Activate**.

Or from the CLI:

```bash
php artisan cms:plugin:activate sms-gateways
```

## What activation does

When you activate the plugin, Botble runs:

1. **Database migrations** — creates tables (all prefixed `smsg_`):
   - `smsg_delivery_logs` — one row per SMS send attempt (queued → sent → delivered lifecycle)
   - `smsg_templates` + `smsg_templates_translations` — admin-editable, translatable message bodies
   - `smsg_consents` — per-channel opt-in/opt-out with source, IP, and user-agent audit
   - `smsg_webhooks` — outbound webhook endpoints with HMAC secret
   - `smsg_otps` — SHA-256 hashed OTP codes with purpose, expiry, and attempt counts
   - `smsg_country_routes` — E.164-prefix → driver mapping with priority
   - `smsg_runtime_pings` — scheduler health pings
   - `smsg_abandoned_cart_sent` — idempotency table for abandoned-cart SMS reminders
2. **Service provider registration** — registers routes, settings page, permissions, admin menu, FOB coexistence guard, and scheduled commands.
3. **Translation registration** — loads 42 locale files.
4. **Scheduler entries** — `sms:purge`, `sms:poll-status`, `sms:recover-abandoned-carts`, and retry dispatcher tick.

::: tip
Activation is idempotent — you can safely deactivate and re-activate the plugin without data loss. Existing logs, templates, consents, and webhooks survive.
:::

## Verify the install

After activation you should see:

- A new **SMS Gateways** entry in the admin left sidebar.
- A new **SMS Gateways** tab in **Admin → Settings → SMS Gateways**.
- A new **SMS Gateways** permission group in **Admin → Settings → Roles & Permissions**.

Run this sanity check from the CLI:

```bash
php artisan route:list | grep sms-gateways
```

You should see admin routes prefixed `sms-gateways.*` (logs, templates, consents, drivers, country-routes, webhooks, settings) plus the customer-facing `/account/sms-preferences/*` endpoints.

## Permissions

The plugin registers these permission flags (managed in **Admin → Settings → Roles & Permissions**):

| Flag | Effect |
|---|---|
| `sms-gateways.index` | Access the SMS Gateways section |
| `sms-gateways.logs.view` | View delivery logs |
| `sms-gateways.logs.retry` | Manually retry failed sends |
| `sms-gateways.templates.index` | View SMS templates |
| `sms-gateways.templates.edit` | Edit template bodies |
| `sms-gateways.templates.test-send` | Send a template preview to a phone |
| `sms-gateways.consents.index` | View consent records |
| `sms-gateways.consents.update` | Override opt-in / opt-out status |
| `sms-gateways.drivers.configure` | Enter driver credentials |
| `sms-gateways.country-routes.index` | Manage E.164 routing rules |
| `sms-gateways.webhooks.index` | Manage outbound webhooks |
| `sms-gateways.settings.edit` | Edit plugin-wide settings |

Assign these to admin roles in **Admin → Settings → Roles & Permissions**.

## Next step

Continue to [Activation & License](./activation.md) to validate your purchase code, then [Configuration](./configuration.md) to wire up your first SMS driver.
