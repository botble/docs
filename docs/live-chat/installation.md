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

## Update

Update from **Admin → Plugins** when a new version is available, or upload the new zip over the existing plugin. Then publish the new assets and clear the cache:

```bash
php artisan cms:publish:assets
php artisan optimize:clear
```

If your site runs a queue worker (`QUEUE_CONNECTION` is not `sync`), restart it so it loads the new plugin code:

```bash
php artisan queue:restart
```

A queue worker is a long-running process and keeps the code it started with. Without a restart, queued jobs that need the updated code can fail until the worker is restarted. `queue:restart` lets each worker finish its current job and exit; your process manager (Supervisor, systemd, etc.) then starts it again with the new code.

## Uninstall

Go to **Admin → Plugins**, find Live Chat, and click **Deactivate** then **Remove**. All data and settings will be deleted.
