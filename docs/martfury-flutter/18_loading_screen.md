# Changing Loading Screen (Launch Screen)

The loading screen (also called launch screen or splash screen) is the screen that appears while your app is starting up, before the Flutter engine loads. This is different from the splash screen in your Flutter app - this is the native loading screen shown by iOS and Android.

## Current Implementation

### Android
- **Background Color**: `#FFB800` (primary yellow)
- **Logo**: Uses `@mipmap/logo` image
- **Files**: 
  - `android/app/src/main/res/drawable/launch_background.xml`
  - `android/app/src/main/res/drawable-v21/launch_background.xml`
  - `android/app/src/main/res/values/colors.xml`

### iOS
- **Background Color**: `#FFB800` (primary yellow)
- **Logo**: Uses `LaunchImage` from Assets.xcassets
- **Files**:
  - `ios/Runner/Base.lproj/LaunchScreen.storyboard`
  - `ios/Runner/Assets.xcassets/LaunchImage.imageset/`

## Android Customization

### 1. Changing Background Color

#### Option A: Update the color value
Edit `android/app/src/main/res/values/colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splash_color">#YOUR_COLOR_HERE</color>
</resources>
```

#### Option B: Use a different color resource
Create a new color in `colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splash_color">#FFB800</color>
    <color name="custom_splash_color">#1E3A8A</color>
</resources>
```

Then update `launch_background.xml`:

```xml
<item android:drawable="@color/custom_splash_color" />
```

### 2. Changing the Logo

#### Replace the logo image
1. **Prepare your logo**:
   - Recommended size: 200x200 pixels or larger
   - Format: PNG with transparent background
   - File name: `logo.png`

2. **Replace the files** in `android/app/src/main/res/`:
   - `mipmap-hdpi/logo.png`
   - `mipmap-mdpi/logo.png`
   - `mipmap-xhdpi/logo.png`
   - `mipmap-xxhdpi/logo.png`
   - `mipmap-xxxhdpi/logo.png`

3. **Update launch_background.xml** (if using different image name):
   ```xml
   <bitmap
       android:gravity="center"
       android:src="@mipmap/your_logo_name" />
   ```

#### Adjust logo position
Modify the `android:gravity` attribute in `launch_background.xml`:

```xml
<!-- Center the logo -->
<bitmap
    android:gravity="center"
    android:src="@mipmap/logo" />

<!-- Position at top center -->
<bitmap
    android:gravity="top|center_horizontal"
    android:src="@mipmap/logo" />

<!-- Position at bottom center -->
<bitmap
    android:gravity="bottom|center_horizontal"
    android:src="@mipmap/logo" />
```

### 3. Advanced Android Customization

#### Gradient Background
Replace the solid color with a gradient. Create `android/app/src/main/res/drawable/splash_gradient.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:angle="45"
        android:startColor="#1E3A8A"
        android:endColor="#3B82F6"
        android:type="linear" />
</shape>
```

Then update `launch_background.xml`:

```xml
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/splash_gradient" />
    
    <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/logo" />
    </item>
</layer-list>
```

#### Multiple Elements
Add text or multiple images:

```xml
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splash_color" />
    
    <!-- Main logo -->
    <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/logo" />
    </item>
    
    <!-- Additional text or image -->
    <item android:top="300dp">
        <bitmap
            android:gravity="center"
            android:src="@mipmap/tagline" />
    </item>
</layer-list>
```

## iOS Customization

### 1. Changing Background Color

#### Option A: Edit LaunchScreen.storyboard
Open `ios/Runner/Base.lproj/LaunchScreen.storyboard` and modify the background color:

```xml
<color key="backgroundColor" red="0.12" green="0.23" blue="0.54" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
```

#### Option B: Use Interface Builder
1. Open `ios/Runner.xcworkspace` in Xcode
2. Navigate to `Runner/Base.lproj/LaunchScreen.storyboard`
3. Select the main view
4. Change the background color in the Attributes Inspector

### 2. Changing the Logo

#### Replace the launch image
1. **Prepare your logo** in multiple sizes:
   - `LaunchImage.png` (1x): 200x200 pixels
   - `LaunchImage@2x.png` (2x): 400x400 pixels  
   - `LaunchImage@3x.png` (3x): 600x600 pixels

2. **Replace the files** in `ios/Runner/Assets.xcassets/LaunchImage.imageset/`:
   - `LaunchImage.png`
   - `LaunchImage@2x.png`
   - `LaunchImage@3x.png`

3. **Update Contents.json** (if needed):
   ```json
   {
     "images" : [
       {
         "idiom" : "universal",
         "filename" : "LaunchImage.png",
         "scale" : "1x"
       },
       {
         "idiom" : "universal",
         "filename" : "LaunchImage@2x.png",
         "scale" : "2x"
       },
       {
         "idiom" : "universal",
         "filename" : "LaunchImage@3x.png",
         "scale" : "3x"
       }
     ],
     "info" : {
       "version" : 1,
       "author" : "xcode"
     }
   }
   ```

#### Adjust logo size and position
Modify the constraints in `LaunchScreen.storyboard`:

