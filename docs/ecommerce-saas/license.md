---
title: License
description: Envato Extended License, activation, store owner access, and third-party components.
---

# License

Ecommerce SaaS is sold under an **Envato license** specific to multi-tenant platforms. The key point: if you are running **paid stores** (charging customers for access), you need the **Extended License**. If you run the stores yourself, Regular is enough.

## Which Envato license you need

| Your use case | License type | Reason |
|---|---|---|
| You run stores yourself; nobody pays for access | Regular | Single-site EULA applies — you own the platform |
| You offer stores to paying customers (SaaS) | **Extended** | Envato's terms explicitly cover charging for subscription/access |

The **Extended License** is stated in Envato's own FAQ: "If you plan to offer [the product] to end users for subscription or usage fees, you need the Extended License."

This product exists to run many stores. You are free to charge customers however you wish — per-month subscription, per-product listing fee, transaction percentage — but **any charged access requires Extended**.

## What the license lets you do

With either license:
- Install once on **one production installation** (one codebase, one control plane, plus dev and staging copies)
- Run an **unlimited number of stores** on that installation
- Modify the source code for your own use
- Use all Botble CMS components, storefront themes and plugins included

With **Extended License only**:
- Charge end customers for access to those stores
- Any billing model (subscription, pay-per-feature, transaction %, etc.)

## What the license does not permit

You may **not**:
- Redistribute or resell the source code, whole or in part, modified or not
- Offer the platform itself as a downloadable or white-labelled product to third parties
- Remove or obscure copyright notices
- Use Botble's trademarks to imply endorsement

**End customers receive a hosted service, not a license.** A store owner gains no rights to the source code. They access their store only. If you want to give customers an installable copy, each copy needs its own license.

## One installation, unlimited stores

The license is per-installation, not per-store. You buy once, and every store you create — your own, your customers' — runs under that single license. A second *production installation* (whether on another server or the same one) needs a second license. Staging and development copies are free.

**Installation** means: a single `CENTRAL_DOMAINS` and a single operator console. Two separate `CENTRAL_DOMAINS` = two installations = two licenses.

## Activating your license

Activate from the **operator console** — that is the platform owner's own control panel, and the
path this product documents and supports.

1. Sign in to the operator console at `/<admin-dir>/operator` (the demo uses `/saas-admin/operator`;
   your `ADMIN_DIR` sets the prefix).
2. Open **License** in the sidebar.
3. Enter the purchase code from your CodeCanyon downloads page and your Envato username, tick the
   agreement, and activate.

The screen shows the current activation state, so you can confirm it took effect without leaving the
console.

::: tip Why here rather than the stock Settings panel
The licence covers the **whole platform**, not a store. The operator console is where every other
platform-level decision is made, so activation lives alongside them. Botble's stock screen at
**Settings → License** still works and is a fine fallback if you ever cannot reach the console — both
write the same activation, so use whichever you can get to.
:::

Activation is tied to your **control-plane domain** (for example `saas.yourdomain.com`), not to a
store subdomain. Never activate against `store1.yourdomain.com` or a customer's custom domain.

Store subdomains and customer custom domains do **not** consume activations. A store owner sees no
licence check on their admin panel or storefront.

### If the licence is not active yet

The License screen stays reachable whether or not the platform is activated — that is deliberate, so
an unlicensed install can still be fixed from the console rather than locking you out of the one page
you need.

### If the licence server cannot be reached

Activation talks to `license.botble.com`. If that call fails you get a readable message and can
retry; nothing is left half-applied. Retry before assuming your code is wrong.

::: warning Deactivating releases your activation slot
The screen can also **deactivate**, which frees the slot on the licence server so you can move the
platform to another domain or server. It is not an undo — re-activating needs your purchase code
again. Keep that code somewhere safe and separate from your `.env`.
:::

## Store owners never see the License screen

The license check happens only at platform boot during setup. Store admins and shoppers see no licensing UI — the platform is invisible to them. They log in at `/admin` on their store domain, and everything works.

## Third-party components

This product includes:

- **Botble CMS** and all bundled themes, plugins, and utilities under their own licenses
- **Stancl/Tenancy** for multi-tenancy (MIT license)
- **Laravel Cashier** for billing (MIT license)
- **Predis** for Redis (MIT license)
- **Laravel Framework** and other open-source packages

Nothing in this license narrows the rights granted by those licenses. Every third-party component retains its own terms. See `/vendor/{package}/composer.json` or `/vendor/{package}/LICENSE` in the installed codebase for details.

Fonts bundled in the platform (**Playfair Display** and **Inter**) are self-hosted under SIL OFL 1.1. Nothing is loaded from a CDN.

