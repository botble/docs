# Release notes

## 1.0.0-6 August 2026

Initial release.

### Maps
- Works with no API key: OpenStreetMap, Carto Light, Carto Dark and Google tiles, plus any custom tile server
- Google Maps JavaScript API as an alternative renderer, with automatic fallback to Leaflet when no key is set
- Marker clustering on both renderers
- Six generated marker shapes - pin, teardrop, circle, square, tag, dot - in any colour, or upload your own

### Finding a store
- Search by town, postcode or store name, with address autocomplete
- "Use my location" with distance sorting
- Adjustable radius in kilometres or miles
- Filters for category, region and open-right-now
- "Search this area" after panning the map

### Layouts
- Six templates: split, grid, list, compact, accordion and full map
- Placed with a single shortcode, configured through a visual builder

### Stores
- Opening hours per day with multiple slots, 24-hour and closed states, and correct handling of hours running past midnight
- Per-store timezone
- Logo, gallery, rich detail page, phone, email, website and directions
- Categories with their own colours and marker icons

### Bulk data
- CSV and Excel import that creates and updates stores, with a downloadable example
- `External ID` as the match key, so a corrected file re-imports without duplicating branches
- Opening hours imported from ordinary text
- Export with filters, including "only stores still missing coordinates"

### Geocoding
- Google, Mapbox, Nominatim and manual entry
- A console command for geocoding in bulk
- Providers whose terms forbid mass geocoding are refused rather than quietly used
- Hand-placed pins are never moved automatically

### SEO and integration
- `LocalBusiness` structured data and Open Graph tags on store pages
- Stores in the XML sitemap
- Read-only REST API
- Translatable, with full right-to-left support

### Everywhere
- Runs on any Botble script, with no hard plugin dependency
- Light and dark themes, WCAG AA contrast throughout
- Keyboard accessible, with a skip-map link and screen-reader announcements
- No CDN requests; no server-side credentials ever reach the browser
