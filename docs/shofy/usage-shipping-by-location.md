# Shipping Fee by Location

You can configure shipping fees based on the customer's location (country, state, city). This is useful when you want to set different shipping rates for different regions.

## Video Tutorial

<iframe width="100%" height="420" src="https://www.youtube.com/embed/L_ZHFXUbHTs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Setup Steps

### Step 1: Enable Location Plugin

Make sure the **Location** plugin is activated. Go to **Admin** -> **Plugins** and verify "Location" is enabled.

### Step 2: Import Location Data

Navigate to **Admin** -> **Locations** -> **Bulk Import** and import the country data for the regions you want to support.

This will populate the countries, states, and cities used for shipping zone configuration.

### Step 3: Enable Location-Based Shipping

Go to **Admin** -> **Settings** -> **Ecommerce** -> **General** and enable **Load countries, states, and cities from the Location plugin**.

This tells the checkout to use the Location plugin's data (with dropdowns for country/state/city) instead of free text fields.

### Step 4: Configure Shipping Fees

Go to **Admin** -> **Ecommerce** -> **Shipping** to set up shipping fees by location.

Here you can:

- Create shipping rules for specific countries, states, or cities.
- Set flat rates or weight-based rates per location.
- Configure free shipping thresholds for specific regions.

::: tip
You can create multiple shipping rules for different regions. The system will automatically match the customer's location to the correct rule during checkout.
:::
