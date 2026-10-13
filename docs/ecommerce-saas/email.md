---
title: Outgoing email (SMTP)
description: Connect the platform to an SMTP mailbox so signup verification, store emails and billing notices are delivered, then test it.
---

# Outgoing email (SMTP)

The platform sends no email until you connect it to a mail server. A fresh VPS has no mail
server, so until this is done:

- customers who sign up at `/start-your-store` never get the verification email, and **their store
  is never created**
- stores cannot send order confirmations, account verification or password-reset emails
- store owners get no trial reminders, billing notices or "your store is ready" emails

## One mailbox for the whole platform

Every email goes through the SMTP account you set in `.env`. That covers the platform's own emails
and every email any store sends. Store owners cannot set their own SMTP server. The SMTP settings
screen is removed from every store's admin.

Each store's emails use your `MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME` as the sender.

## Order emails in each store

In releases after 1.0.2, every store starts with these emails switched on:

- order confirmation to the buyer
- new order alert to the store owner
- order delivered
- order cancelled by the buyer (alert to the store owner)

The store owner's alerts go to the email they signed up with. They can change it under
**Settings → General → Admin Email**.

Store owners can switch each email on or off and edit its subject and wording under
**Settings → Email templates**. Changes only affect their own store.

Stores created before this change get the same defaults once, when you run the platform update
(**Console → System update**, or `php artisan tenancy:migrate-tenants`). An admin email the owner
already entered is kept.

## 1. Add the SMTP settings to `.env`

Open `.env` in the platform root (for example `/var/www/ecommerce-saas/.env`) and add:

```env
CMS_ENABLE_EMAIL_CONFIGURATION_FROM_ADMIN_PANEL=false

MAIL_MAILER=smtp
MAIL_HOST=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USERNAME=info@yourdomain.com
MAIL_PASSWORD="your-mailbox-password"
MAIL_FROM_ADDRESS=info@yourdomain.com
MAIL_FROM_NAME="Your Platform"
```

::: danger Do not leave out `CMS_ENABLE_EMAIL_CONFIGURATION_FROM_ADMIN_PANEL=false`
Botble CMS normally reads its mail settings from the admin panel's Email settings screen, not
from `.env`. Neither the operator console nor any store admin can open that screen, so Botble
falls back to `sendmail` and **ignores `MAIL_MAILER=smtp`**. On a server without a local mail
server, every email then fails. This line tells Botble to use the `.env` settings, both on
your main domain and in every store.

The `.env.example` in newer releases already includes this line. An `.env` created by an
older release does not have it, so check yours and add it if it is missing.
:::

| Your provider says | Set |
|---|---|
| Port 587, STARTTLS (or "TLS") | `MAIL_PORT=587` and leave `MAIL_SCHEME` unset. STARTTLS is used automatically |
| Port 465, SSL/TLS | `MAIL_PORT=465`. SSL is used automatically on port 465 |
| Port 25 | Avoid it. Most VPS providers block outgoing port 25 |

- Quote the password if it contains spaces, `#` or `$`.
- `MAIL_FROM_ADDRESS` must be an address the SMTP account is allowed to send as. Usually that is
  the mailbox itself. Many providers reject or rewrite any other sender.

## 2. Apply the change

```bash
cd /var/www/ecommerce-saas
php artisan config:clear
php artisan queue:restart
```

Almost every email is sent by the [queue worker](./cronjob.md). A running worker keeps the old
mail settings in memory until it restarts. `queue:restart` makes it stop after its current job,
and your process manager starts it again. Restarting the worker yourself works too, for example
`systemctl restart saas-queue`.

## 3. Test it

**Send a test email directly**, without going through the queue, so that any SMTP error appears
on screen:

```bash
php artisan tinker --execute="Mail::raw('SMTP test from Ecommerce SaaS', fn (\$m) => \$m->to('you@example.com')->subject('SMTP test'));"
```

No output means the SMTP server accepted the message. An error such as
`Connection could not be established` or `Failed to authenticate` points to the host, port or
password.

**Then test the queued path.** Sign up for a test store at `https://yourdomain.com/start-your-store`
with an address you can read. The verification email is sent by the worker, so it also shows
whether the worker can send. If it does not arrive:

```bash
php artisan queue:failed           # mail jobs that failed, with the error
journalctl -u saas-queue -n 50     # worker log (systemd); use the Supervisor log otherwise
tail -n 50 storage/logs/*.log
```

Fix the cause, then send the failed emails again with `php artisan queue:retry all`.

::: warning Emails that failed before you switched to SMTP
A queued email keeps the name of the mailer that was active when it was queued. If emails failed
while the platform was still on `sendmail`, `queue:retry` sends them through `sendmail` again and
they fail again. Retry only works for emails that failed after the SMTP settings were in place,
for example after a password change.
:::

::: tip Preflight does not prove delivery
`php artisan tenancy:preflight` shows the mailer actually in use. It fails when mail is set to
`log` or `array` with signup verification on, and when it is set to `sendmail` on a server with
no sendmail binary. It does not connect to your SMTP server, so always send a real test email
after any change.
:::

## Choosing a mailbox

- **Hosting or business mailbox** (cPanel mail, Microsoft 365, Google Workspace, a domain email
  plan). This works for a start. These plans have sending limits, often a few hundred emails per
  hour or per day. Every store shares that limit, so a busy platform hits it quickly. When the
  limit is reached, emails fail and appear in `queue:failed`.
- **Transactional email service** (Amazon SES, Mailgun, Postmark, Brevo, Resend, SendGrid). These
  services are built for volume and give delivery reports. All of them offer SMTP credentials,
  so the setup above stays the same. Only the host, port, username and password change.

For your emails to reach the inbox instead of the spam folder, the sender domain needs **SPF**,
**DKIM** and **DMARC** DNS records. Your mail provider gives you the values.

## Changing the mailbox password

When you change the mailbox password, the platform stops sending email until `.env` has the new
one:

1. Update `MAIL_PASSWORD` in `.env`.
2. Run `php artisan config:clear` and `php artisan queue:restart`.
3. Send the test email from step 3.

Emails that failed in the meantime appear in `php artisan queue:failed`, and
`php artisan queue:retry all` sends them again.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Nothing is sent. Logs show `sendmail` errors, or preflight fails on `sendmail binary exists` | `CMS_ENABLE_EMAIL_CONFIGURATION_FROM_ADMIN_PANEL=false` is missing, so `MAIL_MAILER=smtp` is ignored. Add the line, then clear the config cache and restart the worker |
| The test command works but signup emails never arrive | The worker is not running or still has the old settings. Run `php artisan queue:restart`, then check `php artisan queue:failed` |
| `Failed to authenticate on SMTP server` | Wrong username or password, or the provider needs an app password (Microsoft 365, Gmail) |
| `Connection could not be established` / timeout | Wrong host or port, or the VPS provider blocks that port. Use 587, and check the firewall allows outgoing traffic on it |
| `Sender address rejected` | `MAIL_FROM_ADDRESS` is not an address the SMTP account may send as. Use the mailbox address |
| Emails arrive in spam | Add SPF, DKIM and DMARC records for the sender domain |
| Some emails fail at busy times | The mailbox's sending limit was reached. Move to a transactional email service |
