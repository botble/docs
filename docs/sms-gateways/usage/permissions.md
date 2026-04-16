---
title: Permissions & Roles
description: Control admin access to SMS features via role-based permissions.
---

# Permissions & Roles

Control which admins can manage SMS settings, view logs, and handle opt-outs.

## Available permissions

The plugin registers these permissions in **Admin → Settings → Roles & Permissions → SMS Gateways**:

| Permission | Effect |
|---|---|
| `sms.logs.view` | View delivery logs and retry failed SMS |
| `sms.logs.delete` | Delete log entries |
| `sms.templates.manage` | Create, edit, delete SMS templates |
| `sms.consents.manage` | View opt-out audit, manually opt-in/out |
| `sms.consents.export` | Export consent records for compliance |
| `sms.settings.edit` | Configure drivers, credentials, OTP defaults, webhook endpoints |
| `sms.webhooks.manage` | Add/edit/delete outbound webhooks |
| `sms.license.edit` | Activate/deactivate license |

## Assign permissions to a role

1. Go to **Admin → Settings → Roles & Permissions**
2. Click the role (e.g., "Manager", "Support")
3. Check the SMS permission boxes you want to grant
4. Click **Save**

![Permission assignment](./images/sms-permissions-form.png)

## Common role configurations

### Customer Service Role
Allow support staff to view logs and handle opt-outs:

- ✓ `sms.logs.view`
- ✓ `sms.consents.manage`
- ✗ `sms.settings.edit` (prevent credential access)
- ✗ `sms.license.edit` (prevent license changes)

### Marketing Manager Role
Allow marketing to manage templates and see deliverability:

- ✓ `sms.logs.view`
- ✓ `sms.templates.manage`
- ✓ `sms.consents.export`
- ✗ `sms.settings.edit`
- ✗ `sms.webhooks.manage`

### SMS Admin Role
Full access for dedicated SMS administrator:

- ✓ All permissions

## Default role (Super Admin)

The **Super Admin** role has all permissions by default and cannot be restricted.

## Edit permission enforcement

When an admin without `sms.settings.edit` views **Admin → Settings → SMS Gateways**, they see:

- Credentials are hidden (asterisks)
- All form inputs are read-only
- Save button is hidden
- Message: "You do not have permission to edit SMS settings"

## Menu visibility

If an admin lacks all SMS permissions, the **SMS Gateways** menu item is hidden from the left sidebar.

If they have any SMS permission (e.g., `sms.logs.view`), they see:

- **SMS Gateways** menu
  - **Delivery Logs** (if `sms.logs.view`)
  - **Templates** (if `sms.templates.manage`)
  - **Consents** (if `sms.consents.manage`)
  - **Webhooks** (if `sms.webhooks.manage`)
  - **Settings** (read-only if not `sms.settings.edit`)

## Audit logging

All SMS admin actions are logged in **Admin → Activity Logs** (if Activity Logs plugin is installed):

- Who changed which setting
- What changed (from → to)
- When
- IP address

This helps with compliance and troubleshooting.

## Next step

See [GDPR & Data Export](./gdpr.md) for data privacy and customer erasure.
