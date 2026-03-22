# Add to Cart via URL

Allow customers to add products to their cart directly through a URL. Useful for marketing campaigns, email
promotions, and social media links.

## URL Format

```
https://your-domain.com/cart/add/{product_id}
```

## Parameters

- **product_id**: The product ID to add
- **qty**: Quantity (optional, defaults to 1)

## Example

```
https://your-domain.com/cart/add/1?qty=2
```

This adds product #1 with quantity 2 to the cart.

## Use Cases

- **Email campaigns**: Include direct add-to-cart links in promotional emails
- **Social media**: Share product links that add directly to cart
- **QR codes**: Generate QR codes with add-to-cart URLs for offline marketing

::: tip
Combine add-to-cart URLs with discount codes for powerful one-click promotional campaigns.
:::
