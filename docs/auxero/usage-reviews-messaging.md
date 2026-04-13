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
| Star | Star rating from 1 (poor) to 5 (excellent) |
| Content | Review text from the customer |
| Car | The vehicle being reviewed |
| Customer | Who wrote the review |
| Status | `Published`, `Draft`, or `Pending` |

## Enabling Reviews

Reviews are controlled by a single feature toggle. Go to `Admin Panel` -> `Car Manager` -> `Settings` -> `Review` and enable **Enable review**.

Customers can only review cars they have actually booked, and only after the booking is `Completed`.

## Moderation

To moderate reviews:

1. Go to `Admin Panel` -> `Car Manager` -> `Reviews`.
2. Open a review.
3. Change its status to `Published` to make it visible, or `Draft` / `Pending` to hide it.

::: tip
Use the checkbox selection and the bulk **Change Status** action to publish or hide reviews in batch.
:::

## Star Ratings Display

The average star rating for each car is calculated from all published reviews. It is shown on the car listing card, the car detail page, and in search results.

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

Go to `Admin Panel` -> `Car Manager` -> `Messages`.

Admin can view all conversations across all vendors and customers.

| Column | Description |
|---|---|
| Car | The vehicle the conversation is about |
| Customer | Who initiated the message |
| Vendor | The receiving party |
| Last Message | Preview of the most recent message |
| Status | `Read` or `Unread` |

Click a conversation to read the full thread. Admin can reply on behalf of any party.

### Vendor Message Management

Vendors manage their messages from the vendor dashboard. They can:

- Read and reply to customer enquiries.
- See the car listing associated with each conversation.

Vendors only see messages related to their own listings.
