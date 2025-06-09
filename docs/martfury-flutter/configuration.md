# Configuring Martfury Flutter App

This guide will walk you through the process of configuring the Martfury Flutter mobile application for your Botble E-commerce system.

## Environment Configuration

### Setting Up Environment Variables

The app uses environment variables for configuration. Create and configure your `.env` file:

```env
# API Configuration
API_BASE_URL=https://your-botble-ecommerce-api.com
APP_NAME=Martfury
APP_ENV=development

# Test Credentials (for development)
TEST_EMAIL=your-test-email@example.com
TEST_PASSWORD=your-test-password

# Optional Configuration
API_TIMEOUT=30000
ENABLE_LOGGING=true
DEFAULT_LANGUAGE=en
DEFAULT_CURRENCY=USD
```

### Environment Variables Explained

- **API_BASE_URL**: Your Botble backend API endpoint URL
- **APP_NAME**: Display name of your application
- **APP_ENV**: Environment mode (development, staging, production)
- **TEST_EMAIL/TEST_PASSWORD**: Test credentials for development
- **API_TIMEOUT**: API request timeout in milliseconds
- **ENABLE_LOGGING**: Enable/disable debug logging
- **DEFAULT_LANGUAGE**: Default app language (en, vi, etc.)
- **DEFAULT_CURRENCY**: Default currency code (USD, EUR, etc.)

## App Configuration

### Core App Settings

The main app configuration is located in `lib/core/app_config.dart`:

```dart
class AppConfig {
  static const String appName = 'Martfury';
  static const String appVersion = '1.0.0';
  static const int apiTimeout = 30000;
  static const bool enableLogging = true;

  // API Configuration
  static String get baseUrl => dotenv.env['API_BASE_URL'] ?? '';
  static String get environment => dotenv.env['APP_ENV'] ?? 'development';
}
```

### API Configuration

Configure API endpoints and settings in `lib/src/service/api_service.dart`:

```dart
class ApiService {
  static const String authEndpoint = '/api/auth';
  static const String productsEndpoint = '/api/products';
  static const String cartEndpoint = '/api/cart';
  static const String ordersEndpoint = '/api/orders';

  // Request headers
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ${AuthService.token}',
  };
}
```

## Theme and Styling Configuration

### App Theme Settings

Customize the app's appearance in `lib/src/theme/app_theme.dart`:

```dart
class AppTheme {
  // Primary Colors
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color secondaryColor = Color(0xFF03DAC6);
  static const Color errorColor = Color(0xFFB00020);

  // Text Colors
  static const Color textPrimary = Color(0xFF212121);
  static const Color textSecondary = Color(0xFF757575);

  // Background Colors
  static const Color backgroundColor = Color(0xFFFAFAFA);
  static const Color surfaceColor = Color(0xFFFFFFFF);
}
```

### Dark Mode Configuration

Configure dark mode settings:

```dart
class DarkTheme {
  static ThemeData get darkTheme => ThemeData(
    brightness: Brightness.dark,
    primarySwatch: Colors.blue,
    primaryColor: AppTheme.primaryColor,
    backgroundColor: Color(0xFF121212),
    surfaceColor: Color(0xFF1E1E1E),
  );
}
```

## Localization Configuration

### Adding New Languages

1. **Create translation files** in `assets/translations/`:
   - `en.json` (English)
   - `vi.json` (Vietnamese)
   - `es.json` (Spanish)
   - `fr.json` (French)

2. **Configure supported locales** in `lib/main.dart`:

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return EasyLocalization(
      supportedLocales: [
        Locale('en', 'US'),
        Locale('vi', 'VN'),
        Locale('es', 'ES'),
        Locale('fr', 'FR'),
      ],
      path: 'assets/translations',
      fallbackLocale: Locale('en', 'US'),
      child: MaterialApp(...),
    );
  }
}
```

### Translation File Structure

Example `en.json` structure:

```json
{
  "app": {
    "name": "Martfury",
    "welcome": "Welcome to Martfury"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password"
  },
  "products": {
    "title": "Products",
    "search": "Search products",
    "add_to_cart": "Add to Cart"
  }
}
```

## Payment Gateway Configuration

### Supported Payment Methods

Configure payment gateways in your Botble backend. The app supports:

1. **Stripe**: Credit/debit card payments
2. **PayPal**: PayPal account payments
3. **Razorpay**: Indian payment gateway
4. **Mollie**: European payment gateway
5. **SSLCommerz**: Bangladesh payment gateway
6. **Cash on Delivery**: COD payments

### Payment Configuration

Payment settings are managed through the backend API. Ensure your Botble backend has the required payment gateways configured.

## Social Login Configuration

### Google Sign-In Setup

1. **Configure Google Sign-In in Firebase Console**:
   - Enable Google Sign-In in Firebase Authentication
   - Add your app's SHA-1 fingerprint for Android
   - Download updated `google-services.json` and `GoogleService-Info.plist`

2. **Add Google Sign-In dependency**:

```yaml
dependencies:
  google_sign_in: ^6.1.5
  firebase_auth: ^4.7.2
