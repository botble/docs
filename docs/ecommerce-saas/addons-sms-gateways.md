---
title: SMS Gateways Add-on
description: Transactional SMS, OTP and templated messages through several SMS providers, configured per store.
---

# SMS Gateways

SMS sending for each store: transactional messages, one-time passwords (OTP) and
templated messages, through the store's own SMS provider account. Built-in drivers:
Twilio, Vonage, AWS SNS, Plivo, Msg91, Fast2SMS, BulkSMSBD and eSMS.vn, plus custom HTTP
drivers.

## SaaS setup

**Minimum version:** SMS Gateways 1.0.36+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `sms-gateways`, then enter the purchase code once in **Operator console → Add-ons**.

### Queue worker

SMS are queued on a queue named **`sms-gateways`**, not `default`. Add it to your worker,
or messages are never sent:

```bash
php artisan queue:work --queue=default,sms-gateways --tries=1 --timeout=900
```

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-sms-gateways` |
| Route name prefixes | `sms-gateways.`, `smsg.`, `api.sms-gateways.` |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

Provider delivery-report webhooks (`/sms-gateways/webhooks/*` — Twilio, Vonage, AWS SNS,
Plivo, Fast2SMS, eSMS.vn)
and the OTP API (`/api/v1/sms-gateways/otp/*`) sit outside the `web` route group. The
platform attaches store identification to them through the add-on contract, so each
call reaches the right store's database. Point each store's provider callbacks at that
store's own domain.

### Per-store configuration

Each store configures SMS under **SMS Gateways → SMS Gateways Settings**: the master
switch, default and fallback driver, driver credentials, default country, send limits,
OTP rules (length, lifetime, attempts, checkout and order-tracking OTP) and abandoned-cart
reminders. Other screens: **Delivery Logs**, **SMS Templates**, **SMS Consents**,
**Country Routes**, **Custom Drivers** and **SMS Webhooks**.

On the platform, a custom HTTP driver or webhook URL pointing at a private, loopback,
link-local or cloud metadata address is refused.

### Scheduled tasks

| Command | Declared schedule | Runs on |
|---|---|---|
| `sms:heartbeat` | Every minute | `tenancy:schedule --frequency=everyFiveMinutes` |
| `sms:retry` | Every five minutes | `tenancy:schedule --frequency=everyFiveMinutes` |
| `sms:status-poll` | Every fifteen minutes, when polling is on | `tenancy:schedule --frequency=everyFiveMinutes` |
| `sms:recover-abandoned-carts` | Every fifteen minutes, when abandoned-cart SMS is on | `tenancy:schedule --frequency=everyFiveMinutes` |
| `sms:purge` | Daily 03:00 | `tenancy:schedule --frequency=hourly` |

## Features

- Multiple drivers with a fallback driver and per-country routes
- OTP, including an optional OTP step at checkout and on order tracking
- SMS templates
- Delivery logs with retry of failed sends and status polling
- Consent records
- Abandoned-cart SMS reminders
- Outbound webhooks on SMS events

## Troubleshooting

### SMS are never sent

**Cause:** The worker does not process the `sms-gateways` queue, the store has not entered
provider credentials, or the master switch is off.

**Fix:** Add `sms-gateways` to the worker's `--queue` list, then have the store owner check
**SMS Gateways → SMS Gateways Settings**.

### Provider credentials rejected

**Cause:** Wrong API keys, or the provider account is inactive.

**Fix:** Have the store owner verify the keys and account status with their SMS provider.

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Cron jobs](./cronjob.md) — queue worker and `tenancy:schedule` lines
