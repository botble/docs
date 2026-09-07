---
title: Environment reference
description: All environment variables, their defaults, and what they control.
---

# Environment reference

Every configurable setting is driven by environment variables in `.env`. This page lists all of them, grouped by function. Defaults are read from `.env.example` and the source config files.

## Required variables

These must be set before the platform starts.

| Variable | Default | What it does |
|---|---|---|
| `APP_KEY` | (empty) | Encryption key for the application. Generate with `php artisan key:generate` |
| `APP_URL` | `http://localhost` | The public URL of your control-plane domain (e.g., `https://saas.yourdomain.com`) |
| `APP_ENV` | `production` | Set to `production` on live; `local` or `development` for testing |
| `CENTRAL_DOMAINS` | `your-domain.com` | Control-plane host(s), comma-separated. **Never** a store's host |
| `DB_HOST` | `127.0.0.1` | MySQL server hostname or IP |
| `DB_PORT` | `3306` | MySQL port |
| `DB_DATABASE` | `laravel` | Central database name (e.g., `saas_central`) |
| `DB_USERNAME` | `root` | MySQL user (must have `GRANT CREATE, DROP ON *.*`) |
| `DB_PASSWORD` | `your_db_password` | MySQL password |
| `CACHE_STORE` | `database` | Cache store for the control plane and all stores. `file`, `database`, `redis`, or `memcached` — see below |
| `QUEUE_CONNECTION` | `redis` | Any connection except `sync` (provisioning and mail are queued, and must not block) |

::: danger APP_KEY and DB_PASSWORD
Never share these. Store them in a secret manager, not in version control or logs.
:::

## Redis (optional, but recommended for production)

Redis is optional — the platform works with `file`, `database`, `redis`, or `memcached`.
Use `CACHE_STORE=database` (shipped default) for small installs without Redis, or
set `CACHE_STORE=redis` once you have real traffic. If you use Redis, configure it carefully:

| Variable | Default | What it does |
|---|---|---|
| `REDIS_CLIENT` | `predis` | `predis` (pure PHP) or `phpredis` (faster, needs PHP extension) |
| `REDIS_HOST` | `127.0.0.1` | Redis server hostname or IP |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | `null` | Redis auth password (if required by your Redis instance) |
| `REDIS_CACHE_DB` | `1` | Cache db index — **must differ from queue db** (default is db 0) |

::: warning Keep cache and queue on separate db indexes (Redis only)
If both point to db 0, `Clear cache` (via `FLUSHDB`) deletes all queued jobs for all stores. Use db 0 for queue and db 1 for cache.
:::

## Multi-tenancy

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_DB_PREFIX` | `tenant_` | Prefix for store database names (e.g., `tenant_abc123`, `tenant_def456`) |
| `TENANCY_DEFAULT_THEME` | `amerce` | Theme preset on signup if none is chosen |
| `TENANCY_MAX_CUSTOM_DOMAINS` | `5` | Max custom domains per store (plan can lower this) |
| `SESSION_DOMAIN` | (empty) | **MUST stay empty** — a cookie scoped to parent domain leaks sessions between stores |
| `SESSION_DRIVER` | `database` | Where sessions are stored; `database` is recommended |
| `SESSION_LIFETIME` | `120` | Minutes until a session expires (2 hours) |
| `ADMIN_DIR` | `admin` | URL path for the operator console and store admin (e.g., `/admin` or `/saas-admin`) |

::: danger SESSION_DOMAIN must be empty
A cookie scoped to `.yourdomain.com` is sent to every store subdomain (`store1.yourdomain.com`, `store2.yourdomain.com`). One store's session cookie is then valid on another, allowing cross-store impersonation. Always leave this empty.
:::

## Provisioning

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_PROVISION_QUEUE` | `default` | Queue name for provisioning jobs (usually `default`) |
| `TENANCY_PROVISION_TIMEOUT` | `900` | Provisioning job timeout in seconds (15 minutes) |
| `TENANCY_PROVISION_SYNC` | `false` | If `true`, provision stores synchronously (no queue) — for testing only |

Note: `provisioning.tries` is hard-coded to 1 in the source; there is no env var for it.

## Signup and landing page

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_LANDING_ENABLED` | `true` | Show the marketing/landing page at the root of your central domain |
| `TENANCY_LANDING_MIN_STORES` | `10` | Min live stores before the stats section appears (avoids advertising "3 stores") |
| `TENANCY_SIGNUP_VERIFY_EMAIL` | `true` | Require email verification before a new store is created |
| `TENANCY_SIGNUP_VERIFY_TTL_HOURS` | `24` | Hours until a verification email link expires |
| `TENANCY_SIGNUP_CAPTCHA` | `true` | Require CAPTCHA on the signup form |
| `TENANCY_SIGNUP_PER_IP_PER_HOUR` | `3` | Max signups per IP per hour (rate-limit) |
| `TENANCY_SIGNUP_GLOBAL_PER_HOUR` | `60` | Max signups globally per hour (platform-wide rate-limit) |
| `TENANCY_SIGNUP_BLOCKED_EMAIL_DOMAINS` | (empty) | Comma-separated domains to block at signup (e.g., `tempmail.com,guerrillamail.com`) |
| `TENANCY_SHOW_POWERED_BY` | `false` | Show a "Powered by Botble" footer link |

## Billing and subscriptions

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_PLATFORM_CURRENCY` | (empty) | 3-letter currency code for billing (e.g., `USD`, `EUR`, `VND`) |
| `TENANCY_BILLING_GRACE_DAYS` | `14` | Days of grace after a payment fails before the store is suspended |
| `TENANCY_RETENTION_DAYS` | `30` | Days to retain a cancelled store before deleting it and its database |
| `TENANCY_RETENTION_WARNING_DAYS` | `7` | Days before retention expires to send a final warning |
| `TENANCY_TRIAL_REMINDER_DAYS` | `7,3,1` | Days before trial ends to send reminder emails (comma-separated) |
| `TENANCY_ALLOW_PROMOTION_CODES` | `true` | Allow store owners to apply coupon/promotion codes |
| `TENANCY_COUPONS_ENABLED` | `true` | Enable the coupons feature in the operator console |

