# Email-to-Ticket

DeskHive can poll an IMAP mailbox and automatically convert incoming emails into support tickets. Replies to existing tickets are threaded back correctly. The feature is disabled by default and requires no additional PHP extensions.

## How It Works

1. The scheduler runs `support-desk:process-emails` every 5 minutes
2. Unseen messages are fetched from the configured IMAP folder
3. Each message is checked against the `sd_processed_emails` table by Message-ID to prevent duplicates
4. If the subject contains a reference tag like `[SD-XXXXXXXX-XXXX]`, the reply is appended to that ticket
5. Otherwise a new ticket is created (and optionally a new customer account)
6. The message is marked processed

## Requirements

- An IMAP-enabled mailbox (Gmail, Office 365, or any standard IMAP server)
- Laravel scheduler running (cron job)
- PHP `ext-imap` is **not** required — DeskHive bundles the `webklex/php-imap` library

## Setup

### 1. Configure IMAP Settings

Go to **Admin → Support Desk → Settings → Email Piping** and fill in the fields below.

| Setting | Description |
|---------|-------------|
| Enable Email Piping | Master toggle — off by default |
| IMAP Host | e.g. `imap.gmail.com` |
| IMAP Port | Default `993` |
| IMAP Encryption | `ssl`, `tls`, or `none` |
| IMAP Username | The mailbox email address |
| IMAP Password | Stored encrypted in the database |
| IMAP Folder | Folder to poll — default `INBOX` |
| Auto-create Customer | Create an account for unknown sender emails |
| Default Department | Department assigned to email-created tickets |
| Default Priority | Priority assigned to email-created tickets |

Save settings, then enable the **Enable Email Piping** toggle.

### 2. Set Up the Cron Job

The Laravel scheduler must be running for automatic polling. Add the following cron entry to your server:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

The email processor is registered to run every **5 minutes** automatically once the scheduler is active.

You can also trigger processing manually at any time:

```bash
php artisan support-desk:process-emails
```

For full cron setup instructions see the [Botble scheduler documentation](https://cms.botble.com/docs/cms/cronjob).

### 3. Gmail Setup (App Password)

Direct password authentication is blocked by Google for most accounts. Use an **App Password** instead:

1. Enable **2-Step Verification** on your Google account
2. Go to **Google Account → Security → App passwords**
3. Create a new app password (select "Mail" and your device)
4. Use the generated 16-character password as the IMAP Password in DeskHive
5. Use `imap.gmail.com`, port `993`, encryption `ssl`

::: tip
Also ensure IMAP access is enabled in Gmail: **Settings → See all settings → Forwarding and POP/IMAP → Enable IMAP**.
:::

## Email Threading

When DeskHive sends an outbound reply notification to a customer, the email subject includes a reference tag:

```
Re: Your ticket subject [SD-XXXXXXXX-XXXX]
```

When the customer replies to that email, the tag is preserved in the subject line. DeskHive parses the tag on inbound processing and appends the reply to the correct ticket instead of creating a new one.

::: warning
If the customer removes the `[SD-...]` tag from the subject, or starts a brand-new email, DeskHive will not be able to match it to an existing ticket and will create a new ticket instead.
:::

## Auto-Create Customers

When an email arrives from an address that does not match any existing customer account:

- If **Auto-create Customer** is **enabled**: a new customer account is created using the sender's name and email address. The ticket is linked to that account.
- If **Auto-create Customer** is **disabled**: the email is skipped and no ticket is created.

Newly created customers receive no automatic welcome email. They can claim their account using the **Forgot Password** flow on the customer portal.

## Spam Filtering

The processor automatically skips messages that match any of these conditions:

- Sender address starts with `noreply@` or `mailer-daemon@`
- Message body is empty after stripping HTML

These checks prevent bounce messages and automated notifications from generating tickets.

## Artisan Command

```bash
php artisan support-desk:process-emails
```

Run manually to process the mailbox immediately without waiting for the scheduler. Useful for testing your IMAP configuration after initial setup.

::: tip
Check your Laravel log (`storage/logs/laravel.log`) for detailed output after running the command manually.
:::

## Troubleshooting

### Connection refused / authentication failed

- Verify the IMAP host, port, and encryption match your mail provider's settings
- For Gmail, confirm you are using an App Password and that IMAP is enabled in Gmail settings
- For Office 365, ensure **IMAP** is enabled in the Microsoft 365 admin center for the mailbox

### Emails are not creating tickets

- Confirm **Enable Email Piping** is toggled on in Settings
- Confirm the Laravel scheduler cron job is running: `php artisan schedule:list`
- Run `php artisan support-desk:process-emails` manually and check `storage/logs/laravel.log`
- Check that **Auto-create Customer** is enabled if the senders have no existing accounts

### Duplicate tickets being created

- This should not occur — DeskHive deduplicates by Message-ID in the `sd_processed_emails` table
- If you see duplicates, check that your IMAP server is correctly marking messages as seen after processing

### Replies create new tickets instead of threading

- The customer must reply to the notification email with the `[SD-XXXXXXXX-XXXX]` tag intact in the subject
- Check that outbound notification emails are being sent by DeskHive (verify mail config in `.env`)
