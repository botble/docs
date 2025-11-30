# Form Actions

Form actions define what happens when a form is submitted. You can add multiple actions to each form.

## Email Notification

Send email notifications to administrators or users:

1. Click **Add Action** > **Email Notification**
2. Configure:
   - **To**: Recipient email(s), comma-separated
   - **Subject**: Email subject with placeholders
   - **Body**: Email content with placeholders

### Using Placeholders

Use `[field_name]` to insert field values in your email.

**Example:**
```
New submission from [name] - [email]
```

## Save to Database

Store submissions in the database:

1. Click **Add Action** > **Save to Database**
2. Configure:
   - **Unique Field**: Field to prevent duplicates (optional)

## API Webhook

Send data to external services:

1. Click **Add Action** > **API Webhook**
2. Configure:
   - **Endpoint URL**: The API endpoint
   - **HTTP Method**: POST or GET
   - **Request Body**: JSON with placeholders

**Example Request Body:**
```json
{
  "name": "[name]",
  "email": "[email]",
  "message": "[message]"
}
```

## Mailchimp Integration

Add subscribers to Mailchimp lists:

1. Ensure Mailchimp API key is configured in **Settings** > **Form Builder Pro**
2. Click **Add Action** > **Mailchimp**
3. Configure:
   - **Audience List**: Select your list
   - **Email Field Name**: Field containing email
   - **Name Field Name**: Field containing name (optional)

## GetResponse Integration

Add contacts to GetResponse campaigns:

1. Ensure GetResponse API key is configured in **Settings** > **Form Builder Pro**
2. Click **Add Action** > **GetResponse**
3. Configure:
   - **Campaign**: Select your campaign
   - **Email Field Name**: Field containing email
   - **Name Field Name**: Field containing name (optional)

## Submission Response Settings

Configure what users see after submission:

### On Success

- **Show Message**: Display a success message
- **Redirect To**: Navigate to a URL

### On Failure

- **Show Message**: Display an error message
