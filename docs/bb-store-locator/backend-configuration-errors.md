---
title: Common backend configuration errors
description: Server and admin-side settings that stop the map rendering, stores appearing, or imports and geocoding completing
---

# Common backend configuration errors

Most "the locator does not work" reports are a server or admin setting, not a bug in the plugin. Each section below is symptom, cause, fix.

If a single store is missing or the hours look wrong, start with [Troubleshooting](./troubleshooting.md) - that covers per-store problems. This page covers setup and server-side configuration.

## Quick reference

| What you see | Likely cause |
|---|---|
| Map area is blank or unstyled | Plugin assets not published |
| Map tiles look torn or stretched | Theme applies `img { max-width: 100% }` to every image |
| Map opens in the middle of the ocean | Default latitude and longitude left at `0, 0` |
| Google map is a grey box | Map provider set to Google with no JavaScript key, or the key is referrer-restricted |
| Stores are listed but never on the map | Those stores have no coordinates |
| Nothing appears until the visitor searches | **Search requires location** is on, or `first_load` is `none` |
| "Use my location" does nothing | Site is not served over HTTPS |
| "Fetch from address" returns nothing | Geocoding provider is Manual, has no credentials, or Nominatim consent is unticked |
| Imported rows are rejected | Column headings or values do not match the example file |
| Imported stores have no coordinates | The geocoding provider forbids bulk lookups |
| Re-importing created duplicates | No `external_id` column in the file |
| Address autocomplete never suggests | Public suggestions disabled, or the visitor hit the rate limit |
| REST API returns `503` | The site-wide API switch is off |
| Store detail pages 404 | Slug prefix changed without clearing the cache |
| Changes do not show on the front end | Page or view cache still holding the old output |

## Map area is blank or unstyled

**Symptom.** The page shows plain unstyled text where the locator should be, and no map.

**Cause.** The plugin's CSS and JavaScript are published to `public/vendor/core/plugins/bb-store-locator/` when the plugin is activated. If that folder is missing or stale, nothing styles or initialises.

**Fix.** Re-publish the assets and clear the cache:

```bash
php artisan cms:plugin:assets:publish bb-store-locator
php artisan cache:clear
```

Then hard-reload the page (**Cmd/Ctrl + Shift + R**). Confirm `public/vendor/core/plugins/bb-store-locator/` exists and contains `css/` and `js/`.

If your deployment ships a pre-built `public/` directory, make sure that folder is not excluded by your deploy script or `.gitignore`.

## Map tiles look torn or stretched

**Symptom.** The map renders but the tiles are scattered, squashed or overlapping.

**Cause.** Many themes apply `img { max-width: 100% }` to every image on the page. Map tiles are images, and that rule breaks their layout.

**Fix.** The plugin already overrides this for the map container. If your theme wins with `!important`, target it specifically in your theme's custom CSS:

```css
.leaflet-container img {
    max-width: none !important;
}
```

## Map opens in the middle of the ocean

**Symptom.** The map loads centred on empty sea before any search.

**Cause.** **Default latitude** and **Default longitude** are still `0, 0`, which is a point in the Gulf of Guinea.

**Fix.** Set **Default latitude**, **Default longitude** and **Default zoom** under **Settings → Store Locator (Map)** to the middle of your trading area.

## Google map is a grey box

**Symptom.** Map provider is set to Google and the map area is grey or blank.

**Cause.** Either no Maps JavaScript key is configured, or the key exists but Google is rejecting it.

**Fix.**

- With no key configured the plugin falls back to Leaflet automatically, so a grey box means a key *is* set and Google is refusing it.
- Open the browser console (**F12**) and read Google's error. `RefererNotAllowedMapError` means your domain is not in the key's HTTP referrer allowlist. `ApiNotActivatedMapError` means the Maps JavaScript API is not enabled on the Cloud project. `BillingNotEnabledMapError` means the project has no billing account.
- Fix the key in the Google Cloud console, or switch **Map provider** back to Leaflet, which needs no key at all.

Remember the two Google keys are different: the **Maps JavaScript key** is public and belongs in the Map section; the **geocoding key** is server-side only and belongs in the Geocoding section. Do not paste the same unrestricted key into both.

## Stores are listed but never on the map

**Symptom.** The store appears in the list and in search results, but no pin is drawn and it never shows in a distance search.

**Cause.** The store has no latitude and longitude. Coordinates are what put a store on the map.

**Fix.** Find them all at once: **Tools → Export/Import Data → Export Stores**, tick **Only stores missing coordinates**. Fill in the two columns and import the file back, or see [Geocoding](./usage/geocoding.md) to resolve them automatically.

Also confirm the store is **Published**, and that any category filter on that locator actually includes it.

## Nothing appears until the visitor searches

**Symptom.** The locator loads with an empty result list even though stores exist.

