# Overview

Carento Mobile is a React Native (Expo) app for car rental and car dealer businesses. It is the mobile client for either [Carento](https://codecanyon.net/item/carento-car-dealer-rental-booking-laravel-system/55782539) or [Auxero](https://codecanyon.net/item/auxero-car-dealer-listing-laravel-system/62730624), the two Laravel systems that ship the **car-manager** plugin. Both expose the same API. One codebase builds both iOS and Android. Cars, bookings, dealers, and blog posts are managed entirely from your Botble admin and appear in the app in real time.

## Features

- Browse cars: home sliders, featured cars, browse by make/type
- Search & filter: full-text search plus filters (make, type, transmission, fuel, amenities, price, location)
- Car detail + gallery: specs, amenities, reviews, similar cars, full-screen photo viewer
- Booking flow: 4-step process (dates → extras → details → review) with live price calculation and coupons
- Hosted checkout (WebView): payment is completed on the backend's hosted page, so every Botble payment gateway works without a native SDK
- Guest booking: book without creating an account (toggleable)
- Dealers: dealer directory and dealer detail (cars by vendor)
- Blog: posts, categories, and search from the Botble blog plugin
- Favorites: server-backed wishlist with optimistic toggle
- Notifications inbox: in-app inbox with unread badges and mark-all-read; tapping a push notification deep-links to the booking, car, or blog post it refers to
- Profile & account: profile edit, change password, avatar upload, notifications, help
- Customer reviews: rate a car 1-5 stars and leave a comment from the booking detail screen, for confirmed or completed bookings
- Localization: 4 languages (English, Vietnamese, Arabic, French) with full RTL support
- Dark mode: light / dark / system theme
- Auth: email/password and social login (Google, Apple, Facebook), biometric unlock
- License check: development-only Envato purchase-code validation

## Tech stack

- **Expo SDK 54** · React Native 0.81 · React 19 · TypeScript (strict) · New Architecture
- **expo-router**: file-based navigation
- **@tanstack/react-query**: server state, caching, retries
- **react-i18next** + **expo-localization**: internationalization
- **NativeWind v4 + Tailwind**: styling, with a `theme.ts` design system (lime-green brand)
- **expo-secure-store** (auth token) + **async-storage** (preferences)
- **react-native-webview**: hosted checkout

## Requirements

- A Botble car-rental website with the **car-manager** plugin and API enabled
- Node.js LTS and the Expo tooling (see [Installation](installation.md))
- A Mac with Xcode for iOS builds; Android Studio for Android
- Apple Developer account ($99/year) for App Store; Google Play Developer account ($25 one-time) for Play Store

## Get started

1. [Installation](installation.md)
2. [Configuration](configuration.md)
3. [Theme Colors](01_theme_colors.md)
4. [Deploying the App](09_deploying_app.md)
