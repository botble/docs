# Release Notes

## 1.42.0 (unreleased)

- 11 new homepage demos: Marketplace 1 to 4, Technology, Electronic, Furniture, Organic, Auto parts, Kids and Medical, next to the default Home 1. Pick one in the web installer.
- New **Layout** section in Theme options: 12 header styles, 4 footer styles, site style, header top text, search keywords, footer site features and a promotion strip
- New **Style** and **Layout** options for the `simple-slider`, `site-features`, `featured-product-categories`, `theme-ads`, `product-category-products`, `product-collections`, `flash-sale`, `featured-brands`, `testimonials`, `download-app` and `blog-posts` blocks. The default style keeps the original look
- 8 new `ecommerce-*` blocks: deal hot, products of category, product box, categories box, search trending, image link grid, brands + testimonial and recently viewed strip
- Demo content translated into Arabic, Vietnamese, French, Indonesian and Turkish for every homepage demo
- Demo seeders moved to `database/seeders/Themes/Main` (namespace `Database\Seeders\Themes\Main`). If you override a demo seeder, move your copy and update its namespace. See [Seeder namespace change](./usage-homepage.md#seeder-namespace-change)
