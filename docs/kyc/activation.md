---
title: Activation & License
description: Activate your CodeCanyon purchase code for the KYC Verification plugin.
---

# Activation & License

The **KYC Verification** plugin is licensed through [CodeCanyon](https://codecanyon.net/user/botble/portfolio). After installing the plugin you must activate it with your purchase code before it can be used in production.

## Where to find your purchase code

1. Log in to CodeCanyon.
2. Go to **Downloads** → locate "KYC Verification for Botble".
3. Click **License certificate & purchase code (PDF)** — the purchase code is at the bottom of the PDF.

The code looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

## Activate the license

1. Go to **Admin → KYC Verification → Settings** (or **Admin → Settings → KYC Verification**).
2. Scroll to the **License** section.
3. Paste your **purchase code** and your **CodeCanyon username / buyer name**.
4. Click **Activate**.

On success you will see a green "License activated" notice. The plugin stores the license token locally; you do not need an internet connection after activation.

## Deactivate a license

If you need to move the plugin to a different domain, deactivate the license first:

1. Go to **Admin → KYC Verification → Settings**.
2. In the **License** section click **Deactivate**.
3. Re-activate on the new domain with the same purchase code.

::: tip
A single regular license covers one end-product per domain. For multi-tenant or SaaS deployments, please purchase an extended license.
:::

## Troubleshooting activation

| Symptom | Fix |
|---|---|
| "Invalid purchase code" | Double-check for trailing spaces; confirm you copied from the correct product PDF. |
| "Purchase code already used on another domain" | Deactivate on the old domain first, or contact support for a reset. |
| "Could not reach license server" | Your server must allow outbound HTTPS to the Envato API. Whitelist `api.envato.com`. |

## Next step

Continue to [Initial Configuration](./configuration.md) to decide which KYC scopes to enable on your store.
