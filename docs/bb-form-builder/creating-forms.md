# Creating Forms

This guide explains how to create and configure forms using the BB Form Builder plugin.

## Creating a New Form

1. Navigate to **BB Form Builder** > **Forms**
2. Click the **Create** button
3. Enter a form name (internal use only)
4. Optionally enter a custom code (used in shortcodes)
5. Set the form status (Active/Inactive)
6. Use the form builder to add fields
7. Configure form actions
8. Click **Save** to create the form

## Form Settings Overview

- **Name**: Internal identifier for the form
- **Code**: Unique code used in shortcodes (auto-generated if empty)
- **Status**: Controls whether the form is visible and accepts submissions
- **Form Title** / **Form Description**: Optional heading and text shown above the form
- **Submit Button Label**: Custom submit button text (default "Submit")
- **Custom CSS**: CSS applied to this form, including when it is embedded on external websites

## Export / Import

On the form edit page, **Export / Import** lets you download a form as JSON (**Export to JSON**) and create a form from a JSON file on another site (**Import from JSON**).

## Translating a Form

With several languages active, **Translate Form** lets you translate field labels, placeholders, options, HTML content, step titles, popup properties and submission messages per language. The field structure stays the same for all languages.

## Using the Form Builder

### Builder Interface

The form builder consists of three main areas:

1. **Field Types Panel** (Left): Available field types to drag onto the form
2. **Form Canvas** (Center): Your form layout where you arrange fields
3. **Field Settings Panel** (Right): Configuration options for the selected field

### Adding Fields

1. Find the desired field type in the left panel
2. Drag the field onto the form canvas
3. Drop it in the desired position
4. The field settings panel will open automatically

### Configuring Fields

Each field has common settings:

- **Label**: The field label displayed to users
- **Name**: The field identifier (used in placeholders and data)
- **Placeholder**: Hint text shown inside the field
- **Help Text**: Additional instructions below the field
- **Required**: Whether the field must be filled
- **CSS Class**: Custom CSS classes for styling

### Arranging Fields

- **Drag and Drop**: Reorder fields by dragging them
- **Delete**: Click the trash icon to remove a field
- **Duplicate**: Copy existing fields with their settings

## Form Appearance Settings

Configure the visual appearance:

- **Form Size**: Full Size, XXL, XL, Large, Medium, or Small
- **Form Alignment**: Left, Center, or Right
- **Form Style**: Default, Modern, Minimal, Bold, or Glassmorphism
- **Allow Embed**: Enable for external website embedding
