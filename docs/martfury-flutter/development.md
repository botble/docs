# Development Guide

This guide provides information for developers who want to customize and extend the Martfury Flutter app.

## Project Architecture

### Clean Architecture

The app follows clean architecture principles with clear separation of concerns:

```
lib/
├── core/                  # Core functionality and configuration
│   ├── app_config.dart   # App configuration
│   ├── constants/        # App constants
│   └── utils/           # Utility functions
├── main.dart             # Application entry point
└── src/
    ├── controller/       # Business logic (GetX controllers)
    ├── model/           # Data models and entities
    ├── service/         # API services and data providers
    ├── theme/           # App theme and styling
    └── view/            # UI components
        ├── screen/      # App screens
        └── widget/      # Reusable widgets
```

### State Management

The app uses GetX for state management, providing:

- **Reactive State Management**: Using `Rx` variables
- **Dependency Injection**: With `Get.put()` and `Get.find()`
- **Navigation**: Using `Get.to()` and related methods
- **Internationalization**: Built-in localization support

## Getting Started with Development

### Setting Up Development Environment

1. **Install Flutter SDK** (3.7.2 or higher)
2. **Install IDE** (Android Studio, VS Code, or IntelliJ)
3. **Clone the project** and run `flutter pub get`
4. **Configure environment** variables in `.env`
5. **Run the app** with `flutter run`

### Development Workflow

1. **Create Feature Branch**: `git checkout -b feature/new-feature`
2. **Implement Changes**: Follow the architecture patterns
3. **Test Changes**: Run tests and manual testing
4. **Code Review**: Submit pull request for review
5. **Merge**: Merge to main branch after approval

## Adding New Features

### Creating a New Screen

1. **Create Model** (if needed):
```dart
// lib/src/model/new_model.dart
class NewModel {
  final int id;
  final String name;
  
  NewModel({required this.id, required this.name});
  
  factory NewModel.fromJson(Map<String, dynamic> json) {
    return NewModel(
      id: json['id'],
      name: json['name'],
    );
  }
}
```

2. **Create Service**:
```dart
// lib/src/service/new_service.dart
class NewService {
  static Future<List<NewModel>> getData() async {
    // API call implementation
  }
}
```

3. **Create Controller**:
```dart
// lib/src/controller/new_controller.dart
class NewController extends GetxController {
  final RxList<NewModel> items = <NewModel>[].obs;
  final RxBool isLoading = false.obs;
  
  @override
  void onInit() {
    super.onInit();
    loadData();
  }
  
  Future<void> loadData() async {
    isLoading.value = true;
    try {
      items.value = await NewService.getData();
    } catch (e) {
      Get.snackbar('Error', 'Failed to load data');
    } finally {
      isLoading.value = false;
    }
  }
}
```

4. **Create Screen**:
```dart
// lib/src/view/screen/new_screen.dart
class NewScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<NewController>(
      init: NewController(),
      builder: (controller) {
        return Scaffold(
          appBar: AppBar(title: Text('New Screen')),
          body: Obx(() {
            if (controller.isLoading.value) {
              return Center(child: CircularProgressIndicator());
            }
            return ListView.builder(
              itemCount: controller.items.length,
              itemBuilder: (context, index) {
                final item = controller.items[index];
                return ListTile(title: Text(item.name));
              },
            );
          }),
        );
      },
    );
  }
}
```

### Adding New API Endpoints

1. **Define API Service**:
```dart
class ApiEndpoints {
  static const String newEndpoint = '/api/new-endpoint';
}

class NewApiService {
  static final Dio _dio = ApiService.createDio();

  static Future<ApiResponse<List<NewModel>>> getNewData() async {
    try {
      final response = await _dio.get(ApiEndpoints.newEndpoint);
      // Handle response
    } catch (e) {
      throw ApiException('Failed to fetch data');
    }
  }
}
```

2. **Update Models** to match API response structure
3. **Implement Error Handling** for network and API errors
4. **Add Loading States** and user feedback

### Implementing Social Login

#### Adding Google Sign-In

1. **Add Dependencies**:
```yaml
dependencies:
  google_sign_in: ^6.1.5
  firebase_auth: ^4.7.2
```

2. **Create Google Auth Service**:
```dart
class GoogleAuthService {
  static final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email', 'profile'],
  );

  static Future<GoogleSignInAccount?> signIn() async {
    try {
      return await _googleSignIn.signIn();
    } catch (error) {
      print('Google Sign-In Error: $error');
      return null;
    }
  }

  static Future<void> signOut() async {
    await _googleSignIn.signOut();
  }
}
```

3. **Integrate with Authentication Controller**:
```dart
class AuthController extends GetxController {
  Future<void> signInWithGoogle() async {
    try {
      isLoading.value = true;
      final googleUser = await GoogleAuthService.signIn();

      if (googleUser != null) {
        final googleAuth = await googleUser.authentication;

        final result = await AuthApiService.socialLogin('google', {
          'access_token': googleAuth.accessToken,
          'id_token': googleAuth.idToken,
        });

        if (result.success) {
          await _handleSuccessfulLogin(result.data);
        }
      }
    } catch (e) {
      Get.snackbar('Error', 'Google Sign-In failed');
    } finally {
      isLoading.value = false;
    }
  }
}
```

#### Adding Facebook Login

1. **Add Dependencies**:
```yaml
dependencies:
  flutter_facebook_auth: ^6.0.2
```

