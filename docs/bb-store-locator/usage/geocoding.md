# Geocoding

Geocoding turns a written address into the latitude and longitude that put a store on the map. You only need it if you would rather not place every pin by hand.

## Choosing a provider

**Settings → Store Locator (Map) → Geocoding provider**

| Provider | Cost | Bulk allowed | Notes |
|---|---|---|---|
| **Manual** | Free | - | No lookups at all. Drag every pin yourself. Fine for a handful of stores |
| **Google** | Paid, with a free monthly allowance | Yes | The most accurate, especially for messy addresses |
| **Mapbox** | Free tier, then paid | Yes | Good quality, generous free tier |
| **Nominatim** | Free | **No** | OpenStreetMap's own service. Its usage policy forbids bulk geocoding |

## Nominatim: read this before choosing it

Nominatim is run as a public service for OpenStreetMap. Its usage policy caps you at roughly one request per second and explicitly prohibits bulk geocoding.

The plugin enforces this rather than leaving it to you:

- You must tick the **consent** box before Nominatim will run at all.
- You must supply a real **user agent** identifying your site, as the policy requires.
- **Bulk geocoding is refused.** The import and the console command both skip Nominatim and leave the rows marked *pending*.

If you need to geocode hundreds of addresses, use Google or Mapbox, or run your own Nominatim instance and point the endpoint at it.

## Geocoding one store

On the store editor, click **Fetch from address**. The coordinates fill in and the pin moves.

You can always override the result by dragging the pin. A hand-placed pin is marked manual and no later automatic run will move it.

## Geocoding in bulk

Rows imported without coordinates are geocoded during the import when the provider permits it. To process what remains:

```bash
php artisan cms:store-locator:geocode
```

| Option | Effect |
|---|---|
| `--limit=100` | Stop after this many stores. Useful for staying inside a daily quota |
| `--force` | Re-resolve stores that already have coordinates |

::: warning --force overwrites hand-placed pins
Without it, only stores that are missing coordinates are touched. Use it deliberately.
:::

Run it on a schedule if stores are added by people who do not set coordinates:

```php
// app/Console/Kernel.php
$schedule->command('cms:store-locator:geocode --limit=200')->daily();
```

## Finding the stragglers

**Tools → Export/Import Data → Export Stores**, tick **Only stores missing coordinates**. That gives you exactly the rows that still need attention. Fill in the two columns and import the file back.

## Address autocomplete for visitors

**Enable public suggestions** puts autocomplete in the visitor-facing search box. It is convenient, but every keystroke can become a provider request.

Turn it off if you are on a metered plan and would rather spend the quota on the admin panel. The search box still works - visitors just type the whole town name.

The public suggestion endpoint is rate limited to 60 requests per minute per visitor, so it cannot be trivially used to drain your quota.

## Keys stay on the server

The geocoding key and Mapbox token are never sent to the browser. All lookups are proxied through your own site, so the credentials cannot be lifted from page source. This is deliberately separate from the Maps JavaScript key, which *is* public - see [Map providers](./map-providers.md).
