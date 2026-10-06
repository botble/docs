---
title: Upgrade Guide
description: Upgrade Affiliate Pro to the latest version.
---

# Upgrade Guide

::: warning
Back up your database and files before upgrading. Affiliate balances and commissions are stored in the `affiliates`, `affiliate_commissions`, `affiliate_withdrawals` and `affiliate_transactions` tables.
:::

## From the Admin Panel

If **Plugins → Installed Plugins** shows an **Update** button for Affiliate Pro, click it, then clear cache in **Platform Administration → Cache Management**. Otherwise, update manually.

## Manually

1. Download the latest version from your [CodeCanyon downloads page](https://codecanyon.net/downloads).
2. Replace the `platform/plugins/affiliate-pro` folder with the new one.
3. Run the migrations and clear cache:

```bash
php artisan migrate --force
php artisan optimize:clear
```

If you customised the affiliate dashboard, keep your copies in `resources/views/vendor/plugins/affiliate-pro/` (see [FAQ](./faq.md#can-i-change-the-affiliate-dashboard-design)) instead of editing plugin files — otherwise they are overwritten.

## After Upgrading

- Open **Affiliate → All Affiliates** and check balances look correct.
- Open an affiliate link in a private window and confirm the click is recorded.
- Read the [release notes](./releases.md) for new settings.

Problems? See [Troubleshooting](./troubleshooting.md).
