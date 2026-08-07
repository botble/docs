# Flex Home: React Native Property Inquiry & Agent App

A React Native (Expo SDK 54) mobile app for real-estate businesses. It is the mobile client for a **Botble real-estate backend** with the `/api/v1` API enabled.

::: warning This is a mobile app, not a standalone system
Flex Home has no database and no admin panel of its own. It reads properties, projects, agents,
consultations and accounts from a Laravel backend over that backend's REST API. You need one of
our real-estate Laravel scripts, sold separately — [Homzen](https://1.envato.market/Vm1QmJ) or
[Flex Home](https://1.envato.market/QrdYz). Both ship the real-estate plugin and expose the same
API, so the app works with either. No other backend will work.
:::

::: warning Optional features need your own third-party accounts, and some cost money
Social login, payment gateways and push notifications connect to services that are not ours and are
not included in the purchase price. **Social login** needs your own Google, Apple or Meta developer
accounts, and Sign in with Apple requires a paid Apple Developer Program membership. **Payment
gateways** for agent credit packages run on your backend and need your own merchant account with the
provider, who charges their own transaction fees. **Push notifications** need your own Firebase
project. The app runs fine without any of them; each stays switched off until you supply credentials.
See [Common Backend Configuration Errors](backend-configuration-errors.md) and
[Social Login Configuration](16_social_login_configuration.md).
:::
 The codebase is a zero-brand-literal whitelabel solution — rebrand entirely via `.env` (app name, bundle ID, API URL, colors). One codebase builds both iOS and Android. Consumers browse properties and projects, search on an interactive map, save and compare listings, and send consultation requests to agents, all driven live from your Botble admin. Agents get a full native portal for listings, leads, credit packages, invoices and reviews — only the package checkout runs in a WebView, so every Botble payment gateway works without a native SDK.

<div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin:28px 0;">
  <img src="./images/flexhome-home-light.png" alt="Home" style="width:31%; max-width:240px; border-radius:18px;" />
  <img src="./images/flexhome-property-detail.png" alt="Property detail" style="width:31%; max-width:240px; border-radius:18px;" />
  <img src="./images/flexhome-search.png" alt="Search and filters" style="width:31%; max-width:240px; border-radius:18px;" />
</div>

## Demo video

A full walkthrough of the app: home, search and filters, map search, property detail, projects,
saved listings, the agent portal, and dark mode.

<div style="position:relative; padding-bottom:56.25%; height:0; margin:24px 0; border-radius:14px; overflow:hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/wKgCv2cl_Sg?rel=0"
          title="Flex Home React Native app demo"
          style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
</div>

[Watch on YouTube](https://youtu.be/wKgCv2cl_Sg)

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

- **Consumer**: Browse properties, search & filter (price, type, location), property detail with gallery, mortgage calculator
- **Inquiry system**: Contact agent form, inquiry follow-up tracking, agent reviews & ratings
- **Favorites**: Server-backed wishlist with optimistic toggle
- **Saved properties**: Compare multiple properties side-by-side
- **Agents directory**: Browse agents, agent detail (listings, reviews)
- **Blog**: Articles and news from Botble blog plugin
- **Agent portal**: WebView-based dashboard for agent listings, inquiries, packages, and commissions
- **Notifications**: Push notifications (FCM), in-app inbox with unread badges
- **Localization**: 4 languages (English, Vietnamese, Arabic, French) with RTL support
- **Dark mode**: Light / dark / system theme
- **Auth**: Email/password, social login (Google, Apple, Facebook), biometric unlock

## Tech stack

- React Native + Expo SDK 54
- TypeScript (strict)
- Expo Router v6 (file-based routing)
- React Query + Context API
- NativeWind (Tailwind for React Native)
- react-i18next + RTL support
- expo-secure-store

## Reference

- [API Integration](api-integration.md)
- [Development Guide](development.md)
- [Upgrade Guide](upgrade.md)
- [Troubleshooting](troubleshooting.md)
- [Backend Configuration Errors](backend-configuration-errors.md)
- [FAQ](faq.md)
- [Support](support.md)
- [Release notes](releases.md)

## Resources

- **Documentation**: https://docs.botble.com/real-estate-mobile-apps
- **Backend required**: Botble real-estate system with `/api/v1` plugin enabled
- **Whitelabel**: Zero brand literals; rebrand entirely via `.env` (see [Configuration](configuration.md))
- **API Guide**: [API Integration](api-integration.md)
- **Support**: https://botble.ticksy.com
- **Contact**: contact@botble.com
