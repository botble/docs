# Setup Email

Configure email settings to send transactional emails (order confirmations, shipping updates, password resets).

## Email Configuration

In admin panel, go to `Settings` -> `Email`.

### SMTP Settings

- **Mail Driver**: SMTP
- **Mail Host**: Your SMTP server (e.g., `smtp.gmail.com`)
- **Mail Port**: SMTP port (e.g., `587` for TLS)
- **Mail Username**: Your email address
- **Mail Password**: Your email password or app-specific password
- **Mail Encryption**: TLS or SSL
- **Mail From Address**: Sender email address
- **Mail From Name**: Sender display name

### Supported Providers

| Provider | Host | Port |
|----------|------|------|
| Gmail | smtp.gmail.com | 587 |
| Mailgun | smtp.mailgun.org | 587 |
| SendGrid | smtp.sendgrid.net | 587 |
| Amazon SES | email-smtp.{region}.amazonaws.com | 587 |

## Email Templates

Customize email templates in `Settings` -> `Email` -> `Email Templates`. You can modify the content and design of:

- Order confirmation
- Order status updates
- Customer registration
- Password reset
- Newsletter

::: tip
Use a dedicated email service like Mailgun or SendGrid for reliable delivery. Gmail has daily sending limits
that may not suit high-volume stores.
:::
