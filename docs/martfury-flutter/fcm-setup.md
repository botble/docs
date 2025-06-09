# Firebase Cloud Messaging (FCM) Setup Guide

This comprehensive guide will walk you through setting up Firebase Cloud Messaging (FCM) for push notifications in the Martfury Flutter app.

## Overview

Firebase Cloud Messaging (FCM) provides a reliable and battery-efficient connection between your server and devices that allows you to deliver and receive messages and notifications on iOS, Android, and the web at no cost.

## Prerequisites

Before setting up FCM, ensure you have:

- A Firebase project created in the [Firebase Console](https://console.firebase.google.com/)
- Flutter SDK 3.7.2 or higher installed
- Android Studio or Xcode for platform-specific setup
- Valid Apple Developer Account (for iOS)
- Google Play Console access (for Android)

## Step 1: Firebase Project Setup

### Creating a Firebase Project

1. **Go to Firebase Console**:
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**:
   - Click "Create a project"
   - Enter project name (e.g., "Martfury Mobile App")
   - Choose whether to enable Google Analytics
   - Select Analytics account (if enabled)
   - Click "Create project"

3. **Enable Cloud Messaging**:
   - In your Firebase project, go to "Project settings"
   - Navigate to "Cloud Messaging" tab
   - Note down the Server Key and Sender ID

### Adding Apps to Firebase Project

1. **Add Android App**:
   - Click "Add app" and select Android
   - Enter Android package name (e.g., `com.botble.martfury`)
   - Enter app nickname (optional)
   - Enter SHA-1 certificate fingerprint
   - Click "Register app"

2. **Add iOS App**:
   - Click "Add app" and select iOS
   - Enter iOS bundle ID (e.g., `com.botble.martfury`)
   - Enter app nickname (optional)
   - Enter App Store ID (optional)
   - Click "Register app"

## Step 2: Android Configuration

### Download Configuration File

1. **Download google-services.json**:
   - In Firebase Console, go to Project settings
   - Select your Android app
   - Download `google-services.json`
   - Place it in `android/app/` directory

### Update Android Build Files

1. **Project-level build.gradle** (`android/build.gradle`):
```gradle
buildscript {
    dependencies {
        // Add this line
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

2. **App-level build.gradle** (`android/app/build.gradle`):
```gradle
// Add at the top
apply plugin: 'com.google.gms.google-services'

android {
    compileSdkVersion 34
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 34
    }
}

dependencies {
    implementation 'com.google.firebase:firebase-messaging:23.2.1'
    implementation 'com.google.firebase:firebase-analytics:21.3.0'
}
```

### Android Manifest Configuration

Update `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Add permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <application>
        <!-- Add FCM service -->
        <service
            android:name=".MyFirebaseMessagingService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        
        <!-- Default notification icon -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@drawable/ic_notification" />
            
        <!-- Default notification color -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_color"
            android:resource="@color/notification_color" />
            
        <!-- Default notification channel -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_channel_id"
            android:value="default_channel" />
    </application>
</manifest>
```

### Create Firebase Messaging Service

Create `android/app/src/main/kotlin/com/botble/martfury/MyFirebaseMessagingService.kt`:

```kotlin
package com.botble.martfury

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import android.util.Log

class MyFirebaseMessagingService : FirebaseMessagingService() {
    
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        
        Log.d("FCM", "From: ${remoteMessage.from}")
        
        // Check if message contains a data payload
        if (remoteMessage.data.isNotEmpty()) {
            Log.d("FCM", "Message data payload: ${remoteMessage.data}")
        }
        
