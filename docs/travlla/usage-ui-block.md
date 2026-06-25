# UI Block (Shortcode)

UI Blocks, also known as Shortcodes, are small pieces of code that allow you to add predefined elements to your website.
They are used to enhance the functionality of your website without the need to write custom code.

## Usage

To use a shortcode, simply add the shortcode to the content of a page or post.

For example, to add a carousel of featured tours to a page, use the following shortcode:

```html
[popular-tours subtitle="Explore the world" title="Popular Tours" limit="8" style="style-1"][/popular-tours]
```

You can set attributes: `title`, `subtitle`, `limit`, `style`,... and more attributes. Each shortcode also has a
visual configuration panel in the page editor — no need to type attributes by hand.

The above shortcode will add a **Popular Tours** carousel.

Go to the frontend of your website to see the result:

![Popular Tours](./images/ui-blocks/shortcode-hero-banner.png)

There are many more shortcodes but the setup is similar.

## Available Shortcodes

Travlla ships with travel-focused UI blocks you can drop into any page:

| Shortcode | Description |
|-----------|-------------|
| `popular-tours` | Carousel of featured tours. |
| `tour-list` | Grid/list of tours with filters. |
| `tour-categories` | Showcase of tour categories. |
| `popular-destinations` | Popular destinations grid. |
| `popular-search` | Most-searched destinations. |
| `holidays-by-theme` | Tours grouped by holiday theme. |
| `offers-deals` | Special offers and deals. |
| `pricing` | Pricing / package plans. |
| `services-we-offer` | Services grid. |
| `why-choose` | "Why choose us" feature blocks. |
| `guide-feature` | Tour guide highlight. |
| `team-members` | Team / tour guides. |
| `testimonials` | Customer testimonials. |
| `counters-stats` | Animated stat counters. |
| `steps` | Step-by-step "how it works". |
| `faq-section` | Frequently asked questions. |
| `gallery` | Image gallery. |
| `video-section` | Video highlight section. |
| `blog-posts` | Latest blog posts. |
| `partners-logos` | Partner / brand logos. |
| `cta` | Call-to-action banner. |
