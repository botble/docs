# Audit: mobile-apps (2026-11-04)

## Scope + repo HEADs
| Docs folder | Repo | HEAD |
|---|---|---|
| carento-react-native | ~/workspace/carento-mobile-apps | 7d3a3d1 2026-10-08 (v1.1.2) |
| ecommerce-mobile-app | ~/workspace/ecommerce-react-native (Expo; NOT ~/workspace/ecommerce-mobile-app, which is a Laravel/Shofy backend) | 59af5c0 2026-10-01 (app.config 1.0.0; console config 1.0.5) |
| job-board-mobile-apps | ~/workspace/job-board-mobile-apps | e06fd71 2026-10-09 (v1.0.1) |
| martfury-flutter | ~/workspace/martfury-flutter | 8258f1a 2026-10-30 (pubspec 1.0.0+2; console config 1.2.7) |
| real-estate-mobile-apps | ~/workspace/real-estate-mobile-apps | 00bed56 2026-10-09 (v1.0.1) |

Toolchain (verified): RN apps all Expo ~54.0.32, RN 0.81.5, React 19.1.0, expo-router ~6.0.22, TS ~5.9.2, no `engines`/.nvmrc (docs "Node 20.19+" ok). Job-board has NO NativeWind. Martfury: Dart `>=3.7.2 <4.0.0`, CI Flutter 3.35.5, AGP Kotlin DSL `build.gradle.kts`, compileSdk/targetSdk 36. Release versions/changelogs cross-checked with ~/workspace/internal-console-tools/config.json.
Checks run: every backticked file path checked for existence, every env key in docs vs app.config.js/.env.example (both directions), defaults in config tables vs .env.example/app.config fallbacks, endpoint lists vs src/services, backend API admin labels vs carento vendor/botble/api lang + routes.

## carento-react-native (fixed 9 / decision 2 / missing 1)
| page | claim in docs | code evidence | action |
|---|---|---|---|
| releases.md | latest 1.1.0 | package.json/app.config.js:73 `1.1.2`; console changelog 1.1.2 | fixed: added 1.1.2 (console items) + 1.1.1 (commits 1b5c82e, 21a270b) |
| configuration.md | `APP_VERSION` default `1.0.0` | app.config.js:73 `"1.1.2"` | fixed |
| configuration.md | no `GOOGLE_SERVICES_PLIST` row | app.config.js:52 | fixed: row added |
| 10_version_management.md | `process.env.APP_VERSION \|\| "1.0.0"` | app.config.js:73 | fixed → 1.1.2 |
| license-activation / configuration / installation / complete-setup | LICENSE_CODE = Envato purchase code only | src/services/license-service.ts:5-9, .env.example (direct-purchase license.botble.com codes accepted) | fixed (all 3 RN apps) |
| api-integration.md | endpoint tables missing many routes | src/services/{account,driver-license,referral,settings,payment,taxonomy,misc,notifications}.ts | fixed: added DELETE profile, driver-license GET/POST, referral, settings, payment-methods, bookings/{id}/payment, services, device-tokens/by-token, notifications (5) |
| push_notifications.md | backend "set `fcm_project_id` / `fcm_service_account_path` under API settings"; "admin device-token list"; "send to that customer" | api lang `push_notifications_section`, `push_notifications_enabled`, `fcm_project_id`, `fcm_service_account_path`=“Service Account JSON File” (upload), `device_tokens_stats`, `send_custom_notification`, targets all/android/ios/customer; routes/web.php has no token list | fixed (all 3 RN apps): Settings → API → Push Notifications (FCM v1 API), Enable toggle, upload JSON, Active Device Tokens, Send Custom Notification |
| overview.md | features list | commits 1fac653/96bfc7a/4ea76ac/6db66fc/fa6f468, app/account/license.tsx, refer-earn-card.tsx, delete-account-dialog.tsx | fixed: pick-up/return times, add-ons, deposit, driver's licence gate, pay methods, account deletion, refer & earn |
| (all) | `.env` used for EAS builds implicitly | `.gitignore` has `.env`; no EAS env vars doc | needs decision (see below) |
| .env.example | — | `ENABLE_TWITTER_SIGN_IN`, `TWITTER_CONSUMER_*` not read by app.config.js | needs decision (dead keys in code) |

## job-board-mobile-apps (fixed 9 / decision 1)
| page | claim | evidence | action |
|---|---|---|---|
| releases.md | latest 1.0.0 | app.config.js:137 `1.0.1`; console changelog | fixed: 1.0.1 entry |
| configuration.md | `APP_VERSION` default 1.0.0; `API_BASE_URL` default `http://jobcy.test` | .env.example:19 `1.0.1`, :36 `https://jobcy.botble.com` | fixed |
| 10_version_management.md | fallback "1.0.0" | app.config.js:137 | fixed |
| 01_theme_colors.md | step 5 `src/lib/brand-vars.ts`, `bg-primary` NativeWind consumers | file absent; no nativewind dep, 0 `className=`, 144 StyleSheet.create | fixed: removed |
| overview.md / index.md | "NativeWind v4 + Tailwind" | package.json (no nativewind/tailwind) | fixed → StyleSheet + theme.ts |
| license-activation, configuration, installation, complete-setup | Envato-only code | license-service.ts | fixed |
| push_notifications.md | backend labels | as carento | fixed |
| api-integration.md | `/locations/countries…` listed under taxonomy.ts | not called by src/services | left (labelled "location plugin only"); low |

