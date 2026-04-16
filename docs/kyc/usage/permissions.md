---
title: Permissions
description: Delegated admin permissions exposed by the KYC Verification plugin.
---

# Permissions

The plugin ships a granular permission set so you can delegate review work to junior moderators while keeping approval, unverify, and settings edits for senior admins.

All flags are registered under the `KYC Verification` permission group in **Admin → Settings → Roles & Permissions**.

## Permission matrix

| Flag | Parent | Grants |
|---|---|---|
| `kyc.index` | `core.cms` | Access to the KYC Verification menu section |
| `kyc.submissions.view` | `kyc.index` | Open the review queue and submission detail page |
| `kyc.submissions.approve` | `kyc.index` | Click the **Approve** button on a submission |
| `kyc.submissions.reject` | `kyc.index` | Click the **Reject** button and supply a reason |
| `kyc.submissions.unverify` | `kyc.index` | Revoke approval on an already-approved submission (destructive) |
| `kyc.submissions.unlock` | `kyc.index` | Reset the rejection counter for a locked subject |
| `kyc.settings.edit` | `kyc.index` | Edit the **KYC Verification** settings page and license |
| `kyc.webhooks.index` | `kyc.index` | View the webhooks management page |
| `kyc.webhooks.create` | `kyc.webhooks.index` | Create new webhook endpoints |
| `kyc.webhooks.edit` | `kyc.webhooks.index` | Edit and test existing webhook endpoints |
| `kyc.webhooks.destroy` | `kyc.webhooks.index` | Delete webhook endpoints |

## Suggested role presets

### Junior KYC moderator
Sees and reads submissions, but cannot take any destructive action.

- `kyc.index`
- `kyc.submissions.view`

### KYC reviewer
Day-to-day reviewer. Can approve / reject but cannot revoke prior approvals or change settings.

- `kyc.index`
- `kyc.submissions.view`
- `kyc.submissions.approve`
- `kyc.submissions.reject`
- `kyc.submissions.unlock`

### Compliance lead
Senior admin with the ability to revoke and manage webhooks.

- All of the above, plus:
- `kyc.submissions.unverify`
- `kyc.webhooks.index`, `kyc.webhooks.edit`, `kyc.webhooks.create`, `kyc.webhooks.destroy`

### KYC super-admin
Full control including plugin settings and license management.

- All of the above, plus:
- `kyc.settings.edit`

## Creating a custom role

1. Go to **Admin → Settings → Roles & Permissions → Add new**.
2. Name the role, e.g. `KYC Reviewer`.
3. In the permission tree, expand **KYC Verification** and tick the flags from the preset you want.
4. Save.
5. Assign the role to users from **Admin → Users**.

## Permission checks in code

If you are extending the plugin and need to guard a custom page or action, use the same pattern the plugin itself uses:

```php
Route::get('my-custom-report', [MyReportController::class, 'index'])
    ->permission('kyc.submissions.view')
    ->name('my.custom.report');
```

Or inside Blade:

```blade
@if (Auth::user()->hasPermission('kyc.submissions.unverify'))
    <button>Revoke</button>
@endif
```

## Next step

- [Email Notifications](./notifications.md) — who gets notified of what
