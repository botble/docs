# UI Block (Shortcode)

UI Blocks, also known as Shortcodes, are small pieces of code that allow you to add predefined elements to your website.
They are used to enhance the functionality of your website without the need to write custom code.

## Usage

To use a shortcode, simply add the shortcode to the content of a page or post.

For example, to add a Google Maps to a page, use the following shortcode:

```html
[google-map]New York, USA[/google-map]
```

![Shortcode](./images/shortcode-1.png)

The above shortcode will add a **Google Map** to the page with the location set to `New York, USA`.

Go to the frontend of your website to see the result:

![Shortcode](./images/shortcode-2.png)

## Available Shortcodes

### About

Display simple information about your shop, company, or organization.

```html
[about image_1="path_to_media_image" image_2="path_to_media_image" subtitle="Sample subtitle" title="Sample title" description="Sample description" action_label="Contact Us" action_url="/contact"][/about]
```

![About](./images/shortcode-about.png)

### Ads

Display advertisements on your website. There are 4 different styles available.

For example:

```
[ads style="1" key_1="ADS_KEY" key_2="ADS_KEY"][/ads]
```

#### Style 1

![Ads style 1](./images/shortcode-ads-1.png)

#### Style 2

![Ads style 2](./images/shortcode-ads-2.png)

#### Style 3

![Ads style 3](./images/shortcode-ads-3.png)

#### Style 4

![Ads style 4](./images/shortcode-ads-4.png)

To use the Ads shortcode, activate the **Ads** plugin and create an ad unit in the **Ads** section of the admin menu
dashboard.

![Manage Ads](./images/shortcode-ads-admin-1.png)

Then, choose the ad unit to display in the shortcode.

![Shortcode Ads](./images/shortcode-ads-admin-2.png)

### App Downloads

Display app download links with icons.

Example:

```html
[app-downloads title="Sample title" google_label="Google Play" google_icon="ti ti-brand-google-play" apple_label="Apple Store" apple_icon="ti ti-brand-apple-filled" screenshot="path_to_media_image"][/app-downloads]
```

![App Downloads](./images/shortcode-app-downloads.png)

### Blog Posts

Display a list of blog posts.

![Blog Posts](./images/shortcode-blog-posts.png)

Use the following shortcode to display a list of blog posts:

```html
[blog-posts title="Sample title" type="latest" limit="3"][/blog-posts]
```

The above shortcode will display the latest 3 blog posts.

### Coming Soon

Display a coming soon page with a countdown timer and newsletter subscription form.

```html
[coming-soon title="Coming Soon" subtitle="Our website is under construction" date="2025-12-31" image="path_to_media_image"][/coming-soon]
```

This shortcode is useful for launching a coming soon page while your website is still being developed.

### Contact Form

Display a contact form on a page.

```html
[contact-form show_contact_form="1" title="Sent A Message"][/contact-form]
```

![Contact Form](./images/shortcode-contact-form.png)

### Ecommerce Brands

Display a list of product brands.

```html
[ecommerce-brands brand_ids="1,2,3,4,5"][/ecommerce-brands]
```

This shortcode displays brand logos or names that link to their respective product listing pages.

### Ecommerce Categories

Display a list of specific product categories.

```html
[ecommerce-categories style="slider" category_ids="1,2,3,4,5"][/ecommerce-categories]
```

We have 2 styles available for the Ecommerce Categories shortcode:

#### Grid style

![Ecommerce Categories Grid](./images/shortcode-ecommerce-categories-grid.png)

#### Slider style

![Ecommerce Categories Slider](./images/shortcode-ecommerce-categories-slider.png)

### Ecommerce Coupons

Display a list of specific available coupons.

```html
[ecommerce-coupons coupon_ids="1,2,3,4"][/ecommerce-coupons]
```

![Ecommerce Coupons](./images/shortcode-ecommerce-coupons.png)

### Ecommerce Collections

Display a list of product collections. Collections are groups of products that you define in the admin panel.

```html
[ecommerce-collections collection_ids="1,2,3"][/ecommerce-collections]
```

This shortcode displays products from specific collections, useful for curated product groups like "Best Sellers", "New Arrivals", or "Staff Picks".

### Ecommerce Flash Sale

The Ecommerce Flash Sale shortcode can be used to display a list of products or a countdown timer.

```html
[ecommerce-flash-sale style="1" title="Sample title" flash_sale_id="1" limit="4"][/ecommerce-flash-sale]
```

The above shortcode will display a list of products with the specified flash sale ID (in this case, 1). Make sure to
create a flash sale in the admin panel first.