## real-estate-mobile-apps (fixed 9 / decision 0)
| page | claim | evidence | action |
|---|---|---|---|
| releases.md | latest 1.0.0 | app.config.js `1.0.1`; console changelog (4 items) | fixed: 1.0.1 entry |
| configuration.md | `APP_FONT_BODY`=`Inter`, `APP_FONT_HEADING`=`InstrumentSans` | .env.example:57-58 / app.config fallback `DMSans`/`JosefinSans` (02_app_font.md already said so) | fixed |
| configuration.md | `APP_NAME` default `Flex Home` | .env.example:13, app.config.js:108 `Real Estate` | fixed |
| configuration.md | `APP_VERSION` 1.0.0; `API_BASE_URL` `http://homzen.test` | .env.example `1.0.1`, `https://homzen.botble.com` | fixed |
| configuration.md | no `APP_BUNDLE_ID`/`APP_SCHEME`/`APP_SLUG`/`APP_LINK_DOMAIN` rows | .env.example:14-18, app.config.js:109,117,219,257 | fixed: rows added |
| 10_version_management.md | fallback 1.0.0 | app.config | fixed |
| license-activation etc. / push_notifications.md | as carento | | fixed |

## ecommerce-mobile-app (fixed 14 / decision 4 / missing 2)
| page | claim | evidence | action |
|---|---|---|---|
| 09_version_management.md | edit `app.json` version/buildNumber/versionCode | no app.json; app.config.js:62 `APP_VERSION`; eas.json `appVersionSource: remote`, `autoIncrement` | fixed: rewrote config/best-practice/step 2 |
| 08_deploying_app.md | "Update app.json" step, version section, eas.json `>= 5.0.0` w/o autoIncrement, OTA "in app.json", projectId "in app.json" | app.config.js, eas.json (`>= 16.28.0`) | fixed |
| 04_app_logo.md / troubleshooting.md | app.json paths / eas block in app.json | app.config.js | fixed; added HEADER_STYLE=logo note (Header.tsx:32) |
| 14_push_notifications.md | app.json googleServicesFile; logout `DELETE /device-tokens/{token}`; `SITE_URL` validation | app.config.js:80-93 (`GOOGLE_SERVICES_FILE`, `GOOGLE_SERVICES_FILE_IOS`); api.ts:1403 `/device-tokens/by-token`; notifications.ts:283 siteUrl = API_BASE_URL | fixed |
| 11_social_login_setup.md | buttons shown when credential set; no ENABLE_* flags, no iOS Google keys | app.config.js:16-22,128-137 (`ENABLE_*_SIGN_IN`, `GOOGLE_IOS_CLIENT_ID`, `GOOGLE_IOS_URL_SCHEME`) | fixed (env block, snippet, visibility table) |
| configuration.md | missing ~15 env keys | app.config.js:104-161 | fixed: localization/theme, header, social pointer, Firebase files, license, TEST_* (+ warning: prefilled in all builds, login.tsx:63) |
| 06_translations.md | 8 languages; register in i18n/index.ts; ko as new example; "update all 8 files" | 30 files + src/i18n/locales/index.ts registry; ko.json exists; picker from GET /languages (SettingsContext.tsx:70-77) | fixed |
| 01_theme_colors.md | "both systems read from the same CSS variables" | src/lib/theme.ts hex palettes independent of global.css | fixed |
| api-integration.md | `/cart/add`, `/cart/update`, `/cart/remove/{rowId}`, `/categories`, `/ecommerce/profile`, checkout `?token=` | api.ts:1114-1169, :538, auth.ts:137 `/me`, CheckoutWebView.tsx:51-71 (headers) | fixed (+ profile, notifications rows) |
| 13_license_activation.md | Envato only | license.ts:4-5 | fixed |
| overview.md / index.md | "Authentication (email/password)"; social (Google, Apple, Facebook) | social-auth, X login, biometric, notifications, returns, stores, compare, reviews in app/ | fixed |
| releases.md | only v1.0.0; "Planned" push/social/reviews/biometric | all shipped; console 1.0.5 changelog | fixed: v1.0.5 entry; removed shipped items from Upcoming |
| (code) | — | app.config.js version `1.0.0` vs console/CodeCanyon 1.0.5 | needs decision |
| (code) | brand colors via `PRIMARY_COLOR` etc. | read into appConfig but never consumed (only src/config/app.ts) | needs decision |
| 14_push_notifications.md | Expo push token registered | notifications.ts:115 `getExpoPushTokenAsync`; backend sends FCM v1 (same bug carento fixed in 1.1.0) | needs decision — likely push never delivered |
| 05_api_base_url.md, 08 | `eas secret:create` | EAS CLI `>= 16.28.0` (secrets superseded by `eas env:*`) | needs decision (not verified against CLI) |
| 10_help_center.md | only `src/data/faq.json` | faq-{ar,de,es,fr,ja,vi,zh}.json exist | missing-doc |
| 12_onboarding.md | storage key `@onboarding_completed` | src/lib/storage.ts:9 `onboarding_completed` (API-scoped prefix) | missing-doc/minor, left |

