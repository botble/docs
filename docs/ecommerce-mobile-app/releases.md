# Release Notes

## Version History

### v1.0.5

- Added Google Sign-In on iOS without extra configuration files (`GOOGLE_IOS_CLIENT_ID` / `GOOGLE_IOS_URL_SCHEME`)
- Fixed the checkout page loading in the wrong language
- Fixed Facebook login failing to start
- Fixed Android builds running out of memory

### v1.0.0 (January 2026)

**Initial Release**

#### Features
- Complete e-commerce mobile app built with React Native (Expo)
- Product browsing with categories, brands, and search
- Shopping cart with coupon support
- Wishlist with server synchronization
- WebView-based checkout integration
- User authentication and profile management
- Address management (CRUD operations)
- Order history and tracking
- Multi-language support (EN, ES, FR, AR)
- Dark mode theme support
- RTL layout support for Arabic

#### Technical Specifications
- React Native 0.81+
- Expo SDK 54
- TypeScript (strict mode)
- Expo Router v6
- React Query for state management
- NativeWind (Tailwind CSS)
- react-i18next for translations

#### Screens Included
- Home with featured products
- Categories and brands
- Product detail with gallery
- Search with filters
- Shopping cart
- Wishlist
- User account
- Address management
- Order history
- Settings (theme, language)
- Help center
- Blog

---

## Upcoming Releases

- Improved performance
- Additional payment integrations
- Enhanced search functionality

Push notifications, social login (Google, Apple, Facebook, X), product review submission, order tracking, and biometric unlock are already included.

---

## Changelog Format

Each release includes:
- **Added**: New features
- **Changed**: Changes to existing features
- **Deprecated**: Features to be removed
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security updates

---

## Upgrade Notes

See the [Upgrade Guide](upgrade.md) for detailed instructions on updating to newer versions.

## Support

For issues with any version, contact [Support](support.md).
