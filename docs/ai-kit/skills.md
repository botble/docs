---
title: Skills & Agents
description: Every skill and specialist agent in the Botble AI Kit, how to call it in Claude Code, Codex and Gemini / Antigravity, when to use it and an example prompt.
---

# Skills & Agents

You rarely need to call a skill by name. Describe the task and the assistant loads the matching skill by itself. Calling it by name is useful when you want to be sure a specific skill is used.

| Assistant | Pattern | Example |
|---|---|---|
| Claude Code | `/bb:<name>` | `/bb:plan` |
| Codex | `$botble-<name>` | `$botble-plan` |
| Gemini / Antigravity | `/bb-<name>` | `/bb-plan` |

## Workflow skills

| Skill | Claude Code | Codex | Gemini / Antigravity | Use it when |
|---|---|---|---|---|
| plan | `/bb:plan` | `$botble-plan` | `/bb-plan` | Before any non-trivial change: a new plugin or module, a theme feature, an ecommerce or payment change, a schema change, a refactor. Writes a one-page plan for you to approve. |
| build | `/bb:build` | `$botble-build` | `/bb-build` | Implementing an approved plan, or a small well-scoped request, with checks after each step. |
| debug | `/bb:debug` | `$botble-debug` | `/bb-debug` | Something is broken: an error page, an exception in the log, a failing test, wrong data, a missing menu or permission, a stale asset, a regression after an update. |
| review | `/bb:review` | `$botble-review` | `/bb-review` | Reviewing pending changes, a commit, a PR, or a whole plugin or theme before release or CodeCanyon submission. |

Example prompts:

- **plan**: `/bb:plan add an expiry date to announcements so expired ones are hidden on the frontend`
- **build**: `/bb:build plans/261125-1430-announcement-expiry-date/plan.md`
- **debug**: `/bb:debug after updating to the latest version the product page returns a 500 error`
- **review**: `/bb:review my uncommitted changes`

## Botble knowledge skills

| Skill | Claude Code | Codex | Gemini / Antigravity | Use it when | Example prompt |
|---|---|---|---|---|---|
| code | `/bb:code` | `$botble-code` | `/bb-code` | Writing any PHP under `platform/`: naming, models, forms, tables, enums, hooks, security, translations, tests. Usually loads by itself. | `/bb:code add a status enum to my Ticket model` |
| plugin | `/bb:plugin` | `$botble-plugin` | `/bb-plugin` | Creating a plugin, or adding models, forms, tables, permissions or hooks to one. | `/bb:plugin create a "Testimonials" plugin with admin CRUD` |
| theme | `/bb:theme` | `$botble-theme` | `/bb-theme` | Building or customizing a theme: shortcodes, widgets, layouts, homepage presets, ecommerce pages, HTML to theme conversion. | `/bb:theme convert this HTML template in ./html into a Botble theme` |
| ecommerce | `/bb:ecommerce` | `$botble-ecommerce` | `/bb-ecommerce` | Products, orders, checkout, payments, shipping, discounts, cart, invoices, marketplace vendors. | `/bb:ecommerce add a minimum order amount per vendor at checkout` |
| ui | `/bb:ui` | `$botble-ui` | `/bb-ui` | Styling admin pages or themes with Tabler, Bootstrap 5 and Botble Blade components. | `/bb:ui make the report page use cards and badges like the rest of the admin` |
| forms | `/bb:forms` | `$botble-forms` | `/bb-forms` | Building or extending admin forms and settings pages: field types, conditional fields, tabs, meta boxes, slugs. | `/bb:forms show the "Discount code" field only when "Has discount" is checked` |
| admin | `/bb:admin` | `$botble-admin` | `/bb-admin` | Admin list pages and wiring: tables, bulk actions, filters, menus, dashboard widgets, permissions, emails, commands and cron. | `/bb:admin add a "Mark as paid" bulk action to the invoices table` |
| api | `/bb:api` | `$botble-api` | `/bb-api` | Building or calling the Botble REST API: tokens, plugin endpoints, resources, pagination, CORS, docs, mobile app endpoints. | `/bb:api add a paginated API endpoint that lists my plugin's events` |
| assets-js | `/bb:assets-js` | `$botble-assets-js` | `/bb-assets-js` | Loading, building and publishing CSS/JS, the admin JS helpers, cache busting, Envato no-CDN rules. | `/bb:assets-js my new admin script doesn't load on the plugin's edit page` |
| media | `/bb:media` | `$botble-media` | `/bb-media` | Media in code: image URLs and sizes, uploads, media fields, S3/R2/Wasabi/BunnyCDN storage, CDN, upload errors. | `/bb:media add a 600x400 thumbnail size for my plugin's images` |
| seo | `/bb:seo` | `$botble-seo` | `/bb-seo` | SEO meta and Open Graph, slugs and public URLs, sitemap, robots.txt, breadcrumbs, JSON-LD, tracking hooks. | `/bb:seo give my plugin's items public pages with slugs and SEO meta` |
| multilingual | `/bb:multilingual` | `$botble-multilingual` | `/bb-multilingual` | Multilingual sites and plugins: translatable fields, locale URLs, per-language slugs, theme options, menus, RTL. | `/bb:multilingual make the title and description of my plugin's items translatable` |
| ops | `/bb:ops` | `$botble-ops` | `/bb-ops` | Installing, upgrading, deploying and running a site: requirements, safe upgrades, domain moves, cron, queues, cache, performance, backups. | `/bb:ops upgrade this site to the latest Botble version without losing my changes` |
| seeder | `/bb:seeder` | `$botble-seeder` | `/bb-seeder` | Writing seeders with realistic, translatable demo content. | `/bb:seeder write a seeder with 12 realistic testimonials` |
| translate | `/bb:translate` | `$botble-translate` | `/bb-translate` | Translating theme and plugin strings into other languages. | `/bb:translate translate my plugin's strings into French, German and Vietnamese` |
| troubleshooting | `/bb:troubleshooting` | `$botble-troubleshooting` | `/bb-troubleshooting` | Diagnosing a site problem: install, upgrade and server errors, settings, checkout and payments, theme options, translations, emails, cache, performance, licensing, mobile app API. | `/bb:troubleshooting order emails are not being sent` |