## martfury-flutter (fixed 9 / decision 3)
| page | claim | evidence | action |
|---|---|---|---|
| overview/index/faq/07_translations | 29 languages (table missing Albanian) | assets/translations 30 files; lib/main.dart:89 `Locale('sq')` | fixed → 30, sq row |
| api-integration.md | `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/social/{p}`, `/categories`, cart PATCH, `PATCH /me`, checkout via POST | services: `/api/v1/login`, `/register`, `/password/forgot`, `/auth/{p}`, `/ecommerce/product-categories`, cart POST/GET/PUT/DELETE + sync/refresh, `PUT /me`, `PUT /update/password`; checkout_screen.dart:228 WebView GET with headers | fixed |
| 16_social_login_configuration.md | ".env always wins" | app_config.dart:219-262 — JSON credentials win, .env fallback (`??=`); flags env-first | fixed |
| 18_loading_screen.md | Android launch bg `#FFB800` + logo; edit `values/colors.xml` | drawable-v21/launch_background.xml = `?android:colorBackground`, no logo (used on all API 21+); values/colors.xml absent; `splash_color` undefined | fixed (warning + create colors.xml) / needs decision on code |
| configuration.md | `PRODUCT_IMAGE_THUMBNAIL_SIZE` default `medium`; no `ENABLE_ORDER_RETURN`, `TEST_*` | app_config.dart:173 `small`, :165, :22-24 (dev only) | fixed |
| complete-setup guide | Flutter SDK 3.7.2+ / Dart 3.7.2+; "Add at top of android {} block" | pubspec `sdk: >=3.7.2` (Dart 3.7 = Flutter 3.29); CI 3.35.5; snippet places code above android {}; java.util.Properties already imported | fixed |
| license-activation / installation / configuration / complete-setup | Envato only | license_service.dart:9-10 | fixed |
| overview.md | features | biometric_service, compare/returns/store/invoice screens, video players | fixed |
| (code) | — | pubspec `1.0.0+2` vs console/CodeCanyon 1.2.7 | needs decision |
| 09_deploying_app.md | Kotlin DSL signing | android/app/build.gradle.kts (release uses debug signing) | verified OK |

## Undocumented features (not written up, listed only)
- carento: biometric lock (expo-local-authentication), currency picker from API, settings sheets; Twitter keys in .env.example unused.
- ecommerce: email verification screen, account deletion (`/ecommerce/delete-account`), order proofs download/upload, product FAQs/specifications/variations, ads (`/ads`, `AD_KEYS`), currencies, flash sales, per-language FAQ files, `with-android-build-memory` config plugin.
- martfury: `assets/config/social_sign_in.json` covered; order tracking settings, invoice PDF viewer, maintenance / no-internet screens, delete account.
- job-board/real-estate: docs comprehensive; nothing major missing.

## Needs decision
1. **EAS cloud builds and `.env`** (carento, job-board, real-estate): `.env` is gitignored and there is no `.easignore`, so EAS workers never get the `.env` values (API_BASE_URL, API_KEY, colors...). The docs say to set `APP_VERSION`/env "before eas build" but never mention EAS environment variables. Need a doc section (ecommerce docs cover this with `eas secret`).
2. **ecommerce RN push likely broken**: it registers an Expo push token (`getExpoPushTokenAsync`), but the backend sends via FCM HTTP v1. Carento fixed exactly this in 1.1.0. This is a code fix, not a docs fix.
3. ecommerce RN: `PRIMARY_COLOR`, `PRIMARY_DARK_COLOR`, `ON_PRIMARY_COLOR`, `APP_BAR_FOREGROUND_COLOR`, `ACCENT_*` in .env.example do nothing. Fix the code, or add a note in the docs?
4. ecommerce RN app.config `1.0.0` and martfury pubspec `1.0.0+2` vs the released 1.0.5 / 1.2.7. Bump the code versions?
5. martfury Android launch screen: drawable-v21 has no color or logo, and `splash_color` is never defined. Fix the code, or keep the docs workaround I added?
6. `eas secret:create` in ecommerce 05/08: should this move to `eas env:create`?
7. carento: remove the dead Twitter keys from .env.example?

## Unresolved questions
- ecommerce releases: intermediate versions 1.0.1–1.0.4 are unknown (only the 1.0.5 changelog is in the console config). I added only 1.0.5.
- carento 1.1.1 entry is built from commit messages, because the console only stores the latest changelog. Please confirm it matches what was published.
- No build was run (per brief).
