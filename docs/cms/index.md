# Overview

## Introduction

Botble CMS is a modern PHP platform based on Laravel Framework 12.x, designed to provide a robust foundation for building websites and web applications. With a focus on developer experience, performance, and flexibility, Botble CMS offers a comprehensive set of features for content management and website development.

Created: `07/06/2016`

Current Version: `7.5.5`

Minimum PHP Version: `8.2.0`

By: [Botble Technologies](https://botble.com)

Email: [contact@botble.com](mailto:contact@botble.com)

Thank you for purchasing this CMS. If you have any questions that are beyond the scope of this help file, please feel free to email via the user page contact form [here](https://codecanyon.net/user/botble) for quick support. Thank you so much!

## Demo

Homepage: https://cms.botble.com

Admin Area: https://cms.botble.com/admin

Username: `admin`

Password: `12345678`

## System Requirements

- PHP >= 8.2.0
- MySQL >= 5.7 (or MariaDB >= 10.2)
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PDO PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
- GD PHP Extension
- Zip PHP Extension

## Installation

Botble CMS offers multiple installation methods:

### Using the Web Installer

1. Upload all files to your web server
2. Visit your website URL and follow the installation wizard
3. Set up your database connection and administrator account
4. Complete the installation

### Using Composer

```bash
composer create-project botble/cms your-project-name
cd your-project-name
php artisan cms:install
```

### Using the CLI Installer

```bash
php artisan cms:install
```

For detailed installation instructions, please refer to the [Installation Guide](installation-web-interface.md).

## Why choose us

- **Modern Architecture**: Built on Laravel 12.x with PHP 8.2+ support, following PSR-12 coding standards and best practices.
- **Fully Responsive**: Compatible with all screen resolutions for a seamless experience across devices.
- **Powerful Permission System**: Comprehensive user, team, and role management with granular permissions.
- **Modular Design**: Core modules like Page, Blog, Menu, and Contact use components to avoid boilerplate code.
- **Rich UI Components**: Integrated with Tabler Icons (4,200+ SVG icons) and numerous UI components to enhance development speed.
- **Customizable Admin Interface**: Admin template with multiple color schemes to match your brand.
- **Insightful Dashboard**: Integration with Google Analytics, recent content overview, and error logs monitoring.
- **Developer Tools**: Built-in CRUD and theme generators to accelerate development.
- **Advanced Media Management**: Powerful media library with categories, tags, and bulk operations.
- **Content Management**: Intuitive drag & drop menu builder, flexible widgets system, and theme options.
- **Plugin Ecosystem**: Extensible architecture allowing you to add new features through plugins.
- **Multilingual Support**: Built-in support for multiple languages and RTL layouts.
- **API Ready**: RESTful API support with versioning capabilities.
- **Performance Optimized**: Caching strategies and optimized database queries for fast page loads.
- **Regular Updates**: Continuous improvements and security patches to keep your site secure and up-to-date.

## Documentation & Resources

- [Official Documentation](https://docs.botble.com/)
- [Marketplace](https://marketplace.botble.com/)
- [Support Center](https://botble.ticksy.com/)

## Updating Botble CMS

Botble CMS can be updated in two ways:

### Automatic Update
1. Log in to your admin panel
2. Go to `Platform Administration` → `System Updater`
3. Click on `Download & Install Update` if a new version is available

### Manual Update
For more control over the update process, follow the detailed instructions in the [Upgrade Guide](upgrade.md).

## Key Commands

Botble CMS provides several useful commands to help you manage your application:

```bash
# List all available commands
php artisan list

# Clear application cache
php artisan cache:clear

# Generate API documentation
php artisan scribe:generate

# Update the CMS to the latest version
php artisan cms:update

# Activate your license
php artisan cms:license:activate <license-key>

# Create a new plugin
php artisan cms:plugin:create <plugin-name>

# Create a new theme
php artisan cms:theme:create <theme-name>
```

For a complete list of available commands, see the [Commands Documentation](commands.md).

## Community & Support

- [Official Documentation](https://docs.botble.com/)
- [Marketplace](https://marketplace.botble.com/)
- [Support Center](https://botble.ticksy.com/)
- [GitHub](https://github.com/botble)

## Botble Team

Visit us at [botble.com](https://botble.com).
