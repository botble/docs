---
title: Installation
description: Install and activate the Landing Funnel plugin in Botble CMS.
---

# Installation

The Landing Funnel plugin ships as a standard Botble plugin. Install it like any other plugin from your admin panel.

## Prerequisites

Before installing, verify your environment:

- **Botble CMS** version 7.5.0 or higher
- **Botble Ecommerce** plugin activated (Landing Funnel uses Ecommerce models, cart, checkout, and order pipeline)
- **PHP** 8.2+
- At least one **published product** to attach to your first funnel

## Activate the Plugin

1. Sign in to your admin panel
2. Go to **Plugins** in the sidebar
3. Find **Landing Funnel** in the plugin list
4. Click **Activate**

The plugin runs its migrations automatically on activation. You'll see a new **Landing Funnels** menu item under the **Ecommerce** group in the sidebar.

::: tip
All migrations are idempotent — safe to deactivate and re-activate the plugin without data loss.
:::

## Manual Activation (CLI)

If you prefer artisan commands:

```bash
php artisan cms:plugin:activate landing-funnel
```

This runs `Schema::create()` guards for every plugin table and registers permissions, routes, dashboard menu entries, and middleware.

## Verify the Installation

1. Visit **Admin > Landing Funnels** — you should see an empty list (or seeded demos).
2. Click **New** — the funnel edit form should render with 6 tabs: Basics, Content, Tracking, Thank-you, SEO, Advanced.
3. Pick any product and template, save, then visit `/landing/{your-slug}` — the public funnel page should render with no theme assets loaded.

## Permissions

The plugin registers six permission flags. Assign them to roles at **Roles > Permissions**:

| Permission | Default | Purpose |
|---|---|---|
| `landing-funnel.index` | Super admin | View funnels list |
| `landing-funnel.create` | Super admin | Create new funnel |
| `landing-funnel.edit` | Super admin | Edit funnel |
| `landing-funnel.destroy` | Super admin | Delete funnel |
| `landing-funnel.settings` | Super admin | Plugin-wide settings |
| `landing-funnel.use-custom-js` | Super admin | **Separately gated** — write raw `<script>` JS that runs on every visitor's browser |

::: warning
Grant `landing-funnel.use-custom-js` only to roles you fully trust. The Content-Security-Policy meta limits external script sources, but a malicious admin with this permission can still inject inline JS that runs on every funnel page.
:::

[Configure settings &rarr;](/landing-funnel/configuration)
