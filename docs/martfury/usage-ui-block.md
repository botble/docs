# UI Block (Shortcode)

UI blocks, also called shortcodes, are predefined sections you add to a page. Martfury uses them to build every homepage demo. Each block has fields you fill in from the admin panel, and some blocks have several **styles** (layouts). No code is needed.

## Usage

1. Open a page in the editor and click the **shortcode** button.
2. Search for the block, click **Use**.
3. Choose a **Style** or **Layout** if the block has one, fill in the fields and save.

To edit an existing block, click it in the editor and click the pencil icon.

::: tip
Blocks that show data (products, categories, brands, flash sales, testimonials, blog posts) need that data first. Create the products, categories or flash sale in the admin panel, then select them in the block.
:::

## Styles of Existing Blocks

These blocks keep their names and default look. The new **Style** or **Layout** options let you reproduce the homepage demos. **Default** always renders the original Martfury markup, so existing pages do not change.

| Block | Option | Values |
|-------|--------|--------|
| `simple-slider` | **Style** | Default (slider + ads), Full width with caption, Boxed slider + 2 stacked ads, Category menu + slider + up to 5 ads (`ads_1` to `ads_6`), Slider + 4 features + 2 side ads (Medicine) |
| `site-features` | **Style** | Default (inline), Boxed |
| `featured-product-categories` | **Style** | Default (image tiles), Thumbnail + child category links, 7 columns (Medicine). Also **Categories** (ordered) and **Limit** |
| `theme-ads` | **Layout**, **Title**, **Subtitle** | Equal columns, Two columns 8/4 (wide + narrow). A single ad renders full width |
| `product-category-products` | **Layout** | Carousel with category tabs (5 or 6 columns), Grid with category links (4 or 3 columns, with title), Horizontal product grid with category links (4 or 3 columns) |
| `product-collections` | **Columns**, **Card style** | 5 or 6 columns. Card style: Default, Medicine (add to cart on hover) |
| `flash-sale` | **Columns**, **Card style** | 5 or 6 columns. Card style: Default, Medicine |
| `featured-brands` | **Style** | Default carousel, Logo grid, Round logo with name (Medicine) |
| `testimonials` | **Style** | Default (cards), What client say (background image), Single testimonial (Medicine) |
| `download-app` | **Style** | Default (screenshot), Subscribe banner (background image + email form) |
| `blog-posts` | **Style** | Default (blog list), Homepage grid (title, 3 or 4 columns, pagination) |

::: tip
The `simple-slider` items also have a **Button label** and a **Subtitle** field in the slider item editor, used by the caption styles.
:::

## Ecommerce Blocks

Martfury adds **8 blocks** whose name starts with `ecommerce-`. They need the Ecommerce plugin. Open the shortcode dialog and search for the block name or its title.

| Shortcode | Title | Attributes | Used by |
|-----------|-------|------------|---------|
| `ecommerce-deal-hot` | Deal hot + best sellers | `title`, `flash_sale_id`, `sidebar_title`, `collection_id`, `limit` | Organic, Auto parts, Marketplace 4 |
| `ecommerce-products-of-category` | Products of category | `category_id`, `title`, `layout` (`horizontal` or `vertical-banner`), `number_of_categories` (default 6), `limit` (default 6), `with_container` (`yes` or `no`), `banner_1` to `banner_3` with `banner_1_url` to `banner_3_url` | Marketplace 1, Kids |
| `ecommerce-product-box` | Product box (tabs + recommended) | `category_id`, `title`, `icon`, `number_of_categories`, `limit` (default 8 per tab), `recommended_title`, `banner_1` to `banner_3` with URLs | Marketplace 3 |
| `ecommerce-categories-box` | Categories box | `category_id`, `title`, `banner`, `banner_url`, `limit` (default 7) | Marketplace 4 |
| `ecommerce-search-trending` | Search trending | `title`, `updated_at_text`, `category_ids`, `limit` (default 10) | Marketplace 3, Kids |
| `ecommerce-image-link-grid` | Image link grid | `title`, `style` (`room` or `concern`), `columns` (2, 3, 4 or 6), `with_container`, and a repeater of items with `image`, `title` and `url` | Furniture, Medical |
| `ecommerce-brands-testimonial` | Brands + testimonial | `brands_title`, `brand_ids` (empty uses featured brands), `limit` (default 10), `testimonial_title`, `testimonial_id`, `background_image` | Medical |
| `ecommerce-recently-viewed-strip` | Recently viewed strip | `title`, `limit` (default 8) | Electronic, Kids |

Example:

```text
[ecommerce-deal-hot title="Deal hot today" flash_sale_id="1" sidebar_title="Top 20 Best Sellers" collection_id="2" limit="8"][/ecommerce-deal-hot]
```

::: tip
Set `with_container="no"` when the page already wraps its content in a container (the Kids and Medical homepages do).
:::

::: warning
The **Recently viewed strip** and the **Your Recently Viewed** header dropdown only record views from real visitors, not from search engine crawlers. On a fresh site they stay empty until you browse a few products.
:::
