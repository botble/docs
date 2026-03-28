# Configuration

All back-in-stock settings are in one place: **Back in Stock > Settings** in your admin panel.

## Core Settings

### Enable Back in Stock Notifications

Turns the entire notification system on or off without deactivating the plugin. When disabled, the "Notify Me" form is hidden on all product pages and no new subscriptions are accepted.

**Default:** Enabled

### Display Mode

Controls how the subscription form appears on out-of-stock product pages:

| Mode | How it works |
|------|-------------|
| **Inline Form** | The form is embedded directly in the product page layout, visible without any interaction |
| **Modal** | A button (e.g., "Notify Me") appears on the product page; clicking it opens a popup form |

::: tip
The inline form works well for themes with space below the add-to-cart area. Use the modal if your theme's product layout is compact or if you prefer a less intrusive approach.
:::

### Collect Phone Number

Controls whether the subscription form includes a phone number field in addition to email:

- **Enabled** — Customers can optionally enter their phone number when subscribing
- **Disabled** — Only email is collected

::: info
Email is always required. The phone number field is optional even when enabled — customers can leave it blank.
:::

**Default:** Disabled

## Email Settings

Back in Stock uses the `back_in_stock_notification` email template to notify subscribers. Customize this template at **Admin > Email Templates**.

### Available Template Variables

| Variable | What it outputs |
|----------|----------------|
| `{{ customer_name }}` | Subscriber's name (if available) or their email address |
| `{{ product_name }}` | Name of the restocked product |
| `{{ product_url }}` | Direct link to the product page |
| `{{ product_image }}` | Product's featured image |
| `{{ unsubscribe_url }}` | Unique token-based link to cancel the subscription |

::: warning
Always include `{{ unsubscribe_url }}` in your email template. Customers must have a way to opt out of future notifications.
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
