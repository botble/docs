# Upgrade Guide

## Overview

This guide helps you safely upgrade your Botble Ecommerce Mobile App to newer versions.

## Before Upgrading

### Backup Your Work

Always backup before upgrading:

1. **Backup custom files**:
   - `global.css` (theme customizations)
   - `src/i18n/locales/*.json` (translations)
   - `assets/` (logos and images)
   - `.env` (configuration)
   - Any modified source files

2. **Create a git branch** (if using git):
   ```bash
   git checkout -b backup-before-upgrade
   git add .
   git commit -m "Backup before upgrade to vX.X.X"
   ```

### Check Release Notes

Read the [Release Notes](releases.md) for:
- Breaking changes
- New features
- Required steps
- Known issues

## Upgrade Process

### Step 1: Download New Version

1. Download the latest version from CodeCanyon
2. Extract to a new folder
3. Keep your old version for reference

### Step 2: Compare Files

Compare key configuration files:

```bash
# Compare package.json for dependency changes
diff old-version/package.json new-version/package.json

# Compare app.json for configuration changes
diff old-version/app.json new-version/app.json
```

### Step 3: Merge Changes

#### Option A: Fresh Install (Recommended)

1. Copy new version files to your project
2. Restore your customizations:
   - Copy back `global.css` customizations
   - Copy back translation files
   - Copy back assets
   - Restore `.env` settings

3. Install dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

#### Option B: Manual Merge

1. Update `package.json` with new dependencies
2. Apply code changes manually
3. Resolve conflicts carefully
4. Test thoroughly

### Step 4: Update Dependencies

```bash
npm install
```

If you encounter dependency conflicts:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Step 5: Test Thoroughly

Test all major features:
- [ ] App launches correctly
- [ ] Login/logout works
- [ ] Products load
- [ ] Cart functions
- [ ] Checkout works
- [ ] Account features work
- [ ] Theme looks correct
- [ ] Translations work

### Step 6: Clear Caches

```bash
npm start -- --clear
```

## Handling Breaking Changes

### Expo SDK Updates

If the new version updates Expo SDK:

1. Check [Expo upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
2. Update your local Expo CLI:
   ```bash
   npm install -g expo-cli
   ```
3. Follow SDK-specific migration steps

### React Native Updates

For React Native version changes:

1. Check compatibility with your libraries
2. Test on both iOS and Android
3. Watch for deprecation warnings

### API Changes

If API structure changed:

1. Update affected services in `src/services/`
2. Update TypeScript types if needed
3. Test all API-dependent features

## Common Upgrade Issues

### TypeScript Errors

**Problem**: Type errors after upgrade.

**Solution**:
```bash
npm run typecheck
# Fix reported errors
```

### Missing Dependencies

**Problem**: Module not found errors.

**Solution**:
```bash
rm -rf node_modules
npm install
```

### Style Issues

**Problem**: Styling looks wrong after upgrade.

**Solution**:
1. Check for Tailwind config changes
2. Review `global.css` updates
3. Clear Metro bundler cache

### Build Failures

**Problem**: EAS builds fail after upgrade.

**Solution**:
1. Check `eas.json` for required updates
2. Clear EAS cache:
   ```bash
   eas build --clear-cache
   ```
3. Update credentials if needed

## Rolling Back

If upgrade causes issues:

### With Git

```bash
git checkout backup-before-upgrade
npm install
```

### Without Git

1. Restore from your backup
2. Reinstall dependencies:
   ```bash
   npm install
   ```

## Post-Upgrade Checklist

- [ ] All features working
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Both platforms (iOS/Android) work
- [ ] Production build successful
- [ ] Documentation updated

## Version-Specific Guides

Check if your version has specific upgrade notes:

### From 1.0.x to 1.1.x

(Example - check actual release notes)
- New feature X added
- Configuration change Y required
- Deprecated feature Z removed

### From 1.1.x to 2.0.x

(Example - check actual release notes)
- Breaking change A
- Required migration step B
- New dependency C

## Getting Help

If you encounter upgrade issues:

1. Check [Troubleshooting Guide](troubleshooting.md)
2. Review [Release Notes](releases.md)
3. Contact [Support](support.md)

Include in support request:
- Current version
- Target version
- Error messages
- Steps taken
