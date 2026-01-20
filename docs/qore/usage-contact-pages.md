# Contact Pages

Qore provides multiple shortcodes for building comprehensive contact pages. This guide covers how to set up and customize contact functionality.

## Contact Shortcodes Overview

Qore includes four contact-related shortcodes:

| Shortcode | Purpose |
|-----------|---------|
| Contact Info | Display contact cards with icons |
| Contact Map | Embed Google Maps |
| Contact Form | Contact form with company info sidebar |
| Hero About | Hero section suitable for contact pages |

## Setting Up a Contact Page

### Basic Contact Page

1. Go to `Admin` -> `Pages` -> `Create`
2. Enter page title (e.g., "Contact Us")
3. Add shortcodes in this order:
   - Contact Info (top cards)
   - Contact Form (main form)
   - Contact Map (optional)
4. Set template to `Default` or `Full Width`
5. Publish the page

### Adding to Navigation

After creating your contact page:

1. Go to `Appearance` -> `Menus`
2. Add the contact page to your main navigation
3. Save menu

## Contact Info Shortcode

Display contact information in attractive cards with icons.

### Configuration

| Field | Description |
|-------|-------------|
| Title | Section heading |
| Items | Repeatable contact cards |

### Card Fields

| Field | Description |
|-------|-------------|
| Icon | Icon image for the card |
| Title | Card title (e.g., "Email Us") |
| Description | Contact details or description |
| Button Text | CTA button text |
| Button Link | CTA button URL (use `mailto:`, `tel:`, or regular URLs) |

### Example Cards

**Email Card:**
- Icon: Email icon image
- Title: "Email Us"
- Description: "contact@company.com"
- Button: "Send Email" → `mailto:contact@company.com`

**Phone Card:**
- Icon: Phone icon image
- Title: "Call Us"
- Description: "+1 (555) 123-4567"
- Button: "Call Now" → `tel:+15551234567`

**Location Card:**
- Icon: Location icon image
- Title: "Visit Us"
- Description: "123 Tech Street, San Francisco, CA"
- Button: "Get Directions" → Google Maps URL

## Contact Form Shortcode

Full contact form with company information sidebar.

### Configuration

| Field | Description |
|-------|-------------|
| Title | Form section title |
| Office Label | Label for office section |
| Office Address | Office address (supports line breaks) |
| Email Label | Label for email section |
| Email | Contact email address |
| Phone Label | Label for phone section |
| Phone | Contact phone number |

### Form Fields

The contact form includes these fields by default:
- Full Name
- Email Address
- Subject
- Message

### Form Submission

Contact form submissions are handled by the Contact plugin:

1. Ensure Contact plugin is activated
2. Submissions appear in `Admin` -> `Contact`
3. Configure email notifications in plugin settings

## Contact Map Shortcode

Embed a Google Maps view of your location.

### Getting the Embed URL

1. Go to [Google Maps](https://maps.google.com)
2. Search for your location
3. Click "Share" -> "Embed a map"
4. Copy the `src` URL from the iframe code

### Configuration

| Field | Description |
|-------|-------------|
| Map URL | Google Maps embed URL (just the `src` value) |

### Example URL

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...
```

## Contact Form Customization

### Email Notifications

Configure where contact form submissions are sent:

1. Go to `Settings` -> `General`
2. Set the admin email address
3. Or configure in Contact plugin settings

### Form Styling

The contact form uses Qore's dark theme styling with:
- Dark input backgrounds
- Glowing border effects on focus
- Gradient submit button
- Error states with red highlights

### Spam Protection

Consider enabling spam protection:

1. Install reCAPTCHA package if available
2. Configure in plugin settings
3. CAPTCHA will appear on contact form

## Best Practices

### Contact Information

- Keep information up to date
- Use clickable phone/email links
- Provide multiple contact methods
- Include business hours if applicable

### Form Design

- Keep forms short (essential fields only)
- Use clear labels
- Provide confirmation after submission
- Set up auto-reply emails

### Map Usage

- Center map on your exact location
- Use appropriate zoom level
- Consider mobile users
- Add marker for your business

## Troubleshooting

### Form Not Submitting

- Check Contact plugin is activated
- Verify form action URL
- Check for JavaScript errors
- Ensure CSRF token is present

### Map Not Displaying

- Verify embed URL is correct
- Check for iframe blocking
- Ensure HTTPS is used
- Test in incognito mode

### Emails Not Received

- Check spam folder
- Verify email settings
- Configure SMTP if needed
- Check server mail configuration
