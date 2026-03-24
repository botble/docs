# Flash Sales

Flash sales create urgency with time-limited deals displayed with a countdown timer on the homepage.

## Creating a Flash Sale

1. In admin panel, go to `Ecommerce` -> `Flash Sales`
2. Click `Create`
3. Fill in the details:

- **Name**: Flash sale campaign name
- **End Date**: When the sale expires
- **Products**: Select products to include
- **Sale Price**: Set the discounted price for each product

4. Click `Save`

## Displaying on Homepage

To show flash sales on the homepage, add the **Flash Sale** shortcode to your homepage via [UI Block](./usage-ui-block.md).

The flash sale section displays:
- Product images and prices with original price crossed out
- Countdown timer showing time remaining
- Stock/sold indicators

### Slides to Show

The `slides_to_show` shortcode attribute controls how many product cards are visible at once in the horizontal scroll
area. Accepted values: `1`, `2` (default), `3`, `4`.

Example shortcode attribute:

```
slides_to_show="2"
```

Set a lower value (e.g., `1`) to make each card larger and more prominent, or a higher value (e.g., `3`–`4`) to show
more products at a glance on wider screens.

::: tip
Schedule flash sales during peak traffic hours for maximum visibility and conversions.
:::
