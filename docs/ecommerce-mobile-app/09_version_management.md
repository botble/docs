# Version Management

## Overview

Proper version management ensures smooth updates and helps users and app stores track your app releases.

## Version Numbers

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH` (e.g., 1.2.3)

- **MAJOR**: Breaking changes or major new features
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, minor improvements

### Examples

| Version | Type | Changes |
|---------|------|---------|
| 1.0.0 | Initial | First release |
| 1.0.1 | Patch | Bug fixes |
| 1.1.0 | Minor | New feature added |
| 2.0.0 | Major | Complete redesign |

## Where the version is set

This project uses `app.config.js` (there is no `app.json`). The public version comes from the `APP_VERSION` key in `.env`:

```js
// app.config.js
version: process.env.APP_VERSION || "1.0.0",
```

```bash
# .env
APP_VERSION=1.2.0
```

Build numbers are managed by EAS. `eas.json` sets `cli.appVersionSource: "remote"` and `autoIncrement: true` on the `production` profile, so EAS stores the iOS `buildNumber` / Android `versionCode` on its servers and bumps it by 1 for every `eas build --profile production`. You do not edit them by hand.

If you prefer to manage build numbers yourself, set `appVersionSource` to `local` in `eas.json` and add `ios.buildNumber` (string) and `android.versionCode` (integer) to `app.config.js`.

### Version Fields

| Field | Platform | Purpose |
|-------|----------|---------|
| `version` (`APP_VERSION`) | Both | User-visible version |
| `buildNumber` | iOS | Internal build number (string), auto-incremented by EAS |
| `versionCode` | Android | Internal build number (integer), auto-incremented by EAS |

## Version Update Rules

### App Store Requirements

**iOS (App Store)**
- `version` can stay same for updates
- `buildNumber` must increment for each build

**Android (Play Store)**
- `version` can stay same for updates
- `versionCode` must always increase

### Best Practice

Bump `APP_VERSION` for every public release; let the EAS `production` profile increment the build number.

## Update Workflow

### Step 1: Decide Version Type

- Bug fix only → Patch (1.0.0 → 1.0.1)
- New feature → Minor (1.0.0 → 1.1.0)
- Major changes → Major (1.0.0 → 2.0.0)

### Step 2: Update `APP_VERSION`

```bash
# .env
APP_VERSION=1.1.0
```

Restart Metro after changing `.env`. The build number is incremented automatically by EAS.

### Step 3: Create Build

```bash
eas build --platform all --profile production
```

### Step 4: Submit Update

```bash
eas submit --platform all
```

## Tracking Versions

### Keep a Changelog

Create `CHANGELOG.md`:

```markdown
# Changelog

## [1.2.0] - 2026-01-15
### Added
- Dark mode support
- Arabic language

### Fixed
- Cart calculation bug
- Login timeout issue

## [1.1.0] - 2026-01-01
### Added
- Wishlist feature
- Order tracking

### Changed
- Improved checkout flow
```

## Over-the-Air Updates

### Runtime Version

For OTA updates, configure runtime version:

```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

### Policies

| Policy | Description |
|--------|-------------|
| `appVersion` | Uses `version` field |
| `sdkVersion` | Uses Expo SDK version |
| `nativeVersion` | Combines native configs |

### Publishing Updates

```bash
# Publish OTA update
eas update --branch production --message "Fix cart bug"
```

## Pre-Release Versions

### Testing Builds

Use preview profile:

```bash
eas build --platform all --profile preview
```

### Beta Versions

Add beta suffix:

```json
{
  "version": "2.0.0-beta.1"
}
```

## Automation

### Increment Script

Add to `package.json`:

```json
{
  "scripts": {
    "version:patch": "npm version patch",
    "version:minor": "npm version minor",
    "version:major": "npm version major"
  }
}
```

### CI/CD Integration

Example GitHub Actions:

```yaml
name: Build and Deploy
on:
  push:
    tags:
      - 'v*'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform all --non-interactive
```

## Rollback Strategy

### If Update Has Issues

1. **OTA Updates**: Publish previous version
   ```bash
   eas update:rollback --branch production
   ```

2. **Native Updates**: Build and submit previous version

### Prevention

- Test thoroughly before release
- Use preview builds first
- Gradual rollout on app stores

## Version Display in App

Show version to users:

```typescript
import Constants from 'expo-constants';

function AboutScreen() {
  return (
    <Text>
      Version {Constants.expoConfig?.version}
    </Text>
  );
}
```

## Need Help?

- Check [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- Read the [Deployment Guide](08_deploying_app.md)
- Contact support for assistance
