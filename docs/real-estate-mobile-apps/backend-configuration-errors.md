# Common Backend Configuration Errors

Most setup problems with Flex Home are **not** in the app. The app is a thin REST client: if a screen is empty, an image is broken or a request is rejected, the cause is almost always something on the Laravel real-estate backend that has not been configured yet.

This page lists the backend-side mistakes we see most often in support tickets, what each one looks like from inside the app, and how to fix it.

::: tip Diagnose from a browser first
Before changing anything in the app, open this URL in a normal browser, replacing the host with your own site:

```
https://your-site.com/api/v1/properties
```

Whatever that URL returns is exactly what the app receives. If the browser shows an error or an empty `data` array, the problem is on the backend and no amount of `.env` editing in the app will fix it.
:::

## Quick reference: what the status code means

| You see | HTTP status | Almost always means |
|---|---|---|
| "Service unavailable" / maintenance screen | `503` | API turned off in admin, or the site is in maintenance mode |
| Endpoint not found | `404` | Real-estate plugin not activated, or `/api/v1` missing from the route list |
| Session keeps expiring, or nothing loads | `401` | API key mismatch, or Sanctum token rejected |
| Requests blocked with no useful body | `403` | Cloudflare / WAF / ModSecurity blocking the app's User-Agent |
| Screens load but are empty | `200` | Backend is fine; the data is unpublished, unlinked or in another language |
| Broken image placeholders | `200` | Wrong `APP_URL` or a missing storage symlink on the backend |
| Long spinner then "request failed" | timeout | Backend slower than the app's 30s timeout |

---

## 1. API is disabled in admin (`503`)

**Symptom in the app:** every screen shows the maintenance / service-unavailable state immediately after launch. Nothing loads, including the home screen.

**Cause:** the Botble REST API is switched off. The app treats `503` as "API disabled or site in maintenance" and shows the maintenance gate.

**Fix:**

1. Go to **Admin → Settings → API**.
2. Set **Enable API** to **Yes** and save.
3. Confirm in the database if you prefer:

   ```sql
   SELECT * FROM settings WHERE `key` = 'api_enabled';
   ```

   The value must be `1`.
4. Clear the backend cache: **Admin → Platform Administration → Cache Management → Clear all caches**.

::: warning Maintenance mode returns 503 too
If you ran `php artisan down` on the backend, or enabled maintenance mode in admin, the app sees the same `503` and shows the same screen. Bring the site back up before debugging further.
:::

---

## 2. Real-estate plugin not activated (`404`)

**Symptom in the app:** the app starts, but property, project and agent screens fail while generic endpoints may still work.

**Cause:** the real-estate plugin is not active on the backend, so its API routes are never registered.

**Fix:**

1. Go to **Admin → Plugins**.
2. Make sure **Real Estate** is **activated**.
3. Reload `https://your-site.com/api/v1/properties` in a browser. A `404` here after activation means the route cache is stale, so clear the cache from **Admin → Platform Administration → Cache Management**.

::: warning This app only works with a real-estate backend
Flex Home is built against the real-estate plugin's API. Pointing `API_BASE_URL` at an ecommerce, job-board or plain CMS site will produce `404` on every listing endpoint. See [Overview](overview.md) for the backend requirement.
:::

---

## 3. API key mismatch (`401` on every request)

**Symptom in the app:** nothing loads at all, even the public home screen, and you are signed out repeatedly.

**Cause:** an API key is configured on the backend, but the app is not sending it, or is sending the wrong one. The app sends the key as the `X-API-KEY` header, and only when `API_KEY` is set in `.env`.

**Fix:**

1. Open **Admin → Settings → API** and copy the key exactly.
2. Put it in the app's `.env`:

   ```bash
   API_KEY=your-key-here
   ```

3. Fully stop and restart the dev server. `.env` is read at start time by `app.config.js` and is **not** picked up by Fast Refresh.

If no key is configured on the backend, leave `API_KEY` blank. Sending a key when none is expected is harmless, but sending the wrong one is rejected.

::: danger Do not put your purchase code here
`API_KEY` is the backend API key. Your Envato purchase code goes in `LICENSE_CODE` only. See [License Activation](license-activation.md).
:::

