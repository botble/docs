---
title: Ratings & Reviews
description: Manage customer ratings and product reviews
---

# Ratings & Reviews

Customers can rate and review products, providing feedback and social proof. Admins moderate reviews to maintain marketplace quality.

**Access:** Admin → Ratings & Reviews

## Customer Ratings

Customers rate products on a 5-star scale with an optional written review.

- **1 Star** — Poor quality, not recommended
- **2 Stars** — Below average, has issues
- **3 Stars** — Average, acceptable
- **4 Stars** — Good, mostly satisfied
- **5 Stars** — Excellent, highly recommended

Product pages display:
- **Average Rating** — Mean of all ratings
- **Rating Distribution** — Count of each star level
- **Recent Reviews** — Latest customer feedback

## Managing Reviews

### View All Reviews

1. Go to **Ratings & Reviews**
2. See list of all customer reviews with:
   - Product name and author
   - Customer name (or Anonymous)
   - Rating (stars)
   - Review text (truncated)
   - Status (Approved, Pending, Rejected)
   - Admin/author replies (if any)
   - Posted date

Filter by product, author, rating, or moderation status.

### Approve a Review

New reviews enter a **Pending** queue for moderation by default (optional setting).

1. Click a pending review
2. Read the full review text
3. Click **Approve**

The review becomes visible on the product page.

### Reject a Review

Remove a review that violates policies:

1. Click a review
2. Click **Reject**
3. Enter reason (optional; not shown to customer)
4. Click **Confirm**

The review is removed and hidden from the product page.

### Delete a Review

Permanently remove a review:

1. Click a review
2. Click **Delete**
3. Click **Confirm**

The review is removed; undo is not available.

## Review Replies

### Admin Reply to a Review

As an admin, respond to customer feedback:

1. Click a review
2. Scroll to **Replies**
3. Enter your message
4. Click **Post as Admin**

Your reply appears on the product page with an "Admin" label.

### Author Reply to a Review

Allow product authors to reply to reviews on their own products:

1. Click a review on the author's product
2. Scroll to **Replies**
3. See author reply option (if enabled in settings)
4. Author can post a response

Author replies help clarify product concerns and build customer trust.

## Review Moderation Status

| Status | Description | Action |
|--------|-------------|--------|
| **Approved** | Visible on product page | Keep, edit, or reject |
| **Pending** | Awaiting admin review | Approve or reject |
| **Rejected** | Hidden from product page | Restore or delete |

## Review Guidelines

Set expectations for review content to maintain quality:

- Reviews must be relevant to the product
- No spam or promotional content
- No personal attacks or insults
- No external links (except official product links)
- Constructive feedback is encouraged

Rejected reviews may violate these guidelines.

## Spam & Abuse Handling

### Identify Suspicious Reviews

Look for patterns indicating spam:

- Multiple 5-star reviews from the same account (may be fake)
- Reviews with promotional links or external URLs
- Low-quality text or gibberish
- Sudden spike in reviews (coordinated campaign)

### Take Action

1. Reject the suspicious review
2. If the reviewer has multiple spam reviews, consider reporting their account
3. Monitor for repeat offenders

## Moderation Settings (Admin)

In Admin → Settings → Marketplace:

- **`marketplace_enable_comment_notification`** — Send email notifications when reviews are posted (to author and admin)

Enable notifications to stay on top of feedback and respond quickly.

## Download Statistics

Each product tracks:

- **Total Downloads** — Aggregate count across all versions
- **Recent Downloads** — Download activity over time
- **Revenue** — Total earnings from paid products

This data helps authors understand product popularity and performance.

## Review Impact on Product Visibility

- Products with higher average ratings rank higher in search results
- Products with recent reviews signal active customer engagement
- A single 1-star review with a valid complaint can impact perceived quality

Encourage authors to respond professionally to negative reviews; this demonstrates care and builds confidence in other customers.

::: tip
Regular moderation of reviews maintains a trustworthy marketplace. Respond promptly to critical feedback and help resolve genuine customer issues.
:::

See [Virus Scanning](./virus-scanning.md) for product safety.