        // Check if message contains a notification payload
        remoteMessage.notification?.let {
            Log.d("FCM", "Message Notification Body: ${it.body}")
        }
    }
    
    override fun onNewToken(token: String) {
        Log.d("FCM", "Refreshed token: $token")
        
        // Send token to your server
        sendRegistrationToServer(token)
    }
    
    private fun sendRegistrationToServer(token: String?) {
        // Implement this method to send token to your app server
        Log.d("FCM", "sendRegistrationTokenToServer($token)")
    }
}
```

## Step 3: iOS Configuration

### Download Configuration File

1. **Download GoogleService-Info.plist**:
   - In Firebase Console, go to Project settings
   - Select your iOS app
   - Download `GoogleService-Info.plist`
   - Add it to your Xcode project (Runner target)

### Update iOS Configuration

1. **Update Info.plist** (`ios/Runner/Info.plist`):
```xml
<dict>
    <!-- Add Firebase configuration -->
    <key>FirebaseAppDelegateProxyEnabled</key>
    <false/>
    
    <!-- Add background modes for notifications -->
    <key>UIBackgroundModes</key>
    <array>
        <string>fetch</string>
        <string>remote-notification</string>
    </array>
</dict>
```

2. **Update AppDelegate.swift** (`ios/Runner/AppDelegate.swift`):
```swift
import UIKit
import Flutter
import Firebase
import UserNotifications

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        FirebaseApp.configure()
        
        // Request notification permissions
        UNUserNotificationCenter.current().delegate = self
        let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
        UNUserNotificationCenter.current().requestAuthorization(
            options: authOptions,
            completionHandler: {_, _ in })
        
        application.registerForRemoteNotifications()
        
        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
    
    override func application(_ application: UIApplication, 
                            didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
    }
}
```

### Enable Push Notifications Capability

1. **In Xcode**:
   - Open `ios/Runner.xcworkspace`
   - Select Runner target
   - Go to "Signing & Capabilities"
   - Click "+ Capability"
   - Add "Push Notifications"
   - Add "Background Modes" and enable "Remote notifications"

## Step 4: Flutter Dependencies

### Add Dependencies

Update `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Firebase dependencies
  firebase_core: ^2.15.0
  firebase_messaging: ^14.6.5
  firebase_analytics: ^10.4.5
  
  # Local notifications (optional)
  flutter_local_notifications: ^15.1.0+1
  
  # Other dependencies
  http: ^1.1.0
```

Run `flutter pub get` to install dependencies.

## Step 5: Flutter Implementation

### Initialize Firebase

Update `lib/main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'firebase_options.dart';

// Top-level function for background message handling
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print("Handling a background message: ${message.messageId}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Set background message handler
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Martfury',
      home: MyHomePage(),
    );
  }
}
```

### Create FCM Service

Create `lib/src/service/fcm_service.dart`:

```dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/foundation.dart';

class FCMService {
  static final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  static final FlutterLocalNotificationsPlugin _localNotifications = 
      FlutterLocalNotificationsPlugin();
  
  static Future<void> initialize() async {
    // Request permission for iOS
    NotificationSettings settings = await _firebaseMessaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );
    
    print('User granted permission: ${settings.authorizationStatus}');
    
    // Initialize local notifications
    await _initializeLocalNotifications();
    
    // Get FCM token
    String? token = await _firebaseMessaging.getToken();
    print('FCM Token: $token');
    
    // Send token to server
    if (token != null) {
      await _sendTokenToServer(token);
    }
    
    // Listen for token refresh
    _firebaseMessaging.onTokenRefresh.listen(_sendTokenToServer);
    
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
    
    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen(_handleNotificationTap);
    
