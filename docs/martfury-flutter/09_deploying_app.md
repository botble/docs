# Deploying the App

## Android Deployment

1. **Generate Keystore**
   ```bash
   keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```

2. **Configure Keystore**
   Create/update `android/key.properties`:
   ```properties
   storePassword=<password>
   keyPassword=<password>
   keyAlias=upload
   storeFile=<path to keystore>
   ```

3. **Update build.gradle**
   In `android/app/build.gradle`:
   ```gradle
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

   android {
       signingConfigs {
           release {
               keyAlias keystoreProperties['keyAlias']
               keyPassword keystoreProperties['keyPassword']
               storeFile file(keystoreProperties['storeFile'])
               storePassword keystoreProperties['storePassword']
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
