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

Visitor details and messages are escaped in the emails, and line breaks in messages are kept. If you customised a Live Chat template before version 1.0.15, reset it (or add the `|e` filter to visitor variables, e.g. `{{ visitor_name|e }}`) so it gets the same protection.

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

- **On the visitor's first message** — Submitting the pre-chat form alone does not send an email; it is sent once the visitor sends their first message. No email is sent for later messages
- **Queued delivery** — When your site uses a queue (`QUEUE_CONNECTION` is not `sync`), the email is sent by your queue worker, so it only goes out while a worker is running

::: tip
Make sure your mail driver is configured in **Admin → Settings → Email** for notifications to work.
:::

## Troubleshooting

If notification emails stop arriving:

1. Send a test email from **Admin → Settings → Email** to confirm your mail settings work.
2. Check that the **Live Chat** email template is enabled in **Admin → Settings → Email**.
3. If you use a queue worker, make sure it is running, and restart it after updating the plugin:

   ```bash
   php artisan queue:restart
   ```

4. Check `storage/logs` for mail errors.
