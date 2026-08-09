---
title: Reports
description: What each metric counts, and when it is recorded
---

# Reports

**Popups → Reports** shows impressions, closes, clicks, conversions and conversion rate per popup, and per A/B variant.

![Reports](../images/12-admin-reports.png)

## What each metric counts

| Metric | Recorded when |
|---|---|
| **Impressions** | The popup is actually displayed to a visitor. A popup that was delivered but whose rules or frequency cap kept it hidden is not counted. |
| **Closes** | The visitor dismisses the popup. |
| **Clicks** | The visitor clicks an element with the `bp-cta` class in the popup content. |
| **Conversions** | The visitor completes the popup's goal: clicks a `bp-confirm` element, submits the built-in email capture form, or is marked converted through the [JS API](./shortcode-and-embed.md#javascript-api). |

Alongside the four counts, each row shows a **conversion rate**. Close rate, click-through rate and lift against the control are not columns in the table - work them out from the counts if you need them.

::: tip Why impressions are not page views
Impressions count displays, not deliveries. Counting every delivery would inflate the denominator and make conversion rate decay as the popup got more selective - the opposite of what you want to measure.
:::

## Date range and time zone

The report covers the **last 30 days** by default. There is no date picker on the page - set a different window with query parameters:

```
/admin/bb-popup/reports?start_date=2026-01-01&end_date=2026-01-31
```

Daily buckets use the **site** time zone, shown beneath the table, not the visitor's.

## Retention

Statistics older than the retention window set in [Settings](../configuration.md#analytics) are deleted each night. The default is 365 days.

Pruning runs through Laravel's scheduler. If the cron entry is not installed, nothing is deleted and the table grows - see [Installation](../installation.md#set-up-the-scheduler).

You can also prune manually:

```bash
php artisan bb-popup:prune-stats
```

## No data?

If the table is empty for a range you expect data in:

- Check the popup is **Published** and inside its start and end dates
- Widen the window with `start_date` / `end_date` - the default is only the last 30 days
- Confirm the popup is actually being displayed, using the checks in [Troubleshooting](../troubleshooting.md)
