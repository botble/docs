# Troubleshooting

## The map area is blank or unstyled

The locator's CSS and JavaScript are published when the plugin is activated. If the page shows plain unstyled text and no map, they are missing.

Re-publish them:

```bash
php artisan cms:plugin:assets:publish bb-store-locator
php artisan cache:clear
```

Then hard-reload the page (**Cmd/Ctrl + Shift + R**). Check that `public/vendor/core/plugins/bb-store-locator/` exists and contains `css/` and `js/`.

## Map tiles are scattered or stretched

Some themes apply `img { max-width: 100% }` to every image on the page. Map tiles are images, and that rule tears them apart.

The plugin overrides it for the map container. If you still see it, something in your theme is winning with `!important` - target it specifically:

```css
.leaflet-container img {
    max-width: none !important;
}
```

## Stores do not appear on the map

Almost always missing coordinates. A store without latitude and longitude is saved and listed, but never mapped.

Find them all at once: **Tools → Export/Import Data → Export Stores**, tick **Only stores missing coordinates**. Then see [Geocoding](./usage/geocoding.md).

Also check the store is **Published**, and that any category filter on that locator actually includes it.

## "Use my location" does nothing

Browsers only expose location on a **secure origin** - `https://`, or `localhost` during development. On a plain `http://` site the permission prompt never appears at all.

The locator detects this and explains it in place rather than failing silently. The fix is to serve your site over HTTPS.

If you are already on HTTPS, the visitor has probably blocked location for your site; it must be re-enabled in browser settings.

## The map shows the wrong part of the world

Set **Default latitude**, **Default longitude** and **Default zoom** to your trading area. Left at `0, 0` the map opens in the Gulf of Guinea.

## "Fetch from address" returns nothing

1. **Geocoding provider** is still *Manual* - it performs no lookups by design.
2. The provider has no credentials, or they are wrong.
3. Nominatim is selected but the **consent** box is unticked.
4. The address is too vague. Add a postcode.

## Import says rows are invalid

Download the example file from the import screen and compare headings - they must match exactly.

The most common causes:

- `status` must be `published`, `draft` or `pending`
- `latitude` must be between -90 and 90, `longitude` between -180 and 180
- `website` must be a full URL including `https://`
- Opening-hours cells must look like `09:00-18:00`, `24h` or `Closed`

## Imported stores have no coordinates

Expected when the provider forbids bulk geocoding - Nominatim does. Those rows are left *pending* deliberately rather than violating its usage policy. Switch to Google or Mapbox, or fill the coordinates in via export and re-import.

## Re-importing created duplicates

The file has no `external_id` column, so the importer matched on name, and a renamed branch looked like a new one. Add a stable `external_id` per branch and re-imports will update in place. See [Import & export](./usage/import-export.md).

## Opening hours look wrong

- **A late-night venue shows as closed.** It should not - a slot from `22:00` to `02:00` is understood as overnight. Check the slot is actually saved that way round.
- **Wrong for some branches.** Enable **Multi timezone** and set each store's timezone. Without it every store uses the site timezone.
- **Nothing shows at all.** No hours are recorded. That is distinct from *closed*: an empty week deliberately renders nothing rather than claiming the store is shut.

## Layout is cramped

The split and full-map layouts want the page width. Switch the page to a **No sidebar** or full-width template.

## Changes do not show

Botble caches rendered pages.

```bash
php artisan cache:clear
php artisan view:clear
```

Then hard-reload. If your host has OPcache, it may also need a moment.

## Server and admin-side setup problems

Assets not published, a rejected Google key, a disabled API switch, imports failing validation: see [Common backend configuration errors](./backend-configuration-errors.md).

## Still stuck

Open a ticket at [botble.ticksy.com](https://botble.ticksy.com) with your Botble version, PHP version, plugin version, the theme you use, and a screenshot including the browser console (**F12 → Console**).