```

3. **Android Configuration**:
   - Add to `android/app/build.gradle`:
   ```gradle
   dependencies {
       implementation 'com.google.android.gms:play-services-auth:20.7.0'
   }
   ```

4. **iOS Configuration**:
   - Add URL scheme to `ios/Runner/Info.plist`:
   ```xml
   <key>CFBundleURLTypes</key>
   <array>
       <dict>
           <key>CFBundleURLName</key>
           <string>REVERSED_CLIENT_ID</string>
           <key>CFBundleURLSchemes</key>
           <array>
               <string>YOUR_REVERSED_CLIENT_ID</string>
           </array>
       </dict>
   </array>
   ```

### Facebook Login Setup

1. **Configure Facebook App**:
   - Create app in Facebook Developers Console
   - Add Android and iOS platforms
   - Configure package name and key hashes

2. **Add Facebook Login dependency**:

```yaml
dependencies:
  flutter_facebook_auth: ^6.0.2
```

3. **Android Configuration**:
   - Add to `android/app/src/main/res/values/strings.xml`:
   ```xml
   <string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
   <string name="fb_login_protocol_scheme">fbYOUR_FACEBOOK_APP_ID</string>
   <string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN</string>
   ```

   - Add to `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <meta-data android:name="com.facebook.sdk.ApplicationId"
              android:value="@string/facebook_app_id"/>
   <meta-data android:name="com.facebook.sdk.ClientToken"
              android:value="@string/facebook_client_token"/>
   ```

4. **iOS Configuration**:
   - Add to `ios/Runner/Info.plist`:
   ```xml
   <key>CFBundleURLTypes</key>
   <array>
       <dict>
           <key>CFBundleURLSchemes</key>
           <array>
               <string>fbYOUR_FACEBOOK_APP_ID</string>
           </array>
       </dict>
   </array>
   <key>FacebookAppID</key>
   <string>YOUR_FACEBOOK_APP_ID</string>
   <key>FacebookClientToken</key>
   <string>YOUR_FACEBOOK_CLIENT_TOKEN</string>
   <key>FacebookDisplayName</key>
   <string>Martfury</string>
   ```

### Apple Sign-In Setup

1. **Enable Apple Sign-In**:
   - Enable in Apple Developer Console
   - Configure in Xcode project capabilities

2. **Add Apple Sign-In dependency**:

```yaml
dependencies:
  sign_in_with_apple: ^5.0.0
```

3. **iOS Configuration**:
   - Enable "Sign In with Apple" capability in Xcode
   - Add to `ios/Runner/Runner.entitlements`:
   ```xml
   <key>com.apple.developer.applesignin</key>
   <array>
       <string>Default</string>
   </array>
   ```

### Social Login Implementation

```dart
class SocialAuthService {
  // Google Sign-In
  static Future<UserCredential?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) return null;

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      return await FirebaseAuth.instance.signInWithCredential(credential);
    } catch (e) {
      throw Exception('Google Sign-In failed: $e');
    }
  }

  // Facebook Sign-In
  static Future<UserCredential?> signInWithFacebook() async {
    try {
      final LoginResult result = await FacebookAuth.instance.login();
      if (result.status != LoginStatus.success) return null;

      final OAuthCredential credential =
          FacebookAuthProvider.credential(result.accessToken!.token);

      return await FirebaseAuth.instance.signInWithCredential(credential);
    } catch (e) {
      throw Exception('Facebook Sign-In failed: $e');
    }
  }

  // Apple Sign-In
  static Future<UserCredential?> signInWithApple() async {
    try {
      final appleCredential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );

      final oauthCredential = OAuthProvider("apple.com").credential(
        idToken: appleCredential.identityToken,
        accessToken: appleCredential.authorizationCode,
      );

      return await FirebaseAuth.instance.signInWithCredential(oauthCredential);
    } catch (e) {
      throw Exception('Apple Sign-In failed: $e');
    }
  }
}
```

## Push Notifications Configuration

### Firebase Cloud Messaging (FCM) Setup

The Martfury Flutter app uses Firebase Cloud Messaging (FCM) for push notifications. For complete setup instructions, see the dedicated [FCM Setup Guide](fcm-setup.md).

#### Quick Setup Overview

1. **Create Firebase Project**:
   - Set up project in Firebase Console
   - Add Android and iOS apps
   - Download configuration files

2. **Add Configuration Files**:
   - `android/app/google-services.json` (Android)
   - `ios/Runner/GoogleService-Info.plist` (iOS)

3. **Configure Dependencies** in `pubspec.yaml`:

```yaml
dependencies:
  firebase_core: ^2.15.0
  firebase_messaging: ^14.6.5
  firebase_auth: ^4.7.2
  flutter_local_notifications: ^15.1.0+1
