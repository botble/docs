# Overview

Botble JobBoard is a React Native (Expo) app for job search and recruitment. It is the mobile client for a **Botble job-board backend** with the `/api/v1` plugin enabled. The app is a zero-brand-literal whitelabel solution — rebrand entirely via `.env` with no code changes. One codebase builds both iOS and Android. Jobs, applications, employers, and blog posts are managed entirely from your Botble admin and appear in the app in real time.

## Features

- **Job Browse**: Home sliders, featured jobs, browse by category/type, companies directory
- **Search & Filter**: Full-text search plus filters (category, job type, location, salary range, career level)
- **Map View**: Job search and browsing on an interactive map. Ships with a **free, no-key MapLibre + OpenStreetMap** engine by default; switch to Apple/Google Maps via `MAP_PROVIDER`. Includes clustering, job markers, and optional "locate me"
- **Job Detail & Company Profile**: Full job specifications, company info, reviews, similar jobs, full-screen photo viewer
- **Application System**: Apply to jobs with resume upload, cover letter, and message (guest-friendly, optional account)
- **Saved Jobs**: Server-backed wishlist with optimistic toggle
- **Compare**: Side-by-side comparison of multiple job opportunities
- **Companies Directory**: Browse employers, company detail (jobs, reviews, ratings)
- **Blog**: Articles and news from Botble blog plugin with full-text search
- **Notifications Inbox**: In-app inbox with unread badges, push notifications deep-link to relevant content (FCM via Firebase)
- **Candidate Profile & Account**: Profile edit, change password, avatar upload, notifications, language/theme preferences
- **Resume Builder**: Build and manage resumes with education, experience, languages, and skills
- **Reviews & Ratings**: Candidates can rate employers 1-5 stars and leave comments
- **Employer Portal (native)**: Full in-app dashboard — metrics, multi-step job CRUD (image upload, taxonomies, salary, dates, skills), applicants with CV preview, packages, finance (transactions & invoices), company management, and reviews. Only package checkout hands off to a WebView on the backend's hosted payment page
- **Localization**: 4 languages (English, Vietnamese, Arabic, French) with full RTL support (Arabic)
- **Dark Mode**: Light / dark / system theme
- **Auth**: Email/password, social login (Google, Apple, Facebook), biometric unlock (Face ID / Touch ID)
- **Whitelabel**: Environment-driven branding (APP_NAME, APP_BUNDLE_ID, colors, API URL)

## Tech stack

- **Expo SDK 54** · React Native 0.81 · React 19 · TypeScript (strict) · New Architecture
- **expo-router**: file-based navigation
- **@tanstack/react-query**: server state, caching, retries
- **react-i18next** + **expo-localization**: internationalization with RTL
- **NativeWind v4 + Tailwind**: responsive styling with env-driven theme colors
- **expo-secure-store** (auth token) + **async-storage** (user preferences)
- **Firebase Cloud Messaging**: push notifications (optional, FCM tokens)
- **react-native-webview**: embedded WebView for employer package checkout
- **@maplibre/maplibre-react-native**: default free OpenStreetMap engine for the search map; optional **react-native-maps** (Apple/Google) via `MAP_PROVIDER`
- **expo-document-picker**: resume and CV uploads

## Requirements

- **Backend**: A Botble job-board installation with the `/api/v1` plugin enabled
- **Dev environment**: Node.js 18+ LTS and Expo CLI (see [Installation](installation.md))
- **iOS builds**: Mac with Xcode Command Line Tools; Apple Developer account ($99/year) for App Store
- **Android builds**: Android Studio + SDK; Google Play Developer account ($25 one-time) for Play Store
- **Push Notifications** (optional): Firebase project with Android + iOS apps configured

## Get started

1. [Installation](installation.md)
2. [Configuration](configuration.md)
3. [Theme Colors](01_theme_colors.md)
4. [Deploying the App](09_deploying_app.md)
