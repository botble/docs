<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Storage path.
    |--------------------------------------------------------------------------
    */

    'path' => base_path('resources/docs'),
    'enable_https_support' => env('ENABLE_HTTPS_SUPPORT', false),
    'ga_tracking_id' => env('GA_TRACKING_ID'),
];
