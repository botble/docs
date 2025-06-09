# Installing Martfury Flutter App

This guide will walk you through the process of setting up the Martfury Flutter mobile application for your Botble E-commerce system.

## Requirements

Before installing the Martfury Flutter app, ensure your system meets the following requirements:

### Development Environment
- **Flutter SDK**: 3.7.2 or higher
- **Dart SDK**: 3.0.0 or higher
- **IDE**: Android Studio, VS Code, or IntelliJ IDEA
- **Git**: For version control and cloning the repository

### Backend Requirements
- **Botble E-commerce Backend**: Running instance of [Martfury Laravel E-commerce System](https://codecanyon.net/item/martfury-multipurpose-laravel-ecommerce-system/29925223)
- **API Access**: Botble backend with API endpoints enabled
- **HTTPS**: Secure connection for API communication (recommended for production)

### Platform-Specific Requirements

**For Android Development:**
- Android Studio with Android SDK
- Android SDK API level 21 (Android 5.0) or higher
- Java Development Kit (JDK) 11 or higher

**For iOS Development:**
- macOS with Xcode 12.0 or higher
- iOS 12.0 or higher
- Apple Developer Account (for device testing and App Store deployment)

## Installation Steps

### 1. Clone or Download the Repository

**Option A: Clone from Git Repository**
```bash
git clone https://github.com/yourusername/martfury-flutter.git
cd martfury-flutter
```

**Option B: Download Source Code**
1. Download the source code package
2. Extract the zip file to your desired directory
3. Navigate to the extracted folder

### 2. Install Flutter Dependencies

Navigate to the project directory and install all required dependencies:

```bash
flutter pub get
```

This command will download and install all packages listed in the `pubspec.yaml` file, including:
- Core Flutter dependencies
- HTTP client for API communication
- State management (GetX)
- Social login packages (Google, Facebook, Apple)
- Firebase services
- UI components and utilities

### 3. Environment Configuration

#### Create Environment File
Create a `.env` file in the root directory of the project based on the `.env.example` template:

```bash
cp .env.example .env
```

#### Configure Environment Variables
Edit the `.env` file with your specific configuration:

```env
# API Configuration
API_BASE_URL=https://your-botble-ecommerce-api.com
APP_NAME=Martfury
APP_ENV=development

# Test Credentials (for development)
TEST_EMAIL=your-test-email@example.com
TEST_PASSWORD=your-test-password

# Optional: Additional Configuration
API_TIMEOUT=30000
ENABLE_LOGGING=true
```

**Important Configuration Notes:**
- Replace `https://your-botble-ecommerce-api.com` with your actual Botble backend URL
- Ensure the backend URL is accessible from your development environment
- Use HTTPS in production for secure API communication

### 4. Verify Flutter Installation

Before running the app, verify your Flutter installation:

```bash
flutter doctor
```

This command checks your environment and displays a report of the status of your Flutter installation. Address any issues reported.

### 5. Run the Application

#### For Development
Run the app in debug mode:

```bash
flutter run
```

#### For Specific Platform
Run on Android:
```bash
flutter run -d android
```

Run on iOS:
```bash
flutter run -d ios
```

#### For Web (if supported)
```bash
flutter run -d web
```

## Platform-Specific Setup

### Android Setup

1. **Enable Developer Options** on your Android device
2. **Enable USB Debugging** in Developer Options
3. **Connect your device** via USB or use an Android emulator
4. **Verify device connection**:
   ```bash
   flutter devices
   ```

### iOS Setup

1. **Open the project in Xcode**:
   ```bash
   open ios/Runner.xcworkspace
   ```
2. **Configure signing** in Xcode with your Apple Developer Account
3. **Connect your iOS device** or use the iOS Simulator
4. **Trust the developer certificate** on your device (if using physical device)

## Project Structure Overview

After installation, familiarize yourself with the project structure:

```
lib/
├── core/                  # Core functionality and configuration
│   ├── app_config.dart   # App configuration settings
│   ├── constants/        # App constants and enums
│   └── utils/           # Utility functions
├── main.dart             # Application entry point
└── src/
    ├── controller/       # Business logic controllers (GetX)
    ├── model/           # Data models and entities
    ├── service/         # API services and data providers
    ├── theme/           # App theme and styling
    └── view/            # UI components
        ├── screen/      # App screens
        └── widget/      # Reusable widgets
```

## Verifying Installation

### 1. App Launch Verification
1. Launch the app on your device/emulator
2. Verify the splash screen appears
3. Check that the onboarding screens load properly
4. Ensure the main navigation works

### 2. API Connection Test
1. Navigate to the login screen
2. Attempt to log in with test credentials
3. Verify API communication is working
4. Check that product data loads on the home screen

### 3. Core Features Test
Test the following core features:
- User authentication (login/register)
- Product browsing and search
- Shopping cart functionality
- Wishlist management
- User profile access

### 4. Push Notifications Test
1. Verify Firebase is properly initialized
2. Check FCM token generation in logs
3. Test notification permissions (especially on iOS)
4. Send test notification from Firebase Console

For detailed push notification setup, see the [FCM Setup Guide](fcm-setup.md).

## Building for Production

### Android APK
```bash
flutter build apk --release
```

### Android App Bundle (recommended for Play Store)
```bash
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

## Troubleshooting Installation Issues

### Common Issues and Solutions

**Flutter dependencies issues:**
```bash
flutter clean
flutter pub get
```

**Gradle build errors (Android):**
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

**iOS build errors:**
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
flutter clean
flutter pub get
```

**API connection issues:**
- Verify the API_BASE_URL in your `.env` file
- Check that the Botble backend is running and accessible
- Ensure CORS is properly configured on the backend
- Test API endpoints using a tool like Postman

**Environment file not loading:**
- Ensure the `.env` file is in the root directory
- Check that the file is not named `.env.txt`
- Restart the app after making changes to the `.env` file

### Getting Help

If you encounter issues during installation:

1. **Check the logs**: Use `flutter logs` to see detailed error messages
2. **Verify requirements**: Ensure all system requirements are met
3. **Update dependencies**: Run `flutter pub upgrade` to update packages
4. **Consult documentation**: Check the [Flutter documentation](https://flutter.dev/docs)
5. **Contact support**: Reach out to our support team with specific error messages

For additional help, please refer to the [Troubleshooting](troubleshooting.md) section or contact our support team.
