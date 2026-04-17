---
title: Hotel Integration
description: SMS for hotel and room booking confirmations and reminders.
---

# Hotel Integration

Send SMS for hotel and room reservations, check-in reminders, and guest communications.

## What fires SMS

| Event | SMS Template | Recipient | When |
|-------|---|---|---|
| **Booking Confirmation** | `hotel.booking_confirmed` | Guest phone | Reservation created |
| **Booking Status Update** | `hotel.booking_status` | Guest phone | Booking status changes |
| **Check-in Reminder** | `hotel.checkin_reminder` | Guest phone | 24 hours before arrival |
| **Check-in Instructions** | `hotel.checkin_instructions` | Guest phone | On arrival date with room details |

## Configuration

### Step 1 — Enable hotel SMS

1. Go to **Admin → Settings → SMS Gateways**
2. Under **Subjects**, check **Hotel** to enable
3. Click **Save**

### Step 2 — Create templates

1. Go to **Admin → SMS Gateways → Templates**
2. Create templates for each event above

## Template variables

### Booking Confirmation

Available in `hotel.booking_confirmed` template:

- `{guest_name}` — guest full name
- `{hotel_name}` — hotel name
- `{room_type}` — room category (e.g., "Deluxe Double")
- `{booking_id}` — booking reference
- `{check_in}` — check-in date (YYYY-MM-DD)
- `{check_out}` — check-out date
- `{nights}` — number of nights
- `{total}` — total cost
- `{shop_name}` — booking platform name

Example:

```
{guest_name}, booking confirmed at {hotel_name}. {room_type} for {nights} nights from {check_in}. Total: {total}.
```

### Booking Status Update

Available in `hotel.booking_status` template:

- `{guest_name}`
- `{hotel_name}`
- `{booking_id}`
- `{old_status}` — previous status (e.g., "pending")
- `{new_status}` — new status (e.g., "confirmed", "checked_in")
- `{shop_name}`

Example:

```
{guest_name}, your {hotel_name} booking #{booking_id} is {new_status}.
```

### Check-in Reminder

Available in `hotel.checkin_reminder` template:

- `{guest_name}`
- `{hotel_name}`
- `{check_in}` — arrival date
- `{booking_id}`
- `{room_type}`
- `{shop_name}`

Example:

```
{guest_name}, reminder: checking in to {hotel_name} tomorrow! {room_type} reserved. See you soon.
```

### Check-in Instructions

Available in `hotel.checkin_instructions` template:

- `{guest_name}`
- `{hotel_name}`
- `{room_number}` — assigned room number
- `{room_type}`
- `{check_in_time}` — check-in time (HH:MM)
- `{check_out}` — checkout date
- `{address}` — hotel address
- `{shop_name}`

Example:

```
Welcome {guest_name}! Room {room_number} ready. Address: {address}. Checkout: {check_out}. Enjoy your stay!
```

## Guest Consent

When sending SMS to guests:

1. System checks if guest phone is opted out
2. If yes, SMS is not sent
3. If no, SMS is sent

Guests can opt-out by replying **STOP** to any SMS.

Admins can manage consent in **Admin → SMS Gateways → Consents**.

## Delivery logs

Monitor SMS in **Admin → SMS Gateways → Delivery Logs**:

1. Filter by **Subject** = "Hotel"
2. See all guest SMS
3. Check status and retry failed SMS

## Troubleshooting

### SMS not being sent

1. Check **Hotel** is enabled in SMS settings
2. Verify phone is not opted out
3. Check SMS driver is configured and active
4. Look in **Delivery Logs** for errors

## Next step

See [Driver Setup](../drivers/twilio.md) to configure your first SMS provider.
