# Wishlist & Product Compare

Wishlist and product comparison features help customers save products for later and make informed purchase decisions by comparing multiple products side-by-side.

## Overview

These features allow customers to:

- **Wishlist** - Save favorite products for future purchase
- **Compare** - View multiple products side-by-side to compare specifications
- **Share wishlists** - Generate shareable links to wish lists (optional)

## Wishlist Feature

### How It Works

**For logged-in customers:**
- Wishlist is saved to their account
- Accessible across devices
- Persists until manually removed

**For guest visitors:**
- Wishlist is stored in browser session
- Lost when clearing cookies/browsing data
- Converts to account wishlist upon login

### Adding Products to Wishlist

Customers can add products by:
- Clicking the heart/wishlist icon on product cards
- Clicking "Add to Wishlist" button on product detail pages
- Using quick-add buttons in product grids

**Behavior:**
- First click: Adds product to wishlist
- Second click: Removes product from wishlist (toggle)
- Feedback message confirms the action

### Viewing Wishlist

Customers access their wishlist via:
- Wishlist page at `/wishlist` route
- Wishlist icon in site header (shows count badge)
- Customer account dashboard

**Wishlist page displays:**
- Product images
- Product names
- Current prices
- Stock status
- Add to cart buttons
- Remove from wishlist buttons

### Managing Wishlist Items

Customers can:
- Remove individual items (click X or heart icon)
- Add items directly to cart from wishlist
- Continue shopping to find more products

**Wishlist count badge:**
- Updates in real-time when items are added/removed
- Displayed in header navigation
- Shows total unique products in wishlist

::: tip
Wishlist data is stored in the `ec_wish_lists` table for logged-in customers, and in the cart session under the `wishlist` instance for guests.
:::

## Shared Wishlist (Public Wishlists)

If enabled in settings, customers can share their wishlists with others.

### Enabling Wishlist Sharing

Check your ecommerce settings for the **Enable wishlist sharing** option (usually in general or shopping settings).

### How Sharing Works

1. Customer adds products to their wishlist
2. Customer generates a shareable link
3. Link is copied and shared via email/social media
4. Recipients view the wishlist without logging in
5. Recipients can add items to their own cart

**Shared wishlist URLs:**
- Format: `/wishlist/{unique-code}`
- Unique code is auto-generated
- No authentication required to view

**Shared wishlist features:**
- View-only for recipients
- Cannot remove items from shared list
- Products link to full product pages
- Add to cart functionality available

**Lifetime & Cleanup:**
- Shared wishlists auto-expire after configured days
- Default lifetime can be configured in settings
- Expired shares are auto-pruned from database

::: warning
Recipients cannot modify shared wishlists. They can only view products and add them to their own cart.
:::

## Product Compare Feature

### How It Works

Customers can compare up to **10 products** side-by-side to evaluate:
- Product specifications
- Prices
- Attributes
- Features
- Images

Compare is session-based (not saved to account, even for logged-in customers).

### Adding Products to Compare

Customers can add products by:
- Clicking the compare/scale icon on product cards
- Clicking "Add to Compare" button on product pages
- Using quick-add buttons in listings

**Behavior:**
- Products are added to compare list
- Compare count badge updates in header
- Duplicate products cannot be added (shows error message)
- Limit: 10 products maximum

::: tip
If a customer adds a product variant, the system automatically uses the parent product instead. Variants are not compared individually.
:::

### Viewing Product Comparison

Customers access the comparison table via:
- Compare page at `/compare` route
- Compare icon in site header (shows count badge)
- Notification message after adding product

**Comparison table displays:**

| Column | Description |
|--------|-------------|
| Product Image | Thumbnail image |
| Product Name | Clickable link to product page |
| Price | Current price (with sale price if applicable) |
| Attributes | Product attribute sets (color, size, material, etc.) |
| Specifications | Product specifications/features |
| Add to Cart | Quick add to cart button |
| Remove | Remove from comparison |

### Attribute Comparison

The compare table shows attribute sets that exist across the selected products:

**Example:** Comparing 3 laptops might show:
- **Processor** - Intel i5 | Intel i7 | AMD Ryzen 5
- **RAM** - 8GB | 16GB | 8GB
- **Storage** - 256GB SSD | 512GB SSD | 1TB HDD
- **Screen Size** - 13.3" | 15.6" | 14"

**How attributes are displayed:**
- Only common attribute sets are shown
- Each product's value appears in its column
- Missing attributes show as empty cells

::: tip
To maximize comparison usefulness, ensure product attributes are properly configured in `Ecommerce` -> `Attributes`.
:::

### Managing Comparison

Customers can:
- Remove individual products from comparison
- Clear entire comparison list
- Add products directly to cart from comparison table
- Return to shopping to add more products