```xml
<!-- Center the image -->
<constraint firstItem="YRO-k0-Ey4" firstAttribute="centerX" secondItem="Ze5-6b-2t3" secondAttribute="centerX" id="1a2-6s-vTC"/>
<constraint firstItem="YRO-k0-Ey4" firstAttribute="centerY" secondItem="Ze5-6b-2t3" secondAttribute="centerY" id="4X2-HB-R7a"/>

<!-- Add width and height constraints -->
<constraint firstItem="YRO-k0-Ey4" firstAttribute="width" constant="200" id="width-constraint"/>
<constraint firstItem="YRO-k0-Ey4" firstAttribute="height" constant="200" id="height-constraint"/>
```

### 3. Advanced iOS Customization

#### Using Interface Builder (Recommended)
1. Open `ios/Runner.xcworkspace` in Xcode
2. Navigate to `Runner/Base.lproj/LaunchScreen.storyboard`
3. Add additional UI elements:
   - Labels for text
   - Image views for additional images
   - Stack views for complex layouts

#### Programmatic customization
For more complex layouts, you can modify the storyboard XML directly:

```xml
<subviews>
    <!-- Main logo -->
    <imageView opaque="NO" clipsSubviews="YES" multipleTouchEnabled="YES" contentMode="center" image="LaunchImage" translatesAutoresizingMaskIntoConstraints="NO" id="YRO-k0-Ey4">
    </imageView>
    
    <!-- Additional text label -->
    <label opaque="NO" userInteractionEnabled="NO" contentMode="left" horizontalHuggingPriority="251" verticalHuggingPriority="251" text="Your App Name" textAlignment="center" lineBreakMode="tailTruncation" baselineAdjustment="alignBaselines" adjustsFontSizeToFit="NO" translatesAutoresizingMaskIntoConstraints="NO" id="text-label">
        <fontDescription key="fontDescription" type="boldSystem" pointSize="24"/>
        <color key="textColor" white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
        <nil key="highlightedColor"/>
    </label>
</subviews>
```

## Cross-Platform Consistency

### 1. Color Matching
Ensure both platforms use the same colors:

**Android** (`colors.xml`):
```xml
<color name="splash_color">#FFB800</color>
```

**iOS** (`LaunchScreen.storyboard`):
```xml
<color key="backgroundColor" red="1.000" green="0.722" blue="0.000" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
```

### 2. Logo Consistency
Use the same logo design across both platforms:
- Same visual design
- Same proportions
- Same color scheme

### 3. Brand Guidelines
Follow your brand guidelines:
- Use consistent typography
- Maintain brand colors
- Keep the design simple and clean

## Testing Your Changes

### Android Testing
1. **Clean build**:
   ```bash
   flutter clean
   flutter pub get
   ```

2. **Rebuild the app**:
   ```bash
   flutter run
   ```

3. **Test on different devices** to ensure the launch screen looks good on various screen sizes.

### iOS Testing
1. **Clean build**:
   ```bash
   flutter clean
   flutter pub get
   ```

2. **Open in Xcode** to preview:
   ```bash
   open ios/Runner.xcworkspace
   ```

3. **Test on simulator and device**:
   ```bash
   flutter run
   ```

## Best Practices

### 1. Performance
- **Keep images small**: Optimize PNG files for size
- **Use appropriate resolutions**: Don't use unnecessarily large images
- **Minimize complexity**: Simple designs load faster

### 2. Design
- **Consistent branding**: Match your app's theme
- **Simple and clean**: Avoid cluttered designs
- **Readable text**: Ensure good contrast
- **Scalable**: Design should work on different screen sizes

### 3. User Experience
- **Fast loading**: Keep the launch screen simple
- **Smooth transition**: The launch screen should flow into your app
- **Brand recognition**: Users should immediately recognize your brand

## Troubleshooting

### Android Issues

#### Launch screen not updating
- Clean and rebuild the project
- Check that you're editing the correct files
- Verify image file names match the XML references

#### Image not appearing
- Ensure the image is in the correct mipmap folder
- Check the file name matches the XML reference
- Verify the image format is PNG

#### Color not changing
- Check the color format (hex without #)
- Ensure you're editing the correct colors.xml file
- Clean and rebuild the project

### iOS Issues

#### Launch screen not updating
- Clean the build folder in Xcode
- Delete the app from simulator/device
- Rebuild the project

#### Image not appearing
- Check that all three image sizes are provided
- Verify the Contents.json file is correct
- Ensure images are in the correct format

#### Storyboard issues
- Open the storyboard in Xcode to check for errors
- Verify constraints are properly set
- Check that all referenced images exist

## Example Customization

### Complete Android Example
**colors.xml**:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splash_color">#1E3A8A</color>
</resources>
```

**launch_background.xml**:
```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splash_color" />
    
    <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/logo" />
    </item>
</layer-list>
```

### Complete iOS Example
**LaunchScreen.storyboard** (background color):
```xml
<color key="backgroundColor" red="0.12" green="0.23" blue="0.54" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
```

This documentation provides comprehensive guidance for customizing the native loading screens on both iOS and Android platforms, ensuring a consistent and professional user experience. 