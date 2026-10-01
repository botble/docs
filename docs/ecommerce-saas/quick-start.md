---
title: Quick Start
description: Get a multi-tenant store platform running locally from the command line. Covers initial setup and your first store.
---

# Quick Start

Get the platform running locally with the essentials. This guide is the CLI path with local defaults (prefer a browser? the [web installer](./installation-browser.md) at `/install` does the same steps); production requires [Wildcard DNS and TLS](./installation-dns-tls.md), a [queue worker](./cronjob.md), and [cron jobs](./cronjob.md).

## Prerequisites

- PHP 8.3+ or 8.4, Laravel 13
- MySQL 8+ or MariaDB 10.6+, with a user that can `CREATE` / `DROP` databases (one per store)
- Composer installed

See [Requirements](./installation-requirements.md) for full details.

## 1. Install dependencies

```bash
composer install
cp .env.example .env
php artisan key:generate
```

## 2. Set your central domain

Edit `.env` and set the domain where your operator console lives:

```bash
CENTRAL_DOMAINS=localhost  # or yourdomain.local
```

## 3. Create the database

```bash
mysql -u root -p -e "CREATE DATABASE saas_central CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Update `.env`:
```bash
DB_HOST=127.0.0.1
DB_DATABASE=saas_central
DB_USERNAME=root
DB_PASSWORD=your_password
```

## 4. Migrate and seed

```bash
php artisan migrate
php artisan tenancy:activate-plugins
php artisan tenancy:publish-theme-assets
php artisan db:seed --class="Botble\Tenancy\Database\Seeders\OperatorAdminSeeder" --force
```

`.env.example` ships `QUEUE_CONNECTION=sync`, which only works before the database exists. Now that the tables exist, set `QUEUE_CONNECTION=database` in `.env` so the worker in step 6 has jobs to process, then run preflight:

```bash
php artisan tenancy:preflight
```

Preflight also checks production items. On a local machine some of them can still fail, for example the mailer check when signup email verification is on.

## 5. Create your first store

```bash
php artisan tenancy:create-tenant demo --name="Demo Store" --email=owner@demo.test --sync
```

The store is created at `demo.<first CENTRAL_DOMAINS entry>` — `demo.localhost` here. The command prints the store admin URL, email and a generated password; copy the password. The printed URL has no port, so add `:8000` when you use `php artisan serve`.

## 6. Start the server and queue worker

In one terminal:
```bash
php artisan serve
```

In another:
```bash
php artisan queue:work --queue=default --tries=1 --timeout=900
```

## 7. Log in

| | URL | Email | Password |
|---|---|---|---|
| **Operator console** | `http://localhost:8000/admin/operator` | `operator@` + your `APP_URL` host (e.g. `operator@localhost`), or `OPERATOR_ADMIN_EMAIL` | Printed once by the seeder in step 4 (unless `OPERATOR_ADMIN_PASSWORD` is set) |
| **Store admin** | `http://demo.localhost:8000/admin` | `owner@demo.test` | Printed by `tenancy:create-tenant` in step 5 |
| **Store front** | `http://demo.localhost:8000` | (public) | — |

## What's next

### For production setup

- Configure [Wildcard DNS and TLS](./installation-dns-tls.md) for real domains
- Set up a [queue worker and cron jobs](./cronjob.md) on your server
- Configure [plan billing with Stripe](./usage-billing-stripe.md) (optional)
- Review [Environment variables](./environment.md)

### Add more themes

Drop a Botble ecommerce theme into `platform/themes/` (it needs a demo dump and its required plugins — see the guide below) and run:

```bash
php artisan tenancy:register-theme {theme-name}
```

See [Adding a storefront theme](./adding-a-theme.md).

### Create more stores

From **Operator console → Stores → Create store**, or via CLI:

```bash
php artisan tenancy:create-tenant acme --name="Acme Store" --email=acme@example.com
```

### Integrate add-ons

Install add-on plugins into `platform/plugins/`, activate them platform-wide and license them once in **Operator console → Add-ons** (new in 1.0.2). See [Add-ons Overview](./addons-overview.md).

### Use the API

Create an API key in **Operator console → API keys** and start calling the [Control-plane API](./api.md).

## Troubleshooting

### Stores still show as `pending`

With `QUEUE_CONNECTION` set to anything other than `sync`, provisioning is queued and the queue worker is not running. Start it with `php artisan queue:work`.

### Wildcard DNS not working

See [Wildcard DNS and TLS](./installation-dns-tls.md) for setup and testing.

## Full documentation

- [Installation](./installation.md) — detailed setup steps
- [Requirements](./installation-requirements.md) — hosting and server requirements
- [How it works](./architecture.md) — multi-tenant architecture
