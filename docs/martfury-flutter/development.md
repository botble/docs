# Development Guide

## Project structure

```
lib/
├── core/
│   └── app_config.dart        # .env-backed configuration
├── main.dart                  # entry point
└── src/
    ├── controller/            # GetX controllers
    ├── model/                 # data models
    ├── service/               # API services
    ├── theme/                 # theme tokens, fonts
    └── view/
        ├── screen/            # full-screen routes
        └── widget/            # reusable UI widgets
test/                          # unit, widget, and integration tests
assets/translations/           # one JSON file per language
```

## Run

```bash
flutter pub get
flutter run
```

If anything fails to start: `flutter clean && flutter pub get && flutter run`.

## Customize colors

Set hex values (no `#`) in `.env`, then fully stop and rerun the app — `.env` changes do not propagate via hot reload:

```bash
PRIMARY_COLOR=FF0000
PRIMARY_DARK_COLOR=CC0000
ON_PRIMARY_COLOR=FFFFFF
APP_BAR_FOREGROUND_COLOR=FFFFFF
ACCENT_BACKGROUND_COLOR=212121
ACCENT_FOREGROUND_COLOR=FFFFFF
```

Full list: [Theme Colors](01_theme_colors.md).

## Change the font

Edit `lib/src/theme/app_fonts.dart`:

```dart
const kAppTextStyle = GoogleFonts.roboto;
```

See [App Font](02_app_font.md).

## Add a translation key

1. Add the key to every file in `assets/translations/` (`en.json` first, then translate the rest).
2. Use it in code: `Text('my_new_key'.tr())`.

See [Translations](07_translations.md).

## Add an API call

1. Add the URL or endpoint to `lib/core/app_config.dart`.
2. Create a service in `lib/src/service/`:

```dart
class ProductService {
  static Future<List<dynamic>> fetch() async {
    final response = await http.get(
      Uri.parse('${AppConfig.apiBaseUrl}/api/v1/ecommerce/products'),
      headers: {'X-API-KEY': AppConfig.apiKey},
    );
    return json.decode(response.body)['data'];
  }
}
```

3. Consume it from a screen via `FutureBuilder` or a GetX controller.

Always include `X-API-KEY: AppConfig.apiKey` on requests to the Botble backend.

## Tests

```bash
flutter test                              # all tests
flutter test --coverage                   # with coverage
flutter test test/service/cart_service_test.dart   # one file
```

Test layout:

```
test/
├── helpers/      # mocks and fixtures
├── model/
├── service/
├── controller/
├── widget/
├── security/
└── utils/
```

CI runs `flutter analyze` and `flutter test --coverage` on every push and PR via `.github/workflows/test.yml`.

## Build

| Target | Command |
|---|---|
| Android debug APK | `flutter build apk --debug` |
| Android release AAB | `flutter build appbundle --release` |
| iOS debug | `flutter build ios --debug` |
| iOS release | `flutter build ios --release` |

See [Deploying the App](09_deploying_app.md) for store submission.

## Common errors

- **`flutter: command not found`** — Flutter SDK not on `PATH`.
- **No devices** — connect a USB device with debugging on, or start an emulator.
- **Build failed** — `flutter clean && flutter pub get && flutter run`.
- **`.env` change has no effect** — hot reload does not pick up `.env`. Stop and rerun.

More: [Troubleshooting](troubleshooting.md).
