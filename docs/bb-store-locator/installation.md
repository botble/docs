# Installation

## Requirements

- Botble CMS 7.4.0 or higher
- PHP 8.3 or higher

No other plugin is required.

## Install the plugin

1. Download the plugin from your CodeCanyon downloads page and extract the archive. Inside you will find `main.zip` - that is the plugin.
2. In your admin panel go to **Plugins → Installed plugins → Add new**, upload `main.zip`, and click **Activate**.

::: tip Installing manually
If you prefer to upload by FTP, extract `main.zip` into `platform/plugins/bb-store-locator` so that `plugin.json` sits directly inside that folder, then activate the plugin from **Plugins**.
:::

Activation creates the database tables and publishes the plugin's CSS and JavaScript. A new **Store Locator** entry appears in the admin sidebar.

## Add your first store

Go to **Store Locator → Stores → Create**, then fill in:

- **Name** and **Address**
- **Coordinates** - click **Fetch from address**, or drag the pin on the map

![Store editor](./images/11-admin-store-map.png)

Coordinates are what put a store on the map. A store without them is saved and listed, but never appears as a pin.

## Put the locator on a page

Create a page (**Pages → Create**) and add the shortcode:

```
[store-locator][/store-locator]
```

Publish the page and visit it. That is the whole setup - the locator works immediately, with no API key.

::: tip Give it the full width
Most themes offer a "No sidebar" or full-width page template. The split layout puts the list beside the map, which needs the room.
:::

## Optional: configure it

**Settings → Store Locator (Map)** controls the map provider, default location and zoom, distance units, which fields appear on cards, and much more. See [Configuration](./configuration.md).

## Bulk loading many stores

If you already have your branches in a spreadsheet, do not add them by hand - see [Import & export](./usage/import-export.md).

## Updating

1. Download the latest version from CodeCanyon
2. Go to **Plugins → Installed plugins**, find **BB Store Locator** and use **Update**, or upload the new `main.zip`
3. Clear your browser cache

Your stores, categories and settings are preserved across updates.
