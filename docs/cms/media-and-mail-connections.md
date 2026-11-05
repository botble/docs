# Media & Mail Connections

Media storage drivers (Amazon S3, Cloudflare R2, ...) and email mailers (SMTP, Mailgun, ...) are **connections**:

- Drivers that need no setup are always available: **Local disk** for media; **Log**, **Array** and **Sendmail** for email.
- Every other driver is an integration. Click **Connect** under **Settings → Media → Storage connections** (or **Settings → Email → Mail connections**), fill in the credentials, optionally click **Test connection**, then **Save & connect**.
- Only connected drivers appear in the **Driver** / **Mailer** select. Switching between them is a single select change; credentials are kept per driver.
- **Disconnect** hides a driver from the select but keeps its credentials, so reconnecting is one click. The active driver cannot be disconnected.

::: tip Upgrading
No migration is needed. After upgrading, the active driver and every driver whose credentials are saved in settings show as connected. Drivers configured only in `.env` show as **Not connected** until you click **Connect** once (the form is pre-filled).
:::

## Switching the media driver

Switching the active media driver does **not** move existing files. Copy them to the new storage first, then switch:

```bash
php artisan cms:media:copy-to-connection r2
```

| Option | Description |
| --- | --- |
| `{to}` | Target driver id (`s3`, `r2`, `do_spaces`, `wasabi`, `bunnycdn`, `backblaze`, `public`) |
| `--from=` | Source driver id (default: the active driver) |
| `--only-missing` | Skip files already on the target; re-run safely after a failure |
| `--chunk=200` | Media records processed per batch |

Originals and generated thumbnails are copied with the same paths; nothing is deleted from the source and the database is not changed.

## Adding a media storage driver from a plugin

Extend `Botble\Media\Drivers\AbstractMediaDriver`:

```php
use Botble\Base\Rules\OnOffRule;
use Botble\Media\Drivers\AbstractMediaDriver;

class ImageKitMediaDriver extends AbstractMediaDriver
{
    public function id(): string
    {
        return 'imagekit'; // stored in the `media_driver` setting
    }

    public function label(): string
    {
        return 'ImageKit';
    }

    public function logo(): ?string
    {
        return 'ti ti-photo'; // Tabler icon or an image URL
    }

    public function fields(): array
    {
        return [
            'media_imagekit_public_key' => $this->textField('Public key'),
            'media_imagekit_private_key' => $this->secretField('Private key'),
            'media_imagekit_endpoint' => $this->textField('URL endpoint', 'https://ik.imagekit.io/your_id'),
        ];
    }

    public function rules(): array
    {
        return [
            'media_imagekit_public_key' => ['required', 'string'],
            'media_imagekit_private_key' => ['required', 'string'],
            'media_imagekit_endpoint' => ['required', 'url'],
        ];
    }

    public function secretKeys(): array
    {
        return ['media_imagekit_private_key']; // never echoed back; blank = keep saved value
    }

    public function credentialKeys(): array
    {
        return ['media_imagekit_public_key', 'media_imagekit_private_key'];
    }

    public function connectionConfig(array $input = []): array
    {
        return [
            'public_key' => $this->settingValue($input, 'media_imagekit_public_key'),
            'private_key' => $this->settingValue($input, 'media_imagekit_private_key'),
            'endpoint' => $this->settingValue($input, 'media_imagekit_endpoint'),
        ];
    }

    public function buildDiskConfig(array $config): ?array
    {
        if (empty($config['public_key']) || empty($config['private_key'])) {
            return null; // incomplete: disk left untouched
        }

        return ['driver' => 'imagekit', 'visibility' => 'public', 'throw' => true, ...$config];
    }
}
```

Register it in your plugin service provider:

```php
use Botble\Media\Facades\RvMedia;

RvMedia::registerDriver(ImageKitMediaDriver::class);

// or, equivalently:
add_filter('core_media_driver_definitions', fn (array $drivers) => [...$drivers, ImageKitMediaDriver::class]);
```

You get the connection modal, validation, **Test connection** (writes, checks and deletes a small file), runtime setup when active, and `RvMedia::connectionDisk('imagekit')` for free. If your filesystem driver is custom, register it with `Storage::extend('imagekit', ...)` as usual.

## Adding a mailer from a plugin

Extend `Botble\Base\Supports\Mail\Mailers\AbstractMailer`:

```php
use Botble\Base\Supports\Mail\Mailers\AbstractMailer;

class BrevoMailer extends AbstractMailer
{
    public function id(): string
    {
        return 'brevo'; // stored in the `email_driver` setting
    }

    public function label(): string
    {
        return 'Brevo';
    }

    public function fields(): array
    {
        return ['email_brevo_key' => $this->secretField('API key')];
    }

    public function rules(): array
    {
        return ['email_brevo_key' => ['required', 'string']];
    }

    public function secretKeys(): array
    {
        return ['email_brevo_key'];
    }

    public function credentialKeys(): array
    {
        return ['email_brevo_key'];
    }

    // config()->set() payload applied when this mailer is active.
    public function runtimeConfig(array $input = []): array
    {
        return [
            'mail.mailers.brevo' => ['transport' => 'brevo'],
            'services.brevo' => ['key' => $this->settingValue($input, 'email_brevo_key')],
        ];
    }

    // Mail::build() config used by "Test connection" (sends a real test email).
    public function testMailerConfig(array $input): ?array
    {
        return ['transport' => 'brevo', ...$this->runtimeConfig($input)['services.brevo']];
    }
}
```

```php
use Botble\Base\Facades\EmailHandler;

EmailHandler::registerMailer(BrevoMailer::class);

// or:
add_filter('core_email_mailer_definitions', fn (array $mailers) => [...$mailers, BrevoMailer::class]);
```

## Hooks

| Hook | Type | Arguments |
| --- | --- | --- |
| `core_media_driver_definitions` | filter | `array $drivers` (instances or class names) |
| `core_email_mailer_definitions` | filter | `array $mailers` |
| `core_media_driver_connected` / `core_media_driver_disconnected` | action | `string $id` |
| `core_email_mailer_connected` / `core_email_mailer_disconnected` | action | `string $id` |
| `core_media_driver_before_apply` / `core_email_mailer_before_apply` | action | `string $id` (runtime setup of the active driver) |

### Legacy hooks (still supported)

Plugins built for the single-driver settings page keep working unchanged:

- `core_media_drivers` / `core_email_mailers` (filter, `[id => label]`): adds a driver that is directly selectable (no connect step).
- `cms_setup_media_disk` / `core_email_setup_mailer` (action, `string $id`): configures that driver at runtime.

Prefer the definitions API for new plugins: it adds the connection modal, test button and secret handling.
