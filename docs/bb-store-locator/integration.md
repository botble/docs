# Working with other plugins

BB Store Locator has **no required dependencies**. It runs on a blog, a hotel site, a real estate portal, a job board, a plain CMS install or a full ecommerce store.

Where another plugin happens to be installed, the locator uses it. Nothing is ever gated behind one.

| Plugin | What changes when it is present |
|---|---|
| *(none)* | Country, state and city are free-text fields. Settings live under **Others**. Everything works |
| **Location** | Country, state and city become cascading dropdowns |
| **Language / Language Advanced** | Store name, description, content and address become translatable |
| **Ecommerce** | The settings entry joins the commerce group, titled *Store Locator (Map)* |
| **SEO Helper** | Per-store meta titles and descriptions, on by default |
| **Sitemap** | Store pages are included, controlled by the sitemap setting |

## Location plugin

With **Location** installed, the address fields become dropdowns populated from its data, and the region filter uses proper place names.

### Importing into a site that uses Location

A spreadsheet contains `"London"`, never a Botble location id. The importer translates: a place name that matches a Location record is stored as that record, and anything with no match is kept as plain text.

Either way the name displays correctly on the front end, and exports always write readable names rather than internal ids - so a file taken from one site imports cleanly into another.

## Ecommerce

The ecommerce plugin has its own *Store locator* - a list of shipping origins used to calculate delivery. It is not a customer-facing map, and the two do not conflict. This plugin's settings entry is titled **Store Locator (Map)** to keep them apart.

## Translations

With **Language Advanced**, each store's name, description, content and address can be translated per language. Categories are translatable too.

The plugin ships with English. Translate the interface through **Tools → Translations → Other translations**, or by adding a locale folder under `platform/plugins/bb-store-locator/resources/lang/`.

Right-to-left languages are fully supported; the locator loads a mirrored stylesheet automatically when the site direction is RTL.

## Themes

The locator brings its own styles, scoped so a theme cannot break them and they cannot leak into a theme. It reads light and dark automatically, following the visitor's system preference and any `data-bs-theme` or `data-theme` attribute your theme sets.

No CDN is used. Leaflet is bundled locally, so the plugin adds no third-party script dependency to your site.

## Caching

The locator is safe behind full-page caching: the map, search and filters all run in the browser against a JSON endpoint, so a cached HTML page still gives every visitor correct, personal results.
