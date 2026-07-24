# Botble JobBoard: React Native Job Search & Employer App

A React Native (Expo SDK 54) mobile app for job search and recruitment businesses. It is the mobile client for a **Botble job-board backend** with the `/api/v1` plugin enabled. The codebase is a zero-brand-literal whitelabel solution — rebrand entirely via `.env` (app name, bundle ID, API URL, colors). One codebase builds both iOS and Android. Candidates search and browse jobs on a list or an interactive map, apply for positions, save favorites, compare opportunities, build resumes, and manage their profile, all driven live from your Botble admin. Employers get a full native portal for job CRUD, applicants, packages, and finance.

<div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin:28px 0;">
  <img src="./images/jobboard-home-light.png" alt="Home" style="width:31%; max-width:240px; border-radius:18px;" />
  <img src="./images/jobboard-job-detail.png" alt="Job detail" style="width:31%; max-width:240px; border-radius:18px;" />
  <img src="./images/jobboard-search.png" alt="Search and filters" style="width:31%; max-width:240px; border-radius:18px;" />
</div>

## Demo video

A full walkthrough of the app: home, job search with filters, job detail, application flow, saved jobs, employer reviews, resume builder, and dark mode.

<div style="position:relative; padding-bottom:56.25%; height:0; margin:24px 0; border-radius:14px; overflow:hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/placeholder-video-id?rel=0"
          title="Botble JobBoard React Native app demo"
          style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
</div>

[Watch on YouTube](https://youtu.be/placeholder-video-id)

## Get started

1. [Overview](overview.md)
2. [Installation](installation.md)
3. [Configuration](configuration.md)
4. [Complete Setup & Publishing Guide](complete-setup-and-publishing-guide.md)

## Customize the app

| Topic | Guide |
|---|---|
| Theme colors | [01_theme_colors.md](01_theme_colors.md) |
| App font | [02_app_font.md](02_app_font.md) |
| App name | [04_app_name.md](04_app_name.md) |
| Logo and icons | [05_app_logo.md](05_app_logo.md) |
| API URL & key | [06_api_base_url.md](06_api_base_url.md) |
| Translations | [07_translations.md](07_translations.md) |

## Screens

- [Profile links](11_profile_links.md)
- [Splash screen](17_splash_screen.md)
- [Loading screen](18_loading_screen.md)
- [Version management](10_version_management.md)

## Build & deploy

- [Running the app](08_running_app.md)
- [Deploying to stores](09_deploying_app.md)
- [Push notifications](push_notifications.md)

## Social login

- [Google](14_google_login_setup.md)
- [Apple](13_apple_login_setup.md)
- [Facebook](15_facebook_login_setup.md)
- [Enable / disable providers](16_social_login_configuration.md)

## Feature list

- **Candidate Portal**: Browse jobs & companies, faceted search & filter (category, salary, location, job type), job detail with company profile, map-based job discovery
- **Resume Builder**: Build and manage resumes with education, experience, languages, and skills sections
- **Map view**: Interactive job search map. Ships with a **free, no-key MapLibre + OpenStreetMap** engine by default; optionally switch to Apple/Google Maps via `MAP_PROVIDER`. Clustering and job markers included
- **Job Application**: Apply to jobs with resume upload, cover letter, and message (guest-friendly, optional account)
- **Saved Jobs**: Server-backed wishlist with optimistic toggle
- **Compare**: Side-by-side comparison of multiple job opportunities
- **Companies Directory**: Browse companies/employers, company detail (jobs, reviews)
- **Blog**: Articles and news from Botble blog plugin
- **Employer Portal (native)**: Dashboard with metrics, multi-step job CRUD (full taxonomy + salary + dates), applicants with CV preview, packages with in-app WebView checkout, finance (transactions & invoices), company management, and reviews
- **Notifications**: Push notifications (FCM), in-app inbox with unread badges and deep links
- **Localization**: 4 languages (English, Vietnamese, Arabic, French) with full **RTL** support (Arabic)
- **Dark mode**: Light / dark / system theme
- **Auth**: Email/password, social login (Google, Apple, Facebook), biometric unlock (Face ID / Touch ID)

## Tech stack

- React Native + Expo SDK 54
- TypeScript (strict)
- Expo Router v6 (file-based routing)
- React Query + Context API
- NativeWind (Tailwind for React Native)
- react-i18next + RTL support
- MapLibre + OpenStreetMap (default map engine, free & no-key); optional react-native-maps (Apple/Google)
- expo-secure-store
- expo-document-picker (resume upload)

## Reference

- [API Integration](api-integration.md)
- [Development Guide](development.md)
- [Upgrade Guide](upgrade.md)
- [Troubleshooting](troubleshooting.md)
- [FAQ](faq.md)
- [Support](support.md)
- [Release notes](releases.md)

## Resources

- **Documentation**: https://docs.botble.com/job-board-mobile-apps
- **Backend required**: Botble job-board system with `/api/v1` plugin enabled
- **Whitelabel**: Zero brand literals; rebrand entirely via `.env` (see [Configuration](configuration.md))
- **API Guide**: [API Integration](api-integration.md)
- **Support**: https://botble.ticksy.com
- **Contact**: contact@botble.com
