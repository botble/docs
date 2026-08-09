---
title: BB Popup
description: Promotional popups, countdown offers, age gates and lead capture for Botble CMS
---

# BB Popup

Create promotional popups, countdown offers, age gates and email capture forms on any Botble site, with targeting rules precise enough that nobody else has to see them.

![Flash sale popup with a countdown](./images/01-modal-flash-sale.png)

## Why this plugin

- **Cache-safe by design.** Rules that vary with the page are applied on the server; rules that vary with the person run in the browser. One cached HTML document stays correct for every visitor who receives it.
- **No dependencies.** The public runtime is vanilla JavaScript - no jQuery, no framework, and nothing fetched from a CDN. Email capture is built in, so no form plugin is required either.
- **Works on every Botble script.** Blog, hotel, real estate, job board, plain CMS or ecommerce. Popups are injected through the standard theme hooks, so no theme file is edited.

## Features

### Layouts
Five layouts - modal, slide-in, notification bar, fullscreen overlay and inline - each of which can wear any of the eight style presets.

### Content
- Rich text with the full editor and shortcode support
- Image-only mode with a clickable full-bleed banner
- Built-in email capture with optional name and phone fields
- An embedded [BB Form Builder](/bb-form-builder/) form, auto-styled to the popup palette

### Triggers
Page load, time delay, scroll percentage, exit intent, click on a CSS selector, inactivity and page-view count. Any trigger can be combined with a time delay - whichever fires first opens the popup.

### Targeting
Eleven rule types with Match ALL / Match ANY logic: URL path, page type, language, weekly schedule, device, login status, first-time vs returning visitor, referrer, UTM parameter, cookie and page-view count. Each rule shows whether it is evaluated on the server or in the browser.

### Urgency and behaviour
- Countdown timers - per-visitor session timers or a fixed deadline - with seven expiry actions
- Frequency capping: every time, once per session, once ever, every N days, or until converted
- A forced-read delay before the popup can be dismissed
- A static backdrop for age gates, and a corner reopen icon so a closed offer stays reachable

### Measurement
Impressions, closes, clicks and conversions per popup and per day, plus A/B variants with weighted traffic and a per-variant report.

## Quick links

| Guide | What it covers |
|---|---|
| [Installation](./installation.md) | Uploading, activating and building your first popup |
| [Configuration](./configuration.md) | Every site-wide setting, grouped by what it affects |
| [Creating a popup](./usage/creating-a-popup.md) | Layouts, content modes and scheduling |
| [Design](./usage/design.md) | Presets, colours, animations and custom CSS |
| [Triggers & behaviour](./usage/triggers-and-behaviour.md) | When a popup opens, how often, and how it closes |
| [Display rules](./usage/display-rules.md) | The eleven rule types and what stays cache-safe |
| [Email capture](./usage/email-capture.md) | Collecting leads and exporting subscribers |
| [A/B testing](./usage/ab-testing.md) | Running an experiment and reading the result |
| [Reports](./usage/reports.md) | What is counted, and when |
| [Shortcode & embed](./usage/shortcode-and-embed.md) | Placing popups by hand, the JS API, external sites |
| [Import & export](./usage/import-export.md) | Moving popups between sites |
| [Troubleshooting](./troubleshooting.md) | When a popup does not appear |
| [FAQ](./faq.md) | Short answers to common questions |

## Requirements

- Botble CMS 7.5.0 or higher
- PHP 8.3 or higher

No other plugin is required. BB Form Builder and Language Advanced are used automatically if they happen to be installed.
