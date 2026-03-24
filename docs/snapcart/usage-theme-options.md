# Theme Options

Theme options allow you to customize SnapCart's appearance and behavior without editing code.

To access the theme options, go to `Appearance` -> `Theme Options` in your admin panel.

![Theme Options](./images/theme-options.png)

## General

The **General** tab allows you to configure your site's title, description, and other essential details.

![General](./images/theme-option-general.png)

## Store Information

Configure your store's physical address, rating display, and review count shown on the storefront.

- **Store Address**: Your store's address or delivery text (default: "Giao hàng toàn quốc")
- **Store Rating**: Display rating (e.g., 4.9)
- **Review Count**: Number of reviews to display (e.g., 196)

## Contact Information

Set up contact channels displayed on your store:

- **Phone Number**: Main contact phone
- **Zalo**: Zalo chat link
- **Facebook Page ID**: Facebook page identifier for linking
- **Messenger**: Facebook Messenger link

These are used by the [Floating Contact](./usage-floating-contact.md) feature.

## Colors

Customize SnapCart's color scheme to match your brand:

- **Primary Color**: Main accent color (default: `#ce4002`)
- **Secondary Color**: Secondary accent (default: `#ffc000`)
- **Text Color**: Body text color
- **Background Color**: Page background color

## Features

Toggle key SnapCart features on/off:

- **Buy Now Button**: Show a "Buy Now" button on product pages
- **Sticky Cart**: Display a sticky cart bar at the bottom of product pages
- **Floating Contact**: Show floating contact buttons (Zalo, Phone, Messenger)
- **Delivery Time Picker**: Enable delivery date/time selection at checkout
- **Product Reviews**: Enable customer reviews on product pages
- **Social Proof**: Display trust badges on product pages
- **Sticky Header** (`enable_sticky_header`): When enabled, a compact header containing the site title and a search bar
  appears fixed at the top of the screen once the user scrolls past the original header. Keeps navigation accessible on
  long pages.
- **Hero Store Card** (`enable_hero_store_card`): When enabled, a store identity card (name, rating, address) overlaps
  the bottom of the hero carousel banner. The header's inline store card is hidden automatically to avoid duplication.

## Promo Info Cards

Display up to 3 small info cards below the hero banner to highlight store benefits (e.g., free shipping, quality
guarantee, fast delivery).

Configure each card via the following options (repeat for cards 2 and 3):

| Option | Description |
|---|---|
| `promo_card_1_icon` | Tabler icon name, e.g. `ti ti-truck` |
| `promo_card_1_text` | Short text shown below the icon |
| `promo_card_2_icon` | Tabler icon name for card 2 |
| `promo_card_2_text` | Text for card 2 |
| `promo_card_3_icon` | Tabler icon name for card 3 |
| `promo_card_3_text` | Text for card 3 |

Icons use [Tabler Icons](https://tabler.io/icons) names with the `ti ti-` prefix (e.g., `ti ti-shield-check`,
`ti ti-truck`, `ti ti-star`). Leave a card's icon and text empty to hide it.

## Ecommerce

Configure ecommerce-specific display options:

- **Fake Sold Count**: Toggle to show simulated sold count on product pages to create social proof
- **Checkout Primary Color**: Customize the checkout button color separately from the theme's primary color (default: `#ce4002`)
- **Checkout SEO Title**: Custom page title for the checkout page
- **Checkout SEO Description**: Custom meta description for the checkout page

## Delivery

Configure delivery time settings for the [Delivery Time Picker](./usage-delivery-time-picker.md):

- **Start Hour / End Hour**: Available delivery time window (default: 13:00 - 20:00)
- **Normal Delivery Fee**: Standard delivery fee (default: 31,000)
- **Peak Delivery Fee**: Fee during peak hours (default: 34,000)
- **Peak Hours**: Comma-separated list of peak hour numbers (e.g., `14,15,18,19`)
- **Free Shipping Threshold**: Minimum order amount for free shipping (default: 500,000)

## Social Links

Social links are managed through the Botble CMS core settings, not theme-specific options.

To configure social links, go to `Settings` -> `General` in the admin panel. These links are displayed in the
footer and contact sections of your store.
