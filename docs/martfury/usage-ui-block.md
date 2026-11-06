# UI Blocks

UI blocks, also called shortcodes, are predefined sections you add to a page. Martfury uses them to build every homepage demo. Each block has fields you fill in from the admin panel, and some blocks have several **styles** (layouts). No code is needed.

## Usage

1. Open a page in the editor and click **UI Blocks**. The picker shows a preview image for each block.
2. Search for the block, click **Use**.
3. Choose a **Style** or **Layout** if the block has one, fill in the fields and save.

To edit an existing block, click it in the editor and click the pencil icon.

Pages also have a **Visual Builder** button, which builds the page with drag-and-drop blocks. To hide it, turn off **Enable page visual builder** in `Settings`.

::: tip
Blocks that show data (products, categories, brands, flash sales, testimonials, blog posts) need that data first. Create the products, categories or flash sale in the admin panel, then select them in the block.
:::

Many blocks also offer these optional fields: **Enable lazy loading**, **Custom CSS**, **Background color**, **Text color** and **Background image**.

## Styles of Existing Blocks

These blocks keep their names and default look. The **Style** or **Layout** options reproduce the homepage demos. **Default** always renders the original Martfury markup, so existing pages do not change.

| Block | Option | Values |
|-------|--------|--------|
| `simple-slider` | **Style** | Default (slider + ads), Full width with caption, Boxed slider + 2 stacked ads, Category menu + slider + up to 5 ads, Slider + 4 features + 2 side ads (Medicine) |
| `site-features` | **Style** | Default (inline), Boxed |
| `featured-product-categories` | **Style** | Default (image tiles), Thumbnail + child category links, 7 columns (Medicine). Also **Categories** (ordered) and **Limit** |
| `theme-ads` | **Layout**, **Title**, **Subtitle** | Equal columns, Two columns 8/4 (wide + narrow). A single ad renders full width |
| `product-category-products` | **Layout**, **Products per row**, **Limit number of categories**, **Limit number of products** | Carousel with category tabs, Grid with category links, Boxed carousel with category links (5 items), Horizontal product grid with category links. **Products per row**: 3 or 4 for grids (default 4), 5 or 6 for carousels (default 6 to 7) |
| `product-collections` | **Products per row**, **Product card style** | 5 or 6 columns. Card style: Default, Medicine (add to cart on hover) |
| `flash-sale` | **Products per row**, **Product card style** | 5 or 6 columns. Card style: Default, Medicine |
| `featured-brands` | **Style**, **Number of brands to display** | Default (carousel), Logo grid, Round logo with name (Medicine) |
| `testimonials` | **Style** | Default (cards), What client say (background image), Single testimonial (Medicine). Also **Title**, **Subtitle**, autoplay, loop, speed and slides to show |
| `download-app` | **Style** | Default (screenshot), Subscribe banner (background image + email form) |
| `blog-posts` | **Style** | Default (blog list), Homepage grid (title, posts per row, pagination) |

### Simple Slider Details

- **Ad 1** to **Ad 5** show beside the slider. **Ad 6** shows below the slider, and only the category menu style uses it. The default, boxed and Medicine styles use Ad 1 and Ad 2.
- The Medicine style adds **Feature 1** to **Feature 4** fields (icon, title and subtitle) under the slider.
- The caption style uses the **Subtitle** and **Button label** fields of each slider item. The button links to the item link.

## Theme Blocks Without Style Options

| Block | Fields | Notes |
|-------|--------|-------|
| `featured-products` | **Title**, **Limit** | Featured products |
| `trending-products` | **Title**, **Limit** | Trending products |
| `newsletter-form` | **Title**, **Subtitle**, **Description** | Newsletter sign-up form |
| `faq` | **Title** | FAQs grouped by category. Requires the FAQ plugin |
| `contact-info-boxes` | **Title** | Boxes from the **Contact info boxes** section of [Theme options](./usage-theme-options.md) |
| `coming-soon` | **Time**, **Image** | Countdown and image, for the **Coming soon** page template |
| `marketplace-stores` | **Title**, **Stores** | Stores of the marketplace. Requires the Marketplace plugin |
| `marketplace-subscription-plans` | **Title**, **Description**, **Number of plans to show** | Vendor subscription plans. See [Vendor Subscriptions](./usage-marketplace-subscriptions.md#public-subscription-plans) |
| `recently-viewed-products` | **Title** | Products the customer viewed recently. Requires the Ecommerce plugin |
| `contact-form` | Set in the block form | Contact form from the Contact plugin. Requires the Contact plugin |
| `google-map` | **Address**, **Width**, **Height** | Map of an address |
| `youtube-video` | **URL**, **Width**, **Height** | Embedded YouTube video |

## Ecommerce Blocks

Martfury adds **8 blocks** whose name starts with `ecommerce-`. They need the Ecommerce plugin. Open the **UI Blocks** dialog and search for the block name or its title.

| Shortcode | Title | Attributes | Used by |
|-----------|-------|------------|---------|
| `ecommerce-deal-hot` | Deal hot + best sellers | `title`, `flash_sale_id`, `sidebar_title`, `collection_id`, `show_save_badge` (`yes` or `no`, default `yes`: shows the "Save $X" badge on the gallery), `limit` (number of best seller products, default 8, max 24) | Organic, Auto parts, Marketplace 4 |
| `ecommerce-products-of-category` | Products of category | `category_id`, `title`, `layout` (`horizontal` or `vertical-banner`), `number_of_categories` (default 6), `limit` (default 6), `with_container` (`yes` or `no`), `banner_1` to `banner_3` with `banner_1_url` to `banner_3_url` | Marketplace 1, Kids |
| `ecommerce-product-box` | Product box (tabs + recommended) | `category_id`, `title`, `icon`, `number_of_categories`, `limit` (default 8 per tab), `recommended_title`, `banner_1` to `banner_3` with URLs | Marketplace 3 |
| `ecommerce-categories-box` | Categories box | `category_id`, `title`, `banner`, `banner_url`, `limit` (default 7) | Marketplace 4 |
| `ecommerce-search-trending` | Search trending | `title`, `updated_at_text`, `category_ids`, `hot_trending_title` (default `Hot Trending`; empty hides the tab), `limit` (tiles per tab, default 10, max 30) | Marketplace 3, Kids |
| `ecommerce-image-link-grid` | Image link grid | `title`, `style` (`room` or `concern`), `columns` (2, 3, 4 or 6), `with_container`, and a repeater of items with `image`, `title` and `url` | Furniture, Medical |
| `ecommerce-brands-testimonial` | Brands + testimonial | `brands_title`, `brand_ids` (empty uses featured brands), `limit` (default 10), `testimonial_title`, `testimonial_id`, `background_image` | Medical |
| `ecommerce-recently-viewed-strip` | Recently viewed strip | `title`, `limit` (default 8) | Electronic, Kids |

Example:

```text
[ecommerce-deal-hot title="Deal hot today" flash_sale_id="1" sidebar_title="Top 20 Best Sellers" collection_id="2" show_save_badge="yes" limit="8"][/ecommerce-deal-hot]
```

::: tip
Set `with_container="no"` when the page already wraps its content in a container (the Kids and Medical homepages do).
:::

::: warning
The **Recently viewed strip** and the **Your Recently Viewed** header dropdown only record views from real visitors, not from search engine crawlers. On a fresh site they stay empty until you browse a few products.

The views are recorded only when **Enable customer recently viewed products** is on in `Settings` -> `Ecommerce` -> `Checkout`. It is on by default.
:::
