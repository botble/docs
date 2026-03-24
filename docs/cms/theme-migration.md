# Theme Migration

This guide helps you switch from one Botble theme to another (e.g., Ninico to Shofy, MartFury to Nest) on the same website while keeping all your data intact.

## Before You Start

::: tip Good News
All Botble themes share the same CMS core and database structure. Your products, categories, orders, customers, blog posts, and other data will remain intact when switching themes.
:::

::: warning Important
- **Product URLs will not change** — they are based on slugs stored in the database, not the theme.
- You **will** need to reconfigure theme-specific settings (theme options, widgets, homepage shortcodes, menus).
:::

### Create a Full Backup

Before switching themes, always create a backup:

1. Go to **Admin Panel** → **System Administration** → **Backups**
2. Click **Create**
3. **Download** the backup file to your computer

## Migration Steps

### Step 1: Download the New Theme

1. Download the new theme from [CodeCanyon](https://codecanyon.net) (your purchases)
2. Extract the downloaded ZIP file on your computer

### Step 2: Upload the New Theme

**Option A: Using File Manager (recommended)**

1. Open **File Manager** in your hosting panel
2. Navigate to `platform/themes/`
3. Upload the new theme folder (e.g., `shofy`) into `platform/themes/`

**Option B: Using Admin Panel**

1. Go to **Admin Panel** → **Appearance** → **Theme**
2. If the theme upload feature is available, use it to upload the theme ZIP

### Step 3: Check Required Plugins

Different themes may require different plugins. Before activating:

1. Go to **Admin Panel** → **Plugins**
2. Check if all required plugins for the new theme are installed and activated
3. If any plugins are missing, install them from **Plugins** → **Add New Plugin** or upload them manually to `platform/plugins/`

### Step 4: Activate the New Theme

1. Go to **Admin Panel** → **Appearance** → **Theme**
2. Find the new theme and click **Activate**

### Step 5: Reconfigure Theme Settings

After activation, you need to set up the new theme's appearance:

**Theme Options:**
- Go to **Appearance** → **Theme Options**
- Configure logo, favicon, colors, footer content, and other settings

**Menus:**
- Go to **Appearance** → **Menus**
- Assign your existing menus to the new theme's menu locations (header, footer, etc.)

**Widgets:**
- Go to **Appearance** → **Widgets**
- Configure sidebar and footer widgets for the new theme

**Homepage:**
- Go to **Pages** and edit your homepage
- Update shortcodes to match the new theme's available shortcodes
- Each theme has different shortcodes for homepage sections — refer to the new theme's documentation

### Step 6: Clear Cache

1. Go to **Admin Panel** → **System Administration** → **Cache Management**
2. Click **Clear All Cache**

### Step 7: Compile Theme Assets (if needed)

If the theme requires asset compilation:

```bash
cd platform/themes/your-new-theme
npm install
npm run production
```

Most themes come with pre-compiled assets, so this step is usually not needed.

## What Stays the Same

| Data | Status |
|------|--------|
| Products & categories | Kept |
| Orders & customers | Kept |
| Blog posts & pages | Kept |
| Media files & images | Kept |
| User accounts | Kept |
| Product URLs / slugs | Kept |
| Payment gateway settings | Kept |
| Email settings | Kept |
| Language translations (admin) | Kept |

## What Needs Reconfiguration

| Setting | Action Required |
|---------|----------------|
| Theme options | Reconfigure (logo, colors, footer, etc.) |
| Widgets | Reassign to new theme's widget areas |
| Menus | Reassign to new theme's menu locations |
| Homepage shortcodes | Update to new theme's shortcodes |
| Custom CSS | Review and update if needed |
| Theme translations | May need to re-translate theme-specific strings |

## Troubleshooting

### Homepage Looks Empty After Switching

This is normal — the new theme uses different shortcodes. Edit your homepage and add the new theme's shortcodes. Check the theme's documentation or demo import for reference.

### Missing Styles or Broken Layout

- Clear cache in **Admin** → **System Administration** → **Cache Management**
- Delete `bootstrap/cache/services.php` and `bootstrap/cache/packages.php` via File Manager
- Check that all required plugins are activated

### Images Not Displaying Correctly

- Image data is stored in the database and shared across themes
- If images appear wrong in size, the new theme may use different image dimensions
- Go to **Settings** → **Media** and check thumbnail sizes

### Some Features Are Missing

Different themes support different features. If a feature was available in your old theme but not in the new one, you may need to:
- Install an additional plugin from [Botble Marketplace](https://marketplace.botble.com)
- Create a custom plugin for the feature

::: tip
For help with theme migration, contact our support team at contact@botble.com or create a ticket at [https://botble.ticksy.com](https://botble.ticksy.com).
:::
