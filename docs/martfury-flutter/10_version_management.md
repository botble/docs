# Version Management

The version is set in `pubspec.yaml`:

```yaml
version: 1.0.0+2     # <versionName>+<versionCode>
```

- `versionName` (e.g. `1.0.0`) — public version shown in the stores. Major.Minor.Patch.
- `versionCode` (e.g. `2`) — internal build number. **Must increase by at least 1 for every store upload**, even for the same `versionName`.

Both Android and iOS read these values automatically:

- Android: `android/app/build.gradle.kts` uses `flutter.versionCode` / `flutter.versionName`
- iOS: `ios/Runner/Info.plist` uses `$(FLUTTER_BUILD_NAME)` / `$(FLUTTER_BUILD_NUMBER)`

## Same version on both stores

Bump `pubspec.yaml`, then build:

```bash
flutter build appbundle --release      # Play Store
flutter build ipa --release            # App Store
```

## Different version per store

Either override on the command line:

```bash
flutter build appbundle --release --build-name=1.2.0 --build-number=5
flutter build ipa --release --build-name=1.3.0 --build-number=8
```

Or set a fixed value in the platform file (the values then ignore `pubspec.yaml`):

- Android — `android/app/build.gradle.kts`:

  ```kotlin
  defaultConfig {
      versionCode = 5
      versionName = "1.2.0"
  }
  ```

- iOS — `ios/Runner/Info.plist` (replace the `$(...)` placeholders with literal strings):

  ```xml
  <key>CFBundleShortVersionString</key>
  <string>1.3.0</string>
  <key>CFBundleVersion</key>
  <string>8</string>
  ```

## Tag the release

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```
