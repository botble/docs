# Installation

## Via Admin Panel

1. Download the `live-chat` plugin zip file
2. Go to **Admin → Plugins**
3. Click **Upload Plugin** and select the zip
4. Click **Activate** on the Live Chat plugin

## Via Command Line

Upload the plugin folder to `platform/plugins/live-chat/`, then run:

```bash
php artisan cms:plugin:activate live-chat
```

## Verify Installation

After activation:
- The floating chat widget appears on your website's frontend
- **Admin → Live Chat** menu appears with Conversations, Webhooks, and Settings sub-items
- Database tables `bb_live_chat_conversations`, `bb_live_chat_messages`, and `bb_live_chat_webhooks` are created

## Seed Sample Data

To populate sample conversations and webhooks for testing:

```bash
php artisan db:seed --class="Botble\LiveChat\Database\Seeders\LiveChatSeeder"
```

## Uninstall

Go to **Admin → Plugins**, find Live Chat, and click **Deactivate** then **Remove**. All data and settings will be deleted.
