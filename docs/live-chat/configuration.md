# Configuration

After installation, configure the plugin at **Admin → Live Chat → Settings**.

## General Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Enable Live Chat | Show/hide the chat widget on frontend | On |
| Widget Title | Text displayed in the chat header | Live Chat |
| Online Status | Manual online/offline toggle | Online |
| Welcome Message | First message visitors see when opening chat | Hello! Thanks for reaching out... |
| Admin Name | Name shown for admin replies | Support |

## Visitor Form Fields

Control which fields visitors must fill before starting a chat:

- **Display Fields** — Choose which fields to show: Email, Phone, or both
- **Mandatory Fields** — Choose which displayed fields are required

The **Name** field is always required.

## Random Admin Names

When enabled, each new conversation is assigned a random name from your list instead of the default admin name.

1. Enable **Use Random Admin Names**
2. Enter one name per line in the text area (e.g., Sarah, Mike, Emma)

## Appearance

| Setting | Description | Default |
|---------|-------------|---------|
| Primary Color | Main widget color (button, header) | #5A5EB9 |
| Hover Color | Button hover color | #4a4ea0 |
| Avatar Image | Custom image for chat header | Default icon |
| Position | Widget placement on screen | Bottom Right |
| Offset X/Y | Pixel offset from screen edge | 20px |
| Display on Mobile | Show always or hide on mobile | Always show |
| Full-screen on mobile | Chat window covers full viewport on mobile (≤480px) | Off |

## Polling

| Setting | Description | Default |
|---------|-------------|---------|
| Poll Interval | How often to check for new messages (ms) | 3000 |

::: tip
Lower values (2000–3000ms) give faster updates but increase server load. For high-traffic sites, use 5000ms or higher.
:::

## Permissions

The plugin registers these permissions under **Admin → Settings → Roles & Permissions**:

| Permission | Description |
|------------|-------------|
| `live-chat.conversations.index` | View conversations list |
| `live-chat.conversations.show` | View individual conversations |
| `live-chat.conversations.reply` | Reply to and close conversations |
| `live-chat.conversations.destroy` | Delete conversations |
| `live-chat.webhooks.index` | View webhooks list |
| `live-chat.webhooks.create` | Create webhooks |
| `live-chat.webhooks.edit` | Edit and test webhooks |
| `live-chat.webhooks.destroy` | Delete webhooks |
| `live-chat.settings` | Access settings page |
