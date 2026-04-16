---
title: Architecture
description: How the KYC Verification plugin is structured internally.
---

# Architecture

A quick tour of how the plugin is put together so you know where to look when debugging or extending.

## Directory layout

```
platform/plugins/kyc/
├── config/
│   ├── email.php          # Email template definitions
│   ├── kyc.php            # Subject registry, storage, retention
│   └── permissions.php    # Admin permission flags
├── database/
│   ├── migrations/        # kyc_submissions, kyc_subject_states, kyc_webhooks
│   └── seeders/           # Demo seeder support
├── resources/
│   ├── lang/en/*.php      # Source translations
│   ├── views/             # Admin + customer-facing blade views
│   └── assets/            # JS / CSS built via vite
├── routes/
│   ├── web.php            # Admin + private file routes
│   └── customer.php       # Customer-facing routes
├── src/
│   ├── Commands/          # kyc:cleanup, kyc:expire, kyc:demo-seed
│   ├── Enums/             # KycStatusEnum, KycDocumentTypeEnum
│   ├── Events/            # KycSubmitted, KycApproved, KycRejected, KycExpired
│   ├── Forms/             # Admin settings form (Botble form-builder)
│   ├── Http/
│   │   ├── Controllers/   # Admin + customer + file + webhook + settings
│   │   ├── Middleware/    # EnsureKycEnabled, KycRequiredMiddleware
│   │   └── Requests/      # Form request validators
│   ├── Jobs/              # Async webhook dispatch
│   ├── Listeners/         # Wire events to notifications + webhooks
│   ├── Models/            # KycSubmission, KycSubjectState, KycWebhook
│   ├── Notifications/     # 3 email notifications
│   ├── PanelSections/     # Admin dashboard section for KYC menu
│   ├── Providers/         # KycServiceProvider, EventServiceProvider
│   ├── Services/          # Core business logic (dispatchers, file store, etc.)
│   ├── Supports/          # SubjectRegistry, KycMacroRegistrar
│   └── Tables/            # DataTable for the admin review queue
├── tests/
│   └── Feature/           # 51 PHPUnit feature tests
└── plugin.json
```

## Core concepts

### Subject registry

The plugin is **scope-agnostic** — instead of hardcoding "customer" and "vendor", it reads a registry from `config/kyc.php → subjects`:

```php
'subjects' => [
    'customer' => [
        'model'                 => \Botble\Ecommerce\Models\Customer::class,
        'guard'                 => 'customer',
        'label'                 => 'Customer',
        'enabled_setting'       => 'kyc_customer_enabled',
        'checkout_gate_setting' => 'kyc_customer_required_for_checkout',
        'required_documents'    => ['passport', 'national_id', 'driving_license'],
        // ...
    ],
    'vendor' => [
        'model'          => \Botble\Marketplace\Models\Store::class,
        'owner_relation' => 'store',  // resolved from auth('customer')
        // ...
    ],
],
```

Each entry becomes a `SubjectDefinition` at runtime. The `SubjectRegistry::authenticatedSubject($key, $request)` helper resolves the current subject instance from the auth context.

**Adding a new scope** is as simple as adding a new key to the config — no code changes. See [Extending KYC](./extending.md).

### Eloquent macros (zero host-plugin edits)

The plugin registers runtime macros on the host models via Botble's `KycMacroRegistrar`:

```php
// In KycServiceProvider::boot()
app(KycMacroRegistrar::class)->applyTo(Customer::class, 'customer');
if (class_exists(Store::class)) {
    app(KycMacroRegistrar::class)->applyTo(Store::class, 'vendor');
}
```

This adds the following methods/relations to `Customer` and `Store` at runtime:

- `kycSubmissions()` — `morphMany` relation
- `kycSubjectState()` — `morphOne` relation
- `hasApprovedKyc(string $scope): bool`
- `kycStatus(string $scope): ?KycStatusEnum`
- `kycStatusBadge(string $scope): HtmlString`

Because they are macros, **neither the Customer nor the Store model files are touched** — you can upgrade `plugins/ecommerce` and `plugins/marketplace` freely.

### Polymorphic data model

`kyc_submissions.verifiable_type` + `verifiable_id` form a polymorphic foreign key, letting a single table hold submissions for any subject type. The `KycSubjectState` table mirrors this polymorphism for lockout state.

See [Data Model](./data-model.md) for the full schema.

### Plugin-owned standalone layout

Customer-facing pages render inside `resources/views/layouts/standalone.blade.php`, which:

- Loads Botble core assets (`Assets::renderHeader(['core'])`)
- Imports the selected form-style CSS preset
- Does NOT depend on any theme views

This means the plugin renders correctly on any Botble theme with zero theme edits.

### Signed URL file serving

Files are stored under `storage/app/private/kyc/{subject_hash}/{token}` with no extension. The `KycFileController` serves them via the `kyc.file.show` route behind:

- Multi-guard auth (admin with `kyc.submissions.file` permission OR subject-owner)
- 60-requests-per-minute throttle
- Signed URL TTL of 15 minutes (configurable)
- Security headers (CSP, nosniff, no-store, no-referrer, X-Frame-Options)

### Event-driven notifications & webhooks

All side effects (emails, webhooks) hang off Laravel events:

- `KycSubmitted` → admin notification + webhook dispatch
- `KycApproved` → subject notification + webhook dispatch
- `KycRejected` → subject notification + webhook dispatch + rejection counter bump
- `KycExpired` → webhook dispatch

See [Events & Hooks](./events.md).

## Next step

- [Data Model](./data-model.md) — table schemas and indexes
- [Routes Reference](./routes.md) — full route list
- [Extending KYC](./extending.md) — add new scopes, document types, channels
