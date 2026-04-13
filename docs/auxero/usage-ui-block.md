# UI Block (Shortcode)

UI Blocks, also known as Shortcodes, are small pieces of code that allow you to add predefined elements to your website.
They are used to enhance the functionality of your website without the need to write custom code.

## Usage

To use a shortcode, simply add the shortcode to the content of a page or post.

For example, to add a Hero Banner to a page, use the following shortcode:

```html
[hero-banners title="Looking for a vehicle? You're in the perfect spot." subtitle="Find Your Perfect Car" background_image="backgrounds/hero-banner.png"][/hero-banners]
```

You can set attributes: `title`, `subtitle`, `background_image`, and more attributes depending on the shortcode.

![Shortcode Admin](./images/ui-blocks/shortcode-hero-banner-admin.png)

The above shortcode will add a **Hero Banner** section to the page.

Go to the frontend of your website to see the result:

![Shortcode Frontend](./images/ui-blocks/shortcode-hero-banner.png)

There are many more shortcodes available. The setup is similar for all shortcodes.

## Available Shortcodes

Auxero provides **38 shortcodes** organized by category. Each shortcode supports multiple style variants and configurable attributes through the admin panel.

### Car Manager Shortcodes

#### Cars

Display a list of cars with filtering options.

![Cars](./images/shortcodes/cars-cars.png)

**Style variants:**

| Style | Preview |
|-------|---------|
| `style-latest` | ![Latest](./images/shortcodes/cars-style-latest.png) |
| `style-feature` | ![Featured](./images/shortcodes/cars-style-feature.png) |
| `style-popular` | ![Popular](./images/shortcodes/cars-style-popular.png) |

**Attributes:**
- `style` - Display style: `style-latest`, `style-feature`, `style-popular`
- `title` - Section title
- `subtitle` - Section subtitle
- `limit` - Number of cars to display
- `category_ids` - Filter by category IDs
- `button_label` - Button text
- `button_url` - Button link

#### Car List

Full car listing page with advanced filtering and pagination.

![Car List](./images/ui-blocks/car-list.png)

**Attributes:**
- `title` - Page title
- `enable_filter` - Enable/disable filter sidebar
- `default_layout` - Default layout view
- `layout_col` - Number of columns (2, 3, 4)
- `cars_per_page` - Items per page
- `layout_style` - Layout: `default`, `sidebar-left`, `sidebar-right`, `top-map`, `half-map`, `top-filter`
- `card_style` - Card style: `style-1`, `style-2`, `style-3`

Half-map layout preview:

![Half-map layout](./images/map-view.jpg)

#### Car Advance Search

Advanced search form with tab support.

![Car Advance Search](./images/ui-blocks/car-advance-search.png)

**Attributes:**
- `title` - Search form title
- `url` - Search results URL
- `tabs` - Available tabs: `all`, `new_car`, `used_car`
- `default_tab` - Default active tab
- `background_color` - Background color

#### Check Car Availability

![Check Car Availability](./images/ui-blocks/check-car-availability.png)

#### Car Services

![Car Services](./images/ui-blocks/car-services.png)

#### Car Loan Form

![Car Loan Form](./images/shortcodes/car-loan-form-car-loan-form.png)

**Style variants:**

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/car-loan-form-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/car-loan-form-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/car-loan-form-style-3.png) |

#### Cars By Locations

![Cars By Locations](./images/ui-blocks/cars-by-locations.png)

#### Brands

**Style variants:**

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/brands-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/brands-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/brands-style-3.png) |

#### Car Dealers

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/car-dealers-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/car-dealers-style-2.png) |

#### Car Types

**Style variants:**

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/car-types-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/car-types-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/car-types-style-3.png) |

### Content Shortcodes

#### Hero Banners

![Hero Banners](./images/ui-blocks/hero-banners.png)

#### Banner

![Banner](./images/ui-blocks/banner.png)

#### Simple Banners

![Simple Banners](./images/ui-blocks/simple-banners.png)

#### Promotion Block

![Promotion Block](./images/ui-blocks/promotion-block.png)

#### Intro Video

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/intro-video-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/intro-video-style-2.png) |

#### Featured Block

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/featured-block-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/featured-block-style-2.png) |

#### Why Us

![Why Us](./images/ui-blocks/why-us.png)

#### About Us Information

![About Us Information](./images/ui-blocks/about-us-information.png)

#### Site Statistics

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/site-statistics-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/site-statistics-style-2.png) |

#### Pricing

![Pricing](./images/ui-blocks/pricing.png)

#### Install Apps

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/install-apps-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/install-apps-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/install-apps-style-3.png) |

#### Rental Invitations

![Rental Invitations](./images/ui-blocks/rental-invitations.png)

#### Branch Locations

![Branch Locations](./images/ui-blocks/branch-locations.png)

### Blog Shortcodes

#### Blog Posts

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/blog-posts-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/blog-posts-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/blog-posts-style-3.png) |

### Plugin-Dependent Shortcodes

These shortcodes require their respective plugins to be activated.

#### Team

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/teams-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/teams-style-2.png) |

#### Testimonials

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/testimonials-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/testimonials-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/testimonials-style-3.png) |
| `style-4` | ![Style 4](./images/shortcodes/testimonials-style-4.png) |

#### FAQs

![FAQs](./images/ui-blocks/faqs.png)

#### FAQ Categories

![FAQ Categories](./images/ui-blocks/faq-categories.png)

#### Contact Form

![Contact Form](./images/ui-blocks/contact-form.png)

#### Simple Slider

8 slider styles available for homepage hero sections.

| Style | Preview |
|-------|---------|
| `style-1` | ![Style 1](./images/shortcodes/simple-sliders-style-1.png) |
| `style-2` | ![Style 2](./images/shortcodes/simple-sliders-style-2.png) |
| `style-3` | ![Style 3](./images/shortcodes/simple-sliders-style-3.png) |
