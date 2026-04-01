# Working Hours

Automatically set the chat status to offline outside of business hours.

## Setup

1. Go to **Admin → Live Chat → Settings**
2. Set **Online Status** to **Online**
3. Enable **Working Hours**
4. Configure start time, end time, and working days

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| Start Time | When the chat goes online (24h format) | 09:00 |
| End Time | When the chat goes offline | 17:00 |
| Working Days | Which days of the week are active | Mon–Fri |

## How It Works

The status check combines two conditions:

1. **Manual status** — Must be set to "Online" in settings
2. **Working hours** — If enabled, the current server time must be within the configured schedule

Both conditions must be true for the widget to show "Online". If either is false, the widget shows "Offline".

### Timezone

Working hours use the application timezone configured in **Admin → Settings → General**. Make sure this matches your team's timezone.

## Visitor Behavior

The "Online" / "Offline" indicator is purely visual. Visitors can still start conversations and send messages regardless of status. This lets you collect messages outside business hours and respond when you're back.

::: tip
If you want to completely hide the widget outside working hours, you can add custom CSS that targets the offline state.
:::
