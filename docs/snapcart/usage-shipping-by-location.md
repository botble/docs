# Shipping by Location

Configure different shipping rates based on customer location for precise delivery cost calculation.

## Setup

1. In admin panel, go to `Ecommerce` -> `Shipping`
2. Create shipping rules for different zones

## Creating Location-Based Rules

1. Click `Add shipping rule`
2. Set the rule name and base price
3. Click on the rule to expand location settings
4. Add location-specific rates:

- **Country**: Set rates per country
- **State/Province**: Set rates per state
- **City**: Set rates per city
- **Weight-based**: Different rates based on order weight

5. Click `Save`

## Priority

When multiple rules match a customer's location, the most specific rule applies (city > state > country).

::: tip
Combine location-based shipping with SnapCart's free shipping threshold in theme options for a complete
shipping strategy.
:::
