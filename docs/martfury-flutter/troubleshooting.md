# Troubleshooting Martfury Flutter App

This guide will help you resolve common issues that may arise when using the Martfury Flutter mobile application.

## Installation and Setup Issues

### Flutter Dependencies Issues

If you encounter problems with Flutter dependencies:

1. **Clean and Reinstall Dependencies**:
   ```bash
   flutter clean
   flutter pub get
   ```

2. **Check Flutter Version**:
   ```bash
   flutter --version
   flutter doctor
   ```
   Ensure you're using Flutter 3.7.2 or higher.

3. **Update Dependencies**:
   ```bash
   flutter pub upgrade
   ```

### Environment Configuration Problems

If the app can't load environment variables:

1. **Check .env File**:
   - Ensure `.env` file exists in the root directory
   - Verify the file is not named `.env.txt`
   - Check that all required variables are set

2. **Environment Variables Format**:
   ```env
   API_BASE_URL=https://your-api-url.com
   APP_NAME=Martfury
   APP_ENV=development
   ```

3. **Restart the App**:
   - Stop the app completely
   - Run `flutter clean`
   - Restart with `flutter run`

### Build Errors

#### Android Build Issues

1. **Gradle Build Errors**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   flutter clean
   flutter pub get
   ```

2. **SDK Version Issues**:
   - Check `android/app/build.gradle`
   - Ensure `compileSdkVersion` and `targetSdkVersion` are compatible
   - Update Android SDK if needed

3. **Memory Issues**:
   - Increase Gradle memory in `android/gradle.properties`:
   ```properties
   org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m
   ```

#### iOS Build Issues

1. **Pod Installation Issues**:
   ```bash
   cd ios
   rm -rf Pods
   rm Podfile.lock
   pod install
   cd ..
   flutter clean
   flutter pub get
   ```

2. **Xcode Version**:
   - Ensure you're using Xcode 12.0 or higher
   - Update Xcode if necessary

3. **Signing Issues**:
   - Open `ios/Runner.xcworkspace` in Xcode
   - Configure signing with your Apple Developer Account

## API Connection Issues

### Backend Connection Problems

If the app can't connect to your backend:

1. **Check API URL**:
   - Verify `API_BASE_URL` in `.env` file is correct
   - Ensure the URL is accessible from your device
   - Test the URL in a web browser

2. **Network Connectivity**:
   - Check internet connection on your device
   - Try switching between WiFi and mobile data
   - Test with different networks

3. **CORS Configuration**:
   - Ensure CORS is properly configured on your backend
   - Check that mobile app requests are allowed
   - Verify allowed headers and methods

### Authentication Issues

If login/authentication fails:

1. **Check Credentials**:
   - Verify email and password are correct
   - Check if account exists in the backend
   - Try password reset if needed

2. **API Endpoints**:
   - Ensure authentication endpoints are working
   - Test login API with Postman or similar tool
   - Check API response format

3. **Token Issues**:
   - Clear app data and try again
   - Check token storage and retrieval
   - Verify token expiration handling

### Social Login Issues

If social login fails:

#### Google Sign-In Problems

1. **Configuration Issues**:
   - Verify `google-services.json` is correctly placed
   - Check SHA-1 fingerprint is added to Firebase Console
   - Ensure Google Sign-In is enabled in Firebase Authentication

2. **Android-Specific Issues**:
   ```bash
   # Get debug SHA-1 fingerprint
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
   - Add the SHA-1 fingerprint to Firebase Console
   - Verify package name matches in Firebase

3. **iOS-Specific Issues**:
   - Check `REVERSED_CLIENT_ID` is correctly added to URL schemes
   - Verify `GoogleService-Info.plist` is added to Xcode project
   - Ensure iOS bundle ID matches Firebase configuration

#### Facebook Login Problems

1. **App Configuration**:
   - Verify Facebook App ID and Client Token are correct
   - Check app is in "Live" mode (not Development)
   - Ensure package name and key hashes are configured

2. **Android Issues**:
   - Generate and add key hash to Facebook App Console:
   ```bash
   keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
   ```
   - Verify `strings.xml` contains correct Facebook App ID

3. **iOS Issues**:
   - Check Facebook App ID is correctly added to `Info.plist`
   - Verify URL scheme `fbYOUR_FACEBOOK_APP_ID` is configured
   - Ensure app is added to Facebook App Console

#### Apple Sign-In Problems

1. **iOS Configuration**:
   - Verify "Sign In with Apple" capability is enabled in Xcode
   - Check `Runner.entitlements` contains Apple Sign-In capability
   - Ensure Apple Developer Account has Sign In with Apple enabled

2. **Common Issues**:
   - Apple Sign-In only works on iOS 13+ and macOS 10.15+
   - Ensure app is signed with valid provisioning profile
   - Check Apple Developer Console for Sign In with Apple configuration

