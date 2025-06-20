# Native Push Notifications Setup Guide

This guide will help you set up native push notifications for your MartFury Flutter app that supports iOS 12.0+ and Android.

## 🚀 Quick Overview

The native push notification implementation automatically:
- Registers device tokens when users log in
- Unregisters tokens when users log out
- Handles token refresh automatically
- Sends device information to your API endpoint `/api/v1/device-tokens`
- Supports both guest and authenticated users

## 📋 Prerequisites

1. Your Botble backend with the device tokens API endpoint
2. Android and/or iOS development setup
3. For iOS: Apple Developer account for push notification certificates (production only)

## 🔧 Platform Setup

### iOS Setup (Supports iOS 12.0+)
1. **Enable Push Notifications in Xcode:**
   - Open `ios/Runner.xcworkspace` in Xcode
   - Select your target → Signing & Capabilities
   - Click "+ Capability" and add "Push Notifications"

2. **For Production (App Store):**
   - Create APNs certificates in Apple Developer Console
   - Configure your backend to send push notifications via APNs

### Android Setup
1. **Permissions are already configured** in AndroidManifest.xml
2. **For Production:**
   - Configure your backend to send notifications via Android's notification system
   - Or integrate with FCM for more advanced features

## 📱 Platform Configuration

### Android Setup
The Android configuration is already complete! The following has been set up:
- ✅ Google Services plugin added
- ✅ FCM permissions in AndroidManifest.xml
- ✅ Notification icon and color resources
- ✅ Default notification channel configuration

**You only need to:**
1. Add your `google-services.json` file to `android/app/`
2. Update the package name if different from `com.example.martfury`

### iOS Setup
The iOS configuration is already complete! The following has been set up:
- ✅ Background modes for remote notifications
- ✅ Firebase configuration in Info.plist
- ✅ Push notification capabilities

**You only need to:**
1. Add your `GoogleService-Info.plist` file to `ios/Runner/`
2. Enable Push Notifications capability in Xcode
3. Configure APNs certificates in Firebase Console

## 🔑 API Integration

The app automatically sends device tokens to your API with this data structure:

```json
{
  "token": "fcm_device_token_here",
  "platform": "android|ios",
  "app_version": "1.0.0",
  "device_id": "unique_device_identifier",
  "user_type": "guest|customer",
  "user_id": 123
}
```

### API Endpoints Used
- `POST /api/v1/device-tokens` - Register new token
- `PUT /api/v1/device-tokens` - Update existing token
- `DELETE /api/v1/device-tokens` - Remove token on logout

## 🎯 How It Works

### Automatic Registration
- **App Launch**: Token registered as guest user
- **User Login**: Token updated with user information
- **User Logout**: Token unregistered
- **Token Refresh**: Automatically updated in background

### User States
- **Guest User**: `user_type: "guest"`, `user_id: null`
- **Logged In**: `user_type: "customer"`, `user_id: actual_user_id`

## 🧪 Testing

### Test Notifications
1. Get device token from app logs (debug mode)
2. Use Firebase Console → Cloud Messaging → Send test message
3. Or use your backend to send notifications via FCM API

### Debug Information
The app logs FCM events in debug mode:
- Token registration/updates
- Notification received (foreground/background)
- Token refresh events

## 🔧 Customization

### Notification Handling
Edit `lib/src/service/notification_service.dart` to customize:
- Foreground notification display
- Notification tap handling
- Custom navigation logic

### Device Information
The service automatically collects:
- Platform (Android/iOS)
- App version from pubspec.yaml
- Device ID (Android ID / iOS identifierForVendor)
- User information when logged in

## 🚨 Important Notes

1. **iOS 12.0+ Support**: This implementation supports iOS 12.0+ (unlike Firebase which requires iOS 13.0+)
2. **APNs Setup**: iOS requires proper APNs certificate configuration for production
3. **Testing**: Use physical devices for testing - simulators have limitations
4. **Permissions**: iOS will prompt users for notification permissions
5. **Native Implementation**: Uses native iOS/Android push notifications instead of Firebase

## 📚 Next Steps

1. Add your Firebase configuration files
2. Test on physical devices
3. Configure your backend to send notifications
4. Customize notification handling as needed

## 🆘 Troubleshooting

### Common Issues
- **No token received**: Check Firebase configuration files
- **iOS notifications not working**: Verify APNs setup and certificates
- **Android build errors**: Ensure Google Services plugin is properly configured

### Debug Commands
```bash
# Check if FCM is working
flutter run --debug
# Look for FCM logs in console

# Clean and rebuild
flutter clean
flutter pub get
flutter run
```
