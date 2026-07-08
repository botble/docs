# Frequently Asked Questions

## General Questions

### What is Velura?

Velura is a premium spa, beauty, and nail salon theme built on Botble CMS (Laravel framework). It's designed specifically for spas, beauty salons, nail bars, and wellness businesses to create professional websites with a built-in appointment booking system, service catalog, staff profiles, packages, memberships, and more.

### Do I need coding knowledge to use Velura?

No, you don't need coding knowledge for basic setup and daily management. The theme includes:
- Visual page builder with drag-and-drop UI Blocks
- User-friendly admin panel
- 9 pre-built homepage variations
- Comprehensive documentation

However, basic HTML/CSS knowledge helps for advanced customizations.

### Can I use Velura for multiple salons?

Each website requires its own license. Options:
- **Single Salon**: One Regular License
- **Salon Group / Franchise**: Multiple Regular Licenses or an Extended License
- **Different Domains**: Separate license for each

### Is Velura mobile-friendly?

Yes! Velura is 100% responsive and mobile-optimized:
- Touch-friendly interface
- Mobile-specific menu navigation
- Booking form optimized for mobile
- Fast loading on mobile networks
- Tested on all major mobile devices

## Installation Questions

### What are the hosting requirements?

**Minimum Requirements:**
- PHP 8.3 or higher
- MySQL 5.7+ or MariaDB 10.3+
- 256MB PHP memory limit
- Apache/Nginx web server
- SSL certificate (recommended)

**Recommended Hosting Providers:**
- DigitalOcean
- AWS/Google Cloud
- SiteGround
- Cloudways
- Any VPS with root access

### How do I install Velura?

Three installation methods available:
1. **Web Installer** (easiest): Upload files and follow the wizard
2. **Command Line**: For developers using SSH
3. **Docker**: For containerized deployments

See [Installation Guide](./installation-web-interface.md) for details.

### Can I install Velura on localhost?

Yes, perfect for development and testing:
- Use XAMPP, WAMP, or MAMP
- Laravel Valet for Mac
- Docker for any platform
- Ensure PHP 8.3+ is installed

### How long does installation take?

Typical installation times:
- **Web Interface**: 15-30 minutes
- **Command Line**: 10-15 minutes
- **With Sample Data**: Additional 5-10 minutes
- **Complete Setup**: 1-2 hours including customization

## Features Questions

### What booking features are included?

A complete appointment booking system:
- Online appointment booking
- Service selection with price and duration
- Optional staff/specialist selection
- Preferred date and time
- Booking calendar dashboard
- Email confirmations (with setup)
- Appointment management (confirm/cancel)

See [Spa Booking](./usage-spa-booking.md) for the full walkthrough.

### Can I organize my treatments?

Yes, the catalog is fully structured:
- **Service Categories** (e.g. Massage, Facial, Nail Care, Hair)
- **Services** with pricing, duration, images
- **Packages** bundling multiple services
- **Memberships** with recurring pricing
- **Staff** profiles linked to services

### Can I sell packages and memberships?

Yes. Packages bundle several services at a special price, and memberships offer recurring plans with ongoing benefits. Both have dedicated UI Blocks (**Packages Section** and **Memberships Section**) and are managed under **Spa Booking**.

### Can I add multiple languages?

Yes, full multi-language support:
- Unlimited languages
- RTL language support
- Easy translation interface
- Language switcher widget
- SEO-friendly URLs per language

### Is there a gallery feature?

Yes, a comprehensive gallery system:
- Multiple gallery types
- Lightbox effects
- Categorized galleries
- Masonry/Grid layouts

## Customization Questions

### Can I change colors and fonts?

Yes, extensive customization options via **Theme Options**:
- **Colors**: Full color picker for all elements
- **Fonts**: Google Fonts integration (defaults: Jost + Rufina)
- **Header**: Toggle top bar and booking button, set colors
- **No coding** required

### Can I use my own logo?

Yes, easy logo management:
- Upload via Theme Options
- Supports PNG, JPG, SVG
- Retina-ready support
- Favicon upload

### Can I modify the homepage?

Yes, fully customizable:
- 9 pre-built homepage variations
- Drag-and-drop UI Blocks
- Unlimited layout possibilities
- Add/remove/reorder sections

### How do I add custom CSS/JavaScript?

Multiple methods:
1. **Theme Options**: Custom CSS/JS fields
2. **Child Theme**: For extensive modifications
3. **Plugin**: Create a custom plugin
4. **Direct Edit**: Modify theme files (not recommended)

## Technical Questions

### How do I backup my website?

Multiple backup methods:
1. **Built-in Backup**: Admin → Tools → Backup
2. **Hosting Backup**: cPanel/hosting provider
3. **Manual Backup**: Database + files

See the [Backup](/cms/plugin-backup) guide for details.

### How do I update Velura?

Easy update process:
1. Backup your site
2. Download the update from CodeCanyon
3. Upload new files
4. Run the update script
5. Clear cache

See [Upgrade Guide](./upgrade.md) for details.

### What if something breaks after an update?

Recovery steps:
1. Restore from backup
2. Check error logs
3. Clear all caches
4. Disable custom code
5. Contact support

### Is Velura SEO-friendly?

Yes, built-in SEO features:
- Clean URL structure
- Meta tags management
- XML sitemap
- Fast loading times
- Mobile optimization
- Social media integration

## Support Questions

### How do I get support?

Support channels:
1. **Documentation**: Comprehensive guides
2. **Ticket System**: https://botble.ticksy.com
3. **Email**: contact@botble.com

### What's included in support?

Support covers:
- ✅ Bug fixes
- ✅ Installation help
- ✅ Configuration assistance
- ✅ Update guidance
- ❌ Custom development
- ❌ Third-party plugins
- ❌ Server configuration

### How fast is support response?

Typical response times:
- **Critical Issues**: 12-24 hours
- **General Questions**: 24-48 hours
- **Weekend/Holidays**: May be delayed
- **Time Zone**: Singapore (GMT+8)

## Common Issues

### Why is my site loading slowly?

Common causes and solutions:
1. **Large images**: Optimize/compress gallery and treatment images
2. **Slow hosting**: Upgrade your hosting plan
3. **No caching**: Enable caching
4. **Too many plugins**: Disable unused plugins
5. **Database issues**: Optimize the database

### Why aren't emails sending?

Email troubleshooting:
1. Configure SMTP settings
2. Check spam folder
3. Verify email credentials
4. Test with a different provider
5. Check the server mail function

### Why is the booking form not working?

Common fixes:
1. Make sure services exist and are published under **Spa Booking**
2. Verify email configuration for confirmations
3. Clear cache
4. Check date/time and timezone settings
5. Review the Spa Booking **Settings**

### How do I fix mixed content errors?

After enabling SSL:
1. Update the site URL to HTTPS
2. Update database URLs
3. Check theme options
4. Clear all caches
5. Use an SSL checker tool

::: tip Need More Help?
If your question isn't answered here, check our [documentation](./index.md) or contact [support](https://botble.ticksy.com).
:::
