---
title: Troubleshooting
description: Common issues with the KYC Verification plugin and how to fix them.
---

# Troubleshooting

Fixes for the most common issues encountered during install, integration, and day-to-day operation.

## Installation

### "Plugin failed to activate"
Cause: missing `plugins/ecommerce` or wrong Botble core version.

Fix:
1. Check `plugin.json` — minimum core is `7.3.0`.
2. Verify `plugins/ecommerce` is active: `php artisan cms:plugin:list`.
3. Clear caches: `php artisan config:clear && php artisan cache:clear && php artisan route:clear`.

### "Migration failed — table already exists"
Cause: you deactivated the plugin and re-activated without the idempotent migration guards.

Fix: the plugin's migrations are idempotent by design. If you hit this, you're likely on a beta version. Update to the latest release, or manually drop the `kyc_*` tables and re-activate.

## Customer flow

### "KYC Verification link doesn't appear on the dashboard"
Checklist:
1. `setting('kyc_customer_enabled')` is `true`.
2. The theme view actually includes the `@if (setting(...))` block from the [Ecommerce Integration](./integration/ecommerce.md) guide.
3. Config cache is fresh: `php artisan config:clear`.
4. You are logged in as a customer, not as an admin.

### "Cannot upload file — validation failed"
The plugin accepts **JPEG, PNG, WebP, PDF** up to **5 MB per file**. Configure via `config/kyc.php → mime_types` and `max_file_size_kb`.

Common causes:
- File is a HEIC photo from iOS — re-export as JPEG
- File exceeds 5 MB — compress first
- Upload size exceeds PHP's `upload_max_filesize` or `post_max_size` — increase in `php.ini`

### "Signed URL returns 403"
Signed URLs expire after 15 minutes. If the customer leaves the page open and clicks a file preview 20 minutes later, the URL is stale.

Fix: refresh the page — the detail view regenerates signed URLs on render.

### "The form keeps redirecting to the locked page"
The subject has been auto-locked after reaching `kyc_max_rejections_before_lock` (default 3). An admin must click **Unlock** on the submission detail page. See [Lockout & Unlock](./usage/lockout.md).

## Admin panel

### "Admin review queue is empty"
Checklist:
1. The review queue uses server-side DataTables — make sure your browser isn't blocking the AJAX POST (check the Network tab).
2. Permission `kyc.submissions.view` is granted to your role.
3. No active status/subject type filters.

### "I can't click the Approve button"
Your admin role lacks `kyc.submissions.approve`. Edit the role in **Admin → Roles & Permissions** and tick the permission.

### "Email notifications aren't sending"
1. Test mail via **Admin → Settings → Email** → Send test email.
2. Check `storage/logs/laravel.log` for delivery errors.
3. If using `MAIL_MAILER=log`, emails are written to the log file instead of sent — set a real SMTP driver for production.

## Scheduler

### "Rejected submissions never get purged"
Cause: cron is not running, or `schedule:run` is not registered.

Fix:
```bash
# Verify the cron entry exists
crontab -l | grep schedule:run

# Expected:
# * * * * * cd /var/www/site && php artisan schedule:run >> /dev/null 2>&1

# Check scheduled commands are registered
php artisan schedule:list | grep kyc
```

If the schedule list is empty, clear the config cache and retry: `php artisan config:clear`.

### "The `kyc:cleanup` command errors on disk delete"
Cause: the `storage/app/private/kyc/` directory is not writable by the user running the command.

Fix:
```bash
sudo chown -R www-data:www-data storage/app/private/kyc/
sudo chmod -R 750 storage/app/private/kyc/
```

## Webhooks

### "Webhook receiver gets 401 on signature verification"
The body must be hashed **raw** — any whitespace normalisation or middleware that parses-then-re-serialises the body will break the signature.

In Laravel:
```php
// Correct:
$body = $request->getContent();

// WRONG:
$body = json_encode($request->all());
```

### "Webhooks never fire"
1. Check `kyc_webhook_url` is configured (or the legacy `kyc_webhook_secret`).
2. Verify the queue worker is running: `ps aux | grep queue:work`.
3. Tail logs: `tail -f storage/logs/laravel.log | grep webhook`.
4. Use the **Send test payload** button on the admin Webhooks page.

## License

### "Purchase code marked as invalid"
1. Copy the full code from the Envato PDF (not from the license page HTML).
2. Trim trailing spaces.
3. Verify your server can reach `api.envato.com` outbound.

### "License already activated on another domain"
Deactivate on the old domain first (**Admin → KYC → Settings → Deactivate**) or contact support for a reset.

## Still stuck?

- Read the [FAQ](./faq.md) for design-intent questions.
- Check the [Changelog](./changelog.md) — the issue may have been fixed in a later release.
- Open a ticket on [botble.ticksy.com](https://botble.ticksy.com) with your Envato purchase code and a screenshot.

## Next step

- [FAQ](./faq.md) — design decisions and common questions
- [Changelog](./changelog.md) — release history
