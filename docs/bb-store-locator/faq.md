# FAQ

## Do I need a Google Maps API key?

No. The plugin uses Leaflet with OpenStreetMap tiles by default - no key, no billing account, nothing to sign up for. Add a Google key later only if you specifically want Google's renderer.

## Does it work on my Botble script?

Yes. There is no hard dependency on any other plugin, so it runs on a blog, hotel, real estate, job board, plain CMS or ecommerce install. Optional plugins improve it but none are required.

## How many stores can it handle?

Thousands. Searches use a bounding-box prefilter before the distance calculation, so the database does not measure every store on every request. Marker clustering keeps the map readable, and the compact and accordion layouts are built for large networks.

## Can I import my branches from a spreadsheet?

Yes - CSV or Excel, with a downloadable example file. Give each branch an `external_id` and you can re-import a corrected file without creating duplicates. See [Import & export](./usage/import-export.md).

## Can it geocode addresses automatically?

Yes, using Google, Mapbox or Nominatim. Note that Nominatim's usage policy forbids bulk geocoding, and the plugin enforces that rather than letting you break it silently.

## Can I put the locator on more than one page?

Yes. Each shortcode can carry its own layout, radius, categories and units, so a regional page can show a filtered subset while the main page shows everything.

## Can I show only certain categories?

Yes: `[store-locator categories="2,5"][/store-locator]`.

## Does each store get its own page?

Yes, at `/store-locations/{slug}` by default, with `LocalBusiness` structured data, Open Graph tags and inclusion in the XML sitemap. The prefix is configurable.

## Does it work with full-page caching?

Yes. Searching and filtering happen in the browser against a JSON endpoint, so a cached HTML page still produces correct, visitor-specific results.

## Is it translatable?

Yes. The interface is translation-ready, and with Language Advanced each store's name, description, content and address can be translated per language. Right-to-left languages are fully supported.

## Does it work on mobile?

Yes. The layouts are responsive, touch targets meet accessibility guidance, and the map is usable at phone width.

## Is it accessible?

The locator ships with a skip-map link, visible focus states, ARIA roles on the search combobox and results list, screen-reader announcements when results change, and every text/background pair meets WCAG AA contrast in both light and dark themes.

## Does it load anything from a CDN?

No. Leaflet is bundled with the plugin. The only outbound requests are for map tiles from the provider you chose, and to Google's API if you explicitly selected the Google renderer.

## Are my API keys exposed?

The geocoding key and Mapbox token are server-side only and never sent to the browser. The Maps JavaScript key is public by necessity - that is how Google's browser API works - so restrict it by HTTP referrer in the Google Cloud console.

## Can I use my own marker images?

Yes. Upload them under **Store Locator → Map markers** and assign per store or per category. Otherwise the plugin generates six marker shapes in any colour you pick.

## Does "open now" handle a store open past midnight?

Yes. A slot from `22:00` to `02:00` is understood as running overnight, so a late bar is not wrongly shown as closed at 1am. With **Multi timezone** enabled, each store is evaluated in its own timezone.

## Is there an API?

Yes - read-only JSON endpoints for stores, categories, suggestions and public settings. See [REST API](./usage/rest-api.md).

## Which databases are supported?

MySQL and MariaDB, which is what the vast majority of Botble sites run and what the plugin is tested against. PostgreSQL is accounted for throughout - the distance query avoids the constructs Postgres rejects, and the migrations handle its syntax - but if you run Postgres, please test on a staging copy first and tell us if anything misbehaves.

Distance is calculated in SQL where the database supports the required maths and falls back to PHP otherwise, producing the same results either way.

## Can visitors get directions?

Yes. Each store offers a Directions link that opens the visitor's own map application with the route preset.
