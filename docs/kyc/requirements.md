---
title: Requirements
description: Server, PHP, and Botble version requirements for the KYC Verification plugin.
---

# Requirements

Before installing the **KYC Verification** plugin, make sure your environment meets the following requirements.

## Botble CMS

| Component | Minimum version |
|---|---|
| Botble CMS core | **7.3.0** |
| `plugins/ecommerce` | Active — required for **customer KYC** (optional) |
| `plugins/marketplace` | Active — required for **vendor KYC** (optional) |
| `plugins/real-estate` | Active — required for **real-estate agent KYC** (optional) |
| `plugins/job-board` | Active — required for **employer company / candidate KYC** (optional) |
| `plugins/car-manager` | Active — required for **car dealer / vendor KYC** on Auxero, Carento (optional) |

At least **one** of the host plugins above must be active. Scopes stay disabled for host plugins that are not detected at boot, so you only see the settings and subject types relevant to your site.

The plugin works with any Botble script:

- **E-commerce** — Shofy, MartFury, Ninico, Nest, Farmart, Wowy, Isak, Qore
- **Real estate** — Homzen, Hasa, Flex-Home
- **Job board** — Jobcy, Jobzilla
- **Car rental / listing** — Auxero, Carento — see [Car Rental / Listing](./integration/car-rental.md)

## Server

| Component | Minimum version |
|---|---|
| PHP | **8.1** (8.2 / 8.3 supported) |
| Extensions | `openssl`, `fileinfo`, `gd` or `imagick`, `pdo`, `mbstring` |
| Database | MySQL 5.7+, MariaDB 10.3+, or PostgreSQL 10+ |
| Writable | `storage/app/private/` (where KYC documents are stored) |
| Queue worker | Recommended — webhooks and emails are dispatched to the queue |
| Task scheduler | **Required** — nightly cleanup + expiry commands run via `schedule:run` |

## Cron / Task scheduler

The plugin ships two nightly commands:

- `kyc:cleanup` — purge rejected submissions past retention + purge approved files past retention
- `kyc:expire` — flip approved submissions to `expired` when `expires_at` has passed

Both are registered with Laravel's scheduler. Add the following cron entry on your server (once — it runs all scheduled Laravel tasks):

```cron
* * * * * cd /var/www/site && php artisan schedule:run >> /dev/null 2>&1
```

::: warning
If you don't configure the scheduler, rejected submissions and expired approvals will stay in the database forever.
:::

## Queue worker (recommended)

Webhooks and email notifications are dispatched to the `kyc` queue. Configure a queue worker in your process manager (Supervisor, systemd, Laravel Horizon, etc.):

```bash
php artisan queue:work --queue=kyc,default --tries=3
```

You can run without a dedicated worker if you use `QUEUE_CONNECTION=sync`, but deliveries will then block the HTTP response.

## File storage

Documents are stored on the `local` disk by default at `storage/app/private/kyc/`. The directory must be writable by the web server user.

If you store uploads on an external disk (S3, DigitalOcean Spaces, etc.), change `storage.disk` in `config/kyc.php` to your disk name and make sure that disk is configured in `config/filesystems.php` as **private** (not public).

::: danger
Never point the KYC storage disk at a public bucket. Identity documents must only be served through the plugin's signed-URL controller.
:::

## Browser support

The customer-facing submission form relies on standard HTML5 file inputs and Alpine.js. All evergreen browsers (Chrome, Firefox, Safari, Edge) are supported.

## Next step

Continue to [Installation](./installation.md).
