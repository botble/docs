# DeskHive Integration

Live Chat optionally integrates with [DeskHive](https://codecanyon.net/item/deskhive/62441260) (Support Desk plugin). When both plugins are installed, agents can convert chat conversations into support tickets.

## Requirements

- Live Chat plugin installed and active
- DeskHive (Support Desk) plugin installed and active

The integration is **fully optional** — Live Chat works independently without DeskHive.

## Features

### Convert Chat to Ticket

Agents and admins can convert any chat conversation into a DeskHive support ticket with one click.

**From the Agent Portal:**
1. Open a conversation
2. In the info panel, find the **Support Ticket** section
3. Click **Convert to Ticket**
4. A DeskHive ticket is created with the conversation history

**From the Admin Panel:**
1. Open a conversation at **Admin → Live Chat → Conversations**
2. In the right info panel, find the **Support Ticket** section
3. Click **Convert to Ticket**

### What happens during conversion

| Action | Detail |
|--------|--------|
| Customer lookup | Finds existing DeskHive customer by email, or creates a new one |
| Ticket creation | Creates a ticket with title "Live Chat: {visitor} - {date}" |
| Message copy | Copies visitor messages to the ticket (up to 500) |
| Agent auto-assign | If the Live Chat agent's email matches a DeskHive agent, the ticket is auto-assigned |
| Reference link | The conversation shows the ticket reference (e.g., `SD-20260403-ABCDEF`) |

### Requirements for conversion

- The visitor must have an **email address** — conversations without email cannot be converted
- Each conversation can only be converted **once** — the button is replaced with the ticket reference after conversion

### Customer auto-detect

When a DeskHive customer is logged in and opens the chat widget, their name and email are automatically pre-filled. They don't need to enter their details again.

This uses the same auto-detect system as other Botble CMS customer guards. It can be toggled in **Admin → Live Chat → Settings → Auto-detect Logged-in Customers**.
