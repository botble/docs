# FAQ

### What is Botble JobBoard?

A job search and recruitment mobile app built with Expo (React Native). It is the mobile client for your Laravel backend, and lets candidates browse jobs, view companies, read the blog, and apply for positions. Employers get a full native portal to post jobs, manage applicants, and handle packages.

### Which backend do I need?

[Botble JobBoard](https://jobbox.botble.com). A Laravel system that ships the **job-board** plugin and exposes the same REST API (jobs, companies, applications, saved jobs, reviews). No other backend will work. See [API Integration](api-integration.md).

### How is this licensed?

Through Envato / CodeCanyon. Your purchase includes an Envato license and a purchase code. In development the app validates that code against `license.botble.com` (`LICENSE_CODE` in `.env`); production builds ship with it empty. See [Troubleshooting → License dialog](troubleshooting.md#license-dialog-appears-in-development).

### Can I publish more than one app from one purchase?

No. One regular Envato license covers **one** app / end product. To publish a second app (a different brand or store listing), buy an additional license.

### Which platforms are supported?

iOS and Android, both from the **same Expo codebase**. There is no separate iOS and Android project to maintain. You configure once and build for both with EAS. See [Deploying the App](09_deploying_app.md).

### What languages are included?

English (`en`), Vietnamese (`vi`), Arabic (`ar`), and French (`fr`) out of the box, via `react-i18next` and `expo-localization`. Arabic ships with full **RTL** (right-to-left) layout support. Set the default with `DEFAULT_LANGUAGE` / `DEFAULT_LANGUAGE_DIRECTION` in `.env`. See [Translations](07_translations.md).

### Does the app support dark mode?

Yes — light, dark, and system themes. Set the launch default with `DEFAULT_THEME_MODE` (`light` / `dark` / `system`) in `.env`; users can also change it in-app under Settings → Theme. Your brand colors apply to both light and dark.

### Which map does the app use? Do I need a Google Maps key?

By default, **no key is needed**. The map ships with `MAP_PROVIDER=osm` (MapLibre + OpenStreetMap), which is free and incurs zero map charges. If you prefer Apple/Google Maps, set `MAP_PROVIDER=default` or `google` and supply a Google Maps key (`GOOGLE_MAPS_ANDROID_API_KEY`, and `GOOGLE_MAPS_IOS_API_KEY` for `google`). Those keys are separate from the backend `API_KEY`. See [Configuration → Maps](configuration.md#maps).

### How do I connect the app to my website?

Set `API_BASE_URL` (and `API_KEY` if your backend requires one) in `.env`. Do not include the `/api/v1` suffix. It is appended automatically. See [API Base URL](06_api_base_url.md).

### What payment methods are supported?

Candidate **job applications are free** — there is no candidate payment flow. Payments happen only in the **employer portal**, when an employer buys a job posting **credit package** or subscribes to a plan. That checkout opens the backend's hosted payment page in a WebView, so any gateway configured on your Botble backend works in the app. See [Employer portal / packages](#is-there-an-employer-portal).

### How do I change the branding?

- **Colors:** `PRIMARY_COLOR`, `PRIMARY_DARK_COLOR`, `ON_PRIMARY_COLOR` in `.env`. See [Theme Colors](01_theme_colors.md).
- **Font:** [App Font](02_app_font.md).
- **App name:** `APP_NAME` in `.env`. See [App Name](04_app_name.md).
- **Logo / icon:** [App Logo](05_app_logo.md).
- **Splash / loading:** [Splash Screen](17_splash_screen.md) and [Loading Screen](18_loading_screen.md).

### How do I set up social login?

- [Google](14_google_login_setup.md)
- [Facebook](15_facebook_login_setup.md)
- [Apple](13_apple_login_setup.md)
- [Social Login Configuration](16_social_login_configuration.md)

A provider only shows when its keys are present in `.env`.

### Do I need to know React Native to deploy?

You need basic React Native / Expo and command-line skills to set environment variables, replace assets, and run EAS builds. You do not need to write app code for a standard branded release.

### What does it cost to publish?

- Google Play: $25 one-time
- Apple App Store: $99 per year

### Can guests apply for a job without an account?

Yes. The job application form works while signed out — a candidate fills in their name, email, phone, uploads a resume, adds a cover letter, and submits directly. No account or payment is required. Signing in simply pre-fills those fields from the profile and skips the resume upload if they already have one saved.

### Is there an employer portal?

Yes — a **fully native** in-app portal (not a WebView wrapper). Employers get a dashboard with metrics, multi-step job create/edit (image upload, full taxonomies, salary, dates, skills, career level), applicant management with CV preview, packages, finance (transactions & invoices), company management, and reviews. The only WebView is the package **checkout** on the backend's hosted payment page.

### How often should I update the app?

Only when the source has a meaningful change (security, bug fix, new feature). Routine catalog updates (new jobs, salaries, companies) do not require an app update. The app fetches them from the API.

### Common problems

See [Troubleshooting](troubleshooting.md).
