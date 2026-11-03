# Configuration

All settings live at **Settings → Store Locator (Map)**.

On an ecommerce site the entry sits in the commerce group and is titled *Store Locator (Map)* to distinguish it from the shipping-origin store list that the ecommerce plugin owns. On every other Botble site it sits under **Others**.

![Settings](./images/15-admin-settings.png)

## Map

| Setting | What it does |
|---|---|
| **Map provider** | **OpenStreetMap (no API key)** (Leaflet, default) or **Google Maps**. Google needs a JavaScript API key; without one the locator falls back to Leaflet rather than showing an empty box. |
| **Google Maps browser key** | Only used when the provider is Google. This key is public by design - restrict it by HTTP referrer in the Google Cloud console. |
| **Google Maps Map ID** | Optional. Enables cloud-based map styling. |
| **Map tiles** | OpenStreetMap, CARTO Light, CARTO Dark, Google Maps tiles or Custom tile URL. Applies to the Leaflet renderer. |
| **Custom tile URL** / **Tile attribution** | Only shown for the *Custom tile URL* option. Attribution is mandatory - see [Map providers](./usage/map-providers.md). |
| **Default latitude / longitude** | Where the map opens before any search. |
| **Default zoom**, **Minimum zoom**, **Maximum zoom** | Opening zoom level and the limits a visitor can reach. |
| **Group nearby markers** | Groups nearby pins into a numbered circle. Keep this on for more than about 30 stores. |
| **Zoom with the scroll wheel** | Turn off if the map sits in a long page and hijacks scrolling. |

## Markers

| Setting | What it does |
|---|---|
| **Marker shape** | Pin, Teardrop, Circle, Rounded square, Tag or Small dot. Generated as SVG, so they stay crisp on any display. |
| **Marker colour** | A hex colour such as `#e11d48`. A store's category colour overrides it, and an uploaded marker image overrides both. |
| **Show the store image in the map popup** | Shows the store's logo, or its first gallery image, inside the map popup. |

## Geocoding

Geocoding converts a written address into coordinates. See [Geocoding](./usage/geocoding.md) for the full picture.

| Setting | What it does |
|---|---|
| **Geocoding provider** | Enter manually (no external service), Google Geocoding API, Nominatim (OpenStreetMap) or Mapbox. |
| **Google Geocoding key (server-side)** | Server-side only. Never sent to the browser - keep it separate from the JavaScript key above. |
| **Mapbox access token** | Server-side only. |
| **Nominatim endpoint** / **Nominatim User-Agent** | Required by the OpenStreetMap usage policy. |
| **I accept the Nominatim usage policy** | You must confirm you accept the usage policy before Nominatim will run. Bulk geocoding stays disabled for Nominatim either way. |
| **Restrict searches to country** | An ISO country code that biases results, e.g. `GB`. |
| **Enable address autocomplete on the storefront** | Address autocomplete in the visitor-facing search box. Turn it off to keep geocoding quota for the admin panel only. |

## Search and results

| Setting | What it does |
|---|---|
| **Layout** | The default layout - see [Layouts](./usage/layouts-and-shortcode.md). |
| **Distance unit** | Kilometres or miles. |
| **Default search radius** / **Maximum search radius** | The starting search distance and the furthest a visitor may set. |
| **Results per page** | Maximum stores returned per search (capped at 100). |
| **Visitor location** | Never ask, Ask on request or Ask on page load. Browsers only allow location lookup over HTTPS. |
| **Show a directions button** | Shows a Directions link that opens the route in Google Maps. |
| **Hide these fields on the storefront** | Ticked fields (logo, categories, hours, phone, email...) are hidden from store cards and map popups. The data is kept. |
| **Require a search before showing results** | Show nothing until the visitor searches or shares their location. Useful for very large networks. |

## Opening hours

| Setting | What it does |
|---|---|
| **Time format** | 24-hour or 12-hour display. |
| **Opening hours display** | Today's hours, Full week or Grouped (collapses consecutive identical days into "Mon - Fri"). |
| **Show an "Open now" indicator** | The open/closed badge on cards and popups. |
| **Stores are in different timezones** | Adds a timezone field to each store. Turn this on for an international network, so "open now" is correct everywhere. |
| **Text shown for closed days** | Wording used for a closed day, e.g. "Rest day". |

## URLs and integration

| Setting | What it does |
|---|---|
| **URL prefix** | The path segment for store detail pages, default `store-locations`. |
| **Include stores in the sitemap** | Includes store pages in the XML sitemap. |
| **Enable the REST API** | Exposes the read-only REST endpoints - see [REST API](./usage/rest-api.md). |

## Per-page overrides

Many of these can be overridden on a single locator through shortcode attributes, without changing the site default. The allowed attributes are listed in [Layouts and the shortcode](./usage/layouts-and-shortcode.md).
