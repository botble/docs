# Product Detail Page Hooks

Amerce provides hook filters on the product detail page that allow plugins to inject custom content without modifying theme files. All hooks use `apply_filters()` and pass the `$product` model as context.

## Available Hooks

### Gallery Area

| Hook Name | Position | Use Case |
|-----------|----------|----------|
| `ecommerce_product_detail_before_gallery` | Above the product image gallery | Promo banners, announcements |
| `ecommerce_product_detail_after_gallery` | Below the gallery, inside the gallery wrapper | 360-degree view button, video overlay |

### Tabs Area

| Hook Name | Position | Use Case |
|-----------|----------|----------|
| `ecommerce_product_detail_before_tabs` | Between product top section and tabs | Full-width banners, campaign sections |
| `ecommerce_product_detail_after_tabs` | After tabs, before the sticky bar | Additional content sections |
| `ecommerce_product_detail_extra_tab_headers` | After the last tab button | Custom tab headers (e.g., "Warranty", "Shipping Info") |
| `ecommerce_product_detail_extra_tab_contents` | After the last tab content pane | Custom tab content panes |

::: tip
When using `extra_tab_headers` and `extra_tab_contents`, you must add both a tab header and its corresponding tab content. They work as a pair.

With the **accordion** description style (instead of tabs), only `ecommerce_product_detail_extra_tab_contents` is rendered, after the last accordion item - `extra_tab_headers` is not output.
:::

## Usage Example

In your plugin's service provider, use `add_filter()` to hook into any of these positions:

```php
use Botble\Ecommerce\Models\Product;

// Add trust badges below the product gallery
add_filter('ecommerce_product_detail_after_gallery', function (?string $html, Product $product) {
    return $html . view('plugins/your-plugin::trust-badges', compact('product'))->render();
}, 120, 2);
```

### Adding a Custom Tab

```php
// Add tab header
add_filter('ecommerce_product_detail_extra_tab_headers', function (?string $html, Product $product) {
    return $html . '<li class="nav-tab-item" role="presentation">'
        . '<button class="tf-btn-tab" id="nav-warranty-tab" data-bs-toggle="tab" data-bs-target="#nav-warranty" type="button" role="tab">'
        . '<span class="h5 fw-medium">' . __('Warranty') . '</span>'
        . '</button>'
        . '</li>';
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
| `ecommerce_after_product_description` | After product short description |
| `ECOMMERCE_PRODUCT_DETAIL_EXTRA_HTML` | After product options, before cart actions (on out-of-stock products it renders only when the Back in Stock plugin is active) |
| `ads_render` (with `detail_page_before`) | Before product detail section |
| `ads_render` (with `detail_page_after`) | After product detail section |
| `BASE_FILTER_PUBLIC_COMMENT_AREA` | Inside the Description tab |
