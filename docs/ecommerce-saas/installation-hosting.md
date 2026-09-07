---
title: Choosing a server
description: Multi-tenant ecommerce cannot run on shared hosting — explain why, what you need, and where to run it.
---

# Choosing a server

Before you buy hosting, know this plainly: **Ecommerce SaaS cannot run on shared hosting.** It needs root access to the server and a list of platform features that shared hosting panels do not offer. Read through the requirements below, then check with your provider before signup.

## Short answer: you need a VPS

Shared hosting cannot run this platform because:

1. **You need global database grants** — each store gets its own database, so your app user needs `CREATE DATABASE` and `DROP DATABASE` on `*.*`. Shared hosting does not grant these, full stop.
2. **A queue worker must run forever** — provisioning and mail are queued. Without a long-lived worker, stores stay `pending` forever. Shared hosting cron runs short commands only; it cannot keep a process alive.
3. **Wildcard DNS and certificates** — stores are subdomains (`store1.yourdomain.com`, `store2.yourdomain.com`). You need `*.yourdomain.com` pointing to your server and a wildcard TLS certificate. Most shared hosting panels do not support wildcard DNS records, and **Let's Encrypt wildcards require DNS-01 ACME**, which means your DNS provider (not your hosting panel) must support automated DNS record updates. Many panels' bundled ACME (e.g., cPanel's `acmetool.sh`) only supports HTTP-01 and cannot issue wildcards at all.

Shared hosting **panels** (cPanel, Plesk, DirectAdmin, Hestia) are routinely run on a VPS with root access, where this platform works fine — the blockers above are inherent to shared hosting (multi-tenant hosting), not the control panel itself. aaPanel and CloudPanel are panel software, not hosting providers; they too work fine on a VPS where you own root.

## Capability checklist for any host or control panel

Before signing up, confirm your provider can give you ALL of these:

- [ ] **Root shell access** — you must run `apt install`, `systemctl enable`, `php artisan migrate` yourself
- [ ] **Global database grants** — your MySQL app user can run `CREATE DATABASE` and `DROP DATABASE` on `*.*` (test: `mysql -u app_user -p -e "GRANT CREATE, DROP ON *.* TO 'app_user'@'localhost';"`), never a per-database grant
- [ ] **Process manager** — systemd or Supervisor installed, so you can create a long-lived queue worker (e.g., `php artisan queue:work --queue=default,webhooks`)
- [ ] **Wildcard server block** — your web server (nginx or Caddy) has a server block for `*.yourdomain.com` that routes requests through PHP
- [ ] **Wildcard DNS and TLS** — your DNS provider supports API-driven updates (DNS-01), and you can issue a Let's Encrypt wildcard cert via Certbot with a DNS provider plugin
- [ ] **A cache store** — any of `file`, `database`, `redis`, or `memcached` (all work; Redis is recommended for production)

::: danger Shared hosting panels are not tested
We have **zero tested installs** on aaPanel, CloudPanel, cPanel-WHM, DirectAdmin, Plesk, or Hestia. Do not guess — test every requirement above in a staging account first.
:::

## What shared hosting cannot give you

| Feature | Why Ecommerce SaaS needs it | Shared hosting |
|---|---|---|
| Global `CREATE`/`DROP` on databases | Each store = one database | Per-database grants only |
| Root shell | Install packages, create queue workers, run Composer | No shell, or jailed |
| A process manager | Queue worker must run continuously | Cron runs 5–10 min tasks only |
| Dedicated cache db index | If using Redis, cache and queue need separate db indices | Shared across panel users; clearing cache wipes queue |
| Wildcard DNS + ACME | `*.yourdomain.com` with automatic cert renewal | Panel ACME is HTTP-01 only; wildcard needs DNS-01 |

## Sizing

| Spec | Guidance |
|---|---|
| **vCPUs** | 4 or more for production. Development: 2 is fine |
| **RAM** | 8 GB minimum. 16 GB if running Redis, MySQL and the app on one box |
| **Disk** | 50 GB SSD baseline. Every store's database and uploads live here. Size depends on catalog volume and media — plan for growth |
| **Bandwidth** | No cap; overage fees are common. Stores need to serve product images |
| **MySQL version** | 8.0+ (5.7 reached end-of-life in October 2023) |
| **PHP version** | 8.3+ with `pdo_mysql`, `gd`, `zip`, `curl`, `json` extensions |

Stores are independent. One store's spike in traffic does not affect another. But if your server runs out of disk or RAM, *all* stores slow down or fail together. Monitor free disk and plan for growth.

## Managed platforms

If you do not want to operate a VPS yourself, use a managed host that offers the checklist above and has zero restrictions on databases, Redis, and system processes.

**Recommended for production:**
- **DigitalOcean App Platform** — not Droplets; Droplets require you to manage everything, which works but adds overhead
- **Railway.app** — simpler UX, generous free tier, works well for staging
- **Fly.io** — global edge, ideal if your customers are distributed

**Tested and works but requires more setup:**
- **AWS (EC2 + RDS)** — full control, steep learning curve
- **Linode** — cheaper than DigitalOcean, same hands-on requirement
- **Hetzner** — budget option, Europe-focused

Every managed platform requires you to configure secrets (database credentials, Redis auth, API keys) and webhooks yourself. That setup is the same across all of them.

::: tip DNS and TLS are still your job
Even on a managed platform, you own your domain, DNS provider, and certificate. We do not manage either. Wildcard TLS via DNS-01 is your responsibility.
:::

## What the docs assume about your server

From this point forward, all documentation assumes:
- You have root access to a Linux server (Ubuntu 22.04 or 24.04 recommended)
- MySQL 8.0+ is installed and running
- A cache store is available (Redis is recommended for production; `database` works for small installs)
- You can run `systemctl` commands to manage services
- You can point DNS records at the server and issue certificates

If you are using a managed platform (Fly, Railway, DigitalOcean App Platform), adapt the instructions for that platform's deploy model.