#### General Social Login Issues

1. **Network Issues**:
   - Check internet connectivity
   - Verify social provider APIs are accessible
   - Test with different networks

2. **Backend Integration**:
   - Ensure backend supports social login endpoints
   - Verify social login API responses match expected format
   - Check backend logs for social authentication errors

3. **User Account Issues**:
   - Check if social account email already exists with different provider
   - Verify account linking logic in backend
   - Test account creation flow for new social users

### Data Loading Problems

If products or other data won't load:

1. **API Response**:
   - Check if backend APIs are returning data
   - Verify API response format matches app expectations
   - Look for error messages in API responses

2. **Network Timeout**:
   - Increase API timeout in configuration
   - Check for slow network connections
   - Verify backend server performance

3. **Data Format Issues**:
   - Ensure API returns data in expected JSON format
   - Check for missing required fields
   - Verify data types match app models

## App Performance Issues

### Slow Loading

If the app loads slowly:

1. **Image Optimization**:
   - Optimize product images on the backend
   - Enable image caching in the app
   - Use appropriate image formats (WebP, JPEG)

2. **Network Optimization**:
   - Implement pagination for large data sets
   - Use lazy loading for images
   - Cache frequently accessed data

3. **Memory Management**:
   - Monitor memory usage
   - Dispose of unused resources
   - Optimize widget rebuilds

### App Crashes

If the app crashes frequently:

1. **Check Logs**:
   ```bash
   flutter logs
   ```
   Look for error messages and stack traces

2. **Memory Issues**:
   - Monitor memory usage
   - Check for memory leaks
   - Optimize image loading

3. **Device Compatibility**:
   - Test on different devices
   - Check minimum OS version requirements
   - Verify hardware compatibility

## Payment Issues

### Payment Gateway Problems

If payments fail:

1. **Gateway Configuration**:
   - Verify payment gateway settings in backend
   - Check API keys and credentials
   - Ensure gateway supports your region

2. **Test Mode**:
   - Test payments in sandbox mode first
   - Use test card numbers provided by gateway
   - Verify test transactions work correctly

3. **Network Issues**:
   - Check internet connectivity during payment
   - Verify payment gateway URLs are accessible
   - Test with different networks

### Order Processing Issues

If orders aren't processed correctly:

1. **Order API**:
   - Check order creation API endpoint
   - Verify order data format
   - Test order submission manually

2. **Payment Confirmation**:
   - Ensure payment confirmation is received
   - Check webhook configuration
   - Verify order status updates

## UI/UX Issues

### Layout Problems

If the UI doesn't display correctly:

1. **Screen Compatibility**:
   - Test on different screen sizes
   - Check responsive design implementation
   - Verify widget constraints

2. **Theme Issues**:
   - Check theme configuration
   - Verify color and style definitions
   - Test dark mode compatibility

3. **Localization Problems**:
   - Verify translation files exist
   - Check for missing translation keys
   - Test language switching

### Navigation Issues

If navigation doesn't work properly:

1. **Route Configuration**:
   - Check route definitions
   - Verify navigation logic
   - Test deep linking

2. **State Management**:
   - Check GetX controller initialization
   - Verify state updates
   - Test navigation between screens

## Push Notification Issues

### Notifications Not Working

If push notifications aren't received, follow these comprehensive troubleshooting steps:

#### Firebase Configuration Issues

1. **Configuration Files**:
   - Verify `google-services.json` is in `android/app/` directory
   - Check `GoogleService-Info.plist` is added to Xcode project
   - Ensure files match your Firebase project configuration
   - Verify package names match Firebase app registration

2. **Firebase Project Setup**:
   - Check Firebase project has Cloud Messaging enabled
   - Verify Server Key is available in project settings
   - Ensure both Android and iOS apps are added to project
   - Check SHA-1 fingerprint is added for Android

3. **Dependencies**:
   ```bash
   flutter clean
   flutter pub get
   ```
   - Verify Firebase dependencies are correctly added
   - Check for version conflicts in pubspec.yaml

#### Platform-Specific Issues

**Android Issues**:

1. **Build Configuration**:
   - Check `google-services` plugin is applied
   - Verify Gradle dependencies are correct
   - Ensure minimum SDK version is 21 or higher

2. **Permissions and Manifest**:
   - Check required permissions in AndroidManifest.xml
   - Verify FCM service is declared
   - Check notification channel configuration

3. **Device Settings**:
   - Disable battery optimization for the app
   - Check notification settings are enabled
   - Verify app has notification permissions

**iOS Issues**:

1. **Xcode Configuration**:
   - Enable "Push Notifications" capability
   - Enable "Background Modes" > "Remote notifications"
   - Check provisioning profile includes push notifications

2. **APNS Certificate**:
   - Verify APNS certificate is uploaded to Firebase
   - Check certificate is not expired
   - Ensure certificate matches app bundle ID