---

## 4. Cloudflare, WAF or ModSecurity blocking the app (`403`)

**Symptom in the app:** requests fail with `403`, or hang and then fail, while the same URL opens perfectly in your browser. This one confuses people the most, because "the API works when I test it".

**Cause:** a bot-protection layer in front of the backend is rejecting a non-browser client. The app identifies itself with a descriptive User-Agent such as `FlexHome/1.0.0 (ios 18.0)`, which some default Cloudflare, WAF or ModSecurity rules treat as an unknown bot.

**Fix (pick whichever applies to your stack):**

- **Cloudflare:** add a WAF rule that skips bot-fight-mode and managed challenges for `URI Path starts with /api/`. Do not put your API behind a "Managed Challenge" or "JS Challenge", as a native app cannot solve either.
- **ModSecurity / LiteSpeed / cPanel:** allow-list the `/api/` path, or disable the rule ID reported in the server's ModSecurity audit log.
- **Server firewall / fail2ban:** check whether repeated app requests from one device tripped a rate-limit ban.

**Confirm from the command line**, which reproduces exactly what the app sends:

```bash
curl -i -H "User-Agent: FlexHome/1.0.0 (ios 18.0)" \
     -H "Accept: application/json" \
     https://your-site.com/api/v1/properties
```

A `403` here with a Cloudflare or ModSecurity HTML body confirms the diagnosis. A `200` with JSON means the block is elsewhere.

---

## 5. Backend `APP_URL` is wrong: broken images and bad links

**Symptom in the app:** listings load with text and prices, but every image is a grey placeholder. Invoice PDFs and the package checkout may also fail to open.

**Cause:** the backend builds absolute URLs for media from its own `APP_URL`. If that value is still `http://localhost`, an old staging domain, or `http` while the site is served over `https`, the app receives image URLs it cannot reach from a phone.

**Fix:**

1. Edit the backend's `.env`:

   ```bash
   APP_URL=https://your-site.com
   ```

   No trailing slash, and the same scheme and host that the app uses in `API_BASE_URL`.
2. Clear the backend cache from **Admin → Platform Administration → Cache Management**.
3. Re-open `https://your-site.com/api/v1/properties` and check one `image` value in the JSON. Paste that URL into a browser: it must load the picture directly.

::: warning A phone is not your laptop
`localhost` and `127.0.0.1` mean *the phone itself* when the app resolves them, and `.test` domains from Valet or Herd do not resolve on a device or the iOS Simulator. For local development use a LAN IP (`http://192.168.1.20:8000`) or a tunnel. See [API Base URL](06_api_base_url.md).
:::

---

## 6. Missing storage symlink: images `404`

**Symptom in the app:** image URLs look correct and use the right domain, but still fail to load. Opening one in a browser returns `404`.

**Cause:** uploaded media lives in `storage/app/public` and is served through a `public/storage` symlink that does not exist on the server. This is common after moving hosts, restoring a backup, or deploying over FTP, which does not preserve symlinks.

**Fix:** recreate the link on the backend:

```bash
php artisan storage:link
```

If your host blocks symlinks entirely, switch the media driver to a public disk or an S3-compatible bucket under **Admin → Settings → Media**.

---

## 7. Screens are empty but the API returns `200`

**Symptom in the app:** no error, no maintenance screen, just an empty list with an "no results" state.

**Cause:** the backend answered correctly and the answer was genuinely empty. The app cannot invent data.

Work through these in order:

1. **Nothing is published.** Properties must be **Published** *and* approved. Draft, pending or expired listings are excluded from the API.
2. **Required relations are missing.** A property needs a type, category, location and at least one image to render fully. A listing with no location never appears on the map.
3. **Agents are missing.** Agents are vendor customers on the backend. If none are approved, the agents directory is empty by design.
4. **The requested language has no translation.** See the next section.
5. **The requested currency is not configured.** See section 9.

Confirm by comparing counts: what **Admin → Real Estate → Properties** shows against what `https://your-site.com/api/v1/properties` returns.

---

## 8. Language mismatch: partial or empty content

**Symptom in the app:** content is empty, or falls back to a language you did not expect, after switching language in the app.

