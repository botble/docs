---
title: Troubleshooting
description: Fix common Affiliate Pro problems — tracking, commissions, withdrawals and emails.
---

# Troubleshooting

## Plugin Not Working After a CMS Update

1. Go to **Plugins → Installed Plugins**.
2. **Deactivate** Affiliate Pro, then **Activate** it again.
3. Clear cache in **Platform Administration → Cache Management**.

This re-registers the plugin and runs any new migrations. It fixes most post-update issues.

## Clicks Are Not Tracked

| Check | How |
|-------|-----|
| The link uses `aff`, not `ref` | Correct: `https://your-store.com/?aff=AFF0001` |
| The affiliate is **Approved** | Pending, rejected and banned affiliates are not tracked |
| The affiliate code is correct | Compare with the code in **Affiliate → All Affiliates** |
| A full-page cache is not serving the page | Exclude URLs containing `aff=` from page caching (Cloudflare, LiteSpeed, Varnish…), otherwise the request never reaches the site and no cookie is set |

Test in a private browser window: open the link, then check that the `affiliate_code` cookie exists (browser DevTools → Application → Cookies) and that a click appears on the affiliate's detail page.

## No Commission Was Created for an Order

- The order was placed in the **same browser** that opened the affiliate link, **within the cookie lifetime** — or it used the affiliate's coupon code.
- The buyer is not the affiliate. Orders placed with the affiliate's own customer account never earn a commission.
- The products are not excluded — **Enable Affiliate** is on for each product.
- The rate is above zero — check the product, category and default rates.
- The affiliate was **Approved** when the order was placed.

Commissions are only created at checkout. An order placed before the visitor clicked the link will not get one later.

## Commission Is Still Pending

Commissions are approved automatically on order completion when **Auto Approve Commissions** is on (the default). If you turned it off, approve them in **Affiliate → Commissions**.

If auto-approval is on, check that the order status is **Completed** in **Ecommerce → Orders**.

If cancelled orders do not reverse their commissions, make sure your queue worker is running (or `QUEUE_CONNECTION=sync` in `.env`) — the cancellation handler runs as a queued job.

## Withdrawal Problems

| Message / problem | Fix |
|-------------------|-----|
| "The minimum withdrawal amount is …" | The affiliate must request at least the minimum set in settings |
| "You do not have enough balance for this withdrawal." | Pending withdrawals are already deducted from the balance |
| A payment method is missing | Enable it in **Affiliate Settings → Withdrawal Payment Methods**; Stripe also needs the Stripe Connect plugin |
| PayPal payout stays Pending | Check the PayPal gateway credentials and your PayPal balance, then approve manually |

## Emails Are Not Sent

1. Send a test email from **Settings → Email** to confirm the mail settings work.
2. Check the template in **Settings → Email templates → Affiliate Pro Emails**.
3. Admin notifications go to the **Admin email** address set in **Settings → General**.
4. For the weekly digest, the [cron job](/cms/cronjob) must be running.

## Affiliate Program Menu Missing on the Storefront

- The customer must be logged in.
- **Enable Affiliate Registration** must be on. When it is off, the menu is hidden for everyone, including existing affiliates.
- If your theme uses a custom account menu, add a link to `/customer/affiliate`.

## Still Stuck?

Check `storage/logs/laravel.log` for errors, then contact [support@botble.com](mailto:support@botble.com) with:

- Botble CMS and Affiliate Pro versions,
- PHP version,
- steps to reproduce and the error message or screenshot.
