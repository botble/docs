# Upgrading Your App

Simple guide to update your Martfury app to the latest version.

## 🚨 Before You Start

### ⚠️ Important: Make a Backup!

**Save your current app first:**
1. Copy your entire app folder to a safe place
2. Name it something like "martfury-backup-old-version"
3. This way you can go back if something goes wrong

**Save your settings:**
- Copy your `.env` file
- Save any color/logo changes you made
- Write down your website URL

### ✅ Check if You Need to Upgrade

**You should upgrade if:**
- You want new features
- You have bugs that are fixed in the new version
- Your website was updated and needs a newer app

**You might NOT need to upgrade if:**
- Your current app works perfectly
- You haven't changed anything on your website
- You're not comfortable with technical changes

## 📱 Simple Upgrade Steps

### Step 1: Download New Version
1. Download the latest app version
2. Extract it to a new folder
3. Don't delete your old version yet!

### Step 2: Copy Your Settings
1. **Copy your `.env` file** from old app to new app
2. **Copy your changes:**
   - If you changed colors: copy your theme files
   - If you changed logo: copy your logo files
   - If you added translations: copy your translation files

### Step 3: Update the App
1. Open terminal/command prompt
2. Go to your new app folder
3. Run these commands:
   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

### Step 4: Test Everything
1. **Test basic features:**
   - Login/logout
   - Browse products
   - Add to cart
   - Search

2. **Test your customizations:**
   - Check if your colors are right
   - Check if your logo shows
   - Test your website connection

3. **If something is wrong:**
   - Go back to your backup
   - Contact support for help
   - Don't panic - your backup is safe!

## 🔧 If You Have Problems

### App Won't Start
```bash
flutter clean
flutter pub get
flutter run
```

### Your Changes Are Missing
- Make sure you copied all your files correctly
- Check the setup guides (01-15) to redo your changes
- Compare your old and new app folders

### Website Won't Connect
- Copy your `.env` file again
- Make sure your website URL is correct
- Test your website in a browser first

## 📋 After Upgrading

### Update Your App Stores
If everything works well:

1. **Build new version:**
   ```bash
   # For Google Play Store
   flutter build appbundle --release

   # For Apple App Store
   flutter build ios --release
   ```

2. **Upload to stores:**
   - Follow guide **[09_deploying_app.md](09_deploying_app.md)**
   - Update version numbers
   - Write what's new in the update

### Keep Your Backup
- Don't delete your old app folder yet
- Keep it for at least a month
- Only delete it when you're sure everything works

## 💡 Tips for Success

### Before Upgrading
- ✅ Read what's new in the update
- ✅ Make sure you have time to fix problems
- ✅ Don't upgrade right before important deadlines
- ✅ Test on a copy first if possible

### During Upgrading
- 📝 Write down what you're doing
- 🐌 Go slowly and carefully
- 🧪 Test after each step
- 🆘 Ask for help if you're stuck

### After Upgrading
- 📱 Test on real phones, not just computer
- 👥 Ask other people to test the app
- 📊 Monitor for any problems
- 🔄 Be ready to go back to old version if needed

## 🆘 When Things Go Wrong

### If Upgrade Fails
1. **Don't panic!** Your backup is safe
2. Go back to your backup folder
3. Use your old app while you figure out the problem
4. Contact support with details about what went wrong

### Common Problems

**"Flutter not found" error:**
- Make sure Flutter is installed
- Try restarting your computer

**"Build failed" error:**
```bash
flutter clean
flutter pub get
flutter run
```

**App looks different:**
- Check if you copied your theme files correctly
- Redo your customizations using the setup guides (01-15)

**Website won't connect:**
- Make sure you copied your `.env` file
- Check your website URL is correct

## 🤔 Do You Really Need to Upgrade?

### Upgrade if:
- ✅ You want new features
- ✅ You have bugs that are fixed
- ✅ Your website was updated
- ✅ You're comfortable with technical changes

### Don't upgrade if:
- ❌ Your current app works perfectly
- ❌ You're about to launch something important
- ❌ You don't have time to fix problems
- ❌ You're not comfortable with technical changes

## 📞 Getting Help

### Before Asking for Help
- Try the "magic fix": `flutter clean` then `flutter pub get`
- Check if your backup still works
- Read the error message carefully
- Try the troubleshooting guide

### When Contacting Support
Tell us:
1. What version you're upgrading from and to
2. What step you were on when it failed
3. What error message you saw (screenshot helps)
4. What you already tried
5. Your website URL

**Remember**: Upgrading is optional! If your current app works well, you might not need to upgrade at all. Only upgrade when you really need new features or bug fixes.
