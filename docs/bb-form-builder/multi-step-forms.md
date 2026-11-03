# Multi-Step Forms

Create wizard-style forms with multiple steps to improve user experience for longer forms.

## Creating a Wizard Form

1. In the form builder, click **Add Step** button
2. Each step appears as a separate tab
3. Drag fields into the appropriate step
4. Configure step titles and descriptions

## Wizard Settings

- **Wizard Layout**:
  - Horizontal: Steps displayed at the top
  - Vertical: Steps displayed on the left side
- **Step Titles**: Name each step clearly
- **Step Validation**: Each step validates before proceeding
- **Hide step numbers and names**: Hide the step progress bar (numbers and step titles). Steps still work; only the indicator is hidden

## Step Conditions

Show a step only when a condition is met. Otherwise the step is skipped.

1. Open a step (not the first one) and click **Add condition**
2. In **Show this step if**, pick a checkbox, radio or select field from a previous step
3. Choose the condition: **Is checked / selected**, **Is not checked / not selected**, **Equals value** or **Does not equal value**
4. For the equals conditions, pick the value from the field's options (or type it)

The first step cannot have a condition.

## Saved Progress

Visitors' answers (and, for a wizard, the current step) are kept in the browser while they fill the form. When they come back, the form shows "Your previous progress has been restored." with a **Start Fresh** button to clear it.

## Navigation

Users can navigate using:

- **Next/Previous** buttons
- Step indicators (if enabled)
- Progress bar showing completion

## Best Practices for Multi-Step Forms

1. **Group related fields together** - Keep logical groupings in the same step
2. **Keep each step focused and short** - Avoid overwhelming users with too many fields
3. **Use clear step titles** - Help users understand what each step is about
4. **Show progress indicators** - Let users know how far they've progressed
5. **Allow backward navigation** - Users should be able to go back and edit previous steps
