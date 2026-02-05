# Push Notifications Setup Guide

This guide will help you set up push notifications for your MartFury Flutter app. Follow these simple steps to enable notifications for both Android and iOS.

## 📱 What You'll Need

Before starting, make sure you have:
- A Google account (for Firebase)
- Access to your app's source code
- For iOS: An Apple Developer account ($99/year)

## 🔥 Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter your project name (e.g., "MartFury App")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click **"Create project"** and wait for it to complete

## 🤖 Step 2: Get Android Configuration File

Follow these steps to get your `google-services.json` file:

1. **In Firebase Console:**
   - Click the Android icon or **"Add app"** → **"Android"**
   - Enter your Android package name (e.g., `com.yourcompany.martfury`)
   - Register the app

2. **Download the configuration file:**
   - Click **"Download google-services.json"**
   - Save this file to your computer

3. **Add the file to your app:**
   - Open your app's folder
   - Navigate to `android/app/`
   - Copy the `google-services.json` file here

For detailed instructions with screenshots, visit: [Firebase Android Setup Guide](https://firebase.google.com/docs/android/setup)

## 🍎 Step 3: Get iOS Configuration File

Follow these steps to get your `GoogleService-Info.plist` file:

1. **In Firebase Console:**
   - Click **"Add app"** → **"iOS"**
   - Enter your iOS bundle ID (e.g., `com.yourcompany.martfury`)
   - Register the app

2. **Download the configuration file:**
   - Click **"Download GoogleService-Info.plist"**
   - Save this file to your computer

3. **Add the file to your app:**
   - Open your app's folder
   - Navigate to `ios/Runner/`
   - Copy the `GoogleService-Info.plist` file here

4. **Enable Push Notifications in Xcode:**
   - Open `ios/Runner.xcworkspace` in Xcode
   - Select your project in the left sidebar
   - Click on the **"Signing & Capabilities"** tab
   - Click **"+ Capability"**
   - Add **"Push Notifications"**

For detailed instructions with screenshots, visit: [Firebase iOS Setup Guide](https://firebase.google.com/docs/ios/setup)

## ✅ Step 4: Configure iOS Push Notifications (iOS Only)

For iOS to receive push notifications, you need to set up APNs certificates:

1. **In Firebase Console:**
   - Go to **Project Settings** (gear icon)
   - Click **"Cloud Messaging"** tab
   - Scroll to **"Apple app configuration"**

2. **Upload APNs Authentication Key (Recommended):**
   - Go to [Apple Developer Portal](https://developer.apple.com/)
   - Navigate to **Keys** and create a new key
   - Enable **Apple Push Notifications service (APNs)**
   - Download the `.p8` key file
   - In Firebase Console, click **"Upload"** under APNs Authentication Key
   - Upload your `.p8` file and enter your Key ID and Team ID

3. **Or Upload APNs Certificate (Alternative):**
   - Click **"Upload"** under APNs certificates
   - You'll need to create this certificate in your Apple Developer account
   - Follow Firebase's guide for creating APNs certificates

## 🔧 Step 5: Configure Botble Backend

Your Botble website needs to be configured to send push notifications via FCM v1 API.

### 5.1 Generate Service Account Key

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Download the JSON file (keep this secure!)

### 5.2 Configure Botble Admin Panel

1. Log in to your Botble admin panel
2. Go to **Settings** → **API Settings**
3. Scroll to **Push Notifications (FCM v1 API)** section
4. Enable **Push Notifications**
5. Enter your **Firebase Project ID** (found in Firebase Console → Project Settings → General)
6. Upload the **Service Account JSON file** you downloaded

### 5.3 Send Test Notification

1. In Botble admin, scroll to **Send Custom Notification** section
2. Enter a test title and message
3. Select target devices (All Devices, Android Only, iOS Only, or Customers Only)
4. Click **Send Notification**

## 🧪 Step 6: Test Your Setup

After adding both configuration files:

1. **Build and run your app:**
   - Connect a real device (not simulator)
   - Run the app and log in (this registers the device token)

2. **Test notifications from Botble admin:**
   - Go to your Botble admin panel
   - Navigate to **Settings** → **API Settings**
   - Scroll to **Send Custom Notification**
   - Enter a test message and send

3. **Alternative: Test from Firebase Console:**
   - Go to Firebase Console
   - Navigate to **"Cloud Messaging"**
   - Click **"Send your first message"**
   - Enter a test message and send

4. **Check if it works:**
   - You should receive the notification on your device
   - If not, check the Troubleshooting section below

## ❓ Troubleshooting

### Nothing happens when I send a test notification
- Make sure you're using a real device (not simulator/emulator)
- Check that you copied the files to the correct folders
- For iOS: Ensure you enabled Push Notifications in Xcode
- Try restarting the app

### Where do I find my package name/bundle ID?
- **Android package name:** Look in `android/app/build.gradle` for `applicationId`
- **iOS bundle ID:** Look in Xcode under your target's General tab

### I don't have an Apple Developer account
- You need one for iOS push notifications in production ($99/year)
- For testing only, you might be able to use development certificates

### No device tokens in Botble admin
- Make sure the app is connecting to your Botble API correctly
- Check that users are logged in (device tokens are registered on login)
- Verify API is enabled in Botble settings

## 🔒 Security Notes

- **Never commit** your `google-services.json` or `GoogleService-Info.plist` to public repositories
- **Keep your service account JSON file secure** - it has full access to send notifications
- Add Firebase config files to `.gitignore` if your repository is public:

```gitignore
# Firebase config files
android/app/google-services.json
ios/Runner/GoogleService-Info.plist
```

## 📞 Need More Help?

If you're stuck:
1. Double-check you followed all steps above
2. Make sure file names are exactly `google-services.json` and `GoogleService-Info.plist`
3. Verify files are in the correct folders
4. Contact your developer for assistance with technical issues
