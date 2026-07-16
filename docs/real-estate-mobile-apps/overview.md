# Overview

FlexHome is a React Native (Expo) app for property inquiry and property agent businesses. It is the mobile client for a **Botble real-estate backend** with the `/api/v1` plugin enabled. The app is a zero-brand-literal whitelabel solution — rebrand entirely via `.env` with no code changes. One codebase builds both iOS and Android. Properties, inquiries, agents, and blog posts are managed entirely from your Botble admin and appear in the app in real time.

## Features

- **Property Browse**: Home sliders, featured properties, browse by type/category, projects
- **Search & Filter**: Full-text search plus filters (type, price range, location, amenities, beds/baths)
- **Map View**: Property search and browsing on interactive map
- **Property Detail & Gallery**: Specs, amenities, reviews, mortgage calculator, similar properties, full-screen photo viewer
- **Inquiry System**: Contact agent form with optional consultation scheduling (no payment flow)
- **Saved Properties**: Server-backed wishlist with optimistic toggle
- **Compare**: Side-by-side comparison of multiple properties
- **Agents Directory**: Browse agents, agent detail (listings, reviews, ratings)
- **Blog**: Articles and news from Botble blog plugin with full-text search
- **Notifications Inbox**: In-app inbox with unread badges, push notifications deep-link to relevant content (FCM via Firebase)
- **Profile & Account**: Profile edit, change password, avatar upload, notifications, language/theme preferences
- **Reviews & Ratings**: Consumers can rate agents 1-5 stars and leave comments
- **Agent Portal**: WebView-based dashboard for agent property management, inquiry tracking, packages, and financial overview
- **Localization**: 4 languages (English, Vietnamese, Arabic, French) with full RTL support
- **Dark Mode**: Light / dark / system theme
- **Auth**: Email/password, social login (Google, Apple, Facebook), biometric unlock
- **Whitelabel**: Environment-driven branding (APP_NAME, APP_BUNDLE_ID, colors, API URL)

## Tech stack

- **Expo SDK 54** · React Native 0.81 · React 19 · TypeScript (strict) · New Architecture
- **expo-router**: file-based navigation
- **@tanstack/react-query**: server state, caching, retries
- **react-i18next** + **expo-localization**: internationalization with RTL
- **NativeWind v4 + Tailwind**: responsive styling with env-driven theme colors
- **expo-secure-store** (auth token) + **async-storage** (user preferences)
- **Firebase Cloud Messaging**: push notifications (optional, FCM tokens)
- **react-native-webview**: embedded WebView for agent portal
- **react-native-maps**: interactive property search map

## Requirements

- **Backend**: A Botble real-estate installation with the `/api/v1` plugin enabled
- **Dev environment**: Node.js 18+ LTS and Expo CLI (see [Installation](installation.md))
- **iOS builds**: Mac with Xcode Command Line Tools; Apple Developer account ($99/year) for App Store
- **Android builds**: Android Studio + SDK; Google Play Developer account ($25 one-time) for Play Store
- **Push Notifications** (optional): Firebase project with Android + iOS apps configured

## Get started

1. [Installation](installation.md)
2. [Configuration](configuration.md)
3. [Theme Colors](01_theme_colors.md)
4. [Deploying the App](09_deploying_app.md)