::: tip
`debug` is for bugs in code you are working on. `troubleshooting` is for problems on a running site, often caused by settings, server or cache rather than code. If you are not sure, describe the problem and let the assistant choose.
:::

The translation scripts need Python with `deep-translator` installed (`pip install deep-translator`).

## Specialist agents

Agents are focused helpers for one kind of job.

- **Claude Code**: agents are installed with the plugin. Claude hands work to them on its own, or you can ask for one by name: "use the botble-plugin-scaffolder agent to …".
- **Codex and Gemini / Antigravity**: the agent descriptions are in the kit's `agents/` folder. When your session can start sub-agents, the assistant gives them that role; otherwise it does the work itself following the same notes. Mention the agent's job in your request ("scaffold a plugin", "audit this theme for Envato").

| Agent | Use it when | Example prompt |
|---|---|---|
| `botble-plugin-scaffolder` | Creating a new plugin or adding a full CRUD module to an existing one. | `Use the botble-plugin-scaffolder agent to create a "Courses" plugin with categories and lessons` |
| `botble-plugin-migrator` | Adding or changing database tables: new migrations, altered tables, dropped columns, fixing a broken migration. | `Use the botble-plugin-migrator agent to add a nullable "expires_at" column to announcements` |
| `botble-theme-shortcoder` | Building a complete theme shortcode: registration, view, admin config and preview image. | `Use the botble-theme-shortcoder agent to add a "pricing table" shortcode to my theme` |
| `botble-theme-envato-auditor` | Checking a theme for Envato/CodeCanyon problems before submission. | `Use the botble-theme-envato-auditor agent to audit platform/themes/mytheme` |
| `botble-ecommerce-payment-integrator` | Adding a payment gateway, payment webhooks or refund support. | `Use the botble-ecommerce-payment-integrator agent to add Mollie as a payment method` |
| `botble-ecommerce-product-architect` | Changing the product catalog: product fields, variations, attribute sets, specification groups, flash sales. | `Use the botble-ecommerce-product-architect agent to add a "warranty months" field to products` |
