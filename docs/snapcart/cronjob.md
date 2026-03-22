# Setup Cronjob

Cronjobs are required for scheduled tasks like sending newsletter emails, cleaning up expired data, and processing
recurring operations.

## Setting Up

Add the following cron entry to your server:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Replace `/path-to-your-project` with the actual path to your SnapCart installation.

## On Shared Hosting (cPanel)

1. Log in to cPanel
2. Go to `Cron Jobs`
3. Set the interval to `Once Per Minute (* * * * *)`
4. Enter the command: `cd /home/username/public_html && php artisan schedule:run >> /dev/null 2>&1`
5. Click `Add New Cron Job`

## Scheduled Tasks

The cronjob handles:

- Newsletter email queue processing
- Sitemap generation
- Cache cleanup
- Abandoned cart reminders
- Flash sale expiration checks
- Analytics data collection

::: warning
The cronjob must run every minute for all scheduled tasks to work correctly. Some hosting providers may
limit cron frequency.
:::
