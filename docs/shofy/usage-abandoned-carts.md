# Abandoned Carts

The abandoned cart recovery feature helps you recover lost sales by automatically sending reminder emails to customers who add items to their cart but don't complete their purchase.

## Overview

When enabled, the system:

1. **Tracks cart activity** - Records cart contents when customers add items
2. **Detects abandonment** - Identifies carts that remain unpurchased
3. **Sends email reminders** - Automatically sends up to 3 reminder emails at configurable intervals
4. **Tracks recovery** - Monitors click-through and recovery rates

## Enable Abandoned Cart Tracking

Navigate to `Ecommerce` -> `Settings` -> `Abandoned Carts` in the admin panel.

Toggle **Enable abandoned cart tracking** to activate the feature.

::: warning
This feature requires a properly configured cronjob to work. Ensure your cronjob is set up before enabling. See [Setup Cronjob](https://docs.botble.com/shofy/cronjob.html) for instructions.
:::

## Configuration Options

### Email Reminders

When **Send email reminders** is enabled, the system sends up to 3 automated emails:

| Email | Default Delay | Purpose |
|-------|---------------|---------|
| Email #1 | 1 hour | Friendly reminder |
| Email #2 | 24 hours | Follow-up nudge |
| Email #3 | 72 hours | Last chance / urgency |

You can configure:

- **Maximum reminder emails** (1-3) - How many emails to send per abandoned cart
- **Email timing** - Hours after abandonment for each email

### Cleanup Settings

- **Cleanup old carts after** - Days to keep abandoned cart records (default: 30 days)

## Email Templates

The system includes 3 distinct email templates with different tones:

1. **Reminder #1** (Blue theme) - Friendly "Did you forget something?" message
2. **Reminder #2** (Yellow theme) - "Your items are waiting" follow-up
3. **Reminder #3** (Red theme) - "Last chance" urgency message

### Customizing Email Templates

To customize the email templates:

1. Go to `Settings` -> `Email`
2. Find the **Ecommerce** section
3. Look for templates starting with `abandoned_cart_reminder_`

Each template supports these variables:

| Variable | Description |
|----------|-------------|
| `{{ customer_name }}` | Customer's name or "Guest" |
| `{{ product_list }}` | HTML table of cart items |
| `{{ cart_total }}` | Formatted total amount |
| `{{ cart_recover_url }}` | Link to restore the cart |
| `{{ unsubscribe_url }}` | Opt-out link |

## Cart Recovery Flow

When a customer clicks the recovery link in an email:

1. Their previous cart is restored automatically
2. They're redirected to the cart page
3. A success message confirms restoration
4. The click is tracked for analytics

## Unsubscribe Handling

Each email includes an unsubscribe link. When clicked:

- Customer is shown a confirmation page
- No further abandoned cart emails are sent to that email address
- Existing customers can also opt-out via account settings

## Analytics & Statistics

The abandoned carts table shows key metrics:

- **Total abandoned carts** - All tracked carts
- **Recovery rate** - Percentage of carts that completed purchase
- **Click rate** - Percentage of emails that received clicks
- **Revenue recovered** - Total value of recovered orders

## Cronjob Command

The abandoned cart system uses this command:

```bash
php artisan cms:check-abandoned-carts
```

This command:
- Checks for carts needing reminder emails
- Sends emails according to the configured sequence
- Respects opt-out preferences

To cleanup old carts:

```bash
php artisan cms:check-abandoned-carts --cleanup
```

Or with custom retention days:

```bash
php artisan cms:check-abandoned-carts --cleanup --cleanup-days=60
```

## Troubleshooting

### Emails not being sent

1. **Check cronjob status** - The settings page shows if cronjob is running
2. **Verify email configuration** - Test email sending in `Settings` -> `Email`
3. **Check email templates** - Ensure templates are enabled in email settings
4. **Review cart data** - Carts need an email address to receive reminders

### Cart not being tracked

- Ensure **Enable abandoned cart tracking** is ON
- Customer must add items to cart (empty carts aren't tracked)
- Guest customers are tracked by session; logged-in customers by account

### Recovery link not working

- Links expire after 30 days
- Already-recovered carts won't restore again
- Products must still be in stock

## Best Practices

1. **Set appropriate delays** - Email #1 at 1 hour catches fresh abandonment; Email #3 at 72 hours creates urgency

2. **Keep templates concise** - Focus on the cart contents and a clear call-to-action

3. **Monitor metrics** - Track recovery rate to optimize timing and messaging

4. **Respect opt-outs** - The unsubscribe system is automatic; don't manually re-add customers

5. **Clean up regularly** - The cleanup command prevents database bloat from old records