**Cause.** This is deliberate on large networks. Either **Search requires location** is enabled in settings, or the shortcode carries `first_load="none"`.

**Fix.** Turn off **Search requires location** under **Settings → Store Locator (Map)**, or remove `first_load="none"` from the shortcode.

## "Use my location" does nothing

**Symptom.** The button does not prompt for permission and no location is detected.

**Cause.** Browsers only expose geolocation on a **secure origin** - `https://`, or `localhost` during development. On a plain `http://` site the permission prompt never appears.

**Fix.** Serve your site over HTTPS. If you are already on HTTPS, the visitor has blocked location for your site and must re-enable it in their browser settings. The locator detects both cases and explains them in place rather than failing silently.

## "Fetch from address" returns nothing

**Symptom.** Clicking **Fetch from address** on the store editor leaves the coordinates empty.

**Cause and fix,** in the order worth checking:

1. **Geocoding provider** is still *Manual*. That performs no lookups by design. Choose Google, Mapbox or Nominatim.
2. The provider has no credentials, or they are wrong. Google needs a server-side geocoding key; Mapbox needs an access token.
3. Nominatim is selected but the **consent** box is unticked, or no **user agent** is set. Both are required by the OpenStreetMap usage policy.
4. The address is too vague. Add a postcode.

Admin geocoding is rate limited to 30 requests per minute to stop a low-privilege account draining your paid quota.

## Imported rows are rejected

**Symptom.** The import screen reports invalid rows.

**Cause.** The headings or values do not match what the importer expects.

**Fix.** Download the example CSV from the import screen and compare headings - they must match exactly. The most common value problems:

- `status` must be `published`, `draft` or `pending`
- `latitude` must be between -90 and 90, `longitude` between -180 and 180
- `website` must be a full URL including `https://`
- Opening-hours cells must look like `09:00-18:00`, `08:00-12:00, 13:00-17:00`, `24h` or `Closed`

If the file is large and the import times out or exhausts memory, lower the **chunk size** on the import screen from its default of 25.

## Imported stores have no coordinates

**Symptom.** Rows import successfully but arrive without coordinates and marked *pending*.

**Cause.** Rows without coordinates are geocoded during import only when the configured provider permits bulk lookups. Nominatim's usage policy forbids it, so the plugin refuses rather than breaching the policy on your behalf.

**Fix.** Switch to Google or Mapbox and run the bulk command, or fill the coordinates in by export and re-import:

```bash
php artisan cms:store-locator:geocode --limit=200
```

## Re-importing created duplicates

**Symptom.** Importing a corrected file created a second copy of every branch.

**Cause.** The file has no `external_id` column, so the importer fell back to matching on name - and a renamed branch looks like a new one.

**Fix.** Add a stable `external_id` per branch (a franchise number, an internal reference, anything that does not change) and re-imports will update in place. See [Import and export](./usage/import-export.md).

## Address autocomplete never suggests

**Symptom.** Typing in the visitor-facing search box produces no suggestions.

**Cause.** Either **Enable public suggestions** is off, the geocoding provider is Manual, or the visitor has exceeded the rate limit.

**Fix.** Turn on **Enable public suggestions** and select a geocoding provider. The public suggestion endpoint is limited to 60 requests per minute per visitor so it cannot be used to drain your quota; that limit is deliberate and not configurable.

## REST API returns 503

**Symptom.** Every `/api/v1/store-locator/...` endpoint answers `503 API is currently disabled`.

**Cause.** Botble has a **site-wide** API switch that is separate from this plugin's own **Enable API** setting. A `503` is the site-wide one.

**Fix.** Enable the API in your site's API settings, then confirm **Enable API** is also on under **Settings → Store Locator (Map)**. A `404` from those endpoints means the plugin-level switch is off.

## Store detail pages 404

**Symptom.** `/store-locations/{slug}` returns 404 although the store is published.

**Cause.** The **slug prefix** was changed and the route or page cache still holds the old paths.

**Fix.** Clear the cache after changing the prefix:

```bash
php artisan cache:clear
php artisan route:clear
```

Also confirm the store is Published, and that no other content already owns that slug.

## Changes do not show on the front end

**Symptom.** Edits in the admin panel are not visible on the site.

**Cause.** Botble caches rendered pages and compiled views.

**Fix.**

```bash
php artisan cache:clear
php artisan view:clear
```

Then hard-reload. If your host runs OPcache it may need a moment, or a PHP-FPM reload.

Searching and filtering run in the browser against a JSON endpoint, so full-page caching is safe and does not need to be disabled for the locator to give each visitor correct results.

## Still stuck

Open a ticket at [botble.ticksy.com](https://botble.ticksy.com) with your Botble version, PHP version, plugin version, the theme you use, and a screenshot that includes the browser console (**F12 → Console**).
