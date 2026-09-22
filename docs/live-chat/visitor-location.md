# Visitor Location

Live Chat can show where each visitor is chatting from: their country, city, and a round country flag. It looks up the visitor's IP address in a MaxMind GeoLite2 database stored on your own server. The lookup runs locally, so the IP address is not sent to any geolocation service.

It works out of the box: the plugin ships with a country-only database, so flags appear with no setup. For city names and up-to-date data, add the free GeoLite2 City database as described in [Setup](#setup).

::: warning Requires version 1.0.12 or later
Before 1.0.12, the location lookup did not work, and conversations stored the server's IP address instead of the visitor's. Update the plugin first.
:::

## Where the Location Appears

| Place | What you see |
|-------|--------------|
| Conversation list (admin and agent portal) | The country flag replaces the initials avatar. If the visitor has a profile photo or a Gravatar, that is shown instead |
| Chat header | The same flag avatar |
| Visitor info panel → **Visitor Context** | **Location** in the form "City, Country", or just the country with the built-in database |
| Agent portal → **Live Visitors** | The location of each visitor currently browsing your site. This page is available when **Enable Agent-initiated Conversations** is turned on at **Admin → Live Chat → Settings** |

Hover over a flag to see the country name.

## Built-in Country Database

With nothing installed, Live Chat uses a bundled GeoLite2 Country database. It gives each visitor a country and a flag, but:

- It has **no city data**, so the Location field shows the country only.
- It is a **2019 build** and is never updated. Most countries are still correct, but IP addresses that were reassigned since then may show the wrong country or none.

The bundled file is GeoLite2 data created by MaxMind, available from [maxmind.com](https://www.maxmind.com), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Setup

For city names and current data, install the GeoLite2 City database. MaxMind's license does not allow current versions to be bundled with the plugin, so you add it once yourself.

1. Create a free account at [maxmind.com/en/geolite2/signup](https://www.maxmind.com/en/geolite2/signup) and log in.
2. In your MaxMind account menu, open the GeoLite download page.
3. Find **GeoLite2 City** and download the GZIP (`.mmdb`) version. You get a file named like `GeoLite2-City_20260918.tar.gz`.
4. Extract the archive and take the `GeoLite2-City.mmdb` file from inside it.
5. Upload it to your site at:

```
storage/app/geoip/GeoLite2-City.mmdb
```

Create the `geoip` folder if it does not exist. The file name must be exactly `GeoLite2-City.mmdb`.

That is all. There is no setting to enable. Once the file is in place, Live Chat uses it instead of the built-in database for chats started from then on.

::: tip
Download **GeoLite2 City**, not GeoLite2 Country or ASN. The Country database has no city data, and the ASN database has no location data.
:::

## Existing Conversations

The location is saved when a conversation starts. Conversations that started before you updated to 1.0.12 stay without a location and show the initials avatar as before. Conversations saved with the built-in database keep their country-only location after you install the City database.

## Keeping the Database Up to Date

MaxMind updates GeoLite2 twice a week, as IP addresses get reassigned. An old file keeps working but becomes slightly less accurate over time. To update, download a fresh copy and replace `storage/app/geoip/GeoLite2-City.mmdb`. Updating once a month is plenty for live chat. The built-in Country database cannot be updated; installing the City database is the way to get current data.

## Troubleshooting

**No flag or location shows on new chats**

- Check that you are on Live Chat 1.0.12 or later.
- Start a **new** chat to test. An existing open chat keeps the empty location it was created with.

**New chats show a country but no city**

Live Chat is still using the built-in country-only database, so the City database was not found.

- Check the path and file name: `storage/app/geoip/GeoLite2-City.mmdb`. A common mistake is uploading the `.tar.gz` archive, or the whole extracted folder, instead of the `.mmdb` file inside it.
- Make sure the file is readable by the web server.

**Some chats have no location**

Local and private IP addresses (such as `127.0.0.1` or `192.168.x.x`) are not in the database, so chats you test on a local development site have no location. A small number of public IP addresses are not in GeoLite2 either.

**All chats show the same IP address and location**

Your site is behind a proxy or CDN (for example Cloudflare or a load balancer), and the plugin sees the proxy's IP instead of the visitor's. Configure your server or Laravel's trusted proxies so the visitor's real IP reaches the application. Your hosting provider can help with this.

**The city is wrong but the country is right**

This is expected sometimes. IP geolocation is accurate at country level, but city data is approximate, especially for mobile networks and VPN users.
