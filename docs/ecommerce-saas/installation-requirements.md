---
title: Requirements
description: PHP, MySQL, cache and queue requirements to run Ecommerce SaaS, and how to choose your cache store.
---

# Requirements

Ecommerce SaaS runs one codebase and one control plane, but provisions a
**separate MySQL database per store**. That changes a few requirements
compared to a normal Botble install. Run the preflight check before creating
any store — it catches every misconfiguration below before it fails
confusingly later:

```bash
php artisan tenancy:preflight
```

## Checklist

| Component | Requirement | Why it is not optional |
|---|---|---|
| PHP | `8.3+` (`^8.3 \| ^8.4`) with `pdo_mysql`, `gd`, `zip`, `curl`, `json` | Botble baseline |
| MySQL | `8.0+` (MariaDB `10.6+` also works), app user with **CREATE DATABASE / DROP** | each store gets its own database |
| Cache | any of `file`, `database`, `redis`, `memcached` | see below — all drivers work; choose by scale |
| Queue | a real connection (not `sync`) + a running worker | provisioning and mail are queued |
| Web server | nginx or Caddy, wildcard DNS `*.yourdomain.com` | stores are subdomains |

### Database privileges

The app user needs `CREATE` and `DROP` at the global level, not just on its own
schema — provisioning creates a database per store, and `tenancy:preflight`
proves it by creating and dropping a throwaway one:

```sql
CREATE DATABASE saas_central CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'saas_central'@'localhost' IDENTIFIED BY '<strong password>';

GRANT CREATE, DROP ON *.* TO 'saas_central'@'localhost';
GRANT ALL PRIVILEGES ON saas_central.* TO 'saas_central'@'localhost';
GRANT ALL PRIVILEGES ON `tenant\_%`.* TO 'saas_central'@'localhost';
FLUSH PRIVILEGES;
```

Each store has 183 tables (the count depends on which plugins are active when a
store is provisioned), so plan `table_open_cache`,
`table_definition_cache` and the process open-files limit against the number of
stores you expect, not the number of databases.

## Cache: pick any store, Redis is a recommendation

Tenant cache isolation is **prefix-based** (a directory, on `file`) via
`PrefixCacheTenancyBootstrapper`, not tag-based, so every cache store
Laravel ships works: `file`, `database`, `redis`, `memcached`. `tenancy:preflight`
proves whichever one you pick actually isolates tenants — it writes a
probe value under one simulated tenant and asserts a second cannot read
it — rather than checking a driver capability.

`database` needs nothing beyond the MySQL you already have and is the shipped
default (`CACHE_STORE=database` in `.env.example`); it is the right choice for a
small or shared-hosting install with no Redis available. Set `CACHE_STORE=redis`
once you have real traffic — it is faster and takes the cache load off MySQL — but
nothing about installing or serving stores requires it.

**One regression to know about:** admin "Clear cache" issues the driver's real
flush — `FLUSHDB` on Redis, a full table truncate on `database`, a full flush on
Memcached — and none of those respect the tenant prefix, so it clears every store's
cache at once (and central's), not only the one it was clicked from. `file` is the
exception: its flush only touches the tenant's own directory, so it stays scoped.
See [Admin "Clear cache" clears every store's cache at once](./troubleshooting.md#admin-clear-cache-clears-every-store-s-cache-at-once) for the workarounds.

### Redis configuration that matters (if you use it)

- **`maxmemory-policy noeviction`.** Under an LRU policy Redis can evict any tenant's
  keys independently of any other's, so one busy store can push a quiet one's cache
  out — invisible until that store's next request recomputes everything. If you must
  cap memory, cap it and let writes fail loudly instead.
- **Keep the cache on its own db index.** `REDIS_CACHE_DB=1` while the queue uses db
  `0`. Clearing the cache issues `FLUSHDB` against the cache db — point both at one
  index (or set `REDIS_QUEUE_CONNECTION=cache`) and *"Clear cache" deletes every
  queued job for every store*.
- **Set `APP_NAME`, or an explicit `CACHE_PREFIX`.** The cache prefix is derived from
  `APP_NAME`; two installs sharing one Redis under the default name collide.
- `REDIS_CLIENT=predis` is shipped and needs no PHP extension. `phpredis` is faster if
  you can install it.

## Queue worker

Provisioning is queued, so nothing gets provisioned without a worker — a
store registered through the browser sits on "Preparing…" forever until a
worker picks the job up. Local dev or a small single-server deploy can set
`TENANCY_PROVISION_SYNC=true` instead and run provisioning inline. See
[Queue worker and cron](./cronjob.md) for the full worker command and crontab.

## Wildcard DNS

Every store is a subdomain of your control-plane domain, so DNS must resolve
`*.yourdomain.com` before you can create a store, and TLS needs a wildcard
certificate (or on-demand TLS for custom domains). See
[Wildcard DNS and TLS](./installation-dns-tls.md).

## Sizing

When planning your infrastructure, keep these scale limits in mind:

- **MySQL:** Each store is 183 tables (count varies with active plugins). Watch
  `max_connections`, `table_open_cache` and the process open-files ulimit. At a few
  hundred stores, connection and table limits become the ceiling.
- **Provisioning:** Takes roughly 1–2 seconds per store from a preset dump. The
  migrate-only path is far slower (~200 core/package migrations plus 21 plugin
  directories).
- **Cron:** `tenancy:schedule` is O(stores). Past a few hundred stores, shard it with
  `--tenant=` across parallel cron entries to avoid a single cron job taking more than
  its interval.
- **Disk:** Every store has its own `storage/tenants/<id>` directory tree for uploads
  and generated assets.

See [Choosing a server](./installation-hosting.md) for deployment guidance.

## What differs from a normal Botble install

- The MySQL app user needs **CREATE DATABASE / DROP**, not just access to one
  database — each store provisions and can be dropped independently.
- A queue worker is effectively mandatory in production — self-serve signup
  and operator-created stores both provision through the queue. In dev, set
  `TENANCY_PROVISION_SYNC=true` to provision inline.
- Wildcard DNS and TLS are required from day one, not an optional add-on.
- Cache isolation is prefix-based, so all stores work, but only `file`'s flush
  stays scoped to a single tenant — see [Cache](#cache-pick-any-store-redis-is-a-recommendation)
  above for the tradeoff.

## Next

Continue to [Installation](./installation.md) to configure the environment
and create your first store.
