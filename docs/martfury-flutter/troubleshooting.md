# Troubleshooting Guide

Simple solutions to common problems. Don't worry - most issues are easy to fix!

## 🚨 Most Common Problems

### App Won't Start
**Problem**: App crashes when you try to run it

**Quick Fix**:
```bash
flutter clean
flutter pub get
flutter run
```

**If that doesn't work**:
- Restart your computer
- Check if Flutter is installed correctly
- Make sure your phone/emulator is connected

### Can't Connect to Website
**Problem**: App shows "connection error" or "network error"

**Quick Fix**:
1. Check your `.env` file
2. Make sure `API_BASE_URL=https://your-website.com` is correct
3. Test your website in a browser first

**Common mistakes**:
- Wrong website URL
- Website is down
- No internet connection

### Login Doesn't Work
**Problem**: Users can't login to the app

**Quick Fix**:
1. Test login on your website first
2. Make sure the website login works
3. Check if API is enabled on your website

**If still not working**:
- Contact your website developer
- Check if user accounts exist
- Try creating a new test account

### No Products Showing
**Problem**: App loads but no products appear

**Quick Fix**:
1. Make sure you have products on your website
2. Check if categories are set up correctly
3. Try refreshing the app (pull down on the screen)

**If still empty**:
- Check your website has products
- Make sure products are published/active
- Contact your website developer

### Social Login Not Working
**Problem**: Google/Facebook/Apple login fails

**Quick Fix**:
1. Check the setup guides:
   - **[Google Login](14_google_login_setup.md)**
   - **[Facebook Login](15_facebook_login_setup.md)**
   - **[Apple Login](13_apple_login_setup.md)**

2. Make sure you followed all steps exactly
3. Test regular email login first

## 🔧 Setup Problems

### Colors Not Changing
**Problem**: Changed colors but app still looks the same

**Solution**:
1. Make sure you saved the file
2. Stop the app completely
3. Run: `flutter clean`
4. Start the app again

### App Name Not Changing
**Problem**: Changed app name but it's still "Martfury"

**Solution**:
1. Follow guide **[04_app_name.md](04_app_name.md)** exactly
2. Change it in BOTH Android and iOS files
3. Rebuild the app completely

### Logo Not Changing
**Problem**: Changed logo files but old logo still shows

**Solution**:
1. Make sure image files are the right size
2. Replace ALL logo files (there are many)
3. Follow guide **[05_app_logo.md](05_app_logo.md)**
4. Clean and rebuild the app

## 📱 App Store Problems

### Can't Upload to Google Play
**Problem**: Error when trying to upload app

**Solution**:
1. Follow guide **[09_deploying_app.md](09_deploying_app.md)** exactly
2. Make sure you have a Google Play Developer account
3. Check file format (should be .aab not .apk)

### Can't Upload to Apple App Store
**Problem**: Error when trying to upload to App Store

**Solution**:
1. Make sure you have Apple Developer account ($99/year)
2. Use Xcode to upload (not just the command line)
3. Check all certificates are valid

## 💡 Quick Fixes for Everything

### The "Magic" Fix
When nothing else works, try this:

```bash
flutter clean
flutter pub get
flutter run
```

This fixes about 80% of all problems!

### Restart Everything
Sometimes you just need to restart:
1. Close the app
2. Restart your phone/emulator
3. Restart your computer
4. Try again

### Check the Basics
Before asking for help:
- ✅ Is your internet working?
- ✅ Is your website online?
- ✅ Did you save all your changes?
- ✅ Did you follow the guides exactly?

## 🆘 When to Ask for Help

### You Should Try First
- Read the error message carefully
- Try the "magic fix" above
- Check the setup guides (01-15)
- Restart everything

### Ask for Help When
- You get the same error after trying everything
- You don't understand the error message
- Something worked before but stopped working
- You're completely stuck

### How to Ask for Help
When contacting support, include:
1. **What you were trying to do**
2. **What error message you saw** (screenshot if possible)
3. **What you already tried**
4. **Your website URL**
5. **What device/computer you're using**

**Remember**: There's no such thing as a stupid question! Everyone gets stuck sometimes, and most problems have simple solutions.
