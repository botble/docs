# Map providers and tiles

## You do not need an API key

Out of the box the locator uses **Leaflet** with OpenStreetMap tiles. There is nothing to sign up for, no billing account, and no key to rotate. For most sites this is the right answer permanently.

## Tile choices

Set under **Settings → Store Locator (Map) → Tile provider**.

| Provider | Character | Key needed |
|---|---|---|
| **OpenStreetMap** | The familiar default. Detailed, neutral | No |
| **Carto Light** | Muted and pale. Good when coloured markers must stand out | No |
| **Carto Dark** | Dark basemap for dark-themed sites | No |
| **Google** | Google's own tiles, through the Leaflet renderer | No |
| **Custom** | Any XYZ tile server - Stadia, Thunderforest, MapTiler, your own | Depends |

::: warning Attribution is not optional
Every provider requires visible credit, and the plugin always renders it. If you use a **Custom** provider, fill in the attribution field with whatever that provider's terms require. Removing attribution violates their licence, and for OpenStreetMap it violates the ODbL.
:::

Check the terms of any tile source before using it on a commercial site. Free tiers usually cap requests, and some forbid commercial use entirely.

## Leaflet or the Google Maps API

**Map provider** picks the renderer.

- **Leaflet** - the default. No key, no billing, works everywhere.
- **Google Maps** - the Google Maps JavaScript API. Adds Google's own controls, Street View integration and their place data. Requires a JavaScript API key **and** a billing account on Google Cloud.

If you select Google and leave the key empty, the locator falls back to Leaflet instead of rendering an empty grey box.

### Two different Google keys

This trips people up, so it is worth being explicit:

| Key | Where it goes | Visibility |
|---|---|---|
| **Maps JavaScript key** | Map provider section | Public - it is sent to the browser, by design |
| **Geocoding key** | Geocoding section | Server-side only, never sent to the browser |

Do not paste the same unrestricted key into both. Restrict the JavaScript key by HTTP referrer in the Google Cloud console, and restrict the geocoding key by IP.

## Clustering

**Enable clustering** groups nearby pins into a numbered circle that splits apart as you zoom in. Both renderers support it.

Turn it on for anything above roughly 30 stores. Without it, a dense city centre becomes a pile of overlapping pins where nothing is clickable.

## Where the map opens

**Default latitude**, **Default longitude** and **Default zoom** decide the first view, before any search. Set them to the middle of your trading area - not the middle of the ocean, which is what `0, 0` gives you.

## No external scripts

The plugin bundles Leaflet locally and never loads anything from a CDN. The only outbound requests a visitor's browser makes are for map tiles from the provider you chose, and to Google's API when you have explicitly selected the Google renderer.
