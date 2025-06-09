# Frequently Asked Questions

## General Questions

### What is Martfury Flutter App?

Martfury Flutter App is a feature-rich mobile application designed to work seamlessly with Botble E-commerce backend. It provides a complete e-commerce experience with modern UI, secure authentication, advanced product browsing, shopping cart management, and comprehensive order tracking capabilities.

### What are the system requirements for Martfury Flutter App?

**Development Requirements:**
- Flutter SDK 3.7.2 or higher
- Dart SDK 3.0.0 or higher
- Android Studio / VS Code
- Git for version control

**Backend Requirements:**
- Botble E-commerce backend with API access
- [Martfury Laravel E-commerce System](https://codecanyon.net/item/martfury-multipurpose-laravel-ecommerce-system/29925223)

**Platform Requirements:**
- Android: API level 21+ (Android 5.0+)
- iOS: iOS 12.0+

### How does the app connect to the backend?

The app connects to your Botble E-commerce backend through RESTful API endpoints. You configure the API base URL in the `.env` file, and the app handles authentication, data synchronization, and all e-commerce operations through secure API calls.

### Is the app available on app stores?

The Martfury Flutter app is provided as source code that you can customize and publish to the App Store and Google Play Store under your own developer account and branding.

## Features and Functionality

### What payment methods are supported?

The app supports multiple payment gateways:
- **Credit/Debit Cards** via Stripe
- **PayPal** for PayPal account payments
- **Razorpay** for Indian customers
- **Mollie** for European customers
- **SSLCommerz** for Bangladesh customers
- **Cash on Delivery (COD)** where available

### Can customers track their orders?

Yes, the app provides comprehensive order tracking features:
- Real-time order status updates
- Detailed order history
- Order tracking with email/order code
- Push notifications for status changes
- Delivery timeline and carrier information

### Does the app support multiple languages?

Yes, the app supports multiple languages including:
- English
- Vietnamese
- Spanish
- French
- Arabic
- Hindi
- Bengali
- Indonesian

You can easily add more languages by creating additional translation files.

### Does the app support social login?

Yes, the app supports multiple social login options:
- **Google Sign-In**: Login with Google account
- **Facebook Login**: Login with Facebook account
- **Apple Sign-In**: Login with Apple ID (iOS only)
- Social accounts are automatically linked to user profiles
- Users can still use email/password login if preferred

### Can customers save products for later?

Yes, the app includes a comprehensive wishlist feature where customers can:
- Save favorite products
- Manage wishlist items
- Add items to cart from wishlist
- Share wishlist items

### Does the app support product comparison?

Yes, the app includes a powerful product comparison feature:
- **Compare up to 4 products** side-by-side
- **Detailed comparison tables** with specifications and features
- **Smart filtering** to highlight differences
- **Add from any listing** or product detail page
- **AI-powered recommendations** for best value
- **Price and feature comparison** with visual indicators
- **Save and share** comparison results

### How does the shopping cart work?

The shopping cart includes advanced features:
- Add products with variations (color, size, etc.)
- Update quantities and remove items
- Apply coupon codes and discounts
- Calculate shipping and taxes
- Save cart items between sessions

## Technical Questions

### How do I customize the app's appearance?

You can customize the app by modifying:
- **Theme settings** in `lib/src/theme/app_theme.dart`
- **Colors and styling** throughout the app
- **App icons and branding** in the assets folder
- **Splash screen and onboarding** screens

### Can I add new features to the app?

Yes, the app follows a clean architecture that makes it easy to add new features:
1. Create data models in the `model` directory
2. Add API services in the `service` directory
3. Implement business logic in the `controller` directory
4. Build UI components in the `view` directory

### How do I update the app to the latest version?

To update the app:
1. Download the latest version
2. Compare your customizations with the new version
3. Merge your changes carefully
4. Test thoroughly before deploying
5. Update dependencies with `flutter pub get`

### Is the app compatible with the latest Flutter version?

The app is built with Flutter 3.7.2+ and is regularly updated to support the latest stable Flutter versions. Check the release notes for compatibility information.

### Can I integrate analytics and tracking?

Yes, you can integrate various analytics services:
- **Google Analytics** for user behavior tracking
- **Firebase Analytics** for mobile-specific insights
- **Custom tracking** for business-specific metrics
- **Crash reporting** with Firebase Crashlytics

### How do I configure push notifications?

Push notifications are configured through Firebase Cloud Messaging (FCM):

**Setup Requirements**:
- Firebase project with Cloud Messaging enabled
- Platform-specific configuration files
- Proper permissions and capabilities
- Backend integration for sending notifications

**Supported Notification Types**:
- Order status updates and shipping notifications
- Promotional offers and special deals
- Product alerts (new arrivals, back in stock)
- Wishlist notifications (price drops, availability)
- Account security and profile updates

**Key Features**:
- Real-time message delivery
- Background and foreground handling
- Custom notification channels (Android)
- Rich notifications with images and actions
- Topic-based messaging for user segments

For complete setup instructions, see the [FCM Setup Guide](fcm-setup.md).

### Do push notifications work on both Android and iOS?

Yes, FCM supports both platforms with platform-specific features:

**Android Features**:
- Custom notification channels and categories
- Notification grouping and bundling
- Custom sounds and vibration patterns
- Notification actions and replies
- Background app restrictions handling

**iOS Features**:
- Rich notifications with media attachments
- Notification categories and actions
- Critical alerts (with special permission)
- Notification grouping and threading
- Silent notifications for background updates

**Cross-Platform Features**:
- Topic subscriptions for user segments
- Data messages for app-specific handling
- Notification analytics and delivery reports
- A/B testing for notification content

## Backend Integration

### What API endpoints are required?

The app requires the following API endpoints from your Botble backend:
- **Authentication**: Login, register, logout, password reset
- **Products**: Product listings, details, search, categories
- **Cart**: Add, update, remove cart items
- **Orders**: Create orders, order history, tracking
- **User**: Profile management, addresses, preferences

### How do I configure CORS for the mobile app?

Configure CORS in your Laravel backend to allow mobile app requests:
```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'], // Configure specific origins for production
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### Can I use the app with a custom backend?

While the app is designed for Botble E-commerce, you can adapt it to work with other backends by:
1. Modifying the API service layer
2. Updating data models to match your API
3. Adjusting authentication flow
4. Testing all functionality thoroughly

## Troubleshooting

### The app won't connect to my backend

If the app can't connect to your backend:
- Verify the `API_BASE_URL` in your `.env` file is correct
- Check that your backend is running and accessible
- Ensure CORS is properly configured
- Test API endpoints with a tool like Postman
- Check for SSL certificate issues with HTTPS

### Products are not loading

If products aren't loading:
- Check your internet connection
- Verify the products API endpoint is working
- Check for authentication token issues
- Look for error messages in the app logs
- Ensure the backend has products data

### Payment processing fails

If payments are failing:
- Verify payment gateway configuration in the backend
- Check API keys and credentials
- Test in sandbox mode first
- Ensure the payment gateway supports your region
- Check for network connectivity issues

### App crashes on startup

If the app crashes on startup:
- Check for missing environment variables
- Verify all dependencies are installed (`flutter pub get`)
- Look for error messages in the console
- Try running `flutter clean` and rebuilding
- Check device compatibility

### Push notifications not working

If push notifications aren't working:
- Verify Firebase configuration files are added correctly
- Check Firebase project settings
- Ensure proper permissions are requested
- Test notification sending from Firebase console
- Check device notification settings

## Best Practices

### How should I test the app before release?

Follow these testing practices:
1. **Unit Testing**: Test individual components and functions
2. **Integration Testing**: Test API integration and data flow
3. **UI Testing**: Test user interface and user experience
4. **Device Testing**: Test on various devices and screen sizes
5. **Performance Testing**: Check app performance and memory usage
6. **Security Testing**: Verify secure data handling and API communication

### What should I consider for production deployment?

For production deployment:
1. **Environment Configuration**: Use production API URLs and keys
2. **Security**: Enable certificate pinning and secure storage
3. **Performance**: Optimize images and enable caching
4. **Analytics**: Set up crash reporting and user analytics
5. **App Store Guidelines**: Follow platform-specific guidelines
6. **Testing**: Thoroughly test all features in production environment

### How do I maintain the app after launch?

Post-launch maintenance includes:
1. **Regular Updates**: Keep Flutter and dependencies updated
2. **Bug Fixes**: Monitor crash reports and user feedback
3. **Feature Updates**: Add new features based on user needs
4. **Security Updates**: Apply security patches promptly
5. **Performance Monitoring**: Track app performance metrics
6. **User Support**: Provide customer support for app issues

For additional questions or support, please contact our support team or visit our documentation.
