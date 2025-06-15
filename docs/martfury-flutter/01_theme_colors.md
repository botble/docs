# Changing Theme Colors

## Primary Colors
To modify the primary colors of the application:

1. Navigate to `lib/theme/app_theme.dart`
2. Locate the `AppTheme` class
3. Modify the following properties:
   ```dart
   static const Color primaryColor = Color(0xFFYOUR_COLOR);
   static const Color secondaryColor = Color(0xFFYOUR_COLOR);
   ```

## Customizing Color Schemes
For more detailed color customization:

1. Open `lib/theme/app_theme.dart`
2. Find the `lightTheme` and `darkTheme` methods
3. Modify the `ColorScheme` properties as needed:
   ```dart
   ColorScheme(
     primary: YOUR_PRIMARY_COLOR,
     secondary: YOUR_SECONDARY_COLOR,
     // ... other color properties
   )
   ```

## Screenshots
![Theme Colors Configuration](images/primary-color-config.png)
*Example of theme color configuration in the app*
