# Extending the Plugin

The SMS Gateway plugin for Botble CMS allows you to extend its functionality by adding custom SMS drivers. This guide explains how to create a custom SMS driver by extending the plugin with your own implementation, including setting up a configuration form.

## Overview

To extend the SMS Gateway plugin, you'll need to:

1. **Create a New Driver Class**: Extend the `AbstractDriver` class to define your custom SMS provider.
2. **Implement Required Methods**: Implement the abstract methods and provide additional configuration and functionality.
3. **Create a Configuration Form**: Define a form for configuring the SMS provider settings.
4. **Register Your Custom Driver**: Integrate your custom driver with the SMS Gateway plugin.

## Creating a Custom SMS Driver

### Step 1: Define Your Driver Class

Create a new PHP class that extends the `AbstractDriver` class. This class will implement the specific functionality for your SMS provider.

```php
<?php

namespace FriendsOfBotble\Sms\Drivers;

use Botble\Base\Forms\FormAbstract;
use FriendsOfBotble\Sms\DataTransferObjects\SmsResponse;
use FriendsOfBotble\Sms\Facades\Sms as SmsFacade;
use FriendsOfBotble\Sms\Forms\NexmoGatewayForm;
use Vonage\Client;
use Vonage\Client\Credentials\Basic;
use Vonage\SMS\Message\SMS;

class Nexmo extends AbstractDriver
{
    protected Client $client;

    public function __construct()
    {
        $key = SmsFacade::getSetting('key', 'nexmo');
        $secret = SmsFacade::getSetting('secret', 'nexmo');

        if (empty($key) || empty($secret)) {
            return;
        }

        $this->client = new Client(new Basic($key, $secret));
    }

    protected function performSend(string $to, string $message): SmsResponse
    {
        $response = $this->client->sms()->send(
            new SMS($to, $this->getFrom(), $message)
        );

        $message = $response->current();

        return new SmsResponse(
            success: $message->getStatus() === 0,
            messageId: $message->getMessageId(),
            response: $response->getAllMessagesRaw(),
        );
    }

    public function getLogo(): string
    {
        return asset('vendor/core/plugins/sms/images/nexmo.png');
    }

    public function getInstructions(): string
    {
        return view('plugins/sms::instructions.nexmo');
    }

    public function getSettingForm(): FormAbstract
    {
        return NexmoGatewayForm::create();
    }
}
```

### Step 2: Implement Required Methods

- **`performSend(string $to, string $message): SmsResponse`**: Implement the logic for sending an SMS message. This method should interact with the SMS provider’s API and return an `SmsResponse` object.
- **`getLogo(): string`**: Provide the URL to the logo image of your SMS provider. This image will be used in the plugin’s UI.
- **`getInstructions(): string`**: Return a view or string with instructions for configuring the SMS provider.
- **`getSettingForm(): FormAbstract`**: Return a form for configuring the SMS provider settings.

### Step 3: Create a Configuration Form

Define a form for configuring the settings of your SMS provider. This form will be used in the admin panel to set up the provider.

#### Example: Nexmo Gateway Form

```php
<?php

namespace FriendsOfBotble\Sms\Forms;

use Botble\Base\Facades\Html;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\TextField;

class NexmoGatewayForm extends SmsGatewayForm
{
    protected array $sensitiveFields = [
        'key',
        'secret',
    ];

    public function setup(): void
    {
        parent::setup();

        $this
            ->add(
                'key',
                TextField::class,
                TextFieldOption::make()
                    ->label(trans('plugins/sms::nexmo.key'))
                    ->required()
            )
            ->add(
                'secret',
                TextField::class,
                TextFieldOption::make()
                    ->label(trans('plugins/sms::nexmo.secret'))
                    ->required()
            )
            ->add(
                'from',
                TextField::class,
                TextFieldOption::make()
                    ->label(trans('plugins/sms::nexmo.from'))
                    ->helperText(trans('plugins/sms::nexmo.from_help', [
                        'link' => Html::link(
                            'https://developer.vonage.com/en/messaging/sms/guides/custom-sender-id?source=messaging',
                            trans('plugins/sms::nexmo.here'),
                            ['target' => '_blank']
                        ),
                    ]))
                    ->required()
            );
    }
}
```

- **`$sensitiveFields`**: Define sensitive fields that should be protected or masked.
- **`setup()`**: Configure the form fields, including labels, helper text, and validation requirements.

### Step 4: Register Your Custom Driver

To integrate your custom driver with the SMS Gateway plugin, register it in your plugin's service provider.

```php
// In your plugin’s service provider
public function boot()
{
    Sms::extend('nexmo', Nexmo::class);
}
```

## Example Usage

Once your custom driver is registered, you can use it as follows:

```php
// Sending an SMS message
Sms::driver('nexmo')->send('+11234567890', 'Your OTP code is: 123456');
```

## Troubleshooting

- **Check Logs**: Review the SMS logs to ensure messages are sent correctly and diagnose any issues.
- **Verify Configuration**: Ensure that your API credentials and settings are correctly configured in the admin panel.
- **Consult Documentation**: Refer to the documentation of your SMS provider for details on API usage and error codes.
