# Delivery Time Picker

SnapCart features a built-in delivery time picker at checkout, allowing customers to choose their preferred delivery
date and time slot.

## How It Works

During checkout, customers can select:

1. **Delivery Date**: Choose a date from available delivery days
2. **Time Slot**: Pick a time window within the selected date

The available time slots are based on your store's delivery hours and peak hour configuration.

## Configuration

To configure the delivery time picker, go to `Appearance` -> `Theme Options` -> `Delivery`.

### Available Settings

- **Start Hour**: The earliest delivery hour as a number (default: `13` for 1:00 PM)
- **End Hour**: The latest delivery hour as a number (default: `20` for 8:00 PM)
- **Normal Delivery Fee**: Standard delivery fee (default: `31000`)
- **Peak Delivery Fee**: Higher fee applied during peak hours (default: `34000`)
- **Peak Hours**: Comma-separated hour numbers when peak fees apply (default: `14,15,18,19`)
- **Free Shipping Threshold**: Minimum order amount for free delivery (default: `500000`)

## Enable/Disable

Toggle the delivery time picker in `Appearance` -> `Theme Options` -> `Features` -> **Delivery Time Picker**.

::: tip
Setting a free shipping threshold encourages larger orders. A common strategy is to set it slightly above your
average order value.
:::