**Cause:** the app sends the active language as an `X-LANGUAGE` header on every request. The backend's language middleware honours it only if that language exists and is active on the site.

**Fix:**

1. Go to **Admin → Settings → Languages** and confirm the locale codes there match what the app sends. The app ships with `en`, `vi`, `ar` and `fr`.
2. Activate any language you want the app to serve, and translate the content for it. An active language with untranslated listings returns empty fields, not an error.
3. Remove app languages you do not intend to support on the backend. See [Translations](07_translations.md).

::: tip Test a specific language directly
```bash
curl -H "X-LANGUAGE: ar" https://your-site.com/api/v1/properties
```
Compare the output against the same call with `X-LANGUAGE: en`.
:::

---

## 9. Currency not configured: wrong or unconverted prices

**Symptom in the app:** prices do not change when the user picks another currency, or the currency list in settings is empty.

**Cause:** the app sends `X-CURRENCY` and reads the available currencies from `/api/v1/currencies`. Conversion happens entirely on the backend.

**Fix:**

1. Go to **Admin → Settings → Currencies**.
2. Add each currency you want to offer and set its exchange rate. A currency with no rate cannot be converted.
3. Confirm the list the app will see:

   ```bash
   curl https://your-site.com/api/v1/currencies
   ```

---

## 10. Sign-in fails or the session drops constantly

**Symptom in the app:** login is rejected with correct credentials, or the user is signed out a few minutes after signing in.

**Causes and fixes:**

- **Email not verified.** If email verification is enabled on the backend, an unverified account cannot sign in. Check **Admin → Settings → General** and make sure the backend can actually send mail, otherwise nobody ever receives the verification link.
- **Outgoing mail is broken.** Verification, password-reset and consultation-notification emails all depend on a working mail driver. Send a test message from **Admin → Settings → Email** before blaming the app.
- **Sanctum tokens are being dropped.** The app authenticates with Laravel Sanctum personal access tokens against the customer guard. If the `personal_access_tokens` table was never migrated, or is cleared by a cron job or a cache-clearing deploy script, every token dies. Confirm rows survive:

  ```sql
  SELECT COUNT(*) FROM personal_access_tokens;
  ```

- **Server time is wrong.** A backend clock that is badly out of sync expires tokens the moment they are issued. Check with `date` on the server.
- **Load-balanced backends with different `APP_KEY`s.** Every node must share the same `APP_KEY`, or tokens issued by one node are rejected by the next.

---

## 11. Social login returns an error

**Symptom in the app:** the Google, Apple or Facebook button opens the provider, the user approves, and the app then shows a generic sign-in failure.

**Cause:** the provider handshake succeeded, but the backend could not complete it.

**Fix:**

1. Confirm the **social login plugin is activated** on the backend under **Admin → Plugins**.
2. Confirm the provider is enabled and its credentials are filled in on the backend, not only in the app's `.env`. Both sides need configuring.
3. Make sure the client IDs match on both sides. A Google OAuth client generated for one bundle ID will not validate tokens from another.

Full walkthroughs: [Google](14_google_login_setup.md), [Apple](13_apple_login_setup.md), [Facebook](15_facebook_login_setup.md), [Social Login Configuration](16_social_login_configuration.md).

::: warning Provider accounts are yours, and some cost money
Each provider requires your own developer account. Sign in with Apple requires a paid Apple Developer Program membership, and Facebook login requires Meta's App Review before it works for the public. These are third-party requirements and fees, entirely separate from this item.
:::

---

## 12. Agent package checkout fails in the WebView

**Symptom in the app:** an agent taps a credit package, the checkout WebView opens, and it shows a login screen, a blank page, or a "no payment method available" error.

**Cause:** the checkout is your backend's own hosted checkout page, rendered in a WebView. Anything wrong there is a backend configuration issue.

**Fix:**

