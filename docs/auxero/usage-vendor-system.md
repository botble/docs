---
title: Vendor System
description: How to enable and manage vendors/dealers in Auxero.
---

# Vendor System

Auxero supports a multi-vendor marketplace where car dealers can register, list vehicles, manage bookings, and withdraw earnings.

## Enabling the Vendor System

Go to `Admin Panel` -> `Car Manager` -> `Settings` -> `General` and enable **Enable multi-vendor**.

Related settings:

| Setting | Description |
|---|---|
| Enable multi-vendor | Allows visitors to register as vendors and list their cars |
| Enable post approval | Vendor-submitted cars require admin approval before being published |
| Default commission fee | Platform commission applied to vendor earnings |
| Commission fee type | `Percentage` or `Fixed` amount |
| Enable commission per category | Use category-specific commissions instead of the default |

## Vendor Registration Flow

1. Visitor opens the registration form on the frontend.
2. They fill in: name, email, password, phone (optional), date of birth (optional), and tick **Register as vendor**.
3. The account is created with `is_vendor = true`. Vendors can sign in to the vendor dashboard immediately.
4. Vendor-submitted cars are auto-published unless **Enable post approval** is on, in which case they require admin moderation.

## Managing Vendors

Go to `Admin Panel` -> `Car Manager` -> `Vendors`.

From the vendor list you can:

- Open a vendor profile to review their information and listings.
- **Verify** a vendor to display a verification badge on their store and listings.
- **Unverify** to remove the badge.
- **Block** a vendor to prevent them from listing or receiving bookings.
- **Unblock** to restore access.

::: tip
Blocking a vendor does not delete their account or existing listings — it only prevents new activity. You can unblock them at any time.
:::

## Vendor Dashboard Features

![Vendor dashboard](./images/vendor-dashboard.jpg)

Vendors access their dashboard at `/vendor/dashboard` after logging in.

| Section | Description |
|---|---|
| Dashboard | Overview of earnings, bookings, and recent activity |
| Vehicles | Add, edit, and manage their own car listings |
| Bookings | View and manage bookings for their vehicles |
| Earnings | Revenue summary with per-booking breakdown |
| Withdrawals | Request payouts to their bank or payment account |
| Reviews | See customer reviews left on their vehicles |
| Messages | Chat with customers |
| Settings | Update store name, logo, description, and payout info |

## Vehicle Listing Management

Vendors can create and manage their own car listings from the vendor dashboard. The fields available to vendors are the same as admin (see [Car Management](./usage-car-management.md)).

::: tip
Admin can restrict which fields vendors can edit by configuring permissions in `Admin Panel` -> `Settings` -> `Vendor`.
:::

By default, vehicle listings created by vendors are published immediately. Enable **Enable post approval** in `Car Manager` -> `Settings` -> `General` to add a moderation step before publishing.

## Booking Management for Vendors

Vendors see only the bookings for their own vehicles. They can:

- View booking details (customer name is shown, full contact details optional).
- Update booking status (e.g. move from Pending to Processing or Cancelled).
- Mark bookings as Completed.
- Download invoices.

Vendors cannot access bookings for other vendors' vehicles.

## Earnings and Withdrawals

### Earnings

After a booking is marked **Completed**, the net amount (after platform commission) is credited to the vendor's balance. Vendors view their balance and per-booking breakdown from `Vendor Dashboard` -> `Earnings`.

### Withdrawals

Vendors request withdrawals from their dashboard. Requests appear in `Admin Panel` -> `Car Manager` -> `Withdrawals`.

| Status | Description |
|---|---|
| Pending | Request submitted, awaiting admin action |
| Processing | Admin is preparing the payout |
| Completed | Payout has been sent |
| Canceled | Withdrawal cancelled |
| Refused | Request rejected by admin |

Process a withdrawal by reviewing the request and updating the status to **Completed** after sending the funds manually.

## Vendor Verification

Verified vendors display a badge on their store page and listings. To verify a vendor:

1. Go to `Admin Panel` -> `Car Manager` -> `Vendors`.
2. Open the vendor profile.
3. Click **Verify**. Click **Unverify** to remove the badge.
