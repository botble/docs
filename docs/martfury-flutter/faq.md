# Frequently Asked Questions

Simple answers to common questions about your MartFury mobile app.

## 🤔 Basic Questions

### What is this app?
It's a mobile shopping app that connects to your website. Customers can browse products, shop, and place orders from their phones.

### Do I need to know programming?
No! The app is ready to use. You just need to:
- Change your website URL
- Update colors and logo (optional)
- Publish to app stores

### How much does it cost to publish?
- **Google Play Store**: $25 one-time fee
- **Apple App Store**: $99 per year
- You need developer accounts for both

### Will it work with my website?
Yes, if your website uses Botble E-commerce system. The app connects to your website automatically.

## 📱 App Features

### What can customers do?
- Browse and search products
- Add items to cart and wishlist
- Login with email or social accounts (Google, Facebook, Apple)
- Track their orders
- Leave reviews
- Compare products
- Save addresses

### What languages does it support?
English, Vietnamese, Spanish, French, Arabic, Hindi, Bengali, Indonesian. You can add more languages easily.

### What payment methods work?
- Credit/debit cards (Stripe)
- PayPal
- Cash on delivery
- Regional options (Razorpay, Mollie, SSLCommerz)

*Note: Payment methods depend on your website setup.*

## 🔧 Setup Questions

### How do I connect the app to my website?
1. Open the `.env` file
2. Change `API_BASE_URL=https://your-website.com`
3. Save and test the app

### How do I change the app colors?
1. Open `lib/src/theme/app_theme.dart`
2. Change the color codes
3. Save and restart the app

### How do I change the app name?
Follow guide **[04_app_name.md](04_app_name.md)** - it's very simple!

### How do I add my logo?
Follow guide **[05_app_logo.md](05_app_logo.md)** - just replace image files.

### How do I set up social login?
Follow these guides:
- **[Google Login](14_google_login_setup.md)**
- **[Facebook Login](15_facebook_login_setup.md)**
- **[Apple Login](13_apple_login_setup.md)**

## 🚨 Common Problems

### App won't connect to my website
- Check your website URL in `.env` file
- Make sure your website is online
- Contact your website developer

### Login doesn't work
- Test login on your website first
- Make sure API is enabled on your website
- Check internet connection

### No products showing
- Make sure you have products on your website
- Check if categories are set up
- Try refreshing the app

### App crashes
- Run: `flutter clean` then `flutter pub get`
- Restart your computer
- Contact support if it still crashes

## 📱 Publishing Questions

### How do I publish to Google Play Store?
1. Create a Google Play Developer account ($25)
2. Follow guide **[09_deploying_app.md](09_deploying_app.md)**
3. Upload your app file
4. Wait for approval (usually 1-3 days)

### How do I publish to Apple App Store?
1. Create an Apple Developer account ($99/year)
2. Follow guide **[09_deploying_app.md](09_deploying_app.md)**
3. Upload through Xcode or App Store Connect
4. Wait for approval (usually 1-7 days)

### Do I need to update the app regularly?
Yes, but it's simple:
- Update when you add new products to your website
- Update if you change your website design
- Update for security improvements

## 💡 Tips for Success

### Before Publishing
- Test the app thoroughly on different phones
- Make sure all features work with your website
- Check that payments work correctly
- Test with real customers if possible

### After Publishing
- Monitor app reviews and ratings
- Respond to customer feedback
- Keep your website and app in sync
- Update the app when needed

## 🆘 Need Help?

### Quick Self-Help
1. Check the numbered guides (01-15) for specific setup
2. Read the **[Troubleshooting Guide](troubleshooting.md)**
3. Make sure your website is working first

### Contact Support
If you're still stuck:
- Describe exactly what you're trying to do
- Include any error messages
- Mention your website URL
- Tell us what device you're using

**Remember**: Most problems are simple to fix! Don't worry if you're not technical - the guides are written for beginners.
