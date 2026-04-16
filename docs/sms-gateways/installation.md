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

1. **Database migrations** — creates tables:
   - `sms_logs` — delivery log (one row per SMS sent)
   - `sms_templates` — admin-editable message templates
   - `sms_consents` — opt-in/opt-out (STOP/START) audit log
   - `sms_webhooks` — optional outgoing webhook endpoints
   - `otp_attempts` — OTP verification attempts and rate limiting
2. **Service provider registration** — registers routes, settings page, permissions, and admin menu.
3. **Translation registration** — loads 42 locale files.
4. **Scheduler entries** — registers `sms:purge`, `sms:retry` with Laravel's scheduler.

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
php artisan route:list | grep sms
```

You should see routes grouped under `sms.` including `sms.logs.index`, `sms.templates.index`, `sms.consents.index`, `sms.settings.edit`, etc.

## Permissions

The plugin registers these permission groups:

| Permission | Effect |
|---|---|
| `sms.logs.view` | View delivery logs |
| `sms.logs.delete` | Delete log entries |
| `sms.templates.manage` | Create/edit SMS templates |
| `sms.consents.manage` | Handle opt-out requests |
| `sms.settings.edit` | Configure drivers and defaults |
| `sms.webhooks.manage` | Add/edit outbound webhooks |

Assign these to admin roles in **Admin → Settings → Roles & Permissions**.

## Next step

Continue to [Activation & License](./activation.md) to validate your purchase code, then [Configuration](./configuration.md) to wire up your first SMS driver.
