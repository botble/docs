# Webhooks

Webhooks allow you to send real-time notifications to external services when events occur in your store.

## Managing Webhooks

Go to `Settings` -> `Ecommerce` -> `Webhooks` in the admin panel.

## Configuring Webhooks

Each event has its own webhook URL field. Enter the endpoint URL that should receive the `POST` request with the JSON
payload, then click `Save`. Leave a field empty to disable that webhook.

## Available Events

- Order placed
- Order updated
- Shipping status updated
- Order completed
- Order cancelled
- Payment status updated
- Abandoned cart

::: warning
Webhooks are sent once and are not retried. Failed requests are only written to the application log, so make sure
your endpoint is reachable and responds quickly.
:::
