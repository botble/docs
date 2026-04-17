---
title: Permissions & Roles
description: Control admin access to SMS features via role-based permissions.
---

# Permissions & Roles

Control which admins can manage SMS settings, view logs, and handle opt-outs.

## Available permissions

The plugin registers these permission flags in **Admin → Settings → Roles & Permissions → SMS Gateways**:

| Flag | Effect |
|---|---|
| `sms-gateways.index` | Access the SMS Gateways admin section (menu gate) |
| `sms-gateways.logs.view` | View delivery logs |
| `sms-gateways.logs.retry` | Manually retry failed sends |
| `sms-gateways.templates.index` | View SMS templates |
| `sms-gateways.templates.edit` | Edit template bodies |
| `sms-gateways.templates.test-send` | Send a template preview to a phone |
| `sms-gateways.consents.index` | View consent records |
| `sms-gateways.consents.update` | Override opt-in / opt-out status |
| `sms-gateways.drivers.configure` | Enter driver credentials |
| `sms-gateways.country-routes.index` | View country routing rules |
| `sms-gateways.country-routes.create` | Add a new country route |
| `sms-gateways.country-routes.edit` | Edit an existing country route |
| `sms-gateways.country-routes.destroy` | Delete country routes |
| `sms-gateways.webhooks.index` | View outbound webhooks |
| `sms-gateways.webhooks.create` | Add a new webhook |
| `sms-gateways.webhooks.edit` | Edit a webhook |
| `sms-gateways.webhooks.destroy` | Delete a webhook |
| `sms-gateways.settings.edit` | Edit plugin-wide settings (OTP, rate limits, license) |
| `sms-gateways.test-send` | Use the Test SMS tool |

## Assign permissions to a role

1. Go to **Admin → Settings → Roles & Permissions**
2. Click the role (e.g., "Manager", "Support")
3. Check the SMS permission boxes you want to grant
4. Click **Save**


## Common role configurations

### Customer Service Role
Allow support staff to view logs and handle opt-outs:

- ✓ `sms-gateways.index`
- ✓ `sms-gateways.logs.view`
- ✓ `sms-gateways.consents.index`
- ✓ `sms-gateways.consents.update`
- ✗ `sms-gateways.drivers.configure` (prevent credential access)
- ✗ `sms-gateways.settings.edit`

### Marketing Manager Role
Allow marketing to manage templates and see deliverability:

- ✓ `sms-gateways.index`
- ✓ `sms-gateways.logs.view`
- ✓ `sms-gateways.templates.index`
- ✓ `sms-gateways.templates.edit`
- ✓ `sms-gateways.templates.test-send`
- ✗ `sms-gateways.drivers.configure`
- ✗ `sms-gateways.webhooks.index`

### SMS Admin Role
Full access for dedicated SMS administrator:

- ✓ All permissions

## Default role (Super Admin)

The **Super Admin** role has all permissions by default and cannot be restricted.

## Edit permission enforcement

When an admin without `sms-gateways.settings.edit` views **Admin → Settings → SMS Gateways**, they see:

- Credentials are hidden (asterisks)
- All form inputs are read-only
- Save button is hidden
- Message: "You do not have permission to edit SMS settings"

## Menu visibility

If an admin lacks all SMS permissions, the **SMS Gateways** menu item is hidden from the left sidebar.

If they have `sms-gateways.index`, they see:

- **SMS Gateways** menu
  - **Delivery Logs** (if `sms-gateways.logs.view`)
  - **Templates** (if `sms-gateways.templates.index`)
  - **Consents** (if `sms-gateways.consents.index`)
  - **Country Routes** (if `sms-gateways.country-routes.index`)
  - **Webhooks** (if `sms-gateways.webhooks.index`)
  - **Settings** (read-only if not `sms-gateways.settings.edit`)

## Audit logging

All SMS admin actions are logged in **Admin → Activity Logs** (if Activity Logs plugin is installed):

- Who changed which setting
- What changed (from → to)
- When
- IP address

This helps with compliance and troubleshooting.

## Next step

See [GDPR & Data Export](./gdpr.md) for data privacy and customer erasure.
