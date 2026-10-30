# Deploying the App

## Android Deployment

1. **Generate Keystore**
   ```bash
   keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```

2. **Configure Keystore**
   Create/update `android/key.properties` (in `android/`, not `android/app/`):
   ```properties
   storePassword=<password>
   keyPassword=<password>
   keyAlias=upload
   storeFile=<path to keystore>
   ```
   On Windows, use forward slashes in `storeFile` (e.g. `C:/Users/you/upload-keystore.jks`); backslashes are escape characters in a properties file.

3. **Update build.gradle.kts**
   The app uses the Kotlin DSL. Edit `android/app/build.gradle.kts` in place; do not rename it to `build.gradle`, and do not paste Groovy syntax into it.

   Add the imports at the top of the file (keep any that already exist):
   ```kotlin
   import java.io.FileInputStream
   import java.util.Properties
   ```

   Load the keystore just above the `android {` block:
   ```kotlin
   val keystoreProperties = Properties()
   val keystorePropertiesFile = rootProject.file("key.properties")
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(FileInputStream(keystorePropertiesFile))
   }
   ```

   Inside `android { }`, add `signingConfigs` before `buildTypes`, and point the release build at it:
   ```kotlin
   android {
       // ... existing config ...

       signingConfigs {
           create("release") {
               keyAlias = keystoreProperties["keyAlias"] as String?
               keyPassword = keystoreProperties["keyPassword"] as String?
               storeFile = keystoreProperties["storeFile"]?.let { file(it) }
               storePassword = keystoreProperties["storePassword"] as String?
           }
       }

       buildTypes {
           release {
               isMinifyEnabled = false
               isShrinkResources = false
               signingConfig = signingConfigs.getByName("release") // was "debug"
           }
       }
   }
   ```

4. **Build Release APK**
   ```bash
   flutter build apk --release
   ```

5. **Build App Bundle**
   ```bash
   flutter build appbundle
   ```

## iOS Deployment

1. **Setup Apple Developer Account**
   - Enroll in Apple Developer Program
   - Create App ID in Apple Developer Portal
   - Create Distribution Certificate
   - Create Provisioning Profile

2. **Configure Xcode**
   - Open `ios/Runner.xcworkspace`
   - Update Bundle Identifier
   - Configure Signing & Capabilities
   - Set Version and Build numbers

3. **Build for App Store**
   ```bash
   flutter build ios --release
   ```

4. **Archive and Upload**
   - Open Xcode
   - Select Product > Archive
   - Use Xcode Organizer to upload to App Store

## Important Notes
- Always test thoroughly before deployment
- Keep your keystore and certificates secure
- Follow platform-specific guidelines
- Consider using CI/CD for automated deployment
- Keep track of version numbers
- Test on multiple devices before release
