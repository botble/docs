# Frequently Asked Questions

## General Questions

### What is Norio?

Norio is a Digital Agency & Portfolio theme built on Botble CMS (Laravel framework). It is made for design studios, digital agencies, startups and freelancers who want a portfolio-first website with projects, services, team, careers and a blog.

### Does Norio include a shop or online payments?

No. Norio is a content theme. It has no products, cart or checkout. Pricing plans are displayed as content blocks that link to a page or contact form of your choice.

### Do I need coding knowledge to use Norio?

No. Every section of the homepage and inner pages is an editable UI block, and all text, images and settings are managed from the admin panel. Basic HTML/CSS knowledge only helps with advanced customization.

### Can I use Norio on more than one website?

Each website needs its own license. One Regular License covers one end product (one domain). See [License](./license.md) for how to activate it.

### Is Norio mobile-friendly?

Yes. Norio is responsive on desktop, tablet and mobile. Heavy effects such as the custom cursor and mouse-follow motion only run on desktop.

## Installation Questions

### What are the hosting requirements?

- PHP 8.3 or higher (PHP 8.4 is supported)
- MySQL 5.7+ or MariaDB 10.3+
- Apache or Nginx with URL rewriting enabled
- PHP extensions: PDO, OpenSSL, mbstring, exif, fileinfo, XML, Ctype, JSON, Tokenizer, cURL, GD, Zip

See [Requirements](./installation-requirements.md) for the full list.

### How do I install Norio?

There are three ways:

1. **Web installer** (easiest): upload the files and follow the wizard. See [Using web interface](./installation-web-interface.md).
2. **Command line**: for developers with SSH access. See [Using command line](./installation-command-line.md).
3. **Docker**: see [Using Docker](./installation-using-docker.md).

### Which demo should I choose during installation?

The installer offers the homepage presets you see on the demo:

| Preset | Demo |
|--------|------|
| Creative Studio (default) | <https://norio.botble.com> |
| Modern Agency | <https://norio-home-2.botble.com> |
| Digital Startup | <https://norio-home-3.botble.com> |

Each preset imports its own sample pages, menus and theme options. You can edit or delete all sample content after installation.

### Can I switch to another preset after installation?

The preset only decides which sample data is imported. After installation you can rebuild any page with the same UI blocks, so you can copy the look of another preset by editing your pages. You can also change the header and footer styles in `Appearance` -> `Theme Options`. To import a different preset's sample data, reinstall on an empty database. This replaces all existing content.

### Can I install Norio on localhost?

Yes. Use Laravel Herd, Valet, XAMPP, MAMP, WAMP or Docker with PHP 8.3+.

## Customization Questions

### How do I change the homepage?

Go to `Pages`, edit the page set as the homepage, then add, remove or reorder UI blocks. See [Setup homepage](./usage-homepage.md) and [UI Blocks](./usage-ui-block.md).

### How do I change the header or footer style?

Go to `Appearance` -> `Theme Options` -> `Header` / `Footer` to set the site-wide style (5 header styles, 3 footer styles). Each page can override them in the page editor.

### How do I turn off the animations?

Go to `Appearance` -> `Theme Options` -> `Styles`:

- **Enable smooth scrolling**: inertia scrolling on desktop
- **Enable custom cursor**: animated cursor and magnetic buttons
- **Enable mouse-follow effects**: images and cards that move with the pointer

Visitors whose system is set to reduce motion always get native scrolling.

### How do I turn off the loading screen (preloader)?

Go to `Appearance` -> `Theme Options` -> `General` and set **Enable Preloader?** to No. The preloader image and width are set in the same section.

### How do I set dark mode as the default?

Go to `Appearance` -> `Theme Options` -> `Styles` -> **Default theme mode** and choose Light, Dark or System. See [Dark mode](./usage-dark-mode.md).

### How do I change fonts and colors?

Fonts are set in `Appearance` -> `Theme Options` -> `Typography`. For other style changes, add CSS in `Appearance` -> `Custom CSS`. See [Custom CSS/JS](./usage-custom-css-js.md).

### How do I add a project to the portfolio?

Go to `Portfolio` -> `Projects` -> `Create`. Fill in the content, images, tags, year and showcase fields, then publish. See [Portfolio](./usage-portfolio.md).

### Where do job applications go?

The apply form on each role page is a Contact form. Applications are saved in `Contact` in the admin panel and emailed to the admin address if email is configured. See [Careers](./usage-careers.md).

### How do I translate the site or add a language?

Norio ships translations for 25 languages and supports right-to-left layouts. Add languages in `Settings` -> `Languages` and edit strings in `Translations`. See [Multi-language](./usage-multi-language.md) and [Translation](./plugin-translation.md).

## Troubleshooting

### The page stays on the loading screen or looks blank

The loading screen is released by the theme's JavaScript. If a script is blocked, the page unlocks on its own after a few seconds.

1. Open the browser console (F12) and look for blocked or 404 JavaScript files.
2. Clear the cache in `Platform Administration` -> `Cache management`.
3. Make sure `APP_URL` in `.env` matches your real domain, including `https://`.
4. If you use a CDN or optimization plugin that combines or defers scripts, exclude `/themes/norio/` from it.

### Images do not show after installation

- Check that `APP_URL` in `.env` matches your domain (http vs https, with or without `www`).
- Run `php artisan storage:link`, or re-create the `public/storage` link from your hosting panel.
- Make sure the `public/storage` and `storage` folders are writable.

### I see "500 Internal Server Error"

- Make sure `storage` and `bootstrap/cache` are writable by the web server (permission 775).
- Check the PHP version is 8.3 or higher.
- Read the latest error in `storage/logs/laravel.log`.
- Turn on debug temporarily: set `APP_DEBUG=true` in `.env`, reload the page, then set it back to `false`.

### Links return 404 except the homepage

URL rewriting is not active. On Apache, enable `mod_rewrite` and allow `.htaccess` overrides. On Nginx, use `try_files $uri $uri/ /index.php?$query_string;`. Point the web server to the `public` folder.

### The contact or apply form does not send emails

Set up email in `Settings` -> `Email` and send a test email. See [Setup email](./usage-email.md). Messages are still saved in `Contact` even when email is not configured.

### Smooth scrolling feels slow or conflicts with another script

Turn off **Enable smooth scrolling** in `Appearance` -> `Theme Options` -> `Styles`. The site then uses native browser scrolling.

### My changes do not appear on the website

Clear the cache in `Platform Administration` -> `Cache management`, then hard-refresh the browser (Ctrl+F5 / Cmd+Shift+R). If you use Cloudflare or another CDN, purge its cache too.

## Updates and Support

### How do I update Norio?

Use `Platform Administration` -> `System Updater` after activating your license. Back up files and the database first. See [Upgrade Guide](./upgrade.md).

### Will updates overwrite my changes?

Content and settings stored in the database are kept. Direct edits to theme files are overwritten, so put custom styles in `Custom CSS` or a child theme instead.

### How do I get support?

Open a ticket at <https://botble.ticksy.com> with your purchase code. Support covers questions and bug fixes. For custom work, see [hire the Botble team](https://marketplace.botble.com/customize?from=docs&utm_source=docs&utm_medium=faq&utm_content=norio).
