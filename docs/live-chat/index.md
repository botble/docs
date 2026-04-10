# Live Chat Plugin

A floating Ajax live chat widget for Botble CMS that enables real-time visitor support directly on your website.

## Features

- **Real-time Chat** — Visitors start conversations from a floating widget; admins reply from a messenger-style panel
- **Messenger Admin UI** — Three-panel layout with conversation list, chat area, and visitor info sidebar
- **Agent Portal** — Dedicated portal for support agents with dashboard, messenger, profile, and availability toggle
- **Agent Management** — Admin CRUD to create, edit, and manage chat agents
- **Auto-assign** — Round-robin assignment of available agents to new conversations
- **Per-agent Notifications** — Each agent configures email, browser, and sound notification preferences
- **Working Hours** — Auto-switch online/offline status based on configurable schedule and timezone
- **Browser Notifications** — Desktop notifications with sound alerts for new messages and conversations
- **Webhooks** — Send event data to external services (Slack, Discord, CRM, n8n, Zapier) with HMAC signing
- **Email Notifications** — Notify admins via email when new conversations start
- **Customizable Widget** — Colors, position, avatar, title, welcome message, and mobile visibility
- **Visitor Fields** — Configurable name/email/phone fields with optional/required settings
- **Auto-linkify** — URLs in messages become clickable links
- **Emoji Conversion** — Text emoticons like `:)` `:D` `;)` automatically convert to emoji
- **File Attachments** — Visitors and agents can attach images, PDFs, documents, and archives. Hardcoded deny list blocks executable and script extensions
- **Random Admin Names** — Assign random support agent names per conversation
- **Poll-based Updates** — Configurable polling interval for message updates
- **DeskHive Integration** — Convert chat conversations to support tickets when [DeskHive](https://codecanyon.net/item/deskhive/62441260) is installed
- **42+ Languages** — Built-in translations

## Requirements

- Botble CMS 7.3.0 or later
- PHP 8.2 or later

## Quick Start

1. Install the plugin via **Admin → Plugins**
2. Activate it — the chat widget appears on your frontend immediately
3. Go to **Admin → Live Chat → Agents** to create support agents
4. Go to **Admin → Live Chat → Conversations** to manage chats
5. Configure settings at **Admin → Live Chat → Settings**
6. Agents log in at `/agent/login` to access their personal portal
