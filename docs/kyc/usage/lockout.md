---
title: Lockout & Unlock
description: How auto-lock protects against rejection spam and how admins reset it.
---

# Lockout & Unlock

To stop a customer (or vendor) from flooding the review queue with bad submissions, the plugin counts rejections per subject and **auto-locks** them after a configurable threshold.

## How it works

- Each subject has a matching row in `kyc_subject_states` with a `rejection_count` column.
- When an admin rejects a submission, the counter for that subject is incremented by 1.
- Once the counter reaches `kyc_max_rejections_before_lock` (default **3**), the subject is marked as **locked**.
- A locked subject:
  - Cannot open the submission form — they are redirected to a read-only lockout page.
  - Cannot POST new submissions — the controller blocks them with a 403.
  - Sees a "Your verification is locked. Please contact support." message with your configured support/contact email.

## The lockout page

Locked subjects land on `kyc.submission.locked` which renders a plain explanation plus the `kyc_contact_email` value (or system admin email if unset).

The page is rendered in the same plugin-owned standalone layout as the submission form, so it inherits whatever `kyc_form_style` preset you have set.

## Unlocking a subject

An admin with the `kyc.submissions.unlock` permission can clear the lock from any submission belonging to that subject:

1. Open the [submission detail](./approve-reject.md) for the locked subject.
2. The top-right action area shows an **Unlock** button.
3. Click **Unlock** and confirm.

This:

- Resets `rejection_count` to `0`.
- Clears `locked_at`.
- Leaves previously-rejected submissions and their audit trail intact.
- Dispatches no event and sends no email — unlock is an internal admin action.

The subject can now submit again on their next page load.

::: tip
Unlock is **not** the same as Approve. Unlocking only resets the counter; the subject still has no approved submission and any required gate (checkout, listing) remains enforced until a fresh submission is approved.
:::

## Configure the threshold

Change the threshold in **Admin → KYC Verification → Settings → Max rejections before lock**.

| Value | Behaviour |
|---|---|
| `1` | Lock after the first rejection — very strict, use only when resubmission is expensive |
| `3` | **Default** — allows minor mistakes but caps abuse |
| `10` | Very permissive — useful during a soft launch or training period |

## Reset across all subjects

There is no admin UI for a global reset (by design — lockouts are audit-relevant). If you need to bulk-clear rejection counters during a migration or policy change, run a one-off SQL update:

```sql
UPDATE kyc_subject_states SET rejection_count = 0, locked_at = NULL;
```

Always make a database backup first.

## Next step

- [Permissions](./permissions.md) — assign the unlock permission to specific roles
- [Retention & Expiry](./retention.md) — what happens to rejected submissions after lockout
