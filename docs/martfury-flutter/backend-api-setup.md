# Enable the API on your website

Before the app can load anything, the REST API must be turned on in your Botble website admin panel. This is a backend step - it has nothing to do with the Flutter source code.

By default the API is **disabled**, and every endpoint returns:

```json
{
  "error": true,
  "message": "API is currently disabled. Please contact the administrator to enable API access.",
  "data": null
}
```

## 1. Open the API settings

1. Log into your admin panel: `https://your-domain.com/admin`
2. Go to **Settings → API Settings**

Direct URL: `https://your-domain.com/admin/settings/api`

::: tip Page not there?
If **API Settings** does not appear in the Settings list, your website is running an older version of the CMS. Update to the latest version, then re-check. See the [CMS upgrade guide](https://docs.botble.com/cms/upgrade.html).
:::

## 2. Turn on **Enable API**

Switch **Enable API** on. This unlocks all `/api/v1/*` endpoints.

## 3. Generate an API key

In the **Security Settings** block:

1. Click **Generate Random Key**
2. Click **Copy to Clipboard**
3. Click **Save settings**

The key is a shared secret between your website and your app. When it is set, every API request must send it in the `X-API-KEY` header - the app does this automatically once you put the key in `.env`.

Leaving the key empty also works, but then anyone can call your API without a key. Setting a key is recommended.

## 4. Put the values in the app `.env`

In the Flutter project root, edit `.env`:

```bash
API_BASE_URL=https://your-domain.com
API_KEY=<the key you copied in step 3>
```

Rules for `API_BASE_URL`:

- Must be `https://` in production
- No trailing slash
- Must be the same domain your website runs on

Then fully stop and rerun the app - `.env` changes are not picked up by hot reload:

```bash
flutter clean
flutter pub get
flutter run
```

## 5. Verify

Open this URL in a browser (replace the host):

```
https://your-domain.com/api/v1/ecommerce/products
```

| What you see | Meaning | Fix |
|---|---|---|
| JSON list of products | Working | Nothing to do |
| `API is currently disabled` (503) | Step 2 not done or not saved | Turn on **Enable API** and save |
| `Invalid or missing API key` (401) | An API key is set on the website | Expected in a browser. Confirm the same key is in the app `.env` |
| `404` | Old CMS version without the API package | Update the CMS |
| Empty `data` array | API works, but no published products | Publish products in **Admin → Ecommerce → Products** |

## Push notifications (optional)

The same settings page has a **Push Notifications (FCM v1 API)** block. Fill it only after you have created a Firebase project - see [Push notification setup](fcm_setup.md).

## Related

- [API Configuration](06_api_base_url.md) - `API_BASE_URL` and `API_KEY` details
- [API Integration](api-integration.md) - endpoints the app uses
- [License activation](license-activation.md) - your Envato purchase code
- [Troubleshooting](troubleshooting.md)
