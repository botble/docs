---
title: Changelog
description: DigiMart version history and release notes
---

# Changelog

## Version 1.0.0 — June 15, 2025

**Initial release of DigiMart**

DigiMart 1.0 launches as a self-hosted marketplace platform for selling digital products (plugins, themes, scripts, downloadable files) on top of Botble CMS.

### Core Features

- **Marketplace Engine** — Complete product catalog with categories, tags, and search
- **Product Management** — Authors create products, upload versions, manage pricing (free/paid)
- **Licensing System** — Issue and verify license keys; manage per-domain activations
- **Virus Scanning** — Automated VirusTotal integration to scan uploads before download
- **Author System** — Registration, approval workflow, author profiles, statistics
- **Product Ratings** — Customer ratings and reviews with admin moderation
- **Admin Dashboard** — Statistics, approvals queue, product management
- **REST API** — Product listing, downloads, license activation/deactivation
- **Console Commands** — Batch operations (approvals, statistics, scanning)

### Included Plugins

- `marketplace` — Core marketplace engine
- `social-login` — Third-party authentication
- `newsletter` — Email subscription management
- `captcha` — Form protection
- `fob-comment` — Product reviews and comments

### Storefront Theme

- `digimart` — Responsive marketplace theme with product showcase

### System Requirements

- PHP 8.3+
- MySQL 5.7+ / MariaDB 10.3+
- Node.js 16+
- Composer 2.0+

### Documentation

Complete documentation included:
- Installation (web and CLI)
- Admin guides (dashboard, settings, moderation)
- Author guides (becoming an author, publishing products)
- Developer reference (REST API, console commands)
- FAQ and troubleshooting

### Known Limitations

- Single-domain license activation per key (multiple domains require multiple licenses)
- Virus scanning rate-limited to 500 scans/day on VirusTotal free tier
- Product import from external sources (GitHub, Envato) requires manual configuration

### Next Steps

- Upgrade to VirusTotal paid tier for higher scan volumes
- Configure marketplace settings (licensing, virus scanning, announcements)
- Approve initial product submissions
- Monitor download statistics and user feedback
