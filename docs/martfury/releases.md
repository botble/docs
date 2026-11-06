# Release Notes

## 1.42.0 (unreleased)

- **11 new homepage demos**: Marketplace 1 to 4, Technology, Electronic, Furniture, Organic, Auto parts, Kids and Medical, next to the default Home 1. Pick one in the web installer. See [Homepage demos](./usage-homepage.md).
- **Theme options reorganized** into **Header**, **Footer** and **Colors and typography** sections, with visual pickers for the **Header style** (12), **Footer style** (4) and **Homepage style** (12). See [Theme options](./usage-theme-options.md).
- **Header options**: top bar, header top text and search keywords; show or hide switches for the compare, wishlist, cart and account icons, hotline, recently viewed menu and sticky header; promotion strip with an image or a text block (discount, title, code and button).
- **Header and footer colors**: 9 header colors (empty uses the colors of the header style) and 11 footer colors. Footer newsletter text, footer social links text and footer site features.
- **Button text color** option in **Colors and typography**.
- **Style options for existing UI blocks**: simple slider (5 styles, including a feature row for Medicine), site features, featured product categories, theme ads (8/4 layout), product category products (boxed carousel layout), product collections and flash sale (columns and card style), featured brands, testimonials, download app (subscribe banner) and blog posts (homepage grid). The default style keeps the original look.
- **8 new `ecommerce-*` blocks**: deal hot, products of category, product box, categories box, search trending, image link grid, brands + testimonial and recently viewed strip. See [UI Blocks](./usage-ui-block.md).
- **Preview images** for the theme UI blocks in the block picker.
- **Demo content translated** into Arabic, Vietnamese, French, Indonesian and Turkish.
- **RTL and mobile fixes** for the homepage demos.
- **Fix**: the compare count updates after adding a product.
- **Demo seeders moved** to `database/seeders/Themes/Main` (namespace `Database\Seeders\Themes\Main`). If you override a demo seeder, move your copy and update its namespace. See [Seeder namespace change](./usage-homepage.md#seeder-namespace-change).
