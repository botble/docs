# Configuring BB Form Builder

This guide will walk you through the process of configuring the BB Form Builder plugin for your Botble CMS website.

## Accessing Form Builder Settings

1. Log in to your admin panel
2. Navigate to **Settings** > **BB Form Builder**
3. You will see the BB Form Builder configuration page

## Available Settings

### General Settings

- **Allowed File Types**: Define which file extensions are allowed for upload (e.g., `.pdf,.doc,.docx,.xls,.xlsx`)
- **Max File Size (MB)**: Set the maximum file size allowed for uploads (e.g., 10 MB)
- **Success Message Timeout**: Configure how long success messages remain visible after form submission (in seconds). Set to 0 to keep messages on screen indefinitely.

### Appearance Settings

Customize the default look and feel of your forms:

- **Primary Color**: The main color used for buttons, active states, and focus rings (default: `#6366f1`)
- **Primary Hover Color**: The color when hovering over buttons (default: `#4f46e5`)
- **Success Color**: Color for success messages and completed steps (default: `#10b981`)
- **Danger Color**: Color for error messages and validation errors (default: `#ef4444`)
- **Text Color**: Default text color for form content (default: `#1f2937`)
- **Border Color**: Color for input borders and dividers (default: `#e5e7eb`)
- **Background Color**: Form container background color (default: `#ffffff`)
- **Border Radius**: Choose from None, Small (4px), Medium (8px), Large (12px), Extra Large (16px), or Pill
- **Enable Box Shadow**: Toggle subtle shadow effect on form containers
- **Button Border Radius**: Separate border radius setting for buttons

### Integration Settings

Configure API keys for email marketing integrations:

- **Mailchimp API Key**: Your Mailchimp API key for subscriber integration
  - Get your API key from Mailchimp Account → Extras → API keys
- **GetResponse API Key**: Your GetResponse API key for campaign integration
  - Get your API key from GetResponse → Menu → Integrations & API → API

## Form-Level Configuration

Each form has its own configuration options accessible when creating or editing a form.

### Basic Form Settings

- **Form Name**: Internal name for identifying the form (not shown to visitors)
- **Code**: Unique identifier used in shortcodes (auto-generated if left blank)
- **Status**: Active or Inactive - controls whether the form accepts submissions

### Form Builder Tab

Configure the visual form builder:

- **Form Size**: Choose from Full Size (100%), XXL (1400px), XL (1200px), Large (992px), Medium (768px), or Small (576px)
- **Form Alignment**: Left, Center, or Right alignment
- **Form Style**: Default, Modern, Minimal, Bold, or Glassmorphism
- **Allow Embed**: Enable/disable embedding on external websites

### Multi-Step Wizard Settings

For multi-step forms:

- **Wizard Layout**: Horizontal (steps on top) or Vertical (steps on left side)
- **Add Step**: Add additional steps to create a wizard form

### Popup Display Settings

Configure popup behavior:

- **Display Mode**: Inline (embedded in page) or Popup (modal window)
- **Popup Trigger**: Button Click, Time Delay, Scroll Percentage, or Exit Intent
- **Button Text**: Text displayed on the trigger button (for Button Click trigger)
- **Delay (seconds)**: Time before popup appears (for Time Delay trigger)
- **Scroll Percentage**: Page scroll percentage to trigger popup (for Scroll trigger)
- **Popup Title**: Optional title at the top of the popup
- **Popup Size**: Small (400px), Medium (600px), Large (800px), or Extra Large (1000px)
- **Close when clicking outside**: Enable/disable closing popup by clicking overlay
- **Show close button**: Show/hide the close button

### CAPTCHA Settings

- **Enable reCAPTCHA**: Use Google reCAPTCHA for spam protection
- **Enable Math CAPTCHA**: Use simple math questions for spam protection

### Submission Settings

Configure what happens after form submission:

**On Success:**
- **Action**: Show Message or Redirect To URL
- **Content**: Success message text or redirect URL

**On Failure:**
- **Action**: Show Message
- **Content**: Error message text

### Form Actions

Configure actions that execute when form is submitted:

#### Email Notification
- **To**: Recipient email addresses (comma-separated)
- **Subject**: Email subject line (supports field placeholders like `[field_name]`)
- **Body**: Email body content (supports field placeholders)

#### Save to Database
- **Unique Field**: Optional field name to prevent duplicate submissions

#### API Webhook
- **Endpoint URL**: External API endpoint to receive form data
- **HTTP Method**: POST or GET
- **Request Body**: JSON template with field placeholders

#### Mailchimp Integration
- **Audience List**: Select Mailchimp list to add subscribers
- **Email Field Name**: Form field containing email address
- **Name Field Name**: Optional field containing subscriber name

#### GetResponse Integration
- **Campaign**: Select GetResponse campaign
- **Email Field Name**: Form field containing email address
- **Name Field Name**: Optional field containing subscriber name

## Permissions

BB Form Builder includes permissions that can be assigned to user roles:

### Form Permissions
- **bb-form-builder.forms.index**: View form list
- **bb-form-builder.forms.create**: Create new forms
- **bb-form-builder.forms.edit**: Edit existing forms
- **bb-form-builder.forms.destroy**: Delete forms

### Submission Permissions
- **bb-form-builder.submissions.index**: View form submissions
- **bb-form-builder.submissions.destroy**: Delete submissions
- **bb-form-builder.submissions.export**: Export submissions

### Report Permissions
- **bb-form-builder.reports.index**: Access to reports dashboard

### Settings Permissions
- **bb-form-builder.settings**: Access to plugin settings

To manage permissions:

1. Go to **Admin** > **Users** > **Roles**
2. Edit a role
3. Find the "BB Form Builder" section in permissions
4. Check/uncheck permissions based on role requirements
5. Save changes

## Applying Configuration Changes

### Saving Settings

1. After making changes, click the **"Save settings"** button
2. Changes are applied immediately

### Testing Configuration

1. Create a test form
2. Test file uploads with different file types
3. Verify form styling matches your preferences
4. Test email notifications
5. Check integration connections (Mailchimp, GetResponse)

## Troubleshooting Configuration Issues

### Common Issues and Solutions

**File uploads not working:**
- Verify allowed file types are configured correctly
- Check max file size setting
- Ensure upload directory has write permissions
- Check PHP `upload_max_filesize` and `post_max_size` settings

**Email notifications not sending:**
- Verify SMTP settings in **Settings** > **Email**
- Check recipient email addresses
- Test email functionality
- Check spam folders

**Integration not connecting:**
- Verify API keys are correct
- Check API key permissions
- Test API connection using integration tools
- Check for network/firewall issues

**Styling not applying:**
- Clear browser cache
- Clear application cache
- Check for CSS conflicts with theme
- Verify settings are saved

If you continue to encounter configuration issues, please refer to the Troubleshooting section or contact our support team with specific error details and system information.
