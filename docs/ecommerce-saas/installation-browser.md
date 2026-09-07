---
title: Installing from the browser
description: The five-step setup wizard that configures the control plane, operator account, plugins, cron and your first store without a shell.
---

# Installing from the browser

There are two ways to install Ecommerce SaaS. [Installing from the command line](./installation.md)
is the path for a VPS you already have a shell on. This page covers the **browser installer**, which
does the same work through a wizard.

The wizard is Botble's own installer with five extra steps added after the licence screen. Upload the
files, point a browser at your domain, and it takes you from there.

::: tip Same commands either way
The wizard is not a reimplementation. It calls the same artisan commands this documentation asks you
to type — `cms:plugin:activate`, `tenancy:publish-theme-assets`, `tenancy:preflight` — through
`Artisan::call()`, so preflight answers exactly what `php artisan tenancy:preflight` answers on the
same host.
:::

## Before you start

The wizard does not remove the [server requirements](./installation-requirements.md). It configures a
machine that already meets them. In particular it cannot create wildcard DNS, issue a wildcard
certificate, or grant your MySQL user `CREATE DATABASE` — see [Choosing a server](./installation-hosting.md).

## The five steps

### 1. Control-plane domain

Captures `CENTRAL_DOMAINS` — the host your operator console and marketing site answer on.

This runs first for a reason. Every route in the platform is host-aware: an unrecognised host does not
fall back to a default, it 404s. Until this key is written, the console, the landing page and every
store return nothing.

### 2. Operator account

Your name, email and password for the platform operator — the account that can create, suspend and
delete every store.

::: tip This is not the CLI seeder
The wizard does **not** call `OperatorAdminSeeder`, and none of the `OPERATOR_ADMIN_*` environment
variables apply here. You type real credentials and they are used as-is. Those variables are the CLI
path only — see [Environment reference](./environment.md).
:::

### 3. Automated setup

Runs three things and reports the result:

1. `cms:plugin:activate` for every plugin each installed theme declares in its `required_plugins`.
   Skipping this is the single most common broken install: the control plane looks healthy while
   every storefront returns 500.
2. `tenancy:publish-theme-assets` — `public/themes` is gitignored, so a fresh copy has no theme CSS
   or JS until this runs.
3. `tenancy:preflight` — the same eleven assertions the command makes, shown as a pass/fail report.

The result is stored in the session, so refreshing the page re-shows the last run rather than
re-running commands that have side effects.

::: warning Read the preflight report, do not skim it
Preflight is the only thing standing between you and a platform that looks installed but cannot
provision a store. If it reports a failure here, fix it before continuing — the next step tries to
build a real store and will fail for the same reason.
:::

### 4. Queue and cron

Informational only — no form, nothing to submit. It shows the queue-worker command and the crontab
block from [Queue worker and cron](./cronjob.md), plus the synchronous fallback for a host that
cannot run a worker.

It exists because a buyer who never opens this documentation would otherwise leave the wizard without
knowing that **a new store sits on "Preparing…" forever without a worker**. Provisioning and lifecycle
mail are queued.

### 5. First store

Optional, and skippable. It provisions one real store to prove the whole chain works — central
migrations, an activated `ecommerce` plugin, published theme assets — rather than leaving you to find
out with your first real customer.

This one store is created **synchronously**, whatever `QUEUE_CONNECTION` is set to, because you have
not configured a worker yet at this point in the wizard. That is a deliberate one-off for the
installer; the public signup path stays queued.

If you would rather do it yourself, skip the step and run
[`tenancy:create-tenant`](./commands.md) when you are ready.

## After the wizard

The wizard gets you a working platform. It does not do the parts that need root:

- set up the [queue worker and cron entries](./cronjob.md) it showed you in step 4 — nothing that is
  queued runs until you do;
- point wildcard DNS at the box and install a wildcard certificate — see
  [Wildcard DNS and TLS](./installation-dns-tls.md);
- review [Choosing a server](./installation-hosting.md) if you are not yet on a VPS.

Then read [Operating the platform](./operator-console.md).

## If the wizard will not start

- **Every page 404s after install.** `CENTRAL_DOMAINS` does not match the host you are browsing.
  This is step 1's whole purpose; if it was filled in wrongly, correct it in `.env` directly.
- **Storefronts 500 while the console works.** The plugin activation in step 3 did not complete. Run
  `php artisan cms:plugin:activate ecommerce` and check the preflight report again.
- **Storefronts render unstyled.** Theme assets were not published. Run
  `php artisan tenancy:publish-theme-assets`, and add it to your deploy script.
- **A new store stays on "Preparing…".** No queue worker is running. See [step 4](#_4-queue-and-cron).

More in [Troubleshooting](./troubleshooting.md).
