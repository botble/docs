# Installation via Web Interface

License Manager includes a web-based installer for easy setup.

## Step 1: Upload Files

1. Download the package from CodeCanyon
2. Extract and upload all files to your server
3. Set directory permissions:

```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## Step 2: Run Web Installer

Access the installer at:

```
https://your-domain.com/install
```

The installer will guide you through:

1. **System Requirements Check** - Verifies PHP version, extensions, and permissions
2. **Database Configuration** - Enter MySQL/MariaDB credentials
3. **Admin Account Setup** - Create your administrator account
4. **Installation Complete** - Database tables created and configured

## Step 3: Initial Configuration

After installation, configure License Manager:

### General Settings

Navigate to **License Manager → Settings → General**:

- **Encryption Cipher**: Choose encryption algorithm (AES-128-CBC recommended)
- **Encryption Key**: Auto-generated, or provide custom key
- **Expiration Warnings**: Enable email notifications before license expiry
- **Warning Days**: Days before expiry to send warnings (e.g., "7,1")

### Activation Settings

- **Add First Domain**: Automatically whitelist first activation domain
- **Deactivate Old**: Deactivate previous activations on new activation
- **Log Failed Attempts**: Record failed activation attempts

### Auto-Blacklist Settings

- **Domain Threshold**: Block domains after X failed attempts (0 = disabled)
- **IP Threshold**: Block IPs after X failed attempts (0 = disabled)

### API Settings

Navigate to **License Manager → Settings → API**:

- **Rate Limiting**: Requests per minute (default: 3000)
- **Rate Limit Method**: By IP, API key, or both

### Create API Keys

Navigate to **License Manager → Settings → API Keys**:

1. Click **Create**
2. Select key type:
   - **Internal**: For admin/backend operations
   - **External**: For client applications
3. Set expiration date (optional)
4. Save and copy the generated key

## Step 4: Setup Cron Job

Follow the [Cronjob Setup Guide](https://docs.botble.com/cms/cronjob.html) to configure scheduled tasks for license expiration processing and auto-blacklist.

## Permissions

Configure user permissions:

1. Go to **Settings → Users → Roles**
2. Edit the desired role
3. Enable License Manager permissions:
   - Products (Create, Edit, Delete)
   - Licenses (Create, Edit, Delete, Send Email)
   - Activations (Edit, Delete)
   - Customers (Create, Edit, Delete)
   - Settings (General, API, API Keys)

::: tip
After installation, delete the `/install` directory for security.
:::
