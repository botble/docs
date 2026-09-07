---
title: How it works
description: Central vs tenant context, database-per-tenant isolation, admin restrictions and request-time entitlement gating.
---

# How it works

Ecommerce SaaS is one codebase, one control plane, and a separate database
per customer store. The rest of the tree is stock Botble plus whichever
themes you install, so upgrades stay manageable. The entire tenancy layer
lives in one self-contained package: `platform/packages/tenancy`
(`Botble\Tenancy\`).

## Central vs tenant context

Every request runs in one of two contexts:

- **Central** — the control-plane domain (`CENTRAL_DOMAINS`). This is the
  platform owner's side: the landing page, self-serve signup, and the
  **operator console** at `/admin/operator` (its own `admins` guard, not
  Botble users).
- **Tenant** — a store's own subdomain or custom domain. This is the store
  owner's side: their storefront and their **store admin** at `/admin`
  (ordinary Botble, running against that store's own database).

![Operator console dashboard on the central domain](./images/operator-dashboard.png)

![Store owner's Botble admin dashboard — Apps, Domains and Billing in the sidebar](./images/tenant-admin-dashboard.png)

![A live tenant storefront](./images/tenant-storefront.png)

## Database-per-tenant

Built on [stancl/tenancy](https://tenancyforlaravel.com) v3: one central
database holds the control plane (operators, the tenant registry, plans,
subscriptions, usage, billing), and each store gets its own MySQL database,
named `<TENANCY_DB_PREFIX><id>`.

## What is re-bootstrapped on a tenant switch

When tenancy initializes for a request, a chain of bootstrappers runs, in
order: the database connection is swapped to the tenant's own database, then
cache, filesystem and queue are re-scoped, and Botble's own cached identity
is forgotten so it rebuilds against the tenant connection.

That last step matters because Botble resolves "who am I" during provider
boot — before any tenancy middleware runs — and caches it in singletons and
static properties: settings (`SettingStore`), the active theme, the mail
configuration, and the list of activated plugins. Under PHP-FPM each request
is a fresh process, so the blast radius is limited to whatever resolved
before tenancy initialized — but a queue worker handling jobs for several
tenants in the same process would otherwise **leak settings, mail config and
plugin state between stores**. Forgetting those cached instances forces them
to rebuild lazily against the correct tenant, which is what keeps stores
isolated from each other in long-lived processes.

## Two restricted admin surfaces

Both admins are Botble super-users under the hood, so hiding menu items alone
is cosmetic — the real boundary is at the route layer:

| Surface | Menu-hiding provider | What it hides |
|---|---|---|
| Central (operator) | `RestrictCentralAdminServiceProvider` | Every storefront content plugin (Ecommerce, Products, Pages, Blog, Galleries, Payments, …) — the platform owner runs no storefront on the central domain, so this leaves a focused panel: Dashboard, Stores, Users/Roles, Settings, System. |
| Tenant (store owner) | `RestrictTenantAdminServiceProvider` | Platform-owner tooling and any catalog app the store isn't running — the store owner gets the full Botble storefront admin minus what could break the platform. |

Each provider re-checks `tenancy()->initialized` before it fires, so the
removal is a no-op on the wrong side — the central provider never touches a
tenant admin, and the tenant provider never touches the operator console.

## Request-time entitlement gating

Plugin service providers register during app boot, from the **central**
database, before any tenancy middleware has identified the tenant. That
means every catalog app has its routes registered on every request,
whatever a given store actually has turned on — so "off" has to be enforced
**after** the tenant is known, at request time, not at boot:

```text
(plan allowlist UNION grants) MINUS revokes MINUS denylist
  INTERSECT active catalog rows INTERSECT what is actually on disk
```

`BlockDisabledPluginRoutes` 404s the routes of any app a store isn't
entitled to — this is the actual enforcement, permission-independent (store
owners are super-users, so ACL permissions can't restrict them), and 404
rather than 403 so an owner gets no signal a screen exists behind an
upgrade. Because everything expensive already happened at provisioning
(every plugin's tables are migrated into every store's database up front),
turning an app on or off is a single settings write with no migration, no
asset publishing and no effect on any other store.

## What is not supported

- **Laravel Octane.** Botble caches identity in statics that are per-request
  under FPM but cross-tenant under Octane.
- **`php artisan route:cache`** while stores could differ in routes.
- **Per-store plugin sets.** Plugins are activated platform-wide; the plugin
  manifest is one file for the whole install, and the Plugins screen is
  hidden from store admins by design.
- **`php artisan config:cache`** unless you verify tenant switching
  afterwards — cached config pins the central database credentials.

## Related

- [Requirements](./installation-requirements.md) and [Installation](./installation.md)
- [Apps and themes](./usage-apps-themes.md) — the catalog and entitlement model from the operator's side
- [Control-plane API](./api.md) and [Webhooks](./webhooks.md)
