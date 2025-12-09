# Installation Guide

Simple steps to get your MartFury app running on your computer.

## 🚀 Quick Start

### What You Need
- A computer (Windows, Mac, or Linux)
- Internet connection
- About 30 minutes of your time

### Step 1: Install Flutter
1. Go to [flutter.dev](https://flutter.dev)
2. Click "Get Started"
3. Follow the installation guide for your computer
4. This will take about 15-20 minutes

### Step 2: Get the App Code
1. Download your MartFury app files
2. Extract them to a folder on your computer
3. Remember where you put this folder!

### Step 3: Set Up Your App
1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to your app folder:
   ```bash
   cd path/to/your/martfury-app
   ```
3. Install dependencies:
   ```bash
   flutter pub get
   ```

### Step 4: Configure Your App
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and update your settings:
   ```env
   # Your website URL
   API_BASE_URL=https://your-website.com

   # Your app name
   APP_NAME=YourAppName

   # Brand colors (optional - hex values without #)
   PRIMARY_COLOR=FFB800
   ```
3. Save the file

See **[Theme Colors Guide](01_theme_colors.md)** for all color customization options.

### Step 5: Test the App
1. Connect your phone or start an emulator
2. Run this command:
   ```bash
   flutter run
   ```
3. Your app should start! 🎉

## 🔧 If Something Goes Wrong

### "Flutter not found"
- Make sure you installed Flutter correctly
- Restart your terminal/command prompt
- Try running `flutter doctor` to check installation

### "No devices found"
- Connect your phone with USB cable
- Enable Developer Options on your phone
- Or start an Android/iOS emulator

### "Build failed"
- Run these commands:
  ```bash
  flutter clean
  flutter pub get
  flutter run
  ```

## 📱 Next Steps

Once your app is running:
1. **Customize it**: Follow the [Quick Setup Guides](01_theme_colors.md)
2. **Set up social login**: Check [Social Login Setup](12_twitter_login_setup.md)
3. **Deploy it**: Follow the [Deployment Guide](09_deploying_app.md)

## 🆘 Need Help?

- Check the [FAQ](faq.md) for common questions
- Read the [Troubleshooting Guide](troubleshooting.md)
- Contact support if you're still stuck

**Remember**: Don't worry if this seems complicated at first. Most people get it working within an hour, and we're here to help!