## Custom domains

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_CNAME_HOST` | (empty) | Default hostname customers point their CNAME at (defaults to `CENTRAL_DOMAINS` if empty) |

Example: if you set `TENANCY_CNAME_HOST=cname.yourdomain.com`, store owners point their domain's CNAME to `cname.yourdomain.com` instead of your server's IP.

## Control-plane API

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_API_ENABLED` | `true` | Enable the REST API at `/api/platform/v1` (central domain only) |
| `TENANCY_API_RATE_LIMIT` | `120` | Requests per minute per API key |
| `TENANCY_API_RATE_LIMIT_PER_IP` | `600` | Requests per minute per IP across all keys (0 = disabled) |

## Webhooks

| Variable | Default | What it does |
|---|---|---|
| `TENANCY_WEBHOOK_TIMEOUT` | `10` | Seconds to wait for a webhook endpoint to respond |
| `TENANCY_WEBHOOK_CONNECT_TIMEOUT` | `5` | Seconds to wait opening the connection (on top of `TENANCY_WEBHOOK_TIMEOUT`) |
| `TENANCY_WEBHOOK_QUEUE` | (empty) | Queue name for first webhook delivery attempt (empty = default queue) |
| `TENANCY_WEBHOOK_DISABLE_AFTER` | `25` | Consecutive failures after which an endpoint is auto-disabled |
| `TENANCY_WEBHOOKS_RETENTION_DAYS` | `30` | Days to keep delivered webhooks in the database (0 = forever) |
| `TENANCY_WEBHOOKS_ALLOW_PRIVATE_HOSTS` | `false` | Allow webhook endpoints on private/reserved addresses (dev only) |

::: warning Webhook delivery needs cron
`php artisan tenancy:webhooks-deliver` must run every minute via cron or a cron job, or webhook retries never fire. See [Queue worker and cron](./cronjob.md).
:::

## Billing — Stripe (optional)

Leave these empty to run without Stripe. Stores sign up, trial, and convert without payment if you set nothing.

| Variable | Default | What it does |
|---|---|---|
| `STRIPE_KEY` | (empty, commented) | Stripe public key (starts with `pk_`) |
| `STRIPE_SECRET` | (empty, commented) | Stripe secret key (starts with `sk_`) |
| `STRIPE_WEBHOOK_SECRET` | (empty, commented) | Stripe webhook signing secret (for `/stripe/webhook`) |
| `CASHIER_CURRENCY` | `usd` | 3-letter currency for Stripe (e.g., `usd`, `eur`, `gbp`) |

See [Billing with Stripe](./usage-billing-stripe.md) for setup instructions.

## Operator seed

The operator admin account seeded at install. These variables are **not** in `.env.example` but are read by the seeder if present.

| Variable | Default | What it does |
|---|---|---|
| `OPERATOR_ADMIN_EMAIL` | `operator@botble.com` | Email address of the seeded operator |
| `OPERATOR_ADMIN_USERNAME` | `operator` | Login username for the seeded operator |
| `OPERATOR_ADMIN_PASSWORD` | `12345678` | Initial password (should be long and random in production) |

::: danger Change operator defaults before going live
The shipped defaults (`operator@botble.com` / `operator` / `12345678`) are public. Change them in your `.env` before running `php artisan migrate`.
:::

## Variables you must NOT set

| Variable | Why not |
|---|---|
| `SESSION_DOMAIN` | A cookie scoped to the parent domain leaks sessions between stores — **leave it empty** |
| `LOG_CHANNEL=stack` | Can cause file handle exhaustion when logs pile up across many stores; use `single` or `daily` instead |

## Example `.env` for production

```env
APP_NAME="My Platform"
APP_KEY=base64:…
APP_ENV=production
APP_DEBUG=false
APP_URL=https://saas.yourdomain.com

CACHE_STORE=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_CACHE_DB=1
REDIS_PORT=6379

DB_CONNECTION=central
DB_HOST=127.0.0.1
DB_DATABASE=saas_central
DB_USERNAME=app_user
DB_PASSWORD=<secure>

CENTRAL_DOMAINS=yourdomain.com
TENANCY_DB_PREFIX=tenant_
SESSION_DOMAIN=
ADMIN_DIR=admin

STRIPE_KEY=pk_live_…
STRIPE_SECRET=sk_live_…
STRIPE_WEBHOOK_SECRET=whsec_…
CASHIER_CURRENCY=usd

TENANCY_API_ENABLED=true
TENANCY_WEBHOOK_TIMEOUT=10

OPERATOR_ADMIN_EMAIL=you@yourdomain.com
OPERATOR_ADMIN_USERNAME=yourusername
OPERATOR_ADMIN_PASSWORD=<random>
```