1. **Enable at least one payment gateway** under **Admin → Payments → Payment Methods**. With none enabled, the checkout page has nothing to offer.
2. **Complete the gateway's credentials** and take it out of sandbox mode before going live. Each gateway needs your own merchant account.
3. **Check `APP_URL` again.** The WebView URL is built from your site root; a wrong `APP_URL` sends the agent to the wrong host, which is why the session looks logged out.
4. **Do not force a redirect away from the checkout domain.** Aggressive redirect rules, or a `Content-Security-Policy` with `frame-ancestors 'none'`, can break the flow.
5. **Confirm packages exist and are published** under **Admin → Real Estate → Packages**.

::: warning Gateway fees are not ours
Payment gateways charge their own transaction fees, and sometimes monthly or payout fees. Those are set by the provider and are separate from the price of this item. Some gateways are also sold as separate backend plugins.
:::

---

## 13. Push notifications never arrive

**Symptom in the app:** the in-app inbox works, but nothing arrives on the device.

**Cause:** delivery is sent by the backend through Firebase Cloud Messaging. The app only registers its device token.

**Fix:**

1. Confirm the backend has the **FCM project ID and service account key** saved under **Admin → Settings → API** (or the notification plugin's settings).
2. Confirm the Firebase project used by the backend is the **same project** whose `google-services.json` and `GoogleService-Info.plist` you added to the app. Mismatched projects silently drop every message.
3. Confirm the device token reached the backend: it is registered on sign-in, so sign out and back in, then check the tokens table.
4. On iOS, confirm the **APNs key is uploaded to Firebase** and the bundle ID matches.

Full setup: [Push Notifications](push_notifications.md).

---

## 14. Uploads fail from the agent portal

**Symptom in the app:** creating or editing a listing works until images are attached, then the save fails, often after a long wait.

**Cause:** PHP or the web server rejected the multipart upload before Laravel ever saw it.

**Fix on the backend:**

1. Raise the PHP limits in `php.ini`:

   ```ini
   upload_max_filesize = 20M
   post_max_size = 25M
   max_execution_time = 120
   memory_limit = 256M
   ```

   `post_max_size` must be larger than `upload_max_filesize`, or the whole request is discarded.
2. Raise the web server's body limit: `client_max_body_size 25M;` for Nginx.
3. Check the media rules under **Admin → Settings → Media**, which cap file size and allowed extensions independently of PHP.
4. Confirm `storage/` and `public/storage` are writable by the web-server user.

---

## 15. Requests time out

**Symptom in the app:** a long spinner, then a request-failed message. It usually affects the heaviest screens first, such as the map or a large listing page.

**Cause:** the app aborts any request that takes longer than **30 seconds**. A backend slower than that will always fail, no matter how good the connection is.

**Fix on the backend:**

1. Time the endpoint honestly:

   ```bash
   curl -o /dev/null -s -w "%{time_total}\n" https://your-site.com/api/v1/properties
   ```

   Anything above two or three seconds needs attention.
2. Add database indexes for the columns you filter on most, and check for N+1 queries with the debug bar on a staging copy.
3. Enable caching under **Admin → Platform Administration → Cache Management**.
4. Reduce `MAP_PIN_LIMIT` in the app's `.env` if the map query is the slow one.
5. Move to a host with real CPU if the site is on shared hosting. This is the single most common root cause.

---

## 16. HTTPS and certificate problems

**Symptom in the app:** everything works in the browser and in the simulator, but fails on a real device.

**Causes and fixes:**

- **Self-signed or expired certificate.** Mobile platforms reject these outright, with no "continue anyway" option. Use a valid certificate; Let's Encrypt is free.
- **Incomplete certificate chain.** Browsers often paper over a missing intermediate certificate, while mobile clients do not. Test the chain with an SSL checker.
- **Plain `http://` in production.** The app only permits cleartext traffic when `APP_ENV=development`. Serve the backend over `https` for staging and production builds.

---

## Still stuck?

Collect this before opening a ticket, as it is what we will ask for first:

- The exact URL you tested and the full response, from `curl -i https://your-site.com/api/v1/properties`
- Your `API_BASE_URL` value, and whether `API_KEY` is set
- The backend's `APP_URL`
- A screenshot of the error in the app, plus the Metro or console output
- Which of the sections above you have already ruled out

Then head to [Support](support.md). App-side problems, as opposed to backend ones, are covered in [Troubleshooting](troubleshooting.md).
