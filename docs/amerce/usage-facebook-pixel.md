# Facebook Pixel (Meta Pixel)

Facebook Pixel (Meta Pixel) allows you to track visitor actions on your website and use that data for Facebook ad targeting, conversion tracking, and audience building.

## Setup

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager) and create a Pixel if you don't have one. Copy your **Pixel ID** (a numeric string, e.g. `123456789012345`).

2. In your admin panel, go to **Admin** -> **Settings** -> **Ecommerce** -> **Tracking**.

3. Enable **Facebook Pixel (Meta Pixel)**.

4. Paste your Pixel ID in the **Facebook Pixel ID** field.

5. Optionally enable **Facebook Pixel debug mode** to log events in the browser console for troubleshooting.

6. Click **Save**.

::: tip
After saving, the pixel base script (`fbq('init', ...)` and `PageView` event) is automatically injected into every page of your website, including checkout pages.
:::

## Tracked Events

The following Meta Pixel events are tracked automatically:

::: warning Not server-to-server tracking
All events below fire from the browser via `fbq()`. Some events are rendered into the page HTML on the server so they fire on page load (listed under **Page-Load Events**); others fire from JavaScript event handlers on user interaction (listed under **Interaction Events**). In both cases, the request to Facebook originates from the visitor's browser — not from the merchant's server.

Facebook's [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api/) (a true server-to-server integration that bypasses the browser and ad blockers) is **not** included. It can be added via custom development.
:::

### Page-Load Events

These events are rendered into the page HTML by the server and fire automatically on page load:

| Event | Trigger | Data |
|-------|---------|------|
| `PageView` | Every page load | Automatic |
| `ViewContent` | Product detail page | `content_ids`, `content_name`, `content_type`, `content_category`, `contents`, `currency`, `value` |
| `InitiateCheckout` | Checkout page | `content_ids`, `content_name`, `contents`, `currency`, `num_items`, `value` |
| `Purchase` | Order success page | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `value`, `order_id` |
| `Search` | Search results page | `search_string`, `content_ids`, `content_type`, `contents` |

### Interaction Events

These events fire from JavaScript event handlers when users interact with the site:

| Event | Trigger | Data |
|-------|---------|------|
| `AddToCart` | Add product to cart | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `value` |
| `AddToWishlist` | Add product to wishlist | `content_ids`, `content_name`, `content_type`, `currency`, `value` |
| `AddToCompare` | Add product to compare (custom event) | `content_ids`, `content_name`, `content_type`, `currency`, `value` |
| `RemoveFromCart` | Remove product from cart (custom event) | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `value` |
| `ViewContent` | Click on a product link | `content_ids`, `content_name`, `content_type`, `currency`, `value` |
| `Search` | Submit a search or filter form | `search_string`, `content_type` |
| `CompleteRegistration` | Customer registration or newsletter signup | `content_name`, `status`, `currency`, `value` |
| `Lead` | Contact form submission | `content_name`, `content_category` |

::: info
Events marked as "custom event" use `fbq('trackCustom', ...)` instead of `fbq('track', ...)`. Custom events can be used in Facebook Ads for custom audience building but are not standard conversion events.
:::

### Optional Events (require theme integration)

These event listeners are wired but only fire when the theme dispatches the corresponding JavaScript event. The Amerce theme does not dispatch them by default — they are available for custom integrations.

| Event | Trigger | Required dispatcher |
|-------|---------|---------------------|
| `ViewCategory` | Category page view | Theme dispatches `ecommerce.category.viewed` event with `{ name }` payload |
| `AddPaymentInfo` | Select payment method at checkout | Theme dispatches `ecommerce.payment.selected` event with `{ value, method }` payload |

## Verifying Your Pixel

### Method 1: Browser Console (Debug Mode)

1. Enable **Facebook Pixel debug mode** in admin settings.
2. Open your website in Chrome and press **F12** to open Developer Tools.
3. Go to the **Console** tab.
4. Look for blue messages like `Facebook Pixel Debug Mode Active` and green messages for each event fired.

### Method 2: Meta Pixel Helper Extension

1. Install the [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension.
2. Visit your website.
3. Click the extension icon - it shows all pixel events firing on the page.

### Method 3: Facebook Events Manager

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager).
2. Select your Pixel.
3. Go to the **Test Events** tab.
4. Enter your website URL and click **Open Website**.
5. Browse your site - events will appear in real-time in the Test Events panel.

::: warning
It may take up to 24 hours for event data to appear in the Events Manager overview. Use **Test Events** for immediate verification.
:::

## Currency Handling

The pixel automatically uses your store's active currency. For zero-decimal currencies (JPY, VND, KRW, etc.), values are rounded to whole numbers. For all other currencies, values are rounded to 2 decimal places.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No events in Events Manager | Verify the Pixel ID is correct and the toggle is enabled. Clear your site cache. |
| Events not firing | Check browser console for JavaScript errors. Ensure no ad blocker is active. |
| Duplicate events | This is normal - some events fire both on page load and on user interaction for redundancy. Facebook deduplicates them automatically. |
| Wrong currency or values | Check your store's active currency in **Admin** -> **Ecommerce** -> **Currencies**. |
| Pixel Helper shows warning | Warnings about "non-standard parameters" are safe to ignore for custom events. |
