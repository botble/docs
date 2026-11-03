# Ads

Advertisements (ads) are promotional content on your website to generate revenue, promote products, or inform users about services. Ads can be banners, videos, pop-ups, or native ads. In e-commerce, ads help monetize traffic, cross-promote products, and boost brand visibility.

To manage ads on your website, go to **Admin** ->  **Ads** -> **Ads**.

![Ads](./images/ads-1.png)

## Displaying Ads on Pages, Posts, and Products

To display ads on specific pages, posts, or product pages, you need to use the content field and add a new UI Block for
ads.

1. Edit the page, post, or product.
2. Click UI Blocks in the Content field.
3. Select the Ads block.
4. Configure the ad settings and click Add.

::: warning
Ad images should NOT contain ‘ads’, ‘advert’, etc., in the name to avoid being blocked by Adblock extensions.
:::

![Ads](./images/ads-2.png)

The Ads block has a single option: pick the ad (by its key) to display. The ad renders its own image (with optional tablet and mobile images) and link.

## Google Adsense

To set up Google Adsense, go to **Admin** -> **Ads** -> **Ads Settings**. Choose a **Google AdSense Mode** (**Disabled**, **Auto Ads** - paste the Auto Ads snippet, or **Unit Ads** - enter your client ID and set a slot ID per ad), optionally upload your `ads.txt` file, and save.

![Google Adsense](./images/ads-3.png)