    // Handle initial message (app opened from notification)
    RemoteMessage? initialMessage = await _firebaseMessaging.getInitialMessage();
    if (initialMessage != null) {
      _handleNotificationTap(initialMessage);
    }
  }
  
  static Future<void> _initializeLocalNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    
    const DarwinInitializationSettings initializationSettingsIOS =
        DarwinInitializationSettings();
    
    const InitializationSettings initializationSettings =
        InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );
    
    await _localNotifications.initialize(initializationSettings);
  }
  
  static Future<void> _sendTokenToServer(String token) async {
    try {
      // Implement API call to send token to your server
      print('Sending token to server: $token');
      // Example:
      // await ApiService.sendFCMToken(token);
    } catch (e) {
      print('Error sending token to server: $e');
    }
  }
  
  static void _handleForegroundMessage(RemoteMessage message) {
    print('Received foreground message: ${message.messageId}');
    
    // Show local notification for foreground messages
    _showLocalNotification(message);
  }
  
  static void _handleNotificationTap(RemoteMessage message) {
    print('Notification tapped: ${message.messageId}');
    
    // Handle navigation based on notification data
    Map<String, dynamic> data = message.data;
    
    if (data.containsKey('type')) {
      switch (data['type']) {
        case 'order':
          // Navigate to order details
          break;
        case 'product':
          // Navigate to product details
          break;
        case 'promotion':
          // Navigate to promotions
          break;
        default:
          // Navigate to home
          break;
      }
    }
  }
  
  static Future<void> _showLocalNotification(RemoteMessage message) async {
    const AndroidNotificationDetails androidPlatformChannelSpecifics =
        AndroidNotificationDetails(
      'default_channel',
      'Default Channel',
      channelDescription: 'Default notification channel',
      importance: Importance.max,
      priority: Priority.high,
    );
    
    const DarwinNotificationDetails iOSPlatformChannelSpecifics =
        DarwinNotificationDetails();
    
    const NotificationDetails platformChannelSpecifics = NotificationDetails(
      android: androidPlatformChannelSpecifics,
      iOS: iOSPlatformChannelSpecifics,
    );
    
    await _localNotifications.show(
      message.hashCode,
      message.notification?.title ?? 'New Notification',
      message.notification?.body ?? 'You have a new message',
      platformChannelSpecifics,
      payload: message.data.toString(),
    );
  }
  
  static Future<String?> getToken() async {
    return await _firebaseMessaging.getToken();
  }
  
  static Future<void> subscribeToTopic(String topic) async {
    await _firebaseMessaging.subscribeToTopic(topic);
  }
  
  static Future<void> unsubscribeFromTopic(String topic) async {
    await _firebaseMessaging.unsubscribeFromTopic(topic);
  }
}
```

## Step 6: Backend Integration

### API Endpoints for FCM

Your backend should provide endpoints to manage FCM tokens and send notifications:

#### Save FCM Token

**POST** `/api/fcm/token`

```json
{
  "token": "fcm_token_here",
  "device_type": "android", // or "ios"
  "device_id": "unique_device_id"
}
```

#### Send Notification

**POST** `/api/fcm/send`

```json
{
  "to": "fcm_token_or_topic",
  "notification": {
    "title": "Order Update",
    "body": "Your order has been shipped!"
  },
  "data": {
    "type": "order",
    "order_id": "12345",
    "action": "view_order"
  }
}
```

### Server-Side Implementation (Laravel Example)

```php
// FCM Service Class
class FCMService
{
    private $serverKey;

    public function __construct()
    {
        $this->serverKey = config('services.fcm.server_key');
    }

    public function sendNotification($tokens, $title, $body, $data = [])
    {
        $notification = [
            'registration_ids' => is_array($tokens) ? $tokens : [$tokens],
            'notification' => [
                'title' => $title,
                'body' => $body,
                'sound' => 'default',
            ],
            'data' => $data,
        ];

        $headers = [
            'Authorization: key=' . $this->serverKey,
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($notification));

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }
}
```

## Step 7: Testing FCM Setup

### Testing on Android

1. **Build and run the app**:
   ```bash
   flutter run
   ```

2. **Check FCM token generation**:
   - Look for FCM token in console logs
   - Verify token is sent to your server

3. **Test notifications**:
   - Use Firebase Console to send test notifications
   - Test both foreground and background scenarios

### Testing on iOS

1. **Build and run on physical device**:
   ```bash
   flutter run -d ios
   ```
   Note: Push notifications don't work on iOS Simulator

2. **Verify permissions**:
   - Check if notification permission dialog appears
   - Ensure permissions are granted

3. **Test APNS certificate**:
   - Verify APNS certificate is properly configured
   - Test with Firebase Console

### Firebase Console Testing

1. **Go to Firebase Console**:
   - Navigate to Cloud Messaging
   - Click "Send your first message"

2. **Create test notification**:
   - Enter notification title and text
   - Select target (app or specific token)
   - Send test message

## Step 8: Advanced Configuration

### Custom Notification Channels (Android)

Create custom notification channels for better organization:

```dart
class NotificationChannels {
  static const String orderUpdates = 'order_updates';
  static const String promotions = 'promotions';
  static const String general = 'general';