3. **Device Requirements**:
   - Test on physical device (not simulator)
   - Check iOS version compatibility (iOS 10+)
   - Verify device has internet connection

#### Token and Registration Issues

1. **Token Generation**:
   ```dart
   // Check token in logs
   String? token = await FirebaseMessaging.instance.getToken();
   print('FCM Token: $token');
   ```

2. **Token Refresh**:
   - Implement token refresh listener
   - Update token on server when refreshed
   - Handle token changes properly

3. **Permission Handling**:
   ```dart
   // Check notification permissions
   NotificationSettings settings = await FirebaseMessaging.instance.requestPermission();
   print('Permission status: ${settings.authorizationStatus}');
   ```

#### Backend Integration Issues

1. **Server Key**:
   - Verify correct server key is used
   - Check server key has necessary permissions
   - Test with Firebase Console first

2. **API Endpoints**:
   - Verify FCM API endpoints are working
   - Check request format and headers
   - Test with Postman or similar tool

3. **Message Format**:
   ```json
   {
     "to": "FCM_TOKEN",
     "notification": {
       "title": "Test",
       "body": "Test message"
     },
     "data": {
       "type": "test"
     }
   }
   ```

#### Testing and Debugging

1. **Firebase Console Testing**:
   - Use Firebase Console to send test messages
   - Test with specific device tokens
   - Try different message types

2. **Debug Logs**:
   ```bash
   # Android
   adb logcat | grep FCM

   # iOS
   xcrun devicectl device logs --device [device-id] | grep FCM
   ```

3. **Network Testing**:
   - Check internet connectivity
   - Test with different networks
   - Verify firewall settings

For complete FCM setup instructions, see the [FCM Setup Guide](fcm-setup.md).

## Advanced Troubleshooting

### Debug Mode

Enable debug mode for detailed logging:

1. **Flutter Debug**:
   ```bash
   flutter run --debug
   ```

2. **Enable Logging**:
   - Set `ENABLE_LOGGING=true` in `.env`
   - Check console output for errors
   - Use debug prints strategically

### Performance Profiling

Profile app performance:

1. **Flutter Inspector**:
   - Use Flutter Inspector in IDE
   - Monitor widget tree
   - Check for performance bottlenecks

2. **Memory Profiling**:
   ```bash
   flutter run --profile
   ```
   Use DevTools for memory analysis

### Network Debugging

Debug network issues:

1. **Network Inspector**:
   - Use network debugging tools
   - Monitor API requests and responses
   - Check for failed requests

2. **Proxy Tools**:
   - Use Charles Proxy or similar tools
   - Monitor HTTPS traffic
   - Debug API communication

## Device-Specific Issues

### Android Issues

1. **Permissions**:
   - Check app permissions in device settings
   - Verify required permissions are declared
   - Test permission request flow

2. **Storage Issues**:
   - Check available storage space
   - Clear app cache if needed
   - Verify file access permissions

### iOS Issues

1. **Simulator vs Device**:
   - Test on both simulator and physical device
   - Check for simulator-specific issues
   - Verify device compatibility

2. **App Store Guidelines**:
   - Ensure compliance with App Store guidelines
   - Check for rejected features
   - Verify privacy policy requirements

## Getting Support

If you're unable to resolve the issue using this troubleshooting guide:

### Documentation Resources

- **API Documentation**: [https://ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs)
- **Flutter Documentation**: [https://flutter.dev/docs](https://flutter.dev/docs)
- **Botble Documentation**: [https://docs.botble.com](https://docs.botble.com)

### Support Channels

- **Support Center**: [https://botble.ticksy.com](https://botble.ticksy.com)
- **Community Forum**: [https://botble.com/forum](https://botble.com/forum)
- **GitHub Issues**: Report bugs and feature requests

### When Contacting Support

Please provide the following information:

1. **Detailed Description**: Clear description of the issue
2. **Steps to Reproduce**: Exact steps to reproduce the problem
3. **Environment Information**:
   - Flutter version (`flutter --version`)
   - Device information (OS version, model)
   - App version
   - Backend version
4. **Error Messages**: Complete error messages and stack traces
5. **Screenshots/Videos**: Visual evidence of the issue
6. **Configuration**: Relevant configuration settings (without sensitive data)

### Log Collection

Collect relevant logs:

1. **Flutter Logs**:
   ```bash
   flutter logs > app_logs.txt
   ```

2. **Device Logs**:
   - Android: Use `adb logcat`
   - iOS: Use Xcode Console

3. **Backend Logs**: Check your Botble backend logs for API errors

### Testing Checklist

Before reporting issues, verify:

- [ ] Issue occurs on multiple devices
- [ ] Latest app version is installed
- [ ] Backend is accessible and working
- [ ] Network connectivity is stable
- [ ] All dependencies are up to date
- [ ] Configuration is correct
- [ ] Issue is reproducible consistently
