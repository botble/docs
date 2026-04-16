---
title: Email Notifications
description: The three email notifications shipped by the KYC Verification plugin, and how to customise them.
---

# Email Notifications

The plugin ships three email notifications, all extending Laravel's `Notification` class and routed through the `mail` channel by default.

## The three notifications

| Notification class | Trigger | Recipient | Template |
|---|---|---|---|
| `KycSubmissionReceivedNotification` | New submission created | Admin email (`kyc_contact_email` or system admin) | `plugins/kyc::emails.submission-received` |
| `KycSubmissionApprovedNotification` | Admin approves a submission | The subject (customer or vendor) | `plugins/kyc::emails.submission-approved` |
| `KycSubmissionRejectedNotification` | Admin rejects a submission | The subject (customer or vendor) | `plugins/kyc::emails.submission-rejected` |

## Admin "received" email

Sent every time a customer or vendor submits a new KYC form.

Contents:
- Subject name
- Document type (badge)
- Submission type (customer / vendor)
- Direct link to the submission detail page in the admin panel

Delivered to `kyc_contact_email` if set, otherwise the system admin email from **Admin → Settings → General**.

## Approval email

Sent to the subject immediately after an admin clicks Approve.

Contents:
- Confirmation that KYC was approved
- CTA button linking to `kyc_dashboard_link_url` (falls back to the site home URL if unset)
- Approval date

## Rejection email

Sent to the subject immediately after an admin clicks Reject.

Contents:
- Notice that KYC was rejected
- **Rejection reason** (the note the admin entered)
- CTA button linking back to the submission form so the subject can resubmit
- Remaining attempts before lockout — e.g. "You have 2 attempts remaining before your account is temporarily locked."

## Customising email templates

All three notifications render via Botble's `EmailHandler` pipeline so you can edit them through the admin UI:

1. Go to **Admin → Settings → Email → Templates**.
2. Select the **KYC Verification** plugin from the product dropdown.
3. Edit any of the three templates:
   - `submission-received`
   - `submission-approved`
   - `submission-rejected`
4. Use template variables such as `{{ subject_name }}`, `{{ document_type }}`, `{{ review_note }}`, `{{ submission_url }}`, `{{ dashboard_url }}`.

Changes are persisted to `config/kyc.php`'s `email_templates` section and loaded on every render.

## Override notification classes

If you need to deliver via SMS, Slack, or push in addition to email:

```php
// In your AppServiceProvider::register()
$this->app->bind(
    \Botble\Kyc\Notifications\KycSubmissionApprovedNotification::class,
    \App\Notifications\MyKycApprovedNotification::class,
);
```

Then in your own notification class extend the plugin's class and override `via()`:

```php
class MyKycApprovedNotification extends KycSubmissionApprovedNotification
{
    public function via($notifiable): array
    {
        return ['mail', 'slack', 'vonage'];
    }
}
```

## Queueing

Notifications are not queued by default — they send synchronously so the admin sees immediate feedback after an approve/reject click. If your SMTP provider is slow, make the notification classes implement `ShouldQueue` in a subclass and bind via the container.

## Disabling emails

There is no admin switch to disable emails. If you need to suppress them (e.g. in a staging environment), set `MAIL_MAILER=log` in `.env` so emails are written to `storage/logs/laravel.log` instead.

## Next step

- [Retention & Expiry](./retention.md) — what happens to emailed data after retention
