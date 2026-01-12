# Add to Cart via URL

This feature allows customers to add products to cart by accessing a URL. When the URL is accessed, the product is automatically added to the cart and the customer is redirected to the cart page.

## Basic Usage

```
/cart/add/{product-id-or-slug}
```

### Examples

```
# By product ID
/cart/add/123

# By product slug
/cart/add/sample-product-slug

# With quantity
/cart/add/123?qty=3
```

## Product Variations (Attributes)

For products with variations, you can specify attributes using their slugs:

```
/cart/add/{product}?{attribute_set_slug}={attribute_slug}
```

### Examples

```
# Single attribute
/cart/add/laptop?color=black

# Multiple attributes
/cart/add/laptop?color=black&size=large

# With quantity
/cart/add/laptop?color=black&size=large&qty=2
```

**Note:** If no attributes are specified, the default variation will be used.

## Product Options

For products with options (RAM, CPU, etc.), you can specify options using slugified names:

```
/cart/add/{product}?{option_name_slug}={option_value_slug}
```

### Examples

```
# Single option
/cart/add/laptop?ram=16gb

# Multiple options
/cart/add/laptop?ram=16gb&cpu=core-i5

# Checkbox options (comma-separated)
/cart/add/laptop?addons=warranty,insurance
```

**Note:** If no options are specified, the first/default value for each option will be used automatically.

## Combined Usage

You can combine attributes and options in the same URL:

```
/cart/add/laptop?color=black&storage=512gb&ram=16gb&cpu=core-i7&qty=2
```

## URL Parameters Reference

| Parameter | Description | Example |
|-----------|-------------|---------|
| `qty` | Quantity to add (default: 1) | `qty=3` |
| `{attribute_set_slug}` | Attribute set slug = attribute slug | `color=red` |
| `{option_name_slug}` | Option name slug = option value slug | `ram=16gb` |

## Share URL with Options

On the product detail page, when customers select attributes or options:

1. The URL automatically updates with the selected values
2. The "Copy link" button in the share section copies the full URL with selections
3. Customers can share the URL and recipients will see the same selections

### Example Flow

1. Customer visits `/products/laptop`
2. Selects Color: Black, RAM: 16GB, CPU: Core i7
3. URL updates to `/products/laptop?color=black&ram=16gb&cpu=core-i7`
4. Customer clicks "Copy link" to share
5. Recipient opens URL and sees same selections pre-selected

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Product not found | Redirect to cart with error message |
| Out of stock | Redirect to cart with error message |
| Max quantity exceeded | Redirect to cart with error message |
| Invalid attribute/option | Uses default value instead |

## Technical Notes

- Options and attributes are matched by their slugified names (lowercase, hyphenated)
- URL updates only happen on product detail page, not in quick shop modals
- Browser back/forward buttons preserve option/attribute selections
