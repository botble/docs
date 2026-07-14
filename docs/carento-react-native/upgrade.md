# Upgrade

How to pull a new version of the Carento (Expo) codebase into a project you have already customized, without losing your changes.

## Before upgrading

1. Back up the current project folder (or make sure your work is committed to git).
2. Save copies of:
   - `.env`
   - Replaced brand assets: `assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash-icon.png`, `assets/favicon.png`, and any custom images
   - Custom theme / design tokens (`src/lib/theme.ts`)
   - Custom translation strings in `src/i18n/` locale JSON
   - Any other source files you have edited
   - Store signing credentials / your EAS project (`eas.json`, credentials are managed by EAS, not the repo)

Read the [release notes](releases.md) first to see what changed.

## Upgrade steps

1. Download the new version from CodeCanyon and extract it to a new folder.
2. Copy your saved files into the new project, matching paths.
3. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

   The `--legacy-peer-deps` flag is required, because the Expo SDK 54 dependency tree has peer-dependency ranges that npm's strict resolver rejects.

4. Re-apply any customizations that were not isolated to the files above (diff your old edits against the new source).

5. If native configuration changed (new native modules, updated `app.config.js` plugins, new permissions, icon/splash config), regenerate the native projects:

   ```bash
   npx expo prebuild --clean
   ```

   Skip this step if you only run through Expo Go / the dev client and no native config changed.

6. Start the app and retest:

   ```bash
   npx expo start -c
   ```

   The `-c` flag clears the Metro cache, which avoids stale-bundle issues after an upgrade.

7. Smoke test: log in, browse cars, open a car detail, run the booking flow, search, and check the Dealers and Blog tabs.

## Build new store releases

Carento builds through **EAS Build** (not local Xcode/Gradle archives). Bump `APP_VERSION` in `.env` (mirrored into `app.config.js` `version`), then:

```bash
eas build --platform android --profile production   # Google Play (.aab)
eas build --platform ios --profile production       # App Store
```

Submit with `eas submit`, or upload the artifacts manually. See [Deploying the App](09_deploying_app.md) and [Version Management](10_version_management.md).

## Common problems

| Symptom | Fix |
|---|---|
| `npm install` peer-dependency conflict | Re-run with `npm install --legacy-peer-deps` |
| Stale bundle / old code after upgrade | `npx expo start -c` to clear the Metro cache |
| Native build fails after config change | `npx expo prebuild --clean`, then rebuild |
| Brand colors / logo / splash reverted | Re-copy `.env` and the `assets/` files from your backup |
| Backend connection fails | Re-copy `.env`; verify `API_BASE_URL` (and `API_KEY` if used) |
| New translation strings missing | Diff the new `src/i18n/` `en.json` against your old copy and merge |

If a fix introduces regressions, roll back to the backed-up project and contact support with the version numbers and the failing step. See [Support](support.md).
