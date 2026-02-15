# Domain Migration

This guide helps you move your Botble CMS website to a new domain, subdomain, or server. It is written for **all users**, including those without technical experience. Most steps use your **hosting control panel** (cPanel, DirectAdmin, Plesk, etc.) — no command line required.

## Before You Start

::: warning Important
Your license is tied to your domain. You **must** deactivate it before migrating.
:::

### 1. Deactivate Your License

1. Log in to your **Admin Panel**
2. Go to **Settings** → **General**
3. Click **Deactivate License**
4. You will reactivate it on the new domain later

If you forget this step, you can reset your license at [https://license.botble.com](https://license.botble.com).

### 2. Create a Full Backup

**Using the Admin Panel (recommended):**

1. Go to **Admin Panel** → **System Administration** → **Backups**
2. Click **Create**
3. **Download** the backup file to your computer — do not skip this step

**Using your hosting panel:**

Most hosting panels (cPanel, DirectAdmin, Plesk) have a **Backup** or **Backup Wizard** tool. Use it to create a **full backup** that includes both files and database. Download it to your computer for safekeeping.

### 3. Write Down Your Current Settings

Before migrating, take note of:

- Your active theme name
- Which plugins are activated
- Any third-party integrations (payment gateways, email services, analytics, etc.)

## Migration Guide (Step by Step)

### Step 1: Set Up Hosting for the New Domain

1. Purchase or set up hosting for your new domain
2. Make sure the hosting meets these requirements:
    - **PHP 8.2** or higher
    - **MySQL 8.0+** or **MariaDB 10.3+**
3. Point your new domain's DNS to the new hosting server (your hosting provider can help with this)

### Step 2: Upload Your Website Files

**Option A: Using hosting panel File Manager**

1. On your **old hosting**, go to **File Manager**
2. Select **all files** in your website's root folder (usually `public_html`)
3. **Compress** them into a ZIP file
4. **Download** the ZIP file to your computer
5. On your **new hosting**, go to **File Manager**
6. Navigate to the website root folder (usually `public_html`)
7. **Upload** the ZIP file
8. **Extract** it

**Option B: Using hosting panel Backup & Restore**

Some hosting panels let you restore a full backup directly. If your new hosting uses the same panel (e.g., both use cPanel), you may be able to restore your full backup from Step 2 directly.

### Step 3: Move Your Database

**Export from old hosting:**

1. On your **old hosting**, open **phpMyAdmin** (found in your hosting panel)
2. Select your website's database from the left sidebar
3. Click the **Export** tab
4. Keep the default settings (Quick export, SQL format)
5. Click **Go** — a `.sql` file will download to your computer

**Import to new hosting:**

1. On your **new hosting**, create a **new database** and a **database user** (use the **MySQL Databases** tool in your hosting panel)
2. Open **phpMyAdmin** on the new hosting
3. Select the new empty database from the left sidebar
4. Click the **Import** tab
5. Choose the `.sql` file you downloaded
6. Click **Go**

::: tip
If your database file is too large for phpMyAdmin, ask your hosting provider for help or use the **Import** feature in your hosting panel's backup tool.
:::

### Step 4: Update the `.env` Configuration File

The `.env` file is in your website's root folder. Edit it using **File Manager** in your hosting panel:

1. Open **File Manager** → navigate to your website root
2. Find the `.env` file and click **Edit**
3. Update these lines:

```
APP_URL=https://your-new-domain.com

DB_DATABASE=your_new_database_name
DB_USERNAME=your_new_database_user
DB_PASSWORD=your_new_database_password
```

4. **Save** the file

### Step 5: Update Old Domain URLs in the Database

Your database may still contain references to your old domain (in page content, settings, etc.). You need to replace them.

**Using phpMyAdmin:**

1. Open **phpMyAdmin** on your new hosting
2. Select your database
3. Click the **SQL** tab
4. Run these queries **one at a time** (replace `old-domain.com` and `new-domain.com` with your actual domains):

```sql
UPDATE settings SET value = REPLACE(value, 'old-domain.com', 'new-domain.com')
WHERE value LIKE '%old-domain.com%';
```

```sql
UPDATE media_files SET url = REPLACE(url, 'old-domain.com', 'new-domain.com')
WHERE url LIKE '%old-domain.com%';
```

```sql
UPDATE pages SET content = REPLACE(content, 'old-domain.com', 'new-domain.com')
WHERE content LIKE '%old-domain.com%';
```

```sql
UPDATE posts SET content = REPLACE(content, 'old-domain.com', 'new-domain.com')
WHERE content LIKE '%old-domain.com%';
```

5. Click **Go** after each query

::: tip
If your old site used `http://` and your new site uses `https://`, also replace `http://old-domain.com` with `https://new-domain.com`.
:::

### Step 6: Enable SSL (HTTPS)

Most hosting panels offer free SSL certificates:

1. In your hosting panel, look for **SSL/TLS**, **Let's Encrypt**, or **Security** section
2. Enable or install a free SSL certificate for your new domain
3. Make sure `APP_URL` in your `.env` file starts with `https://`
4. Also add this line to `.env` if not already present:

```
ENABLE_HTTPS_SUPPORT=true
```

### Step 7: Clear the Cache

After migration, you need to clear cached data:

1. Visit `https://your-new-domain.com/admin`
2. Go to **System Administration** → **Cache Management** (if available)
3. Click **Clear All Cache**

If the admin panel doesn't load, try deleting the cache files manually:

1. Open **File Manager** in your hosting panel
2. Navigate to `bootstrap/cache/`
3. Delete all files **inside** this folder (do **not** delete the folder itself)
4. Navigate to `storage/framework/cache/`
5. Delete all files inside this folder too

### Step 8: Activate Your License

1. Go to **Admin Panel** → **Settings** → **General**
2. Enter your purchase code
3. Click **Activate**

If activation fails:
1. Go to [https://license.botble.com](https://license.botble.com)
2. Reset your license
3. Try activating again

## After Migration: Verify Everything Works

Check the following on your new site:

- [ ] Homepage loads correctly
- [ ] Admin panel is accessible
- [ ] All pages and posts display properly
- [ ] Images and media files show up
- [ ] Forms work (contact form, login, etc.)
- [ ] Email notifications are sent

### Update External Services

If you use any of these, update your domain in their settings:

- Google Analytics / Google Search Console
- Social media accounts (Facebook, Twitter, etc.)
- Payment gateways (PayPal, Stripe, etc.)
- Email services (Mailchimp, SendGrid, etc.)

## Alternative: Fresh Install Method

If you prefer to start clean instead of moving your old site:

1. Install Botble CMS on your new domain using the [installation guide](installation-web-interface.md)
2. Activate your license
3. Install the same plugins
4. Manually recreate your content, or export/import your pages and posts through the admin panel

This method is simpler but requires you to reconfigure all settings, menus, widgets, and theme options.

## Troubleshooting

### Images Not Showing

- Check that the `storage/app/public` folder was uploaded correctly
- In **File Manager**, check if `public/storage` exists and points to `storage/app/public`. If not, ask your hosting provider to create a **symbolic link** (symlink).

### 500 Internal Server Error

- Check that `.env` has correct database credentials
- Make sure `storage/` and `bootstrap/cache/` folders have write permissions (set to `755` or `775` via File Manager → Permissions)
- Open `storage/logs/laravel.log` in File Manager to see the error details

### Mixed Content Warnings (HTTP/HTTPS)

- Make sure `APP_URL` in `.env` uses `https://`
- Add `ENABLE_HTTPS_SUPPORT=true` to `.env`
- Run the URL replacement queries from [Step 5](#step-5-update-old-domain-urls-in-the-database)

### License Activation Failed

1. Deactivate the license on the old domain (if still accessible)
2. Reset your license at [https://license.botble.com](https://license.botble.com)
3. Clear your browser cache
4. Try again

### Database Connection Error

- Double-check `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in `.env`
- Make sure the database user has **all privileges** on the database (check in your hosting panel under **MySQL Databases**)

## If Something Goes Wrong

Don't panic! You have your backup from [Step 2](#2-create-a-full-backup).

1. Restore files from your backup using your hosting panel's **Backup** tool or **File Manager**
2. Restore the database using **phpMyAdmin** (import your backup `.sql` file)
3. Update `.env` back to your old domain settings
4. Reactivate the license on your old domain

::: tip
For help with domain migration, contact our support team at contact@botble.com or create a ticket at [https://botble.ticksy.com](https://botble.ticksy.com).
:::
