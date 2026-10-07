---
title: Managing Affiliates
description: Review affiliate applications, approve or reject them, ban affiliates and set custom commission rates.
---

# Managing Affiliates

## Review Applications

When a customer applies and **Auto Approve Affiliates** is off, the application goes to **Affiliate → Pending Requests**. The menu badge shows how many are waiting.

![Pending affiliate requests](./images/affiliate-pro-admin-pending-requests.png)

Click **View** to open an application:

![Pending request detail](./images/affiliate-pro-admin-pending-request-detail.png)

- **Approve** — the customer becomes an active affiliate and receives the *Application Approved* email.
- **Reject** — enter a reason (required, up to 400 characters). The customer receives the *Application Rejected* email with your reason, sees it on their Affiliate Program page, and can **re-apply** after fixing the issue. A re-application always comes back to **Pending Requests** for review, even when **Auto Approve Affiliates** is on.

## Affiliate List

**Affiliate → All Affiliates** lists every affiliate — whatever the status — with code, balance, total commission, total withdrawn and status. Use **Filters** or search to find an affiliate.

![All affiliates](./images/affiliate-pro-admin-affiliates-list.png)

## Affiliate Detail

Click the eye (**View**) icon in the list to open the detail page:

![Affiliate detail](./images/affiliate-pro-admin-affiliate-detail.png)

- **Stats** — balance, total commission, total withdrawn, conversion rate.
- **Affiliate link** — copy the affiliate's main link.
- **Tabs** — the affiliate's commissions, withdrawals and click tracking (IP, referrer, landing page, converted or not).
- **Quick actions** — ban, view all commissions or withdrawals.

## Edit an Affiliate

Click **Edit** on the detail page (or the pencil icon in the list) to change:

- **Affiliate code** — the value used in `?aff=` links. Changing it breaks links already shared.
- **Commission rate** — a personal base rate for this affiliate. Leave empty to use the default rate. Product and category rates still take priority — see [Which Rate Is Used?](./configuration.md#which-rate-is-used).
- **Member level** — assign a level manually (levels also upgrade automatically, see [Member Levels](./usage-member-levels.md)).

Balance, total commission and total withdrawn are shown read-only — they are maintained automatically from commissions and withdrawals. The status cannot be changed here either: use **Approve**, **Reject**, **Ban** and **Unban** so the right emails and checks run.

You can also create an affiliate for an existing customer with **Create** on the list page. Each customer can have only one affiliate account.

## Delete an Affiliate

An affiliate can be deleted only when their balance is zero and they have no pending or processing withdrawals — settle those first. Deleting an affiliate also removes their coupons, so the coupon codes stop working at checkout. To stop an affiliate without losing their history, **Ban** them instead.

## Ban and Unban

**Ban** an affiliate who breaks your terms, from the detail page or the row actions in the list. A banned affiliate:

- cannot open their affiliate dashboard (they see a "banned" page),
- no longer earns new commissions — their links, short links and coupons stop crediting them,
- is not credited for commissions that were still pending: they stay **Pending** (you can reject them) and are only credited if you unban the affiliate,
- receives the *Affiliate Account Banned* email.

Click **Unban** to restore the account. The affiliate receives the *Affiliate Account Reinstated* email.

## Affiliate Status Reference

| Status | Meaning |
|--------|---------|
| Pending | Application waiting for review |
| Approved | Active — links are tracked and commissions are earned |
| Rejected | Application declined; the customer can re-apply |
| Suspended | Set manually on the edit page — links are not tracked and the dashboard is unavailable |
| Banned | Account blocked by an admin |

## Orders From Affiliates

When an order comes from an affiliate, the order detail page (**Ecommerce → Orders**) shows the affiliate who referred it and the commission amount.
