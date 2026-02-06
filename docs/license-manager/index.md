# License Manager

A self-hosted license management system for software products. Protect your software with license activation, verification, and update delivery.

## Live Demo

- **Admin Panel:** [https://license-manager.botble.com](https://license-manager.botble.com)
- **API Playground:** [https://license-app-demo.botble.com](https://license-app-demo.botble.com)
- **Credentials:** `admin` / `12345678`

## For Developers

Integrate license protection into your software:

| Guide | Description |
|-------|-------------|
| [Quick Start](quick-start.md) | Add licensing to your app in 5 minutes |
| [Integration Guide](integration.md) | Detailed implementation patterns and examples |
| [API Reference](api.md) | All API endpoints with request/response examples |
| [Demo Playground](demo-playground.md) | Test API calls interactively |
| [Webhooks](webhooks.md) | Get notified of license events |

### How It Works

```
┌─────────────────┐                    ┌──────────────────┐
│   Your App      │                    │  License Manager │
│                 │   1. activate()    │     Server       │
│  User enters    │ ──────────────────►│                  │
│  license code   │ ◄────────────────── │  Returns token   │
│                 │   encrypted token   │                  │
│  Store token    │                    │                  │
│  locally        │   2. verify()      │                  │
│                 │ ──────────────────►│  Checks:         │
│  On every       │ ◄────────────────── │  - domain/IP     │
│  app start      │   valid/invalid    │  - expiration    │
│                 │                    │  - blocked       │
│  If invalid:    │   3. deactivate()  │                  │
│  block access   │ ──────────────────►│  Frees slot      │
└─────────────────┘                    └──────────────────┘
```

### Quick Example (PHP)

```php
// Initialize
$client = new LicenseClient($apiKey, $serverUrl, $productId);

// Activate (user does this once)
$result = $client->activate($licenseCode);
file_put_contents('license.dat', $result['lic_response']);

// Verify (on every app start)
$result = $client->verify(file_get_contents('license.dat'));
if (!$result['is_active']) {
    die('License invalid. Please activate.');
}
```

[Get started →](quick-start.md)

## For Server Admins

Set up your own License Manager server:

| Guide | Description |
|-------|-------------|
| [Requirements](installation-requirements.md) | Server requirements |
| [Install via Web](installation-web-interface.md) | Browser-based installation |
| [Install via CLI](installation-command-line.md) | Command line installation |
| [Cronjob](cronjob.md) | Scheduled tasks setup |
| [Commands](commands.md) | Artisan commands |

## Features

- **License Types** - Perpetual, subscription, and trial licenses
- **Multi-Activation** - Allow licenses on multiple domains/IPs
- **Domain & IP Validation** - Secure activation verification
- **Update Delivery** - Serve software updates to licensed users
- **Customer Portal** - Self-service license management
- **Envato Integration** - Verify Envato purchase codes
- **Webhooks** - Real-time event notifications
- **REST API** - Full programmatic access
- **Migration Support** - Import from LicenseBox

## Support

- **Documentation:** You're reading it!
- **Demo:** [license-manager.botble.com](https://license-manager.botble.com)
- **Botble Team:** [botble.com](https://botble.com)
