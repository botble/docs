---
title: DigiMart
description: Self-hosted marketplace for selling digital products — plugins, themes, scripts and downloadable files.
---

# DigiMart

DigiMart is a self-hosted marketplace platform for buying and selling digital products such as plugins, themes, scripts and other downloadable files. It is built on a modular Laravel architecture (Botble CMS) with all application code organized under the `platform` directory.

## Highlights

- **Marketplace engine** — authors create and manage products, upload versions, set free or paid pricing, and receive ratings & reviews.
- **Product licensing** — issue license keys, verify purchase codes, and manage per-domain activations for the products sold on your marketplace.
- **Version management** — every product carries versioned releases with compatibility info and optional GitHub repository linking.
- **Author authentication** — registration, login, password reset, email verification and profile management for sellers.
- **Admin dashboard** — approve/reject products, ban authors, feature products, manage categories & dependencies, and view statistics.
- **Virus scanning** — uploaded product archives are scanned via VirusTotal before they become downloadable.
- **REST API** — product listing/details, downloads, license activate/deactivate and update checking for client integrations.

## Documentation

| Guide | Description |
|-------|-------------|
| [Requirements](installation-requirements.md) | Server requirements and PHP extensions |
| [Install via Web](installation-web-interface.md) | Guided web installer |
| [Install via CLI](installation-command-line.md) | Command-line installation |
| [License Activation](license.md) | Activate your CodeCanyon purchase code |
| [Dashboard](admin-dashboard.md) | Admin overview and statistics |
| [Marketplace Settings](settings.md) | Configure marketplace behaviour |
| [Authors & Approvals](authors.md) | Manage sellers and product approvals |
| [Products & Versions](products.md) | Approve, feature and version products |
| [Product Licensing](licensing.md) | Licenses, activations and access tokens |
| [Virus Scanning](virus-scanning.md) | VirusTotal integration and scan logs |
| [REST API](api.md) | Public API endpoints |
| [Console Commands](commands.md) | Marketplace artisan commands |

## Roles

| Role | Capabilities |
|------|--------------|
| **Administrator** | Approve/reject products, manage authors, feature products, configure the marketplace. |
| **Author** | Publish and manage products, upload versions, manage profile, view download statistics. |
| **Customer** | Browse, download and rate products. |

## Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| Core | `platform/core/` | Base framework, dashboard, media manager, settings, tables, ACL. |
| Packages | `platform/packages/` | Theme system, menu, page, widget, SEO, slug, shortcode, sitemap, plugin management, installer. |
| Plugins | `platform/plugins/` | `marketplace` (the engine), `social-login`, `newsletter`, `captcha`, `fob-comment`. |
| Theme | `platform/themes/digimart` | The DigiMart storefront theme. |

::: tip
New to Botble CMS? The core platform shares many concepts (media, settings, permissions, SEO) with the rest of the product line — see the [CMS documentation](/cms/) for framework-level guides.
:::