**Compare count badge:**
- Updates in real-time
- Shows total products in comparison
- Displayed in header navigation

## Login Requirements

| Feature | Guest Access | Customer Login Required |
|---------|-------------|-------------------------|
| **Wishlist (view)** | ✓ Session-based | ✓ Account-based |
| **Wishlist (persist)** | ✗ Lost on logout | ✓ Saved permanently |
| **Shared Wishlist (view)** | ✓ Public link | ✓ Public link |
| **Shared Wishlist (create)** | ✗ No | ✓ Yes |
| **Product Compare** | ✓ Session-based | ✓ Session-based |

::: warning
Guest wishlists are stored in browser sessions and will be **lost** if the customer clears cookies or switches devices. Encourage customers to log in to save their wishlist permanently.
:::

## Configuration

### Wishlist Settings

Navigate to `Ecommerce` -> `Settings` to configure:

| Setting | Description |
|---------|-------------|
| **Enable wishlist sharing** | Allow customers to generate public wishlist links |
| **Shared wishlist lifetime** | Days before shared wishlist links expire (default: varies) |

### Compare Settings

Compare attributes are automatically detected from:
- Product attribute sets configured in `Ecommerce` -> `Attributes`
- Product specifications (if using product specification plugin)

**No additional configuration required** - the compare feature works out-of-the-box once products have attributes assigned.

## Technical Details

### Data Storage

**Wishlist:**
- **Logged-in customers:** `ec_wish_lists` table (customer_id, product_id)
- **Guest visitors:** Cart session with `wishlist` instance
- **Shared wishlists:** `ec_shared_wishlists` table (code, product_ids JSON array)

**Compare:**
- **All users:** Cart session with `compare` instance
- Session-based only (not persisted to database)

### Session Cleanup

**Wishlist:**
- Guest wishlist sessions follow cart expiration settings
- Customer wishlists persist indefinitely
- Shared wishlists auto-expire per configured lifetime

**Compare:**
- Compare lists expire with browser session
- Cleared when customer logs out or clears cookies

## Frontend Integration

### Theme Requirements

Your theme must include:
- Wishlist page template
- Compare page template
- Add to wishlist buttons/icons
- Add to compare buttons/icons
- Wishlist/compare count badges in header

**Default templates:**
- `plugins/ecommerce::themes.wishlist` - Wishlist page
- `plugins/ecommerce::themes.compare` - Compare page

Theme can override these templates in:
- `platform/themes/{your-theme}/views/ecommerce/wishlist.blade.php`
- `platform/themes/{your-theme}/views/ecommerce/compare.blade.php`

### JavaScript Events

The system uses AJAX for wishlist/compare actions. Typical flow:

1. Customer clicks wishlist/compare icon
2. JavaScript sends AJAX request
3. Server updates wishlist/compare data
4. Response includes updated count
5. UI updates icon state and count badge

## Frequently Asked Questions

### Can customers name or organize wishlists?

No. The system supports a single wishlist per customer. Multiple wishlists or wishlist folders are not supported.

### Do wishlists sync across devices?

Yes, for logged-in customers. Guest wishlists are session-based and do not sync.

### Can I see customer wishlists in admin panel?

Yes. View customer details at `Ecommerce` -> `Customers` -> select customer. The wishlist is shown in customer profile (if implemented by theme/customization).

### How many products can be in a wishlist?

No hard limit. Customers can add as many products as they want to their wishlist.

### Can customers receive notifications when wishlist items go on sale?

Not by default. This requires custom development or a third-party plugin.

### Can customers add out-of-stock products to wishlist?

Yes. Wishlist does not check stock status when adding products.

### What happens to wishlist when product is deleted?

Wishlist entries are automatically removed when associated products are deleted.

### Can I disable compare but keep wishlist?

Yes. Simply don't display compare buttons in your theme. The backend supports both features independently.

### How do I customize compare attributes shown?

Attributes are auto-detected from product attribute sets. Configure these in `Ecommerce` -> `Attributes` and assign them to products.

## Best Practices

1. **Encourage login** - Prompt guest users to create accounts to save wishlists permanently

2. **Wishlist reminders** - Consider setting up email reminders for items left in wishlists (requires custom development)

3. **Compare limits** - The 10-product limit prevents overwhelming customers with too many options

4. **Stock alerts** - Integrate wishlist with inventory notifications to alert customers when items are back in stock

5. **Share wishlists** - Encourage wishlist sharing for gift registries or wedding registries

6. **Mobile optimization** - Ensure wishlist and compare pages are mobile-friendly for on-the-go browsing

7. **Clear UI** - Make wishlist and compare icons easily discoverable on product listings and detail pages
