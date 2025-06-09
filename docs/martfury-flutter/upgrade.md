# Upgrading Martfury Flutter App

This guide explains how to upgrade your Martfury Flutter app to the latest version safely and efficiently.

## Before You Begin

Before upgrading, we strongly recommend taking the following precautions:

### 1. Create Backups

**Source Code Backup:**
- Create a full backup of your current app source code
- Use version control (Git) to track changes
- Tag your current version before upgrading
- Backup any custom modifications you've made

**Configuration Backup:**
- Save your current `.env` configuration file
- Backup any custom theme modifications
- Save custom translation files
- Document any custom API integrations

**Development Environment:**
- Ensure you have a working development environment
- Test the upgrade in a development/staging environment first
- Keep your current working version available for rollback

### 2. Check Compatibility

- Ensure the new version is compatible with your Flutter SDK version
- Review the [release notes](/martfury-flutter/releases) for any breaking changes
- Check minimum Flutter version requirements (currently 3.7.2+)
- Verify Dart SDK compatibility (3.0.0+)
- Ensure your Botble backend version is compatible

### 3. Prepare Development Environment

- Update Flutter SDK to the required version
- Update your IDE and plugins
- Ensure all development tools are up to date
- Clear any cached data from previous builds

## Upgrade Process

### Method 1: Standard Upgrade (Recommended)

This is the recommended method for most users:

1. **Download the Latest Version**
   - Download the latest version from your source
   - Verify the download integrity
   - Extract to a temporary location

2. **Backup Current Project**
   ```bash
   git add .
   git commit -m "Backup before upgrade to v1.x.x"
   git tag v1.x.x-backup
   ```

3. **Compare and Merge Changes**
   - Use a file comparison tool to identify differences
   - Carefully merge new features with your customizations
   - Pay special attention to:
     - `pubspec.yaml` dependencies
     - Configuration files
     - Custom theme modifications
     - API service modifications

4. **Update Dependencies**
   ```bash
   flutter clean
   flutter pub get
   flutter pub upgrade
   ```

5. **Test the Upgrade**
   ```bash
   flutter run
   ```

### Method 2: Git-Based Upgrade

If you're using Git for version control:

1. **Create Upgrade Branch**
   ```bash
   git checkout -b upgrade-v1.x.x
   ```

2. **Merge New Version**
   - Add the new version as a remote or manually merge files
   - Resolve any merge conflicts carefully
   - Test each resolved conflict

3. **Update Dependencies**
   ```bash
   flutter clean
   flutter pub get
   ```

4. **Test and Commit**
   ```bash
   flutter test
   git add .
   git commit -m "Upgrade to v1.x.x"
   ```

### Method 3: Fresh Installation with Migration

For major version upgrades or heavily customized apps:

1. **Document Customizations**
   - List all custom modifications
   - Export custom translations
   - Document API changes
   - Save custom theme settings

2. **Fresh Installation**
   - Install the new version in a separate directory
   - Apply your customizations step by step
   - Test each customization thoroughly

3. **Migrate Configuration**
   - Update `.env` file with your settings
   - Apply custom theme modifications
   - Import custom translations
   - Configure API endpoints

4. **Test Thoroughly**
   - Test all app functionality
   - Verify custom features work correctly
   - Check performance and stability

## Post-Upgrade Steps

After completing the upgrade process:

### 1. Update Dependencies and Clean Build

**Flutter Commands:**
```bash
flutter clean
flutter pub get
flutter pub upgrade
```

**Platform-Specific Cleanup:**

For Android:
```bash
cd android
./gradlew clean
cd ..
```

For iOS:
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

### 2. Verify Functionality

**Core Features Testing:**
- Test user authentication (login/register)
- Verify product browsing and search
- Check shopping cart functionality
- Test checkout and payment process
- Verify order tracking and history
- Test wishlist functionality

**API Integration Testing:**
- Verify API connectivity
- Test all API endpoints
- Check authentication token handling
- Verify data synchronization
- Test error handling

**UI/UX Testing:**
- Check all screens render correctly
- Verify navigation works properly
- Test responsive design on different screen sizes
- Check dark mode compatibility (if applicable)
- Verify localization works correctly

### 3. Update Configuration

**Environment Configuration:**
- Update `.env` file if new variables are added
- Check API endpoint configurations
- Verify payment gateway settings
- Update any new feature flags

**App Configuration:**
- Review `pubspec.yaml` for new dependencies
- Update app version numbers
- Check platform-specific configurations
- Update app icons and splash screens if needed

**Translation Updates:**
- Add new translation keys
- Update existing translations if needed
- Test language switching functionality
- Verify RTL support (if applicable)

## Platform-Specific Considerations

### Android Upgrade Steps

1. **Update Gradle Configuration:**
   - Check `android/app/build.gradle` for version updates
   - Update compile and target SDK versions if needed
   - Review dependencies in `android/build.gradle`

2. **Update Permissions:**
   - Check `android/app/src/main/AndroidManifest.xml`
   - Add any new required permissions
   - Update existing permission configurations

3. **Test on Different Devices:**
   - Test on various Android versions
   - Check different screen sizes and densities
   - Verify performance on older devices

### iOS Upgrade Steps

1. **Update iOS Configuration:**
   - Check `ios/Runner/Info.plist` for updates
   - Update minimum iOS version if needed
   - Review app permissions and usage descriptions

2. **Update Xcode Project:**
   - Open `ios/Runner.xcworkspace` in Xcode
   - Update project settings if needed
   - Check signing and provisioning profiles

