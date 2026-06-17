---
title: Install via Web Interface
description: Guided web installer for DigiMart
---

# Install via Web Interface

DigiMart includes a guided web installer that walks you through setup in your browser.

## Prerequisites

- Completed [Installation Requirements](./installation-requirements.md)
- Files uploaded to your web server
- Document root configured to point to the `public/` directory
- Domain/URL ready (e.g., `https://your-marketplace.com`)

## Installation Steps

### 1. Upload Files

Upload DigiMart files to your server using FTP, SFTP, or your hosting control panel. Ensure the document root points to the `public/` directory:

```bash
your-marketplace.com
├── public/          ← Document root
├── platform/
├── routes/
├── storage/
└── ...
```

### 2. Visit the Installer URL

Open your browser and navigate to your domain. The installer will automatically load if no installation is detected:

```
https://your-marketplace.com
```

### 3. Environment Check

The installer verifies that your server meets all requirements (PHP version, extensions, file permissions). If any checks fail, address them before proceeding.

### 4. Database Configuration

Enter your database connection details:

- **Database Type:** MySQL or MariaDB
- **Host:** localhost (or remote server address)
- **Port:** 3306 (default)
- **Database Name:** Create a new database
- **Username:** Database user
- **Password:** Database password

### 5. Admin Account Creation

Create your administrator account (you set your own credentials, not the default admin/12345678):

- **Full Name:** Your name
- **Email:** Admin email address
- **Username:** Admin login username
- **Password:** Strong password (min 8 characters)

### 6. License Activation

Enter your CodeCanyon purchase code to activate your license. You can skip this step and activate later via Admin → Settings → License.

::: info
Before going live, update the `productId` in `platform/core/core.json` to your CodeCanyon item ID.
:::

### 7. Complete Installation

The installer performs final setup (database migrations, asset publishing) and displays a completion message. You are now ready to log in.

## Troubleshooting

**Installer not loading:**
- Verify `public/` is set as the document root
- Clear your browser cache
- Check that `APP_DEBUG=true` is set in `.env` for detailed error messages

**Database connection error:**
- Verify credentials are correct
- Check that the database user has CREATE/ALTER privileges
- Ensure the database server is accessible from your web server

**Permission errors:**
- Run `chmod 755 storage/ bootstrap/cache/`
- Ensure web server user (www-data, nobody) owns the files

::: tip
For command-line installation, see [Install via CLI](./installation-command-line.md).
:::
