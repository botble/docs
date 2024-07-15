# Measuring Ecommerce with Google Analytics

Google Analytics provides powerful tools for measuring the performance of your ecommerce website. By implementing ecommerce tracking, you can gain valuable insights into your sales funnel, customer behavior, and revenue generation. Below, we'll explore how to effectively measure ecommerce performance using Google Analytics.

## Set Up Google Analytics 4

Before you can measure ecommerce performance, you need to [create a Google Analytics 4 account and property](https://support.google.com/analytics/answer/9304153#account).

Then you need to [create a web data stream](https://support.google.com/analytics/answer/9304153#stream&zippy=%2Cweb) for your website. This will allow you to collect data from your site and track user interactions.

![Web Data Stream](./images/google-analytics-web-data-stream.png)

After you've set up your web data stream, you will have a Google Tag Manager code snippet. Go to `Admin` -> `Settings` -> `Ecommerce` -> `Tracking`, enable `Enable Google Tag Manager` field and paste your Google Tag Manager code snippet in the `Google Tag Manager code` field.

![Admin Settings](./images/google-analytics-admin-settings.png)

## Tracking Features

Google Analytics provides several features for tracking ecommerce performance:

- **View Item List (Product List)**: Tracks when users view a list of products.
- **View Item (Product Detail)**: Tracks when users view details of a specific product.
- **Add to Cart**: Tracks when users add items to their cart.
- **Remove from Cart**: Tracks when users remove items from their cart.
- **View Cart**: Tracks when users view their cart.
- **Begin Checkout**: Tracks when users start the checkout process.
- **Purchase (Checkout Success)**: Tracks when users successfully complete a purchase.

## See your ecommerce data

After 24 hours, your ecommerce data will be available in your Google Analytics account. You can view your ecommerce data by reading the [Ecommerce purchases report](https://support.google.com/analytics/answer/12924131?visit_id=638477342970940852-1296123871&rd=1).

![Ecommerce data](https://developers.google.com/static/analytics/devguides/collection/ga4/img/ecommerce-purchases-report.png)

## Debugging

Google Analytics provides a [debug mode](https://developers.google.com/analytics/devguides/collection/ga4/set-up-ecommerce#verify-data) to help you verify that your ecommerce tracking is working correctly.

You can add `, { debug_mode: true }` after your `gtag('config', 'G-XXXXXXXXXXX');` code snippet to enable debug mode.

```js
gtag('config', 'TAG_ID', { debug_mode: true });
```

![Example code snippet](./images/google-analytics-debug-mode.png)

Once you've enabled debug mode, you can use the **DebugView** by following Google's [instructions](https://support.google.com/analytics/answer/7201382).

![DebugView](https://developers.google.com/analytics/devguides/collection/ga4/img/debug-view.png)
