# Changing App Name

![App name](images/change-app-name.png)

## Android

1. Open `android/app/src/main/AndroidManifest.xml`
2. Update the `android:label` attribute:
   ```xml
   <application
       android:label="Your New App Name"
       ...
   ```

## iOS

1. Open `ios/Runner/Info.plist`
2. Update the `CFBundleName` and `CFBundleDisplayName`:
   ```xml
   <key>CFBundleName</key>
   <string>Your New App Name</string>
   <key>CFBundleDisplayName</key>
   <string>Your New App Name</string>
   ```