3. **Test on Different Devices:**
   - Test on various iOS versions
   - Check different iPhone and iPad models
   - Verify performance and compatibility

## Troubleshooting Common Issues

### Dependency Conflicts

If you encounter dependency conflicts:

```bash
flutter pub deps
flutter pub upgrade --major-versions
```

**Manual Resolution:**
- Check `pubspec.yaml` for version conflicts
- Update conflicting packages individually
- Use `flutter pub upgrade --dry-run` to preview changes

### Build Errors

**Android Build Issues:**
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

**iOS Build Issues:**
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
flutter clean
flutter pub get
```

### API Integration Issues

- Verify backend API compatibility
- Check authentication token format
- Update API endpoint URLs if changed
- Test API responses match expected format

### Performance Issues

- Profile app performance with Flutter DevTools
- Check for memory leaks
- Optimize image loading and caching
- Review network request efficiency

## Version-Specific Upgrade Notes

### Upgrading to Version 1.3.0

**New Features:**
- Enhanced payment integration requires configuration
- New order tracking features need backend support
- Wishlist improvements may require data migration

**Breaking Changes:**
- None in this version

**Additional Steps:**
- Configure new payment gateways
- Update notification settings
- Test enhanced order tracking

### Upgrading to Version 1.2.0

**New Features:**
- Multi-language support requires translation files
- Push notifications need Firebase configuration
- Offline support requires cache configuration

**Breaking Changes:**
- API response format changes for some endpoints

**Additional Steps:**
- Set up Firebase for push notifications
- Configure offline caching
- Update API integration for changed endpoints

### Upgrading from Version 1.0.x

**Major Changes:**
- Significant UI/UX improvements
- Enhanced API integration
- New payment gateway integrations
- Improved security features

**Migration Steps:**
- Review all custom UI modifications
- Update API service implementations
- Test payment gateway integrations
- Verify security configurations

## Testing Checklist

Before deploying the upgraded app:

- [ ] All core features work correctly
- [ ] API integration functions properly
- [ ] Payment processing works
- [ ] Push notifications are received
- [ ] App performance is acceptable
- [ ] No memory leaks detected
- [ ] All custom features work
- [ ] Localization works correctly
- [ ] App builds successfully for both platforms
- [ ] No critical errors in logs

## Getting Help

If you need assistance with upgrading:

### Before Contacting Support

- Review this upgrade guide thoroughly
- Check the [troubleshooting section](/martfury-flutter/troubleshooting)
- Review [release notes](/martfury-flutter/releases) for version-specific information
- Test in a development environment first

### Support Information

**What to Include:**
- Current app version
- Target upgrade version
- Flutter and Dart SDK versions
- Platform (Android/iOS) and versions
- Specific error messages
- Steps already attempted

**Contact Methods:**
- Support center with detailed information
- Include relevant log files
- Provide access to development environment if possible

### Emergency Support

For critical issues affecting production apps:
- Rollback to previous working version immediately
- Contact support with detailed error information
- Provide complete build logs and error traces

Remember: A successful upgrade requires careful planning, proper backups, and thorough testing. Always test the upgrade process in a development environment first.

## Deployment After Upgrade

Once you've successfully upgraded and tested the app:

### Development to Production

1. **Final Testing:**
   - Perform comprehensive testing in staging environment
   - Test with production-like data
   - Verify all integrations work correctly
   - Check performance under load

2. **Build Production Version:**
   ```bash
   # For Android
   flutter build apk --release
   # or
   flutter build appbundle --release

   # For iOS
   flutter build ios --release
   ```

3. **Deploy to App Stores:**
   - Update version numbers in app store listings
   - Prepare release notes for users
   - Submit for review following platform guidelines
   - Monitor for any issues after release

### Rollback Plan

Always have a rollback plan ready:

1. **Keep Previous Version:**
   - Maintain the previous working version
   - Keep build artifacts for quick deployment
   - Document rollback procedures

2. **Quick Rollback Steps:**
   - Revert to previous Git commit
   - Rebuild and redeploy previous version
   - Notify users of any temporary issues

## Best Practices for Future Upgrades

### Maintain Upgrade Readiness

1. **Version Control:**
   - Use Git for all source code
   - Tag releases properly
   - Maintain clean commit history
   - Document all customizations

2. **Documentation:**
   - Keep upgrade notes for each version
   - Document all custom modifications
   - Maintain configuration documentation
   - Track API changes and dependencies

3. **Testing Strategy:**
   - Maintain automated tests
   - Test on multiple devices and OS versions
   - Use staging environment for testing
   - Perform regression testing

### Monitoring and Maintenance

1. **Post-Upgrade Monitoring:**
   - Monitor app performance metrics
   - Track user feedback and reviews
   - Watch for crash reports
   - Monitor API response times

2. **Regular Maintenance:**
   - Keep dependencies updated
   - Monitor security advisories
   - Plan regular upgrade cycles
   - Maintain development environment

## Conclusion

Upgrading the Martfury Flutter app requires careful planning and execution. By following this guide and testing thoroughly, you can ensure a smooth upgrade process that maintains app stability while adding new features and improvements.

Key points to remember:
- Always backup before upgrading
- Test in development environment first
- Follow platform-specific guidelines
- Monitor the app after deployment
- Have a rollback plan ready

For additional support and resources:
- [API Documentation](https://ecommerce-api.botble.com/docs)
- [Flutter Documentation](https://flutter.dev/docs)
- [Support Center](https://botble.ticksy.com)
- [Community Forum](https://botble.com/forum)
