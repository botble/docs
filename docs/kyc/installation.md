---
title: Installation
description: Upload and install the KYC Verification plugin in Botble CMS.
---

# Installation

The **KYC Verification** plugin is a standard Botble CMS plugin. You can install it in two ways.

## Option A — Upload via Admin Panel (recommended)

1. Download the plugin ZIP from your CodeCanyon purchase page.
2. Log in to your Botble admin panel.
3. Go to **Admin → Platform Administration → Plugins**.
4. Click **Add new** in the top-right corner.
5. Upload the `kyc.zip` file.
6. Once uploaded, the plugin appears in the list with an **Activate** button.
7. Click **Activate**.

![KYC settings page](./images/kyc-settings.png)

## Option B — Manual upload (SFTP / Git)

1. Extract `kyc.zip` locally.
2. Upload the extracted folder to your server at `platform/plugins/kyc/`.
3. Log in to the admin panel.
4. Go to **Admin → Platform Administration → Plugins**, find **KYC Verification**, and click **Activate**.

Or from the CLI:

```bash
php artisan cms:plugin:activate kyc
```

## What activation does

When you activate the plugin, Botble runs:

1. **Database migrations** — creates two tables:
   - `kyc_submissions` — one row per submission (polymorphic on `verifiable_type` + `verifiable_id`)
   - `kyc_subject_states` — tracks lockout state per subject
   - `kyc_webhooks` — optional outgoing webhook endpoints
2. **Service provider registration** — boots the plugin's Eloquent macros on `Customer` (ecommerce) and `Store` (marketplace), registers routes, settings page, permissions, and the panel section.
3. **Translation registration** — loads the 42 locale files.
4. **Scheduler entries** — registers `kyc:cleanup` and `kyc:expire` with Laravel's scheduler.

::: tip
Activation is idempotent — you can safely deactivate and re-activate the plugin without data loss. Existing submissions, lockout states, and webhook endpoints survive.
:::

## Verify the install

After activation you should see:

- A new **KYC Verification** entry in the admin left sidebar.
- A new **KYC Verification** tab in **Admin → Settings → KYC Verification**.
- A new **KYC** permission group in **Admin → Settings → Roles & Permissions**.

Run this sanity check from the CLI:

```bash
php artisan route:list | grep kyc
```

You should see routes grouped under `kyc.` including `kyc.submissions.index`, `kyc.submissions.view`, `kyc.settings.edit`, `kyc.file.show`, `kyc.submission.index`, `kyc.submission.store`, etc.

## Next step

Continue to [Activation & License](./activation.md) to validate your purchase code, then [Initial Configuration](./configuration.md) to enable the scopes you need.
