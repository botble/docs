# Release Notes

## Version 1.0.0 (March 2026)

Initial release.

### Features

- **Email Notifications** — Automatic email alerts when out-of-stock products become available, triggered instantly on stock change detection
- **Phone Collection** — Optionally collect phone numbers alongside email for future notification channel expansion
- **Subscription Management** — Admin dashboard to view, filter, and manage all subscriptions with status tracking
- **Flexible Display** — Choose between an inline form embedded in the product page or a modal popup triggered by button click
- **Automatic Detection** — The `SendBackInStockNotifications` listener detects stock changes in real time and dispatches notification jobs without manual intervention
- **One-Click Unsubscribe** — Every notification email includes a unique token-based unsubscribe link; no account login required
- **Email Templates** — Customizable `back_in_stock_notification` email template with variables for product name, image, URL, customer name, and unsubscribe link
- **Subscription Statuses** — Three-state lifecycle: Pending → Notified → Cancelled
- **Permissions** — Three granular permissions (`back-in-stock.index`, `back-in-stock.destroy`, `back-in-stock.settings`) for role-based access control
- **Multi-language** — Translation-ready with locale support
