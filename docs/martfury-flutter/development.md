# Development Guide

This guide helps you customize the Martfury Flutter app. No advanced Flutter knowledge required!

## Understanding the App Structure

Think of the app like a house with different rooms:

```
lib/
├── core/                  # 🏠 Main settings (like your house's electrical panel)
│   └── app_config.dart   # App settings (colors, URLs, etc.)
├── main.dart             # 🚪 Front door (app starts here)
└── src/
    ├── controller/       # 🧠 Smart controls (handles app logic)
    ├── model/           # 📋 Data templates (user info, product info)
    ├── service/         # 🌐 Internet connections (talks to your website)
    ├── theme/           # 🎨 Design settings (colors, fonts)
    └── view/            # 👀 What users see
        ├── screen/      # 📱 App pages (login, home, etc.)
        └── widget/      # 🧩 Reusable parts (buttons, cards)
```

## Quick Start

### Before You Begin

✅ **What You Need:**
1. Flutter installed on your computer
2. A code editor (VS Code is easiest)
3. The app source code
4. 30 minutes of your time

### First Steps

1. **Open Terminal/Command Prompt**
2. **Go to your app folder**
3. **Install dependencies:**
   ```bash
   flutter pub get
   ```
4. **Run the app:**
   ```bash
   flutter run
   ```

That's it! Your app should start running.

## Common Customizations

### 🎨 Changing Colors and Fonts

**Want different colors?**
1. Open `lib/src/theme/app_theme.dart`
2. Find the color you want to change
3. Replace with your color code

```dart
// Example: Change primary color to red
static const Color primaryColor = Color(0xFFFF0000); // Red color
```

**Want different fonts?**
1. Open `lib/src/theme/app_fonts.dart`
2. Change the font name

```dart
// Example: Change to Roboto font
const kAppTextStyle = GoogleFonts.roboto;
```

### 📝 Adding New Text

**To add new text that can be translated:**

1. Open `assets/translations/en.json`
2. Add your text:
```json
{
  "my_new_text": "Hello World"
}
```
3. Use it in your app:
```dart
Text('my_new_text'.tr())
```

### 🔗 Adding New API Connections

**Need to connect to a new API?**

1. **Add the URL** in `lib/core/app_config.dart`:
```dart
static const String myNewApiUrl = 'https://api.example.com/data';
```

2. **Create a simple service** in `lib/src/service/`:
```dart
class MyNewService {
  static Future<List<dynamic>> getData() async {
    // This gets data from your API
    final response = await http.get(Uri.parse(AppConfig.myNewApiUrl));
    return json.decode(response.body);
  }
}
```

3. **Use it in your screen**:
```dart
// In your screen file
FutureBuilder(
  future: MyNewService.getData(),
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text('Data loaded!');
    }
    return CircularProgressIndicator();
  },
)
```

## Testing Your Changes

### 🧪 Simple Testing

**Before releasing your app:**

1. **Test on different devices:**
   - Android phone
   - iPhone (if possible)
   - Different screen sizes

2. **Test basic functions:**
   - Login/logout
   - Browse products
   - Add to cart
   - Search

3. **Test your changes:**
   - Did your color changes work?
   - Do new texts show correctly?
   - Are new features working?

### 🔧 Quick Fixes

**App not starting?**
```bash
flutter clean
flutter pub get
flutter run
```

**Colors not changing?**
- Make sure you saved the file
- Restart the app (hot reload might not work for theme changes)

**New text not showing?**
- Check spelling in translation files
- Make sure you're using `.tr()` at the end

## Building Your App

### 📱 For Testing

**Android:**
```bash
flutter build apk --debug
```

**iPhone:**
```bash
flutter build ios --debug
```

### 🚀 For App Store Release

**Android (Google Play):**
```bash
flutter build appbundle --release
```

**iPhone (App Store):**
```bash
flutter build ios --release
```

## Getting Help

### 📚 Useful Resources

- **Flutter Documentation**: [flutter.dev](https://flutter.dev)
- **Quick Setup Guides**: Check files 01-15 in this documentation
- **Social Login Setup**: Check files 12-15 for Facebook, Google, Apple, Twitter

### 🆘 Common Problems

**Problem: "Flutter not found"**
- Solution: Install Flutter SDK first

**Problem: "No devices found"**
- Solution: Connect your phone or start an emulator

**Problem: "Build failed"**
- Solution: Run `flutter clean` then `flutter pub get`

**Problem: "App crashes"**
- Solution: Check the error message in terminal/console

### 💡 Tips for Success

1. **Start Small**: Make one change at a time
2. **Test Often**: Run the app after each change
3. **Keep Backups**: Use git to save your work
4. **Ask for Help**: Don't hesitate to contact support

Remember: You don't need to be a Flutter expert to customize this app! Start with simple changes like colors and text, then gradually try more advanced features.
