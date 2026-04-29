# Upgrade

## Before upgrading

1. Read the [release notes](releases.md) for breaking changes.
2. Back up the current project. If you use git:

   ```bash
   git checkout -b backup-before-upgrade
   git add -A && git commit -m "Backup before upgrade"
   ```

3. Save copies of:
   - `.env`
   - `global.css` (theme overrides)
   - `src/i18n/locales/*.json` (translations)
   - `assets/` (logos, splash, icons)
   - Any modified source files

## Upgrade

1. Download the new version from CodeCanyon and extract it to a new folder.
2. Copy your saved customizations into the new project, matching paths.
3. Reinstall dependencies cleanly:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. Restart Metro:

   ```bash
   npm start -- --clear
   ```

5. Smoke test: launch, login, browse products, cart, checkout, theme, language switch. Test on iOS and Android.

## Expo SDK upgrades

If the new version bumps the Expo SDK, follow the [Expo SDK upgrade walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) for SDK-specific migration steps. Update the Expo CLI:

```bash
npm install -g expo-cli
```

## API changes

When the new version touches `src/services/`, regenerate TypeScript types if applicable and re-test affected screens.

## Common errors

| Symptom | Fix |
|---|---|
| TypeScript errors | `npm run typecheck`, fix reported errors. |
| `Cannot find module` | `rm -rf node_modules && npm install` |
| Styles broken | Check Tailwind / `global.css` diffs; `npm start -- --clear`. |
| EAS build fails | `eas build --clear-cache`; refresh credentials with `eas credentials`. |

## Roll back

```bash
git checkout backup-before-upgrade
npm install
```

Without git: restore the backed-up folder and run `npm install`.

## After upgrading

Build a production binary and run a smoke test on a real device before submitting to the stores. See [Deploying the App](08_deploying_app.md).
