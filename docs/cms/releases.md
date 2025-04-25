# Release Notes

Check release notes on https://codecanyon.net/user/botble/portfolio.

## Introduction

Botble CMS follows semantic versioning with regular releases to introduce new features, improvements, and bug fixes. This page provides an overview of our release process and how to stay updated with the latest changes.

## Release Cycle

Botble CMS typically follows these release patterns:

- **Major Releases** (X.0.0): Significant updates that may include breaking changes, major new features, or architectural improvements. These releases may require manual intervention during the upgrade process.

- **Minor Releases** (x.X.0): New features, improvements, and non-breaking changes that enhance functionality while maintaining backward compatibility.

- **Patch Releases** (x.x.X): Bug fixes, security patches, and minor improvements that address specific issues without changing existing functionality.

## Latest Version

The current stable version of Botble CMS is displayed in your admin dashboard. You can also check the version in the `composer.json` file or by running:

```bash
php artisan about
```

This command will show you the Botble CMS version, not just the Laravel version (which would be shown by `php artisan --version`).

## Staying Updated

### Update Notifications

Botble CMS will notify administrators about available updates through the admin dashboard. You'll see a notification when a new version is available.

### Automatic Updates

For minor and patch releases, you can often update directly from your admin dashboard:

1. Go to **Dashboard > Updates**
2. Click **Update Now** if an update is available

### Manual Updates

For major releases or if you prefer manual control:

1. Back up your database and files
2. Download the latest version from your purchase account
3. Follow the specific upgrade instructions provided with each release

## Detailed Release Notes

Detailed release notes for each version are available at:

- [Official Botble Portfolio](https://codecanyon.net/user/botble/portfolio)
- [Botble Marketplace](https://marketplace.botble.com/)

## LTS (Long-Term Support) Versions

Certain versions are designated as LTS releases and receive extended support and security updates. LTS versions are recommended for production environments where stability is prioritized over new features.

## Pre-release Versions

Botble occasionally offers beta or release candidate (RC) versions for testing new features before they're officially released. These versions are not recommended for production use.

## Changelog Highlights

### Recent Major Changes

- **Laravel Framework Updates**: Botble CMS is regularly updated to support the latest Laravel versions, bringing performance improvements and new features.

- **UI/UX Improvements**: Continuous enhancements to the admin interface for better usability and accessibility.

- **Performance Optimizations**: Regular improvements to database queries, caching, and overall system performance.

- **Security Enhancements**: Regular security patches and improvements to keep your site protected.

## Breaking Changes

Major releases may include breaking changes that require attention during upgrades. Always review the specific upgrade guide for each major version before updating your production environment.

## Reporting Issues

If you encounter issues after updating to a new version, you can report them through:

- [Support Center](https://botble.ticksy.com/)

## Compatibility

Botble CMS maintains compatibility information for:

- PHP versions
- Laravel versions
- Database systems
- Server requirements

Always check compatibility requirements before upgrading to ensure your environment supports the new version.
