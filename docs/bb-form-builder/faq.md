# Frequently Asked Questions

## General Questions

### What is BB Form Builder?

BB Form Builder is an advanced form builder plugin for websites built with Botble CMS. It provides a drag-and-drop interface to create beautiful, responsive forms without any coding knowledge. From simple contact forms to complex multi-step wizards, BB Form Builder handles all your form needs.

### What are the system requirements for BB Form Builder?

- Botble CMS version 7.5.0 or higher (or any script based on Botble CMS)
- PHP version 8.2 or higher
- MySQL 5.7+ or MariaDB 10.3+

### Is BB Form Builder compatible with other Botble products?

Yes! BB Form Builder is fully compatible with all scripts based on Botble CMS, including all products available on our [CodeCanyon portfolio](https://codecanyon.net/user/botble/portfolio) such as Farmart, Martfury, Shofy, JobBox, and more.

### How do I activate my license?

1. Go to **BB Form Builder** > **License Activation** in your admin panel
2. Enter your purchase code from CodeCanyon
3. Accept the license terms
4. Click "Activate license"

Your license allows installation on one domain. To use on another domain, deactivate first.

### Can I use BB Form Builder on multiple websites?

Each license allows installation on one website. For multiple websites, you need to purchase additional licenses or deactivate from one site before activating on another.

## Form Building Questions

### How many forms can I create?

There is no limit to the number of forms you can create with BB Form Builder. Create as many forms as your website needs.

### Can I create multi-step forms?

Yes! BB Form Builder supports multi-step wizard forms. Simply click "Add Step" in the form builder to create multiple steps. You can choose between horizontal or vertical step layouts.

### What field types are available?

BB Form Builder includes:
- Text inputs (text, number, email, phone)
- Textarea (multi-line input)
- Autocomplete
- Select dropdowns
- Radio buttons
- Checkboxes
- Date and time pickers
- File and image uploads
- Hidden fields
- HTML content blocks

### Can I customize the form appearance?

Yes! BB Form Builder offers extensive customization:
- Five pre-built styles (Default, Modern, Minimal, Bold, Glassmorphism)
- Custom colors for all elements
- Adjustable border radius and shadows
- Multiple form sizes and alignments
- Per-form style overrides

### How do I add conditional logic to forms?

Currently, BB Form Builder focuses on straightforward form building. For complex conditional logic, consider using the multi-step wizard feature to logically group related fields.

## Embedding Questions

### How do I add a form to my page?

Use the shortcode:
```
[bb-form-builder code="your-form-code"][/bb-form-builder]
```

Replace "your-form-code" with your actual form code.

### Can I embed forms on external websites?

Yes, if you enable "Allow Embed" in the form settings. External sites can use:
- Direct embed URL
- JavaScript embed code
- iframe embedding

### Can I display a form as a popup?

Yes! Set the form's "Display Mode" to "Popup" and configure the trigger:
- Button click
- Time delay
- Scroll percentage
- Exit intent (when user moves to leave)

### Can I override the form style in the shortcode?

Yes, use the style attribute:
```
[bb-form-builder code="your-form-code" style="modern"][/bb-form-builder]
```

Available styles: `default`, `modern`, `minimal`, `bold`, `glass`

## Submission Questions

### Where are form submissions stored?

Submissions are stored in your website's database. You can view them in **BB Form Builder** > **Submissions**.

### Can I export form submissions?

Yes! Go to **Tools** > **Data Synchronize** > **Export** > **Form Submissions** to export submissions to CSV or Excel format.

### Can I download files uploaded through forms?

Yes, uploaded files can be downloaded from the submission detail page. Click on the filename to download.

### How do I prevent duplicate submissions?

In the "Save to Database" action, set a "Unique Field" (like email) to prevent duplicate submissions based on that field.

### Can I receive email notifications for submissions?

Yes, add an "Email Notification" action to your form. Configure recipients, subject, and body content with field placeholders like `[name]`, `[email]`.

## Integration Questions

### What email marketing services are supported?

BB Form Builder integrates with:
- Mailchimp
- GetResponse

More integrations may be added in future updates.

### How do I connect to Mailchimp?

1. Get your API key from Mailchimp Account → Extras → API keys
2. Add the key in **Settings** > **BB Form Builder** > **Integrations**
3. Add a Mailchimp action to your form
4. Select your audience list and map fields

### Can I send data to my own API?

Yes! Use the "API Webhook" action to send form data to any external endpoint. You can configure the HTTP method and customize the JSON payload with field placeholders.

### Do integrations support custom fields?

Currently, integrations support email and name field mapping. Additional custom fields may be available depending on the integration.

## Security Questions

### How does BB Form Builder protect against spam?

BB Form Builder offers:
- Google reCAPTCHA integration
- Math CAPTCHA option
- CSRF protection on all submissions

### Are file uploads secure?

Yes, BB Form Builder includes:
- File type validation
- File extension checking
- MIME type verification
- Malicious content scanning
- Size limit enforcement

### Is submitted data encrypted?

Form data is stored in your database. For sensitive forms, ensure your database is properly secured and consider using HTTPS for all form submissions.

## Technical Questions

### How do I update BB Form Builder?

If your license is already activated:

1. Go to **Admin** > **Plugins** > **Installed plugins**
2. Find BB Form Builder and click the **Update** button
3. Clear cache in **Admin** > **Platform Administration** > **Cache management**

See the [Upgrade Guide](/bb-form-builder/upgrade) for detailed instructions.

### Can I customize the form templates?

Yes, you can modify view files in `platform/plugins/bb-form-builder/resources/views`. Always backup customizations before updating.

### Is BB Form Builder compatible with other Botble plugins?

Yes, BB Form Builder is designed to work seamlessly with other Botble plugins and themes.

### Does BB Form Builder affect site performance?

BB Form Builder is optimized for performance. Forms load asynchronously and assets are only loaded when forms are present on a page.

### Can I translate BB Form Builder?

Yes, BB Form Builder supports full translation. Language files are located in `platform/plugins/bb-form-builder/resources/lang/`.

## Troubleshooting Questions

### My form isn't showing on the page

- Check the shortcode is correct
- Verify the form is set to "Active"
- Clear page and browser cache
- Check for JavaScript errors

### Submissions aren't being recorded

- Ensure "Save to Database" action is added
- Check for form validation errors
- Verify database connection
- Look for errors in server logs

### Email notifications aren't sending

- Check SMTP configuration in Settings > Email
- Verify recipient addresses are correct
- Test email functionality separately
- Check spam folders

For more troubleshooting help, see the [Troubleshooting Guide](/bb-form-builder/troubleshooting).
