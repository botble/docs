# Release Notes

## 1.0.0

Initial release. Flex Home is a real-estate mobile app built with Expo SDK 54 / React Native 0.81, connecting to a Botble backend running the real-estate plugin API. One codebase builds both iOS and Android.

**Browsing & search**

- Browse properties and projects, with search, filters (type, category, city, price, bedrooms, bathrooms, area) and sorting.
- Interactive map search powered by MapLibre + OpenStreetMap — no Google Maps API key or billing account required. Optional Apple/Google Maps providers, pin clustering, price-bubble markers, and "locate me" nearest sort.
- Property and project detail screens, agent directory and agent public profiles with their listings.
- Side-by-side property compare and a mortgage calculator.
- Blog reader and simple sliders driven by the backend.

**Customer account**

- Auth via Laravel Sanctum, plus Google, Apple, and Facebook social login, with optional biometric app lock.
- Saved properties (favorites), sent consultation history, profile editing, avatar upload, password change, and account deletion.
- Consultation (inquiry) requests to agents, including guest submissions and backend-defined custom fields.
- Property reviews: rate 1–5 stars and leave a comment.
- Referral program: share a code and earn listing credits.

**Agent portal**

- Agent dashboard with account status and activity log.
- Listing management: create, edit, delete, renew, and upload images for your own properties.
- Credit packages purchased through a secure WebView checkout against the backend's hosted payment page, so every Botble payment gateway works without a native SDK.
- Transactions, invoices (with PDF download), incoming leads, and received reviews.

**Platform**

- Push notifications over Firebase Cloud Messaging (FCM HTTP v1), with a notification inbox, unread badges, app-icon badge count, and deep links into the relevant screen from a cold start.
- Localization in English, Vietnamese, Arabic, and French, with full right-to-left (RTL) layout.
- Complete light / dark / system theme.
- Fully white-label: app name, bundle id, scheme, colors, and fonts are all environment-driven in `.env`, with neutral defaults in the source.

For the latest changes, check the CodeCanyon portfolio: https://codecanyon.net/user/botble/portfolio