  static Future<void> createChannels() async {
    final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
        FlutterLocalNotificationsPlugin();

    // Order updates channel
    const AndroidNotificationChannel orderChannel = AndroidNotificationChannel(
      orderUpdates,
      'Order Updates',
      description: 'Notifications about order status changes',
      importance: Importance.high,
      sound: RawResourceAndroidNotificationSound('order_sound'),
    );

    // Promotions channel
    const AndroidNotificationChannel promoChannel = AndroidNotificationChannel(
      promotions,
      'Promotions',
      description: 'Promotional offers and deals',
      importance: Importance.defaultImportance,
    );

    await flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(orderChannel);

    await flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(promoChannel);
  }
}
```

### Topic Subscriptions

Implement topic-based messaging for user segments:

```dart
class TopicManager {
  static Future<void> subscribeToUserTopics(String userId) async {
    await FCMService.subscribeToTopic('user_$userId');
    await FCMService.subscribeToTopic('all_users');
  }

  static Future<void> subscribeToInterests(List<String> interests) async {
    for (String interest in interests) {
      await FCMService.subscribeToTopic('interest_$interest');
    }
  }

  static Future<void> unsubscribeFromTopic(String topic) async {
    await FCMService.unsubscribeFromTopic(topic);
  }
}
```

## Troubleshooting

### Common Issues

**Android Issues**:
- **Token not generated**: Check google-services.json placement
- **Notifications not received**: Verify app is not in battery optimization
- **Build errors**: Ensure correct Gradle plugin versions

**iOS Issues**:
- **No permission dialog**: Check Info.plist configuration
- **Notifications not received**: Verify APNS certificate
- **Build errors**: Check Xcode capabilities and provisioning

### Debug Steps

1. **Check Firebase project configuration**
2. **Verify package names match Firebase apps**
3. **Test with Firebase Console first**
4. **Check device logs for errors**
5. **Verify server key and sender ID**

### Useful Commands

```bash
# Check FCM token
flutter logs | grep "FCM Token"

# Debug Android notifications
adb logcat | grep FCM

# iOS device logs
xcrun devicectl list devices
xcrun devicectl device logs --device [device-id]
```

## Security Considerations

### Token Security

- Store FCM tokens securely on your server
- Implement token refresh handling
- Remove invalid tokens from your database
- Use HTTPS for all token communications

### Message Security

- Validate notification data on the server
- Implement rate limiting for notifications
- Use topic subscriptions carefully
- Monitor for spam or abuse

## Best Practices

### Performance

- Handle notifications efficiently
- Avoid blocking the main thread
- Cache notification data when appropriate
- Implement proper error handling

### User Experience

- Request permissions at appropriate times
- Provide notification settings in app
- Allow users to customize notification types
- Respect user preferences and quiet hours

### Monitoring

- Track notification delivery rates
- Monitor token refresh patterns
- Log notification interactions
- Implement analytics for notification effectiveness

For more information, refer to the [Firebase Documentation](https://firebase.google.com/docs/cloud-messaging) and [Flutter Fire Documentation](https://firebase.flutter.dev/docs/messaging/overview/).
