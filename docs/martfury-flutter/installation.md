# Installation

## Requirements

- Flutter SDK (latest stable)
- A device or emulator (Android or iOS)

## Steps

### 1. Install Flutter

Follow the official install guide at [flutter.dev](https://flutter.dev). Verify with `flutter doctor`.

### 2. Extract the source

Download the MartFury source from CodeCanyon and extract it.

### 3. Install dependencies

```bash
cd path/to/martfury-app
flutter pub get
```

### 4. Configure `.env`

```bash
cp .env.example .env
```

Open `.env` and set:

```bash
API_BASE_URL=https://your-domain.com
API_KEY=<from Admin → Settings → API Settings>
APP_NAME=Your Store Name
LICENSE_CODE=<your Envato purchase code>
```

See [API Configuration](06_api_base_url.md) for `API_KEY` details and [Theme Colors](01_theme_colors.md) for color overrides.

### 5. Run

```bash
flutter run
```

## Common errors

- **`flutter: command not found`** — Flutter is not on your `PATH`. Re-run the installer or restart your terminal.
- **No devices found** — Connect a USB device with USB debugging enabled, or start an emulator.
- **Build failed** —
  ```bash
  flutter clean
  flutter pub get
  flutter run
  ```

## Next steps

- [Configuration](configuration.md)
- [Social Login Setup](16_social_login_configuration.md)
- [Deploying the App](09_deploying_app.md)
- [Troubleshooting](troubleshooting.md)
