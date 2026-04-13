---
title: Reviews & Messaging
description: Managing customer reviews, ratings, and customer-vendor messaging in Auxero.
---

# Reviews & Messaging

## Customer Review System

Customers can leave a review after a booking is marked **Completed**. Each review includes a star rating (1–5) and a written comment.

Go to `Admin Panel` -> `Car Manager` -> `Reviews` to manage all reviews.


### Review Fields

| Field | Description |
|---|---|
| Rating | Star score from 1 (poor) to 5 (excellent) |
| Title | Optional short summary from the customer |
| Comment | Full review text |
| Car | The vehicle being reviewed |
| Customer | Who wrote the review |
| Status | `Approved`, `Pending`, or `Rejected` |

## Review Moderation

By default, reviews are set to `Pending` and must be approved before they appear publicly.

To change this behavior, go to `Admin Panel` -> `Settings` -> `Reviews` and enable **Auto-approve reviews**.

### Approving or Rejecting Reviews

1. Go to `Admin Panel` -> `Car Manager` -> `Reviews`.
2. Click a review to open its detail page.
3. Set the status to `Approved` to publish or `Rejected` to hide it.

::: tip
You can bulk-approve reviews using the checkbox selection and the **Change Status** bulk action on the review list.
:::

::: warning
Rejected reviews are hidden from the frontend but remain in the database. They can be re-approved at any time.
:::

## Star Ratings Display

The average star rating for each car is calculated from all approved reviews. It is shown:

- On the car listing card.
- On the car detail page.
- In search results and filters.

Customers can filter search results by minimum rating (e.g. 4 stars and above).

## Review Scores in Filters

The search/filter bar on the frontend includes a **Minimum Rating** filter. This uses the aggregated approved review score stored per car. No additional configuration is required — the score updates automatically when a review is approved or removed.

---

## Customer-Vendor Messaging

Auxero includes an in-platform messaging system that allows customers to send questions to vendors (or to the admin for non-vendor listings).

### How It Works

1. Customer opens a car detail page.
2. Customer clicks **Contact Vendor** (or **Contact Us** for admin-owned listings).
3. They type and send a message.
4. The vendor receives a notification email and sees the message in their dashboard under **Messages**.
5. Vendor replies from the dashboard; the customer receives an email notification.

### Managing Messages in Admin

Go to `Admin Panel` -> `Messages`.

Admin can view all conversations across all vendors and customers.

| Column | Description |
|---|---|
| Subject / Car | The vehicle the conversation is about |
| Customer | Who initiated the message |
| Vendor | The receiving party |
| Last Message | Preview of the most recent message |
| Status | `Open` or `Closed` |

Click a conversation to read the full thread. Admin can reply on behalf of any party or close the conversation.

::: tip
Enable **Email notifications for new messages** in `Admin Panel` -> `Settings` -> `Notifications` to ensure vendors are alerted promptly.
:::

### Vendor Message Management

Vendors manage their messages from the vendor dashboard at `/vendor/messages`. They can:

- Read and reply to customer enquiries.
- Close conversations once resolved.
- See the car listing associated with each conversation.

Vendors only see messages related to their own listings.
