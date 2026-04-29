# Upgrade

## Before upgrading

1. Back up the current project folder.
2. Save copies of:
   - `.env`
   - Replaced logo / icon assets
   - Custom theme files (`lib/src/theme/`)
   - Custom translation strings in `assets/translations/`
   - Any source files you have edited

Read the [release notes](releases.md) first to see what changed.

## Upgrade steps

1. Download the new version from CodeCanyon and extract it to a new folder.
2. Copy your saved files into the new project, matching paths.
3. Install dependencies and run:

   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

4. Smoke test: login, browse products, add to cart, search, place a test order.

## Build new store releases

```bash
flutter build appbundle --release   # Google Play
flutter build ios --release         # App Store
```

Bump the version in `pubspec.yaml` (`version: x.y.z+build`). Submit via the store consoles. See [Deploying the App](09_deploying_app.md).

## Common problems

| Symptom | Fix |
|---|---|
| Build fails | `flutter clean && flutter pub get && flutter run` |
| Custom colors / logo missing | Re-copy theme assets from the backup |
| Website connection fails | Re-copy `.env`; verify `API_BASE_URL` and `API_KEY` |
| New translation strings missing | Diff the new `assets/translations/en.json` against your old copy and merge |

If a fix introduces regressions, roll back to the backed-up project and contact support with the version numbers and the failing step.
