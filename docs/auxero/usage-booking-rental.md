---
title: Booking & Rental System
description: How the booking system works, managing bookings, dynamic pricing, and add-ons.
---

# Booking & Rental System

Auxero includes a date-based rental booking system. Customers select pickup/return dates, choose add-ons, and pay online or offline.

## How Bookings Work

1. Customer browses cars and opens a car detail page.
2. Customer selects pickup date, return date, and pickup location.
3. System calculates the total price (base rate × days + add-ons + taxes − coupons).
4. Customer proceeds to checkout and completes payment.
5. A booking confirmation is sent by email.

## Booking Statuses

| Status | Description |
|---|---|
| Pending | Booking submitted, awaiting payment or admin/vendor action |
| Processing | Booking is being processed (paid or in progress) |
| Completed | Rental period has ended |
| Cancelled | Booking was cancelled by customer, vendor, or admin |

## Managing Bookings in Admin

Go to `Admin Panel` -> `Car Manager` -> `Bookings`.


From the booking list you can:

- Filter by status, date range, car, or customer.
- View booking details: customer info, car, dates, price breakdown, payment status.
- Change booking status manually.
- Generate and download the invoice PDF.
- Send notification emails to the customer.

### Booking Detail Page

The detail page shows:

- Customer name, email, phone.
- Car assigned to the booking.
- Pickup and return dates and location.
- Add-ons selected.
- Price breakdown (base, add-ons, tax, coupon discount, total).
- Payment method and transaction reference.

::: tip
Update a booking's status from the booking detail page. Moving it to `Processing` or `Completed` triggers the corresponding customer notification email.
:::

## Dynamic Pricing

Set custom prices for specific dates or date ranges using the pricing calendar.

Go to `Admin Panel` -> `Car Manager` -> `Cars` -> Edit a car -> `Pricing` tab.

- Click a date on the calendar to set a custom daily rate for that date.
- Set a date range to apply the same rate across multiple days.
- Custom date prices override the base price for that day.
- Leave a date without a custom price to fall back to the car's base price.

::: warning
Dynamic pricing is applied at the time the customer views the car. If you update prices after a booking is made, existing bookings are not affected.
:::

## Service Add-ons

Add-ons are optional extras customers can select during checkout (e.g. GPS, Child Seat, Additional Driver).

Go to `Admin Panel` -> `Car Manager` -> `Services`.

| Field | Description |
|---|---|
| Name | Display name of the add-on |
| Price | Cost per booking (flat fee) |
| Description | Short description shown at checkout |
| Status | Enable or disable the add-on |

## Booking Completion Flow

1. When the rental period ends, set the booking status to `Completed`.
2. The system notifies the customer and prompts them to leave a review.
3. Vendor earnings are updated after completion (if vendor system is enabled).
4. Invoices remain accessible from the booking detail page.
