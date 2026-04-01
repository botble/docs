# Email Notifications

The plugin sends email notifications when visitors start new conversations.

## Configuration

Email settings are in **Admin → Live Chat → Settings** under the **Email Notifications** section.

### Enable/Disable

Toggle email notifications on or off. Enabled by default.

### Notification Emails

Comma-separated list of email addresses to receive notifications. Leave empty to use the default admin email from **Admin → Settings → General**.

Example: `admin@example.com, support@example.com`

## Email Template

The notification email includes:

- Visitor name
- Visitor email (if provided)
- Visitor phone (if provided)
- Visitor IP address
- Page URL where the chat started
- Direct link to the conversation in admin panel

### Customizing the Template

Go to **Admin → Settings → Email** and find the **Live Chat** section. You can:
- Enable/disable the template
- Edit the subject line
- Customize the email body

Available template variables:

| Variable | Description |
|----------|-------------|
| `{{ visitor_name }}` | Visitor's name |
| `{{ visitor_email }}` | Visitor's email address |
| `{{ visitor_phone }}` | Visitor's phone number |
| `{{ visitor_ip }}` | Visitor's IP address |
| `{{ current_page }}` | URL of the page where chat started |
| `{{ conversation_url }}` | Direct admin link to the conversation |

## When Emails Are Sent

- **Only on new conversations** — No email is sent for subsequent messages
- **Queued delivery** — Emails are dispatched via Laravel's queue for non-blocking performance

::: tip
Make sure your mail driver is configured in **Admin → Settings → Email** for notifications to work.
:::
