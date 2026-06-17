---
title: Install via Command Line
description: CLI installation for DigiMart
---

# Install via Command Line

For developers and advanced users, DigiMart can be installed entirely from the command line.

## Prerequisites

- Completed [Installation Requirements](./installation-requirements.md)
- Files downloaded and extracted to your server
- `.env` file created in the project root

## Installation Steps

### 1. Create Environment File

Copy the example environment file and configure database credentials:

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
APP_URL=https://your-marketplace.com
APP_DEBUG=false

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=digimart
DB_USERNAME=dbuser
DB_PASSWORD=dbpassword

CMS_DEMO_ACCOUNT_USERNAME=admin
CMS_DEMO_ACCOUNT_PASSWORD=your_secure_password
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Activate Required Plugins

Install and activate the core marketplace plugins in order:

```bash
php artisan cms:plugin:activate captcha
php artisan cms:plugin:activate newsletter
php artisan cms:plugin:activate social-login
php artisan cms:plugin:activate fob-comment
php artisan cms:plugin:activate marketplace
```

### 4. Run Migrations and Seeding

Create database tables and seed initial data:

```bash
php artisan migrate --seed
```

This creates the admin account using the credentials defined in `.env` (or `admin` / `12345678` if not specified).

### 5. Publish Assets

Copy front-end assets to the public directory:

```bash
php artisan cms:publish:assets
```

### 6. Create Public API Token (Optional)

To enable REST API access, generate a public access token:

```bash
php artisan api:public-access-token-create
```

Save the returned token; you will need it for API calls.

### 7. Build Front-End Assets

Install Node.js dependencies and compile assets:

```bash
npm install
npm run prod
```

For development with hot reload:

```bash
npm run dev
```

## Verification

```bash
# Test that the application loads
curl https://your-marketplace.com

# Verify admin can log in
# Visit: https://your-marketplace.com/admin
# Use credentials from .env (CMS_DEMO_ACCOUNT_USERNAME / CMS_DEMO_ACCOUNT_PASSWORD)
```

## Running in Development

For local development with hot module reloading:

```bash
# Terminal 1: Watch and build assets
npm run dev

# Terminal 2: Start PHP development server
php artisan serve
```

Visit `http://localhost:8000` in your browser.

## Troubleshooting

**Composer dependencies fail:**
```bash
composer install --no-dev  # Skip dev dependencies
php --memory-limit=1024M composer install  # Increase memory limit
```

**Permission errors on storage/:**
```bash
chmod -R 775 storage bootstrap/cache
```

**Database migration fails:**
- Verify database exists and user has privileges
- Check that `.env` DB_* values are correct
- Reset and retry: `php artisan migrate:reset && php artisan migrate --seed`

::: warning Security Note
Before going live:
1. Set `APP_DEBUG=false` in `.env`
2. Change the default admin password (already done if you set `CMS_DEMO_ACCOUNT_PASSWORD` in `.env`)
3. Update `productId` in `platform/core/core.json` to your CodeCanyon item ID
:::

::: tip
For web-based installation, see [Install via Web Interface](./installation-web-interface.md).
:::
