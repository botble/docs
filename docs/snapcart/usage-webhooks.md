# Webhooks

Webhooks allow you to send real-time notifications to external services when events occur in your store.

## Managing Webhooks

Go to `Settings` -> `Webhooks` in the admin panel.

## Creating a Webhook

1. Click `Create`
2. Fill in the details:

- **Name**: A descriptive name for the webhook
- **URL**: The endpoint URL that will receive the webhook payload
- **Events**: Select which events trigger the webhook (e.g., order created, payment completed)
- **Secret**: A secret key to verify webhook authenticity

3. Click `Save`

## Available Events

- Order created
- Order completed
- Order cancelled
- Payment completed
- Customer registered

::: warning
Ensure your webhook endpoint responds with a `200` status code within 30 seconds to avoid retries.
:::
