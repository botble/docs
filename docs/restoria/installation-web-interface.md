# Installation via Web Interface

## Overview

Installing Restoria through the web interface is the easiest method for non-technical users. This guide will walk you through the step-by-step process.

## Before You Begin

Make sure you have:

1. **Downloaded Restoria**: Get the latest version from CodeCanyon
2. **Server Access**: FTP/SFTP credentials or cPanel access
3. **Database Ready**: MySQL database name, username, and password
4. **Domain Configured**: Your domain pointing to your server

## Step 1: Upload Files

### Using cPanel File Manager

1. Log into your cPanel account
2. Navigate to **File Manager**
3. Go to your `public_html` directory (or your domain folder)
4. Upload the `restoria.zip` file
5. Extract the zip file
6. Move all files from the extracted folder to your root directory

### Using FTP/SFTP

1. Connect to your server using an FTP client (like FileZilla)
2. Navigate to your web root directory
3. Upload all Restoria files
4. Ensure all files are uploaded successfully

## Step 2: Set Folder Permissions

Set the following folders to be writable (755 or 775):

```
/storage
/bootstrap/cache
/lang
/platform
```

## Step 3: Create Database

1. In cPanel, go to **MySQL Databases**
2. Create a new database (e.g., `restoria_db`)
3. Create a database user
4. Add the user to the database with ALL privileges
5. Note down the database details

## Step 4: Run Installation Wizard

1. Open your browser and navigate to `https://yourdomain.com/install`
2. You'll see the Restoria installation wizard

### Welcome Screen
- Review the welcome message
- Click **Next Step** to continue

### Requirements Check
- The installer will check if your server meets all requirements
- All items should show green checkmarks
- If any requirements fail, fix them before proceeding
- Click **Next Step**

### Permissions Check
- Verify all folders have correct permissions
- All should show green checkmarks
- Click **Next Step**

### Database Configuration
Enter your database details:
- **Database Host**: Usually `localhost`
- **Database Port**: Usually `3306`
- **Database Name**: Your database name
- **Database Username**: Your database user
- **Database Password**: Your database password

Click **Next Step** to test the connection

### Site Information
Configure your restaurant website:
- **Site Name**: Your restaurant name (e.g., "Bella Vista Restaurant")
- **Site URL**: Your website URL
- **Admin Email**: Administrator email address
- **Admin Username**: Choose an admin username
- **Admin Password**: Create a strong password
- **Admin First Name**: Your first name
- **Admin Last Name**: Your last name

### Install Sample Data (Optional)
Choose whether to install sample data:
- **Yes**: Recommended for beginners - includes sample menus, reservations, galleries
- **No**: Start with a clean installation

Click **Install Now**

## Step 5: Installation Complete

Once installation is complete:
1. You'll see a success message
2. Note down your admin credentials
3. Delete the `/install` folder for security
4. Click **Go to Admin Panel**

## Step 6: Initial Setup

After logging in to the admin panel:

1. **Configure Restaurant Settings**
   - Go to **Settings** → **General**
   - Set your restaurant name, address, phone
   - Configure timezone and date format

2. **Setup Theme Options**
   - Go to **Appearance** → **Theme Options**
   - Configure colors, fonts, and layout
   - Upload your restaurant logo

3. **Add Your Menu**
   - Go to **Restaurant** → **Menu Items**
   - Add your dishes and categories
   - Set prices and descriptions

4. **Configure Reservations**
   - Go to **Restaurant** → **Reservation Settings**
   - Set available time slots
   - Configure email notifications

## Troubleshooting

### Common Issues

**White Screen or 500 Error**
- Check PHP version (must be 8.2+)
- Increase PHP memory limit to 256MB
- Check error logs for details

**Database Connection Error**
- Verify database credentials
- Check if database user has all privileges
- Try using `127.0.0.1` instead of `localhost`

**Permission Denied Errors**
- Set correct permissions (755) for folders
- Ensure web server user owns the files

**Images Not Uploading**
- Check `upload_max_filesize` in PHP settings
- Verify `/storage` folder is writable
- Check available disk space

### Getting Help

If you encounter issues:
1. Check the [FAQ section](./faq.md)
2. Review server requirements
3. Contact support through CodeCanyon

::: tip
After installation, we recommend setting up SSL, configuring email settings, and enabling caching for optimal performance.
:::