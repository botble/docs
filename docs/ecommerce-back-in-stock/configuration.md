# Configuration

All back-in-stock settings are in one place: **Back in Stock > Settings** in your admin panel (also listed under **Settings > Others > Back in Stock Notifications**).

## Core Settings

### Enable Back in Stock Notifications

Turns the entire notification system on or off without deactivating the plugin. When disabled, the "Notify Me" form is hidden on all product pages and no new subscriptions are accepted.

**Default:** Enabled

### Auto-notify on Restock

Automatically send notifications when a product is restocked. Turn off to stop sending emails on restock.

**Default:** Enabled

### Eligible Stock Statuses

Which stock statuses show the subscription form: **Out of Stock** and/or **On Backorder**.

**Default:** Out of Stock

### Display Mode

Controls how the subscription form appears on out-of-stock product pages:

| Mode | How it works |
|------|-------------|
| **Inline (form embedded on page)** | The form is embedded directly in the product page layout, visible without any interaction |
| **Modal (button opens popup)** | A button (e.g., "Notify Me") appears on the product page; clicking it opens a popup form |

::: tip
The inline form works well for themes with space below the add-to-cart area. Use the modal if your theme's product layout is compact or if you prefer a less intrusive approach.
:::

### Show Phone Number Field

Controls whether the subscription form includes a phone number field in addition to email:

- **Enabled** — Customers can optionally enter their phone number when subscribing
- **Disabled** — Only email is collected

::: info
Email is always required. The phone number field is optional even when enabled — customers can leave it blank.
:::

**Default:** Disabled

## Appearance Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Modal Style** | Default (with icon header) or Compact (minimal) | Default |
| **Button Icon** | Icon on the notification button | `ti ti-bell-ringing` |
| **Button Style** | Outline, Filled or Text Only | Outline |
| **Button Color** | Hex color of the button | `#3b82f6` |
| **Button Border Radius** | Radius in pixels (0-50) | 8 |

## Admin Notification

| Setting | Description |
|---------|-------------|
| **Notify Admin** | Email a summary to admins when subscribers are notified (default: off) |
| **Admin Emails** | Comma-separated admin email addresses |

## Email Settings

Back in Stock adds two email templates, editable in **Settings > Email** (Email templates section, under **Back in Stock Notifications**):

| Template | Sent to |
|----------|---------|
| **Customer back-in-stock notification** | The subscriber, when the product is restocked |
| **Admin restock notification summary** | Admin emails, when **Notify Admin** is on |

### Available Template Variables

Customer notification:

| Variable | What it outputs |
|----------|----------------|
| <code v-pre>{{ product_name }}</code> | Name of the restocked product |
| <code v-pre>{{ product_url }}</code> | Direct link to the product page |
| <code v-pre>{{ product_image }}</code> | Product image URL |
| <code v-pre>{{ product_price }}</code> | Product price |
| <code v-pre>{{ unsubscribe_url }}</code> | Unique token-based link to cancel the subscription |
| <code v-pre>{{ site_title }}</code> | Site title |

Admin summary: <code v-pre>{{ product_name }}</code>, <code v-pre>{{ subscriber_count }}</code>, <code v-pre>{{ site_title }}</code>.

::: warning
Always include <code v-pre>{{ unsubscribe_url }}</code> in your email template. Customers must have a way to opt out of future notifications.
:::

## Permissions

Back in Stock adds these permissions that you can assign to admin roles at **Admin > Users > Roles**:

| Permission | What it allows |
|------------|---------------|
| `back-in-stock.index` | View the subscriptions list in admin |
| `back-in-stock.destroy` | Delete subscriptions |
| `back-in-stock.settings` | Access the Back in Stock settings page |

### Suggested role setups

**Store Manager** — All back-in-stock permissions

**Customer Service** — `back-in-stock.index` only. Can view subscriptions but cannot delete or change settings.
