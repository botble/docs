# Catalog Mode & External Products

Catalog mode turns Amerce into a browsable catalog instead of a shop: products, categories, search and filters all keep working, but nothing can be added to a cart or checked out. It is the setup you want for a showroom site, a "contact us for a price" wholesaler, or an affiliate site where every product is bought somewhere else.

## Enabling catalog mode

Navigate to `Ecommerce` -> `Settings` -> `Shopping` and turn off **Enable shopping cart**.

That single switch is the whole feature. Its own description says it best: *"If disabled, the cart button will be removed, turning your site into a catalog-only display."*

When the cart is off, the settings that only make sense with a cart collapse out of the Shopping page - cart clearing on logout, order tracking, payment proof uploads, the quick buy button, order auto-confirmation and order deletion. Turning the cart back on restores them with your previous values.

## What changes on the storefront

Amerce reacts to the setting on its own. You do not need to edit templates or hide anything by hand.

| Area | With the cart on | With the cart off |
|------|------------------|-------------------|
| Product page | Quantity box, **Add to cart**, **Buy It Now** | All three are removed |
| Sticky product bar | Follows you down the page with **Add To Cart** | Hidden entirely |
| Product cards | Cart icon, quick shop for variable products | No cart icon, no quick shop |
| Cart page and cart URLs | Normal | Return a 404 |

The cart routes are blocked at the server, not just hidden in the theme, so `/cart`, `/cart/add-to-cart` and the [Add to Cart via URL](./usage-add-to-cart-url.md) links all return a 404 while catalog mode is on.

## What still works

Catalog mode only removes buying. Everything else on the storefront is untouched:

- **Wishlist** and **compare** - both have their own switches on the same Shopping settings page and are independent of the cart
- **Reviews**, **product specifications**, **product options** and **variations**
- **Prices**, unless you hide them (see below)
- **Search**, **filters**, **categories**, **brands** and vendor stores

## Hiding prices

For a "request a quote" catalog, turn on **Hide product price** on the same `Ecommerce` -> `Settings` -> `Shopping` page.

::: warning
**Hide product price** only takes effect while the shopping cart is disabled. On a site with the cart on, the switch does nothing.
:::

There is also **Hide product price when it is zero**, useful when only some products are priced.

## External products

An external product is one you list on your site but sell somewhere else - Amazon, Etsy, a manufacturer's store, or an affiliate link. Instead of a cart button, its page shows **Buy on External Store**, which opens your link in a new tab.

### With the cart on

Edit a product and fill in two fields:

1. **External product** - turn it on. The description reads *"Sell this product on another website."*
2. **External URL** - the link customers are sent to.

Only products with the toggle on behave as external. The rest of the catalog keeps its normal cart buttons, so you can mix affiliate products and your own stock on the same site.

### With the cart off

In catalog mode the **External product** toggle disappears from the product form, because it would be redundant: with no cart anywhere on the site, **any product that has an External URL automatically links out**. Fill in **External URL** and nothing else.

This is the closest thing to a site-wide "make everything external" setting - there is no separate global switch, and you do not need one.

### Where the button appears

Once a product counts as external, **Buy on External Store** replaces the cart button everywhere that product is rendered: the product page, product cards in every card style and view mode, quick shop, cross-sell and up-sell blocks, and the wishlist.

The link is opened with `target="_blank"` and `rel="nofollow noopener noreferrer"`, which is what affiliate programs generally expect.

::: warning
An external product that is **out of stock** shows the out-of-stock / back-in-stock block instead of the **Buy on External Store** button. Since stock is managed by whoever actually sells the product, leave external products in stock - either set the stock status to **In stock** or leave storehouse management off.
:::

## Removing other sections from the product page

The quantity box and cart buttons come off on their own in catalog mode. Other blocks are not tied to the cart and stay:

- **Color / size swatches** come from the product's [variations](./usage-product-variations.md). To remove them, delete the variations and keep the product simple. There is no admin switch that hides swatches on a variable product.
- **Wishlist** and **compare** buttons have their own switches on the Shopping settings page.
- Anything else can be hidden with a CSS rule in [Custom CSS](/cms/usage-custom-css-js).

## Related

- [Wishlist & Compare](./usage-wishlist-compare.md)
- [Product Variations](./usage-product-variations.md)
- [Theme Options](./usage-theme-options.md)