#### List product style

![Ecommerce Flash Sale List Product](./images/shortcode-ecommerce-flash-sale-1.png)

#### Countdown style

![Ecommerce Flash Sale Countdown](./images/shortcode-ecommerce-flash-sale-2.png)

### Ecommerce Product Groups

Product groups are used to display a list of products in a group. There are 5 groups available:

* All: Display all products
* Featured: Display featured products
* On Sale: Display products that are on sale
* Trending: Display trending products
* Top Rated: Display top-rated products

```html
[ecommerce-product-groups title="Sample title" limit="8" tabs="all,featured,on-sale,trending,top-rated"][/ecommerce-product-groups]
```

You also can choose the style tabs or columns for the product groups.

#### Tabs style

![Ecommerce Product Groups Tabs](./images/shortcode-ecommerce-product-groups-1.png)

#### Columns style

![Ecommerce Product Groups Columns](./images/shortcode-ecommerce-product-groups-2.png)

### Ecommerce Products

This is the most used shortcode to display a list of products. In this shortcode, you can choose the category,
collection, or specific products to display.

```html
[ecommerce-products style="grid" category_ids="20" limit="12"][/ecommerce-products]
```

The above example will display 20 products in the category with the ID of 20.

You also can control the left side of product list to display the category detail, and ads banners.

![Ecommerce Products Admin](./images/shortcode-ecommerce-products-admin.png)

#### Grid style

![Ecommerce Products Grid](./images/shortcode-ecommerce-products-1.png)

#### Slider style

![Ecommerce Products Slider](./images/shortcode-ecommerce-products-2.png)

#### Simple style

![Ecommerce Products Simple](./images/shortcode-ecommerce-products-3.png)

### FAQ

Display frequently asked questions in a collapsible format. There are 2 different styles available.

```html
[faqs style="group" category_ids="1,2,3"][/faqs]
```

::: tip
Activate the **FAQ** plugin to use this shortcode.
:::

#### Group style

Display FAQs grouped by category.

#### List style

Display FAQs as a simple list.

### Gallery Images

Display a list of images in a gallery. There are 2 different styles available.

#### Style 1

![Gallery Images](./images/shortcode-gallery-1.png)

#### Style 2

![Gallery Images](./images/shortcode-gallery-2.png)

::: tip
Activate the **Gallery** plugin to use this shortcode.
:::

### Google Maps

Display an embedded Google Map on your page.

```html
[google-map]New York, USA[/google-map]
```

This will display an interactive Google Map with the specified location.

### Image Slider

Display a list of images in a slider. Usually used for brands, logos, or sponsors.

![Image Slider](./images/shortcode-image-slider.png)

### Newsletter

Display a newsletter subscription form to collect email addresses from visitors.

```html
[newsletter][/newsletter]
```

::: tip
Activate the **Newsletter** plugin to use this shortcode.
:::

### Simple Slider

Usually used to display a list of images in a slider on the hero section of the website.

First, you need to create a slider in the admin panel. Go to `Simple Slider` on the admin menu dashboard to create a slider.

There are 5 styles for different purposes:

#### Style 1

![Simple Slider](./images/shortcode-simple-slider-1.png)

#### Style 2

![Simple Slider](./images/shortcode-simple-slider-2.png)

#### Style 3

![Simple Slider](./images/shortcode-simple-slider-3.png)

#### Style 4

![Simple Slider](./images/shortcode-simple-slider-4.png)

#### Style 5

![Simple Slider](./images/shortcode-simple-slider-5.png)

::: tip
Activate the **Simple Slider** plugin to use this shortcode.
:::

### Site Features

Display a list of site features. There are 4 different styles available.

#### Style 1

![Site Features](./images/shortcode-site-features-1.png)

#### Style 2

![Site Features](./images/shortcode-site-features-2.png)

#### Style 3

![Site Features](./images/shortcode-site-features-3.png)

#### Style 4

![Site Features](./images/shortcode-site-features-4.png)

### Testimonials

Add testimonials to your website. There are 3 different styles available.

```html
[testimonials style="1" testimonial_ids="1,2,3"][/testimonials]
```

Go to `Testimonials` on the admin menu dashboard to create testimonials and assign them to the shortcode.

::: tip
Activate the **Testimonials** plugin to use this shortcode.
:::

#### Style 1

![Testimonials](./images/shortcode-testimonials-1.png)

#### Style 2

![Testimonials](./images/shortcode-testimonials-2.png)

#### Style 3

![Testimonials](./images/shortcode-testimonials-3.png)
