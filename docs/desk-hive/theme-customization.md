# Theme Customization

DeskHive ships with the **Support** theme, a clean help-desk frontend. All visual options are managed through the Theme Options panel and a set of shortcodes for page content.

## Theme Options

Navigate to **Admin → Appearance → Theme Options** to configure the Support theme.

### General

| Option | Description |
|--------|-------------|
| Site title | Title shown in the browser tab and portal header |
| Dark mode | Enable dark mode for customer and agent portals |
| Hero background image | Background image for the homepage hero section |
| Conversation style | Choose between **Thread** (chat-style) and **Classic** (card-based) conversation layouts for ticket threads |

### Logo & Favicon

| Option | Description |
|--------|-------------|
| Logo | Site logo displayed in the header |
| Favicon | Browser tab icon |
| Login screen backgrounds | One or more images displayed as a rotating background on the login/register pages |

### Colors

| Option | Default | Description |
|--------|---------|-------------|
| Primary color | `#206bc4` | Main brand color (buttons, links, accents) |
| Secondary color | `#6c7a91` | Supporting color |
| Heading color | `inherit` | Color for heading elements |
| Text color | `#182433` | Body text color |
| Link color | `#206bc4` | Default link color |
| Link hover color | `#1a569d` | Link color on hover |

### Typography

| Option | Default | Description |
|--------|---------|-------------|
| Primary font | Inter | Google Font used for all text |

### Footer

| Option | Description |
|--------|-------------|
| Footer description | Text displayed in the footer column |
| Footer email | Contact email shown in the footer |
| Footer phone | Contact phone number shown in the footer |
| Footer address | Physical address shown in the footer |

### Auth Pages

Customize the decorative panel shown on the left side of the login, register, and password reset pages.

| Option | Description |
|--------|-------------|
| Decorative panel background image | Background image for the auth page panel |
| Decorative panel title | Heading shown on the auth panel (defaults to site title) |
| Decorative panel subtitle | Subheading shown on the auth panel |

### Customer Portal

| Option | Description |
|--------|-------------|
| Support email | Contact email displayed in the customer portal |
| Documentation URL | Link to external documentation (shown in the portal navigation) |

### Legal

| Option | Description |
|--------|-------------|
| Terms of Service URL | Link to your terms page (shown in registration form) |
| Privacy Policy URL | Link to your privacy page (shown in registration form) |

## RTL Support

DeskHive automatically detects right-to-left languages and switches the entire portal layout. When a customer or agent sets their preferred language to an RTL language (Arabic, Hebrew, Persian, Urdu, etc.), the theme:

1. Adds `dir="rtl"` to the `<html>` element
2. Loads a dedicated `theme-rtl.css` stylesheet that mirrors all directional styles
3. Flips navigation, sidebars, form layouts, and ticket threads

RTL detection uses Botble's built-in `Language` registry — no manual configuration needed. It works with both the system-level language setting and per-user preferred language.

::: tip
RTL is activated automatically when a user's preferred language is an RTL language. No admin toggle is required.
:::

## Shortcodes

Shortcodes let you compose the homepage and other CMS pages using pre-built blocks. Add them through the page editor in the admin panel.

### Support Announcement

Displays a dismissible announcement banner at the top of a page.

```
[support-announcement message="We are experiencing delays. Thank you for your patience." style="warning" dismissible="yes"]
```

| Parameter | Options | Description |
|-----------|---------|-------------|
| message | — | Banner text (HTML supported) |
| style | `warning`, `info`, `danger`, `success` | Banner color |
| icon | Any Tabler icon class | Optional icon (e.g., `ti ti-info-circle`) |
| dismissible | `yes`, `no` | Whether the user can close the banner |

### Support Hero

A large hero section with a search box for the knowledge base.

```
[support-hero title="How can we help?" subtitle="Search our knowledge base or submit a ticket" badge="Support Center"]
```

| Parameter | Description |
|-----------|-------------|
| title | Main heading |
| subtitle | Subheading beneath the title |
| badge | Small badge text above the heading |
| suggestions | Comma-separated list of suggested search terms |

### Support Quick Links

A section with quick-access buttons to the Knowledge Base and ticket submission form.

```
[support-quick-links title="Get Help" subtitle="Browse articles or talk to our team"]
```

| Parameter | Description |
|-----------|-------------|
| title | Section heading |
| subtitle | Section subheading |

### Support KB Categories

A grid of knowledge base categories with article counts.

```
[support-kb-categories title="Knowledge Base" subtitle="Find answers to common questions" limit="6"]
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| title | — | Section heading |
| subtitle | — | Section subheading |
| limit | 6 | Maximum number of categories to display |

### Support CTA

A call-to-action section prompting visitors to contact support.

```
[support-cta title="Still need help?" subtitle="Our team is ready to assist you"]
```

| Parameter | Description |
|-----------|-------------|
| title | CTA heading |
| subtitle | CTA subheading |

## Publishing Assets

After making changes to theme assets, run:

```bash
php artisan cms:publish:assets
```

This copies theme assets to the public directory.
