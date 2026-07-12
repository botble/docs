# Deploying the App

Carento ships production builds and submits them to the stores with **EAS**
(Expo Application Services). You do not run `xcodebuild`, keystore tooling, or
Xcode archives by hand — EAS builds in the cloud and manages your signing
credentials. There is no `flutter build` step here.

## 1. Install and sign in

Install the EAS CLI globally and log in with your Expo account:

```bash
npm install -g eas-cli
eas login
```

Verify:

```bash
eas whoami
```

## 2. Configure the project

The repository already contains an `eas.json`. If you are starting a fresh
project or need to (re)generate credentials wiring, run:

```bash
eas build:configure
```

### Build profiles (`eas.json`)

The project defines three build profiles plus a submit profile:

| Profile       | `APP_ENV`     | Distribution        | Notes                                    |
|---------------|---------------|---------------------|------------------------------------------|
| `development` | `development` | internal            | `developmentClient: true` — dev client   |
| `preview`     | `staging`     | internal            | internal/QA testing builds               |
| `production`  | `production`  | store               | `autoIncrement: true` for build numbers  |

`eas.json` also sets `cli.appVersionSource: "remote"`, so EAS tracks the build
number for you on its servers (see
[Version Management](10_version_management.md)).

## 3. Credentials

Let EAS manage signing credentials — this is the default and the recommended
path. On the first iOS or Android build, EAS prompts to generate and store:

- **iOS** — Distribution Certificate and Provisioning Profile (needs an Apple
  Developer account).
- **Android** — an upload keystore.

You can inspect or edit them any time with:

```bash
eas credentials
```

## 4. Build for production

iOS (produces a signed `.ipa`):

```bash
eas build -p ios --profile production
```

Android (produces an `.aab` App Bundle):

```bash
eas build -p android --profile production
```

Build both platforms at once:

```bash
eas build --platform all --profile production
```

Each build runs in the cloud; when it finishes EAS gives you a download link to
the resulting `.ipa` (iOS) or `.aab` (Android). Internal-distribution profiles
(`development`, `preview`) instead produce installable builds you can share with
testers.

## 5. Submit to the stores

After a production build completes, submit it with EAS:

```bash
eas submit -p ios --profile production
eas submit -p android --profile production
```

- **iOS** uploads the `.ipa` to App Store Connect (needs your Apple credentials /
  App Store Connect API key).
- **Android** uploads the `.aab` to Google Play (needs a Google Play service
  account JSON key).

`eas submit` can also take a `--latest` flag to submit the most recent build, or
a specific build with `--id`.

## Important notes

- Bump the app version before every store release — see
  [Version Management](10_version_management.md).
- Ensure `APP_ENV=production` for store builds (the `production` profile sets
  this). Production builds enforce HTTPS for the API and strip the dev-only
  test-account prefill.
- Keep EAS-managed credentials in your Expo account; do not commit certificates
  or keystores to the repo.
- Consider EAS Build's CI integration to automate builds on tags or merges.
- Test a `preview` build on real devices before promoting to `production`.
