---
title: Vendor System
description: How to enable and manage vendors/dealers in Auxero.
---

# Vendor System

Auxero supports a multi-vendor marketplace where car dealers can register, list vehicles, manage bookings, and withdraw earnings.

## Enabling Vendor Registration

Go to `Admin Panel` -> `Settings` -> `General` and enable **Vendor Registration**.

Additional settings:

| Setting | Description |
|---|---|
| Allow vendor registration | Enables the public registration form |
| Auto-approve vendors | Approve vendors instantly without manual review |
| Commission rate (%) | Platform fee deducted from vendor earnings |
| Minimum withdrawal amount | Minimum balance required to request a payout |

## Vendor Registration Flow

1. Visitor clicks **Become a Vendor** on the frontend.
2. They fill in the registration form: name, email, store name, description, and logo.
3. If auto-approve is off, the account is set to `Pending` until an admin approves it.
4. Once approved, the vendor receives an email and can log in to the vendor dashboard.

## Approving Vendors

Go to `Admin Panel` -> `Vendors` -> `Vendors`.

- Filter by status: All, Pending, Approved, Rejected.
- Click a vendor to review their profile.
- Use the **Approve** or **Reject** buttons to update their status.

::: warning
Rejecting a vendor does not delete their account. You can re-approve them later if needed.
:::

## Vendor Dashboard Features

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

By default, vehicle listings created by vendors are published immediately. Enable **Require admin approval for vendor listings** in settings to add a moderation step.

## Booking Management for Vendors

Vendors see only the bookings for their own vehicles. They can:

- View booking details (customer name is shown, full contact details optional).
- Confirm or cancel bookings.
- Mark bookings as completed.
- Download invoices.

Vendors cannot access bookings for other vendors' vehicles.

## Earnings and Withdrawals

### Earnings

After a booking is marked **Completed**, the net amount (after platform commission) is credited to the vendor's balance.

Go to `Admin Panel` -> `Vendors` -> `Earnings` to view a full transaction log for all vendors.

### Withdrawals

Vendors request withdrawals from their dashboard. Requests appear in `Admin Panel` -> `Vendors` -> `Withdrawals`.

| Status | Description |
|---|---|
| Pending | Request submitted, awaiting admin action |
| Approved | Admin has approved and processed the payout |
| Rejected | Request denied (admin can add a reason) |

Process a withdrawal by reviewing the request and updating the status to **Approved** after sending the funds manually.

## Vendor Verification

To add a verification badge to a vendor:

1. Go to `Admin Panel` -> `Vendors` -> `Vendors`.
2. Open the vendor profile.
3. Toggle the **Verified** status.

Verified vendors display a badge on their store page and listings.