```

4. **Initialize Firebase** in `lib/main.dart`:

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print("Background message: ${message.messageId}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  runApp(MyApp());
}
```

#### Notification Types

The app supports various notification types:

- **Order Updates**: Status changes, shipping notifications
- **Promotional Offers**: Sales, discounts, special deals
- **Product Alerts**: New arrivals, back in stock, price drops
- **Wishlist Notifications**: Item availability, price changes
- **Account Notifications**: Security alerts, profile updates

#### Platform-Specific Configuration

**Android Configuration**:
- Custom notification channels
- Notification icons and colors
- Background message handling
- Auto-start permissions

**iOS Configuration**:
- APNS certificate setup
- Notification permissions
- Background app refresh
- Critical alerts (if needed)

For detailed step-by-step instructions, platform-specific configurations, troubleshooting, and advanced features, please refer to the [Complete FCM Setup Guide](fcm-setup.md).

## Performance Configuration

### Image Caching

Configure image caching in `lib/src/service/image_service.dart`:

```dart
class ImageService {
  static const int maxCacheSize = 100; // MB
  static const Duration cacheTimeout = Duration(days: 7);

  static CachedNetworkImage buildCachedImage(String url) {
    return CachedNetworkImage(
      imageUrl: url,
      placeholder: (context, url) => CircularProgressIndicator(),
      errorWidget: (context, url, error) => Icon(Icons.error),
      cacheManager: DefaultCacheManager(),
    );
  }
}
```

### Network Configuration

Configure network settings:

```dart
class NetworkConfig {
  static const int connectTimeout = 30000;
  static const int receiveTimeout = 30000;
  static const int sendTimeout = 30000;

  static Dio createDio() {
    final dio = Dio();
    dio.options.connectTimeout = connectTimeout;
    dio.options.receiveTimeout = receiveTimeout;
    dio.options.sendTimeout = sendTimeout;
    return dio;
  }
}
```

## Security Configuration

### API Security

1. **Enable HTTPS** for all API communications
2. **Configure API authentication** with bearer tokens
3. **Implement certificate pinning** for production

```dart
class SecurityConfig {
  static bool get enableCertificatePinning =>
      AppConfig.environment == 'production';

  static List<String> get pinnedCertificates => [
    'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
  ];
}
```

### Data Encryption

Configure local data encryption:

```dart
class EncryptionService {
  static const String encryptionKey = 'your-encryption-key';

  static String encrypt(String data) {
    // Implement encryption logic
    return encryptedData;
  }

  static String decrypt(String encryptedData) {
    // Implement decryption logic
    return decryptedData;
  }
}
```

## Backend Integration Configuration

### API Endpoints Configuration

Ensure your Botble backend has the following API endpoints enabled:

1. **Authentication APIs**:
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `POST /api/auth/logout`
   - `POST /api/auth/refresh`

2. **Product APIs**:
   - `GET /api/products`
   - `GET /api/products/{id}`
   - `GET /api/categories`
   - `GET /api/search`

3. **Cart APIs**:
   - `GET /api/cart`
   - `POST /api/cart/add`
   - `PUT /api/cart/update`
   - `DELETE /api/cart/remove`

4. **Order APIs**:
   - `GET /api/orders`
   - `POST /api/orders`
   - `GET /api/orders/{id}`

### CORS Configuration

Configure CORS in your Botble backend to allow mobile app requests:

```php
// In your Laravel backend
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'], // Configure specific origins for production
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

## Testing Configuration

### Test Environment Setup

Configure test environment in `.env.test`:

```env
API_BASE_URL=https://test-api.your-domain.com
APP_ENV=testing
ENABLE_LOGGING=true
TEST_EMAIL=test@example.com
TEST_PASSWORD=testpassword123
```

### Mock Data Configuration

Set up mock data for testing:

```dart
class MockDataService {
  static bool get useMockData => AppConfig.environment == 'testing';

  static List<Product> getMockProducts() {
    return [
      Product(id: 1, name: 'Test Product', price: 99.99),
      // Add more mock products
    ];
  }
}
```

## Troubleshooting Configuration Issues

### Common Configuration Issues

**API connection failures:**
- Verify API_BASE_URL is correct and accessible
- Check network connectivity
- Ensure CORS is properly configured on backend
- Verify SSL certificates for HTTPS endpoints

**Localization not working:**
- Check translation files are in `assets/translations/`
- Verify supported locales are configured correctly
- Ensure translation keys exist in all language files

**Theme not applying:**
- Check theme configuration in `app_theme.dart`
- Verify theme is properly set in MaterialApp
- Clear app cache and restart

**Payment gateway issues:**
- Verify payment gateways are configured in backend
- Check API keys and credentials
- Test payment flow in sandbox mode first

**Push notifications not working:**
- Verify Firebase configuration files are added
- Check Firebase project settings
- Ensure proper permissions are requested

For additional configuration help, please refer to the [Troubleshooting](troubleshooting.md) section or contact our support team.
