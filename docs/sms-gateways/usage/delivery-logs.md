---
title: Delivery Logs
description: View, filter, retry, and export SMS delivery records.
---

# Delivery Logs

Track every SMS sent, its delivery status, and debug failed sends.

## Access logs

Go to **Admin → SMS Gateways → Delivery Logs**.

![Delivery logs list](./images/sms-logs-tab.png)

## Filter logs

| Filter | Options |
|--------|---------|
| **Date range** | Last 7 days, 30 days, custom range |
| **Status** | Queued, Sent, Delivered, Failed, Opted out |
| **Event type** | SMS, OTP |
| **Subject** | Ecommerce, Marketplace, Real Estate, Job Board, Car Manager, Hotel |
| **Driver** | Twilio, Vonage, AWS SNS, etc. |
| **Phone number** | Exact match or partial search |
| **Message ID** | Provider's tracking ID |

Export filtered results as CSV in **Admin → SMS Gateways → Delivery Logs → Export**.

## Log details

Click a log entry to see:

- **To**: Recipient phone number
- **From**: Sender ID
- **Body**: Full SMS text
- **Status**: Queued / Sent / Delivered / Failed / Opted out
- **Driver**: Which provider handled it
- **Cost**: Est. SMS units (1 SMS = 1 unit, multi-part = N units)
- **Sent at**: Timestamp
- **Delivered at**: Timestamp (if status = Delivered)
- **Error code**: Provider error (if status = Failed)
- **Error message**: Human-readable reason for failure
- **Message ID**: Provider's tracking reference

![Log detail view](./images/sms-log-detail.png)

## Retry failed SMS

1. Filter logs by **Status** = "Failed"
2. Select the SMS entry
3. Click **Retry**

The system re-queues the SMS through the same driver. It will be sent within 10 seconds.

**Note**: The customer will receive the SMS twice if the original actually succeeded but marked as failed.

## Statuses explained

| Status | Meaning |
|--------|---------|
| **Queued** | SMS accepted, waiting to send |
| **Sent** | Driver confirmed transmission to carrier |
| **Delivered** | Carrier confirmed delivery to phone |
| **Failed** | Driver rejected or carrier failed to deliver |
| **Opted out** | SMS blocked because phone is opted out |

Not all drivers report delivery confirmation. Twilio and Vonage do; AWS SNS does not. So "Sent" may be the final status for AWS.

## Common failure reasons

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid phone number` | Malformed number (missing country code) | Format as `+1-555-1234` |
| `Phone is opted out` | Customer sent STOP | Customer must send START to re-opt-in |
| `Authentication failed` | Wrong API credentials | Check driver credentials in Settings |
| `Account blocked` | Account closed or suspended at provider | Log in to provider dashboard to check |
| `Rate limit exceeded` | Too many SMS too fast | Wait a moment, retry later |
| `Delivery failed` | Carrier rejected (spam, invalid, etc.) | Message may be flagged as spam; try with different text |

## Auto-retry policy

Failed SMS are automatically retried:

- **Immediately** (within 10 seconds) for transient errors (rate limits, temp network failure)
- **After 1 hour** for persistent errors (auth, account suspended)
- **After 24 hours** for critical errors (invalid number, opted out)

Max 3 retry attempts. After that, status = "Failed" and manual retry is required.

## Bulk actions

Select multiple logs:

1. Click the checkboxes on the left
2. Choose action from the **Bulk actions** dropdown:
   - **Delete**: Remove logs (archive first if needed for compliance)
   - **Retry**: Re-send all selected failed SMS
   - **Export**: Download as CSV

## Purge old logs

To auto-delete logs older than 90 days, run:

```bash
php artisan sms:purge --days=90
```

This also runs nightly via scheduler. Purged logs cannot be recovered, so export first if needed for compliance.

## Monitoring via webhooks

For real-time delivery notifications, configure outbound webhooks in **Admin → SMS Gateways → Webhooks**. See [Outbound Webhooks](./outbound-webhooks.md) for details.

## Next step

See [Outbound Webhooks](./outbound-webhooks.md) to set up real-time delivery notifications to your backend.