2. **Create Facebook Auth Service**:
```dart
class FacebookAuthService {
  static Future<LoginResult> signIn() async {
    return await FacebookAuth.instance.login(
      permissions: ['email', 'public_profile'],
    );
  }

  static Future<void> signOut() async {
    await FacebookAuth.instance.logOut();
  }
}
```

#### Adding Apple Sign-In

1. **Add Dependencies**:
```yaml
dependencies:
  sign_in_with_apple: ^5.0.0
```

2. **Create Apple Auth Service**:
```dart
class AppleAuthService {
  static Future<AuthorizationCredentialAppleID> signIn() async {
    return await SignInWithApple.getAppleIDCredential(
      scopes: [
        AppleIDAuthorizationScopes.email,
        AppleIDAuthorizationScopes.fullName,
      ],
    );
  }
}
```

## Customization Guide

### Theming and Styling

#### Updating App Colors

Edit `lib/src/theme/app_theme.dart`:

```dart
class AppTheme {
  static const Color primaryColor = Color(0xFF2196F3);
  static const Color secondaryColor = Color(0xFF03DAC6);
  static const Color backgroundColor = Color(0xFFFAFAFA);
  
  static ThemeData get lightTheme => ThemeData(
    primarySwatch: Colors.blue,
    primaryColor: primaryColor,
    backgroundColor: backgroundColor,
  );
}
```

#### Custom Widgets

Create reusable widgets in `lib/src/view/widget/`:

```dart
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  
  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppTheme.primaryColor,
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      ),
      child: Text(text),
    );
  }
}
```

### Adding New Languages

1. **Create Translation File**:
```json
// assets/translations/es.json
{
  "app": {
    "name": "Martfury",
    "welcome": "Bienvenido a Martfury"
  },
  "auth": {
    "login": "Iniciar Sesión",
    "register": "Registrarse"
  }
}
```

2. **Update Supported Locales**:
```dart
// lib/main.dart
supportedLocales: [
  Locale('en', 'US'),
  Locale('vi', 'VN'),
  Locale('es', 'ES'), // Add new locale
],
```

3. **Use Translations**:
```dart
Text('auth.login'.tr())
```

## Testing

### Unit Testing

Create tests in `test/` directory:

```dart
// test/controller/new_controller_test.dart
void main() {
  group('NewController', () {
    late NewController controller;
    
    setUp(() {
      controller = NewController();
    });
    
    test('should load data on init', () async {
      await controller.loadData();
      expect(controller.items.isNotEmpty, true);
    });
  });
}
```

### Widget Testing

```dart
// test/widget/custom_button_test.dart
void main() {
  testWidgets('CustomButton should display text', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: CustomButton(
          text: 'Test Button',
          onPressed: () {},
        ),
      ),
    );
    
    expect(find.text('Test Button'), findsOneWidget);
  });
}
```

### Integration Testing

```dart
// integration_test/app_test.dart
void main() {
  group('App Integration Tests', () {
    testWidgets('should navigate through main flow', (tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // Test navigation and user flows
    });
  });
}
```

## Performance Optimization

### Image Optimization

```dart
class OptimizedImage extends StatelessWidget {
  final String imageUrl;
  
  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: imageUrl,
      placeholder: (context, url) => ShimmerWidget(),
      errorWidget: (context, url, error) => Icon(Icons.error),
      memCacheWidth: 300, // Optimize memory usage
    );
  }
}
```

### List Performance

```dart
class OptimizedList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      cacheExtent: 1000, // Cache items outside viewport
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(items[index].name),
        );
      },
    );
  }
}
```

## Debugging

### Debug Tools

1. **Flutter Inspector**: Analyze widget tree
2. **Network Inspector**: Monitor API calls
3. **Performance Overlay**: Check rendering performance
4. **Memory Profiler**: Detect memory leaks

### Logging

```dart
class Logger {
  static void debug(String message) {
    if (kDebugMode) {
      print('[DEBUG] $message');
    }
  }
  
  static void error(String message, [dynamic error]) {
    if (kDebugMode) {
      print('[ERROR] $message: $error');
    }
  }
}
```

## Building for Production

### Android Release

```bash
flutter build apk --release
# or
flutter build appbundle --release
```

### iOS Release

```bash
flutter build ios --release
```

### Environment Configuration

Create separate environment files:
- `.env.development`
- `.env.staging`
- `.env.production`

## Code Quality

### Linting

Configure `analysis_options.yaml`:

```yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: true
    prefer_const_literals_to_create_immutables: true
    avoid_print: true
```

### Code Formatting

```bash
dart format lib/
```

### Static Analysis

```bash
flutter analyze
```

## Deployment

### App Store Deployment

1. **Configure App Store Connect**
2. **Update version numbers**
3. **Build release version**
4. **Upload to App Store Connect**
5. **Submit for review**

### Google Play Deployment

1. **Configure Google Play Console**
2. **Generate signed APK/AAB**
3. **Upload to Google Play Console**
4. **Submit for review**

## Best Practices

### Code Organization

- Follow consistent naming conventions
- Use meaningful variable and function names
- Keep functions small and focused
- Comment complex logic

### Error Handling

- Always handle potential errors
- Provide meaningful error messages
- Implement retry mechanisms where appropriate
- Log errors for debugging

### Security

- Never store sensitive data in plain text
- Use secure storage for tokens
- Validate all user inputs
- Implement proper authentication

For more development resources, check the [Flutter documentation](https://flutter.dev/docs) and [GetX documentation](https://pub.dev/packages/get).
