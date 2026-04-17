---
title: Car Manager Integration
description: SMS for car rental and sale booking confirmations.
---

# Car Manager Integration

Send SMS for car rental bookings, test drive requests, and sale confirmations.

## What fires SMS

| Event | SMS Template | Recipient | When |
|-------|---|---|---|
| **Booking Confirmation** | `car.booking_confirmed` | Customer phone | Car rental/purchase booking created |
| **Booking Status Update** | `car.booking_status` | Customer phone | Booking status changes |
| **Pickup Reminder** | `car.pickup_reminder` | Customer phone | 24 hours before pickup |
| **Test Drive Request** | `car.test_drive_request` | Dealer phone | Customer requests test drive |

## Configuration

### Step 1 — Enable car manager SMS

1. Go to **Admin → Settings → SMS Gateways**
2. Under **Subjects**, check **Car Manager** to enable
3. Click **Save**

### Step 2 — Create templates

1. Go to **Admin → SMS Gateways → Templates**
2. Create templates for each event above

## Template variables

### Booking Confirmation

Available in `car.booking_confirmed` template:

- `{customer_name}` — renter/buyer name
- `{car_model}` — vehicle model
- `{booking_id}` — booking reference
- `{pickup_date}` — pickup date (YYYY-MM-DD)
- `{pickup_time}` — pickup time (HH:MM)
- `{total}` — total cost
- `{shop_name}` — platform name

Example:

```
{customer_name}, your {car_model} booking #{booking_id} confirmed. Pickup: {pickup_date} at {pickup_time}.
```

### Booking Status Update

Available in `car.booking_status` template:

- `{customer_name}`
- `{booking_id}`
- `{old_status}` — previous status (e.g., "pending")
- `{new_status}` — new status (e.g., "confirmed", "ready")
- `{shop_name}`

Example:

```
{customer_name}, booking #{booking_id} is now {new_status}.
```

### Pickup Reminder

Available in `car.pickup_reminder` template:

- `{customer_name}`
- `{car_model}`
- `{booking_id}`
- `{pickup_date}`
- `{pickup_time}`
- `{location}` — pickup location
- `{shop_name}`

Example:

```
{customer_name}, reminder: pickup {car_model} tomorrow at {pickup_time} from {location}.
```

### Test Drive Request

Available in `car.test_drive_request` template:

- `{dealer_name}` — dealer/rental company
- `{customer_name}`
- `{car_model}`
- `{request_date}` — requested date
- `{request_time}` — requested time
- `{shop_name}`

Example:

```
{dealer_name}, {customer_name} requested test drive for {car_model} on {request_date} at {request_time}.
```

## Customer Consent

When sending SMS to customers:

1. System checks if customer phone is opted out
2. If yes, SMS is not sent
3. If no, SMS is sent

Customers can opt-out by replying **STOP** to any SMS.

Admins can manage consent in **Admin → SMS Gateways → Consents**.

## Delivery logs

Monitor SMS in **Admin → SMS Gateways → Delivery Logs**:

1. Filter by **Subject** = "Car Manager"
2. See all customer and dealer SMS
3. Check status and retry failed SMS

## Troubleshooting

### SMS not being sent

1. Check **Car Manager** is enabled in SMS settings
2. Verify phone is not opted out
3. Check SMS driver is configured and active
4. Look in **Delivery Logs** for errors

## Next step

See [Hotel Integration](./hotel.md) for hotel booking SMS.
