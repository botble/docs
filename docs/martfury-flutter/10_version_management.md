# Version Management

## Android Version

1. **Update pubspec.yaml**
   ```yaml
   version: 1.0.0+1  # Format: version_name+version_code
   ```

2. **Update Android Manifest**
   In `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <manifest xmlns:android="http://schemas.android.com/apk/res/android"
       package="com.example.app"
       android:versionCode="1"
       android:versionName="1.0.0">
   ```

## iOS Version

1. **Update pubspec.yaml**
   ```yaml
   version: 1.0.0+1  # Format: version_name+version_code
   ```

2. **Update Info.plist**
   In `ios/Runner/Info.plist`:
   ```xml
   <key>CFBundleShortVersionString</key>
   <string>1.0.0</string>
   <key>CFBundleVersion</key>
   <string>1</string>
   ```

## Version Numbering

- **Version Name (e.g., 1.0.0)**
  - First number: Major version (breaking changes)
  - Second number: Minor version (new features)
  - Third number: Patch version (bug fixes)

- **Version Code (e.g., 1)**
  - Increment for each new release
  - Must be higher than previous version
  - Used by app stores for updates

## Best Practices

1. **Version Synchronization**
   - Keep version numbers consistent across platforms
   - Update all version numbers before release
   - Document version changes in changelog

2. **Release Process**
   - Increment version numbers
   - Update changelog
   - Tag release in version control
   - Build release version
   - Submit to app stores

3. **Version Control**
   ```bash
   # Tag release
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   ```

4. **Changelog Example**
   ```markdown
   # Changelog

   ## [1.0.0] - 2024-03-20
   - Initial release
   - Basic features implemented
   - Bug fixes

   ## [0.9.0] - 2024-03-15
   - Beta release
   - Feature X added
   - Performance improvements
   ```
