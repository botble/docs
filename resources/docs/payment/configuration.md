# Configuration

```php
return [
    'paypal' => [
        'enable' => env('RV_PAYPAL_ENABLE', true),
        'client_id' => env('PAYPAL_CLIENT_ID'),
        'secret' => env('PAYPAL_SECRET'),
        /**
         * SDK configuration
         */
        'settings' => [
            /**
             * Available option 'sandbox' or 'live'
             */
            'mode' => env('PAYPAL_MODE', 'sandbox'),
            /**
             * Specify the max request time in seconds
             */
            'http.ConnectionTimeOut' => 1000,
            /**
             * Whether want to log to a file
             */
            'log.LogEnabled' => env('PAYPAL_LOG', true),
            /**
             * Specify the file that want to write on
             */
            'log.FileName' => storage_path() . '/logs/paypal.log',
            /**
             * Available option 'FINE', 'INFO', 'WARN' or 'ERROR'
             *
             * Logging is most verbose in the 'FINE' level and decreases as you
             * proceed towards ERROR
             */
            'log.LogLevel' => 'FINE',
        ],
    ],

    'stripe' => [
        'enable' => env('RV_STRIPE_ENABLE', true),
        'model' => \App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'currency' => 'USD',

    'cache' => [
        'enable' => env('RV_PAYMENT_ENABLE_CACHE', false), // true or false
        'cache_time' => env('RV_PAYMENT_CACHE_TIME', 10),
        'stored_keys' => storage_path('payment_cache_keys.json'), // Cache config
    ],

    'route' => [
        'prefix' => env('RV_PAYMENT_ROUTE_PREFIX', 'payments'), // Payment URL. Ex: payments => http://laravel.dev/payments
        'middleware' => ['web'],
        'options' => [],
    ],

    // assets libraries, you can remove if it's existed on your project
    'libraries' => [
        'stylesheets' => [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            'vendor/payment/packages/card/card.css',
            'vendor/payment/css/payment.css?v=' . env('RV_PAYMENT_VERSION', time()),
        ],
        'javascript' => [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js', // Uncomment it if your site does not have it
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', // Uncomment it if your site does not have it
            'vendor/payment/packages/card/card.js',
            'https://js.stripe.com/v2/',
            'vendor/payment/js/payment.js?v=' . env('RV_PAYMENT_VERSION', time()),
        ],
    ],
];
```