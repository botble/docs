---
title: Live Chat Add-on
description: Floating chat widget on each store's storefront, answered by the store's own agents, as a per-store add-on.
---

# Live Chat

A floating chat widget on the storefront. Visitors start a conversation; the store's staff
answer from **Live Chat → Conversations** in the store admin. The widget polls the server
for new messages (Ajax), so no websocket server is needed.

## SaaS setup

**Minimum version:** Live Chat 1.0.9+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `live-chat`, then enter the purchase code once in **Operator console → Add-ons**.

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-live-chat` |
| Route name prefixes | `live-chat.`, `agent.` |
| Settings panel item ids | `live-chat` |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

The embed API (`/api/live-chat/*`, used when a store embeds the widget on another
website) sits outside the `web` route group. The platform attaches store identification
to it through the add-on contract, so each call reaches the right store's database.

### Per-store configuration

Each store configures its widget under **Live Chat → Settings**: enable/disable, widget
title, welcome message, colours, position and offsets, mobile display, working hours,
auto-assignment of agents, agent-initiated conversations, and the optional embed widget
with its allowed domains.

Agents are managed under **Live Chat → Agents**; shared canned replies under
**Live Chat → Team Snippets**.

### Scheduled tasks

| Command | Declared schedule | Runs on |
|---|---|---|
| `live-chat:presence:evict` | Every two minutes | `tenancy:schedule --frequency=everyFiveMinutes` |

It removes stale "visitor online" rows. The platform never runs add-on tasks more often
than every five minutes, so a visitor who left can stay listed as online a few minutes
longer than on a single site.

## Features

- Storefront chat widget, with auto-filled details for logged-in customers
- Conversations inbox with unread counts and dashboard widgets
- Agents with round-robin auto-assignment
- Agent-initiated conversations with live visitors
- Team snippets (canned replies)
- Working hours with automatic offline status
- Reports
- Outbound webhooks
- Embeddable widget for external websites
- Convert a conversation to a support ticket, when the Support Desk plugin is active

## Troubleshooting

### Chat widget doesn't appear on the storefront

**Cause:** Live Chat is switched off for the store, or **Enable Live Chat** is off in its
settings.

**Fix:** Have the store owner check **Apps** and **Live Chat → Settings**.

### A store can't save a webhook URL

**Cause:** The URL's host resolves to a private or reserved address, which the platform
refuses.

**Fix:** Use a publicly reachable URL.

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
