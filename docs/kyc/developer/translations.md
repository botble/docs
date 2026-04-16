---
title: Translations
description: Localising the KYC Verification plugin into additional languages or overriding existing copy.
---

# Translations

The plugin ships with **42 languages** out of the box: English as the source plus 41 machine-translated locales (Arabic, Bulgarian, Bengali, Czech, Danish, German, Greek, Spanish, Estonian, Finnish, Filipino, French, Hebrew, Hindi, Croatian, Hungarian, Indonesian, Italian, Japanese, Georgian, Korean, Lithuanian, Latvian, Malay, Dutch, Norwegian, Polish, Portuguese, Brazilian Portuguese, Romanian, Russian, Slovak, Slovenian, Serbian, Swedish, Thai, Turkish, Ukrainian, Vietnamese, Chinese Simplified, Chinese Traditional).

## Language file location

```
platform/plugins/kyc/resources/lang/
├── en/
│   ├── kyc.php          # Main UI strings
│   ├── enums.php        # Status and document type labels
│   ├── email.php        # Email subject lines and body snippets
│   └── validation.php   # Form validation messages
├── ar/
├── de/
├── fr/
├── ... (41 locales)
```

Botble picks the locale based on the admin's / customer's selected language.

## Overriding strings

To override a translation without editing the plugin files (which would be lost on upgrade), publish the language files to the application's `lang/vendor/plugins/kyc/` directory:

```bash
php artisan vendor:publish --tag=kyc-lang
```

Then edit `lang/vendor/plugins/kyc/{locale}/kyc.php`. Laravel loads `lang/vendor/` copies **before** the plugin's own files.

## Key groups

### `kyc.php` — main UI

```php
return [
    'title'              => 'Identity Verification',
    'subtitle'           => 'Verify your identity to unlock full access',
    'submit_button'      => 'Submit for review',
    'under_review'       => 'Your submission is under review',
    'approved'           => 'Approved',
    'rejected'           => 'Rejected',
    'locked_title'       => 'Verification locked',
    'locked_message'     => 'You have reached the maximum number of rejections...',
    'export_my_data'     => 'Download my KYC data (GDPR)',
    'gate_required' => [
        'checkout' => 'You must complete identity verification before checking out.',
        'listing'  => 'Please verify your store before publishing products.',
    ],
    // ...
];
```

### `enums.php` — status and document labels

```php
return [
    'kyc_statuses' => [
        'pending'  => 'Pending',
        'approved' => 'Approved',
        'rejected' => 'Rejected',
        'expired'  => 'Expired',
    ],
    'kyc_document_types' => [
        'passport'                  => 'Passport',
        'national_id'               => 'National ID card',
        'driving_license'           => 'Driving licence',
        'business_license'          => 'Business licence',
        'tax_certificate'           => 'Tax certificate',
        'utility_bill'              => 'Utility bill',
        'articles_of_incorporation' => 'Articles of incorporation',
        'bank_statement'            => 'Bank statement',
        'vat_certificate'           => 'VAT certificate',
    ],
];
```

### `email.php` — notification copy

```php
return [
    'received_subject'    => 'New KYC submission from :name',
    'approved_subject'    => 'Your identity has been verified',
    'rejected_subject'    => 'Your KYC submission needs attention',
    'approved_body'       => 'Great news! Your identity verification was approved...',
    'rejected_body'       => 'Unfortunately your recent submission was rejected...',
];
```

## Adding a new language

If none of the 42 shipped locales cover your market:

1. Copy `resources/lang/en/` to `resources/lang/{your_locale}/`.
2. Translate each array key into the target language.
3. Clear config cache: `php artisan config:clear`.

Botble will pick up the new locale automatically as long as it matches the admin-selected locale code.

## Translating emails

Email templates also have editable copy via the admin UI:

1. **Admin → Settings → Email → Templates**
2. Select **KYC Verification** from the product dropdown
3. Edit the three templates per locale: `submission-received`, `submission-approved`, `submission-rejected`

Admin email edits take precedence over the `lang/*/email.php` defaults.

## Testing translation coverage

Run the plugin's feature test suite with different `APP_LOCALE` values to make sure no keys fall through to the English fallback:

```bash
APP_LOCALE=fr php artisan test platform/plugins/kyc/tests/
```

Any missing key will log a warning under the `kyc` channel.

## Next step

- [Architecture](./architecture.md) — plugin internals
- [Troubleshooting](../troubleshooting.md) — translation-related issues
