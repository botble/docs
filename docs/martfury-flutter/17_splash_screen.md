# Changing Splash Screen

The splash screen is the first screen users see when opening your app. This guide will help you customize the splash screen to match your brand.

## Current Implementation

The current splash screen includes:
- **Logo**: Uses `assets/images/logo.png`
- **Background Color**: Uses the primary theme color (`AppColors.primary`)
- **Animation**: Fade-in and scale animation with 3-second duration
- **Auto-navigation**: Automatically redirects to main screen or start screen based on authentication status

## Customization Options

### 1. Changing the Logo

#### Replace the Logo Image
1. **Prepare your logo**:
   - Recommended size: 200x200 pixels or larger
   - Format: PNG with transparent background
   - File name: `logo.png`

2. **Replace the file**:
   ```
   assets/images/logo.png
   ```

3. **Update the splash screen code** (if needed):
   ```dart
   // In lib/src/view/screen/splash_screen.dart
   Image.asset('assets/images/logo.png', width: 200)
   ```

#### Adjust Logo Size
To change the logo size, modify the `width` parameter in the splash screen:

```dart
// In lib/src/view/screen/splash_screen.dart, line 85
Image.asset('assets/images/logo.png', width: 200) // Change 200 to your desired size
```

### 2. Changing Background Color

#### Option A: Use Environment Configuration (Recommended)
The splash screen uses `AppColors.primary` which is configurable via `.env`:

1. **Update your `.env` file**:
   ```env
   # Primary Color - used for splash screen background
   PRIMARY_COLOR=FFB800
   ```

2. **Restart the app completely** (hot reload won't apply `.env` changes)

See **[Theme Colors Guide](01_theme_colors.md)** for all color options.

#### Option B: Use Custom Color in Code
If you need a different color specifically for the splash screen:

```dart
// In lib/src/view/screen/splash_screen.dart
backgroundColor: const Color(0xFFYOUR_COLOR), // Replace with your hex color
```

### 3. Customizing Animation

#### Animation Duration
To change how long the splash screen shows:

```dart
// In lib/src/view/screen/splash_screen.dart, line 50
await Future.delayed(
  const Duration(seconds: 3), // Change 3 to your desired duration
);
```

#### Animation Effects
The current animations include:
- **Fade Animation**: Logo fades in from 0 to 1 opacity
- **Scale Animation**: Logo scales from 0.8 to 1.0 with bounce effect

To modify animations, edit these sections:

```dart
// Animation duration (line 25)
_controller = AnimationController(
  duration: const Duration(milliseconds: 1500), // Change animation speed
  vsync: this,
);

// Fade animation (lines 27-30)
_fadeAnimation = Tween<double>(
  begin: 0.0, // Start opacity
  end: 1.0,   // End opacity
).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));

// Scale animation (lines 32-35)
_scaleAnimation = Tween<double>(
  begin: 0.8, // Start scale
  end: 1.0,   // End scale
).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutBack));
```

### 4. Adding Text or Additional Elements

To add text below the logo:

```dart
// In lib/src/view/screen/splash_screen.dart, around line 85
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Image.asset('assets/images/logo.png', width: 200),
    const SizedBox(height: 20), // Add spacing
    Text(
      'Your App Name',
      style: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Colors.white, // Text color
      ),
    ),
  ],
),
```

### 5. Advanced Customization

#### Gradient Background
Replace the solid background with a gradient:

```dart
// Replace the Scaffold backgroundColor with a Container
body: Container(
  decoration: const BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [
        Color(0xFFYOUR_COLOR_1),
        Color(0xFFYOUR_COLOR_2),
      ],
    ),
  ),
  child: Center(
    // Your existing content here
  ),
),
```

#### Multiple Animation Elements
Add multiple animated elements:

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    // Logo with scale animation
    ScaleTransition(
      scale: _scaleAnimation,
      child: Image.asset('assets/images/logo.png', width: 200),
    ),
    const SizedBox(height: 30),
    // Text with fade animation
    FadeTransition(
      opacity: _fadeAnimation,
      child: const Text(
        'Welcome to Your App',
        style: TextStyle(
          fontSize: 18,
          color: Colors.white,
        ),
      ),
    ),
  ],
),
```

## Testing Your Changes

1. **Hot reload** (if only changing colors or text):
   ```bash
   flutter run
   ```

2. **Hot restart** (if changing assets or major code changes):
   ```bash
   # Stop the app and restart
   flutter run
   ```

3. **Clean build** (if changes don't appear):
   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

## Best Practices

1. **Logo Quality**: Use high-resolution PNG images with transparent backgrounds
2. **Loading Time**: Keep splash screen duration between 2-4 seconds
3. **Brand Consistency**: Match splash screen colors with your app's theme
4. **Performance**: Optimize image sizes to avoid slow loading
5. **Accessibility**: Ensure sufficient contrast between logo and background

## Troubleshooting

### Logo Not Appearing
- Check if the image path is correct: `assets/images/logo.png`
- Verify the image is included in `pubspec.yaml` under assets section
- Try running `flutter clean` and `flutter pub get`

### Animation Issues
- Ensure `SingleTickerProviderStateMixin` is included in the class
- Check that animation controller is properly disposed
- Verify animation curves and durations are valid

### Background Color Not Changing
- Make sure you're editing the correct file: `lib/src/view/screen/splash_screen.dart`
- Check that the color format is correct (hex format)
- Restart the app after making changes

## Example Customization

Here's a complete example of a customized splash screen:

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    backgroundColor: const Color(0xFF1E3A8A), // Custom blue background
    body: Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF1E3A8A),
            Color(0xFF3B82F6),
          ],
        ),
      ),
      child: Center(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return FadeTransition(
              opacity: _fadeAnimation,
              child: ScaleTransition(
                scale: _scaleAnimation,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset('assets/images/logo.png', width: 180),
                    const SizedBox(height: 24),
                    const Text(
                      'Your Brand Name',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Your Tagline',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    ),
  );
}
```

This documentation provides comprehensive guidance for customizing your app's splash screen to match your brand identity and user experience requirements. 