---
title: Email Notifications
description: Affiliate Pro email templates and the weekly performance digest.
---

# Email Notifications

Affiliate Pro sends emails for every important event. Edit them in **Settings → Email templates**, section **Affiliate Pro Emails**. You can change the subject and content, use variables such as `{{ customer_name }}` or `{{ commission_amount }}`, or turn a template off to stop sending that email.

## Templates

| Template | Sent to | When |
|----------|---------|------|
| New Affiliate Application Submitted | Admin | A customer applies to become an affiliate |
| Affiliate Application Approved | Affiliate | You approve an application (or it is auto-approved) |
| Affiliate Application Rejected | Affiliate | You reject an application — includes your rejection reason |
| New Commission Earned | Affiliate | A commission is approved (automatically or by you) |
| New Withdrawal Request | Admin | An affiliate requests a payout |
| Withdrawal Request Approved | Affiliate | You approve a payout |
| Withdrawal Request Rejected | Affiliate | You reject a payout — includes your reason, if given |
| Affiliate Account Banned | Affiliate | You ban the affiliate |
| Affiliate Account Reinstated | Affiliate | You unban the affiliate |
| Weekly Affiliate Performance Digest | Affiliate | Weekly summary (see below) |

Admin emails go to the **Admin email** address set in **Settings → General**.

## Weekly Performance Digest

Every **Monday at 08:00** each approved affiliate receives a summary of the last 7 days: earnings, new commissions, clicks, conversion rate, current balance, top products and traffic sources.

Requirements:

- The server [cron job](/cms/cronjob) must be running.
- The **Weekly Affiliate Performance Digest** template must be enabled.

Send it manually (for example, to test):

```bash
php artisan affiliate:send-digest --force
```

`--force` skips the check that stops the digest from being sent twice within 6 days.

::: tip
Not receiving emails? Send a test email from **Settings → Email** to confirm your mail settings work.
:::
