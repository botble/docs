# License activation (purchase code)

The app checks your Envato purchase code **only while you develop**. There is no activation screen and nothing to register on a server - you paste the code into `.env` and that is it.

## 1. Get your purchase code

1. Go to [codecanyon.net/downloads](https://codecanyon.net/downloads)
2. Find **MartFury Flutter**
3. Click **Download → License certificate & purchase code (text)**
4. Copy the **Item Purchase Code** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## 2. Add it to `.env`

In the Flutter project root, open `.env` and set:

```bash
APP_ENV=development
LICENSE_CODE=8a7b6c5d-1234-4321-abcd-1234567890ab
```

Fully stop and rerun the app - `.env` changes are not picked up by hot reload:

```bash
flutter run
```

## How the check works

- It runs only when `APP_ENV=development`. Release builds skip it entirely.
- The result is cached for 3 days, so it does not call the license server on every launch.
- If the license server cannot be reached, the app assumes the license is valid and carries on.
- If the code is missing or invalid, a **License Required** dialog appears once per session. It is a reminder only - it never blocks the app or any feature.

## One purchase code = one app

A Regular License covers one end product. If you publish several apps for several stores, buy one license per app.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| **License Required** dialog on every launch | `LICENSE_CODE` empty or misspelled in `.env` | Paste the code again, check for stray spaces or quotes, rerun the app |
| Dialog still shows after editing `.env` | Hot reload does not read `.env` | Stop the app completely, then `flutter run` |
| Dialog appears but everything works | The license server was unreachable | Safe to ignore |
| Purchase code rejected | Code belongs to another item, or you copied the licence *certificate* number instead of the purchase code | Re-download the licence certificate and copy the **Item Purchase Code** |

::: warning Do not put the purchase code in `API_KEY`
`API_KEY` and `LICENSE_CODE` are unrelated. Putting the purchase code in `API_KEY` returns `401 - Invalid or missing API key` on every request. See [API Configuration](06_api_base_url.md).
:::

## Related

- [Enable the API on your website](backend-api-setup.md)
- [Configuration](configuration.md)
- [Support](support.md)
