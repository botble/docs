# UI Block

UI Block (Shortcodes) allows you to build and customize page content using pre-built components. SnapCart provides
8 shortcodes designed for mobile-focused ecommerce layouts.

## Managing UI Blocks

To manage UI blocks on a page, go to `Pages` in the admin panel, edit your desired page, and click the
`UI Block` button to add or rearrange shortcodes.

## Available Shortcodes

### Hero Carousel

Display a banner slider at the top of the homepage. Slides (images, titles, and call-to-action buttons) are managed
in the **Simple Slider** plugin (`Simple Sliders` in the admin panel).

To configure, click on the shortcode and set:

- **Slider Key** (`slider_key`): The key of the Simple Slider to display
- **Show Newsletter Form** (`show_newsletter_form`): Show a newsletter subscription form instead of the Shop Now button

### Featured Products

Display a grid, slider, or list of featured products. Products are pulled from the featured product collection.

- **Title**: Section heading
- **Number of products**: How many products to display
- **Style** (`style`): Display style — `grid` (default), `slider`, or `list`. The `list` style renders horizontal cards with
  product image, title, a 2-line description (HTML stripped), price, and an add-to-cart button.

### Product Categories

Display product categories in tabs, grid, table, or list layout. Useful for organizing your store's main categories
on the homepage.

- **Title**: Section heading
- **Layout** (`style`): Choose between `tabs`, `grid`, `table`, or `list`. The `list` style renders horizontal cards
  with product image, title, a 2-line description (HTML stripped), price, and an add-to-cart button.
- **Categories**: Select which categories to show

### Flash Sale

Display flash sale products with a countdown timer. Creates urgency for time-limited deals.

- **Title**: Section heading
- **Flash sale**: Select the flash sale campaign to display
- **Slides to show** (`slides_to_show`): Number of product cards visible at once in the horizontal scroll — accepts
  `1`, `2` (default), `3`, or `4`.

### Reviews Section

Display customer testimonials and reviews on the homepage. Each review card shows a decorative quotation mark,
5-star rating, and the review text.

- **Title**: Section heading
- **Number of Reviews** (`limit`): How many reviews to display
- **Minimum Stars** (`min_stars`): Only show reviews with this rating or higher
- **Display Style** (`style`): `grid` or `slider`

### Ecommerce Categories

Display a listing of product categories with icons or images.

- **Title**: Section heading
- **Categories**: Select categories to show

### Ecommerce Brands

Display brand logos on the homepage. Useful for showcasing partner or featured brands.

- **Title**: Section heading
- **Brands**: Select brands to display

### Blog Posts

Display the latest blog posts. Keeps your homepage fresh with content updates.

- **Title**: Section heading
- **Number of posts**: How many posts to display
