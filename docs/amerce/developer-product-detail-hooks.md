# Product Detail Page Hooks

Amerce provides hook filters on the product detail page that allow plugins to inject custom content without modifying theme files. All hooks use `apply_filters()` and pass the `$product` model as context.

## Available Hooks

### Gallery Area

| Hook Name | Position | Use Case |
|-----------|----------|----------|
| `ecommerce_product_detail_before_gallery` | Above the product image gallery | Promo banners, announcements |
| `ecommerce_product_detail_after_gallery` | Below the gallery, inside the gallery wrapper | 360-degree view button, video overlay |

### Cart Actions Area

| Hook Name | Position | Use Case |
|-----------|----------|----------|
| `ecommerce_product_detail_after_cart_actions` | Below the Add to Cart / Buy Now buttons | Trust badges, payment icons, delivery estimates |

### Product Meta Area

| Hook Name | Position | Use Case |
|-----------|----------|----------|
| `ecommerce_product_detail_after_meta` | After SKU, categories, and tags | Custom product fields, plugin metadata |

### Tabs Area

| Hook Name | Position | Use Case |
|-----------|----------|----------|
| `ecommerce_product_detail_before_tabs` | Between product top section and tabs | Full-width banners, campaign sections |
| `ecommerce_product_detail_after_tabs` | After tabs, before the sticky bar | Additional content sections |
| `ecommerce_product_detail_extra_tab_headers` | After the last tab button | Custom tab headers (e.g., "Warranty", "Shipping Info") |
| `ecommerce_product_detail_extra_tab_contents` | After the last tab content pane | Custom tab content panes |

::: tip
When using `extra_tab_headers` and `extra_tab_contents`, you must add both a tab header and its corresponding tab content. They work as a pair.
:::

## Usage Example

In your plugin's service provider, use `add_filter()` to hook into any of these positions:

```php
use Botble\Ecommerce\Models\Product;

// Add trust badges below Add to Cart button
add_filter('ecommerce_product_detail_after_cart_actions', function (?string $html, Product $product) {
    return $html . view('plugins/your-plugin::trust-badges', compact('product'))->render();
}, 120, 2);
```

### Adding a Custom Tab

```php
// Add tab header
add_filter('ecommerce_product_detail_extra_tab_headers', function (?string $html, Product $product) {
    return $html . '<button class="nav-link" id="nav-warranty-tab" data-bs-toggle="tab" data-bs-target="#nav-warranty" type="button" role="tab">'
        . __('Warranty')
        . '</button>';
}, 120, 2);

// Add tab content
add_filter('ecommerce_product_detail_extra_tab_contents', function (?string $html, Product $product) {
    return $html . '<div class="tab-pane fade" id="nav-warranty" role="tabpanel" aria-labelledby="nav-warranty-tab" tabindex="0">'
        . '<div class="pt-60">' . view('plugins/your-plugin::warranty-info', compact('product'))->render() . '</div>'
        . '</div>';
}, 120, 2);
```

### Adding Content Before Tabs

```php
add_filter('ecommerce_product_detail_before_tabs', function (?string $html, Product $product) {
    if (! $product->getMetaData('campaign_banner')) {
        return $html;
    }

    return $html . view('plugins/your-plugin::campaign-banner', compact('product'))->render();
}, 120, 2);
```

## Existing Hooks

These hooks were already available before the additions above:

| Hook Name | Position |
|-----------|----------|
| `ecommerce_before_product_description` | Before product short description |
| `ecommerce_after_product_description` | After product short description |
| `ECOMMERCE_PRODUCT_DETAIL_EXTRA_HTML` | After product options, before cart actions |
| `ads_render` (with `detail_page_before`) | Before product detail section |
| `ads_render` (with `detail_page_after`) | After product detail section |
| `BASE_FILTER_PUBLIC_COMMENT_AREA` | Inside the Description tab |
