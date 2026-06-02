# Changelog

All notable changes to License Manager are documented here. The latest version is always available through `Platform Administration` -> `System Updater` in your admin panel.

## Version 1.1.3

_Released on May 1, 2026_

- Upgraded to Laravel 13
- Upgraded minimum PHP version to 8.3
- Added domain violation detection with email notifications
- Added send-license-details command with improved email templates
- Added API health check widget to admin dashboard
- Added bulk license generation with per-product defaults
- Improved bulk license generator
- Improved license code validation flexibility
- Improved domain violation scanning accuracy
- Improved license check command
- Improved API activation with optional X-API-IP and X-API-URL headers
- Fixed Plugin_Upgrader conflict with theme/plugin downloads
- Fixed license expiry checks in verify endpoint
- Fixed customer email fallback for domain violation notifications
