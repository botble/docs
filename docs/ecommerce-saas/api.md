---
title: Control-plane API
description: REST API operators use to script store creation, plans, domains, apps and themes from outside the console.
---

# Control-plane API

Everything the operator console can do to a store, the API can do too — create it, read
its usage, move its plan, attach a domain, toggle its apps. Pair it with
[webhooks](./webhooks.md) so an integration also hears about changes it did not make
itself.

- **Base URL:** `https://<central-domain>/api/platform/v1`
- **API version:** `2026-09-02`, sent as `X-Tenancy-Api-Version` on every response and
  as `api_version` inside every webhook payload.

## Overview

**Central-domain only.** The API sits behind the same `CentralDomainsOnly` guard as the
console. A request to a store's own subdomain or custom domain 404s — there is no
per-store copy of this API.

**Operator-scoped.** A key is a platform credential, not a store credential: every key
can see and change *every* store. This is not a tenant-facing API, and it is **not**
gated by the `api_access` plan feature in `config/general.php` — that flag is reserved
for a future storefront-facing API and has no effect on `/api/platform/v1`.

**Not the storefront API.** Botble's own `vendor/botble/api` (products, carts,
customers) is a separate, tenant-scoped surface with its own middleware stack. This API
never runs inside Laravel's `api` middleware group, because that group carries Botble's
shared-key middleware.

**Versioning.** `X-Tenancy-Api-Version` is bumped only for a breaking change to a
response or payload shape. Additive fields are not a bump — decode leniently.

## Enabling the API

The API is **enabled by default** — `TENANCY_API_ENABLED` defaults to `true`, so a
fresh install answers `/api/platform/v1` as soon as a key exists. There is no opt-in
step; the variable exists to switch the API **off**:

```env
TENANCY_API_ENABLED=false
```

While it is off, **every** request (any verb, `OPTIONS` included, known path or not)
answers `503 api_disabled` before any key is looked at, so a disabled API cannot be used
as an oracle for which keys are valid:

```json
{"error":{"code":"api_disabled","message":"The control-plane API is disabled on this platform."}}
```

Keys stay manageable in the console while the API is off, so you can prepare an
integration before switching it on.

## Authentication

Issue a key in the console: **Operator console → API keys → New key**. Pick scopes and
(recommended) an expiry date.

![Issue-API-key form with name, scopes and expiry fields](./images/operator-api-key-create.png)

::: warning
The plaintext key is shown **once**, on the page that creates it. It is stored only as a
sha256 hash — a lost key cannot be recovered, only revoked and reissued.
:::

Send it as a bearer token (preferred) or in `X-API-Key`:

```bash
curl -s https://platform.example.com/api/platform/v1/me \
  -H 'Authorization: Bearer tnk_xxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

curl -s https://platform.example.com/api/platform/v1/me \
  -H 'X-API-Key: tnk_xxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

### Scopes

| Scope | Grants |
| --- | --- |
| `read` | `GET` / `HEAD` / `OPTIONS` on every endpoint |
| `write` | every other verb — create, edit, suspend, cancel, **delete** |

Scope is derived from the HTTP method, never declared per route, so a mutating endpoint
added later cannot become reachable with a read-only key by omission.

::: warning
A `write` key can delete stores and their databases. Treat it as a root credential:
issue `read`-only keys unless writes are genuinely needed, always set an expiry, and
revoke immediately on suspicion. Deletion is irreversible.
:::

Revocation and expiry take effect on the next request. Every write a key makes is
attributed to it in the store's audit log (`actor.type = "api_key"`).

### Rate limiting

Two buckets, both per minute:

| Bucket | Key | Env | Default |
| --- | --- | --- | --- |
| Per credential | sha256 of the presented token | `TENANCY_API_RATE_LIMIT` | `120` |
| Per client IP | the caller's IP, across every token it presents | `TENANCY_API_RATE_LIMIT_PER_IP` | `600` |

The per-IP ceiling stops one host opening a fresh per-token bucket for every guessed
key; set it to `0` to disable it. Keep it well above the per-key limit so several
legitimate keys behind one NAT are not throttled together.

Throttling runs **before** the key lookup, so an invalid or revoked key burns the
caller's budget rather than the database. A `429` carries `Retry-After` and the
`X-RateLimit-*` headers.

## Errors

Every failure — including the throttler's `429` and a `404` for an unknown path — uses
one envelope:

```json
{"error":{"code":"subdomain_taken","message":"That address is already in use."}}
```

A `422` adds field messages:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "The subdomain field is required.",
    "errors": {"subdomain": ["The subdomain field is required."]}
  }
}
```

`code` is the stable contract; `message` is localised and may change. Branch on the
code.

A known path with the wrong verb answers `405 method_not_allowed` with an `Allow`
header listing the verbs it accepts. `OPTIONS` is not special-cased — it goes through
the same host check, kill switch and authentication as every other request.

| Code | Status | Meaning |
| --- | --- | --- |
| `api_disabled` | 503 | `TENANCY_API_ENABLED=false` |
| `unauthenticated` | 401 | No bearer token and no `X-API-Key` header |
| `invalid_key` | 401 | Token does not match any key |
| `key_revoked` | 401 | The key was revoked in the console |
| `key_expired` | 401 | The key is past `expires_at` |
| `insufficient_scope` | 403 | The key lacks `read` / `write` for this method |
| `forbidden` | 403 | The action is not permitted |
| `not_found` | 404 | Unknown path, or the store / domain / endpoint does not exist |
| `method_not_allowed` | 405 | The path exists but not for this verb; see the `Allow` header |
| `rate_limited` | 429 | Either bucket is empty; honour `Retry-After` |
| `validation_failed` | 422 | Request body or query failed validation |
| `plan_too_small` | 422 | The target plan's limits are below the store's current usage |
| `http_error` | *(varies)* | Any other HTTP exception the platform raised; the status is the exception's own |
| `server_error` | 500 | Unexpected failure; the message is generic unless `APP_DEBUG` |

### Conflicts (409)

A `409` means the request was well formed but refused by the platform's own rules —
the same refusal the console shows an operator.

| Code | Raised when |
| --- | --- |
| `subdomain_reserved` | The requested subdomain is on the reserved list |
| `subdomain_taken` | The subdomain (or its fallback host) is already in use |
| `not_provisioned` | The store is still `pending` / `provisioning`, so it cannot be suspended, resumed or given a plan |
| `no_subscription` | The store has no subscription row for this action |
| `no_tenant` | The subscription's store no longer exists |
| `plan_unavailable` | The plan behind the action was retired or deleted before it could be applied |
| `confirm_mismatch` | `confirm` on `DELETE /stores/{id}` did not equal the store id |
| `still_provisioning` | Deletion refused while provisioning is still running |
| `plan_upgrade_required` | The plan does not allow custom domains |
| `limit_reached` | The plan's custom-domain limit is already used up |
| `already_taken` | That hostname is registered to another store |
| `verify_first` | A domain must be DNS-verified before it can be primary |
| `not_removable` | The fallback (platform) domain cannot be removed |
| `not_entitled` | The plan does not include that app |
| `requirement_not_entitled` | An app the target app depends on is not in the plan |
| `still_required` | Another enabled app depends on the one being disabled |
| `theme_not_entitled` | The plan does not include that theme |
| `theme_requirement_not_entitled` | A plugin the theme requires is not in the plan |
| `theme_unavailable` | The theme is not installed, published, or its assets are missing |
| `stripe_managed` | The subscription is driven by Stripe; change it in Stripe |
| `illegal_transition` | The action is not legal from the subscription's current status |
| `same_plan` | The store is already on that plan |
| `no_plan` | The subscription has no plan to act on |
| `store_unavailable` | The store has no database yet (apps cannot be read or changed, the theme cannot be switched) |
| `usage_unavailable` | `?refresh=1` could not collect live usage |
| `delivery_not_retryable` | The delivery is not in a state a manual retry may force |

Three more `409` codes exist for the bank-transfer flow and today are raised only by the
console (no v1 endpoint reaches them), but they share the envelope and are reserved:
`offline_disabled`, `order_already_open`, `order_not_pending`.

## Pagination

List endpoints accept `per_page` (default `30`, max `100`) and `page`, and answer with a
`meta` block:

```json
{
  "data": [ ],
  "meta": {"page": 1, "per_page": 30, "total": 412, "last_page": 14}
}
```

There is no `links.next` / `links.prev`; walk pages until `page === last_page`.
Non-paginated collections (`/plans`, `/stores/{id}/domains`, `/stores/{id}/apps`) return
the whole set, with `meta` carrying resource-specific context instead of page counters.

## Endpoints

All examples assume:

```bash
export API=https://platform.example.com/api/platform/v1
export KEY='tnk_xxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
alias capi='curl -s -H "Authorization: Bearer $KEY" -H "Accept: application/json"'
```

### Platform

**`GET /platform`** · scope `read` — the constants a client needs before anything else.

```bash
capi $API/platform
```

```json
{
  "data": {
    "api_version": "2026-09-02",
    "grace_days": 14,
    "retention_days": 30,
    "central_domain": "platform.example.com",
    "features": {"custom_domain": {"label": "Custom domain", "description": "Connect your own domain",
                                   "default": false, "column": "allows_custom_domain"}},
    "webhook_events": ["store.created", "store.ready", "..."]
  }
}
```

**`GET /me`** · scope `read` — the calling key, to confirm which credential and scopes
are in use.

```json
{
  "data": {
    "id": 3, "name": "Billing sync", "key_prefix": "tnk_a1b2c3d4",
    "scopes": ["read", "write"], "is_usable": true,
    "created_by_name": "Ada", "last_used_at": "2026-09-02T10:15:00+00:00",
    "expires_at": "2027-01-01T00:00:00+00:00", "revoked_at": null,
    "created_at": "2026-08-01T09:00:00+00:00"
  }
}
```

### Plans

| Method + path | Scope | Notes |
| --- | --- | --- |
| `GET /plans` | `read` | `?include_inactive=1` to include retired plans a store may still be grandfathered on |
| `GET /plans/{slug}` | `read` | |

```bash
capi $API/plans
```

```json
{
  "data": [{
    "id": 2, "slug": "pro", "name": "Pro", "description": "For growing shops",
    "price_cents": 4900, "currency": "USD", "interval": "month", "trial_days": 14,
    "limits": {"products": 5000, "orders": 0, "storage_mb": 20480, "staff_users": 10},
    "features": {"custom_domain": true},
    "allows_custom_domain": true, "is_active": true, "sort_order": 2
  }]
}
```

A limit of `0` means unlimited. `stripe_price_id` is never exposed.

### Stores

**`GET /stores`** · scope `read` — `?status=`, `?q=` (name / subdomain / owner email),
`?include=usage`, `?per_page=`.

```bash
capi "$API/stores?status=ready&per_page=2&include=usage"
```

```json
{
  "data": [{
    "id": "acme", "name": "Acme Supply", "status": "ready",
    "access_state": "serving", "theme": "amerce", "preset": "fashion",
    "owner_email": "owner@acme.test", "root_url": "https://acme.example.com",
    "provisioned_at": "2026-07-04T12:00:03+00:00",
    "created_at": "2026-07-04T12:00:00+00:00",
    "updated_at": "2026-09-01T08:12:44+00:00",
    "billing_provider": "local",
    "usage": {"period": "2026-09", "products": 128, "orders": 41,
              "storage_bytes": 730920141, "staff_users": 3,
              "collected_at": "2026-09-02T03:00:00+00:00"}
  }],
  "meta": {"page": 1, "per_page": 2, "total": 37, "last_page": 19}
}
```

`access_state` answers "what does a visitor get right now?" and mirrors the storefront
gate exactly: `serving`, `preparing` (still provisioning), `suspended` (billing), or
`unavailable`. `billing_provider` is `stripe`, `local` (operator/offline-managed) or
`none`.

**`POST /stores`** · scope `write` → `202 Accepted`. The row exists; provisioning is
queued and the store reaches `ready` (and fires `store.ready`) once a worker has built
its database.

```bash
capi -X POST $API/stores -H 'Content-Type: application/json' -d '{
  "subdomain": "acme",
  "name": "Acme Supply",
  "owner_email": "owner@acme.test",
  "password": "correct horse battery staple",
  "theme": "amerce",
  "preset": "fashion",
  "plan": "pro",
  "trial_days": 14
}'
```

| Field | Rule |
| --- | --- |
| `subdomain` | required, `^[a-z0-9][a-z0-9-]*$`, ≤63 chars, not reserved, not taken |
| `name` | required, ≤120 |
| `owner_email` | required, email, ≤190 |
| `password` | required, ≥8 — the store admin's password |
| `theme` | optional; the catalog default when omitted, otherwise must be installed |
| `preset` | optional; must be a preset of that theme |
| `plan` | optional plan slug (active plans only); omit for an unbilled store |
| `trial_days` | optional, `0..365` |

```json
{
  "data": {"id": "acme", "status": "pending", "access_state": "preparing"},
  "links": {"self": "https://platform.example.com/api/platform/v1/stores/acme"}
}
```

**`GET /stores/{id}`** · scope `read` — the store plus its cached `usage` block and its
`subscription` (or `null`).

**`PATCH /stores/{id}`** · scope `write` — partial update of `name`, `owner_email`,
`theme`.

```bash
capi -X PATCH $API/stores/acme -H 'Content-Type: application/json' \
  -d '{"name": "Acme Supply Co", "theme": "shopwise"}'
```

The theme switch runs **before** `name` / `owner_email` are persisted: it is the only
part that can refuse, and it refuses before writing anything, so a `409`
(`theme_unavailable`, `theme_not_entitled`, …) leaves the store completely unchanged
rather than half-edited. A successful call emits `store.theme_changed` and
`store.updated`.

**`DELETE /stores/{id}`** · scope `write` → `204`. Irreversible: the store's database
and storage are dropped. `confirm` must be a **string** equal to the store id.

```bash
capi -X DELETE $API/stores/acme -H 'Content-Type: application/json' -d '{"confirm": "acme"}'
```

`422 validation_failed` when `confirm` is missing or not a string (a number, an array);
`409 confirm_mismatch` when the string does not match; `409 still_provisioning` while
provisioning is in flight.

**`POST /stores/{id}/suspend`** · **`/resume`** · **`/cancel`** — scope `write`.

Suspend takes the storefront offline immediately. Suspend and resume both require a
provisioned store: `409 not_provisioned` while it is still `pending` / `provisioning`
(a store that fails provisioning is handled by `store.provisioning_failed`, not by
suspension). Cancel needs a subscription (`409 no_subscription`) and returns both
resources:

```json
{"data": {"store": {}, "subscription": {"status": "cancelled"}}}
```

**`GET /stores/{id}/usage`** · scope `read` — the cached central snapshot (refreshed by
`tenancy:collect-usage`).

`?refresh=1` opens the store's own database for a live count. It is opt-in because it
costs a connection per call, and it answers **`409 usage_unavailable`** rather than a
`500` when the count cannot be trusted: the store has never been provisioned
(`provisioned_at` is `null`), or the connection or query fails.

```bash
capi "$API/stores/acme/usage?refresh=1"
```

```json
{
  "data": {
    "store_id": "acme", "period": "2026-09", "live": true,
    "usage": {"period": "2026-09", "products": 128, "orders": 41,
              "storage_bytes": 730920141, "staff_users": 3,
              "collected_at": "2026-09-02T11:04:19+00:00"}
  }
}
```

**`GET /stores/{id}/events`** · scope `read` — the store's billing/lifecycle audit
trail, newest first, paginated.

```json
{
  "data": [{
    "id": 918, "type": "plan_changed", "from_status": "active", "to_status": "active",
    "data": {"plan": "pro", "from_plan": "starter", "manual": true},
    "actor": {"type": "api_key", "id": 3, "name": "Billing sync"},
    "created_at": "2026-09-01T08:12:44+00:00"
  }],
  "meta": {"page": 1, "per_page": 30, "total": 12, "last_page": 1}
}
```

`data` is an **allow-listed subset** of the stored audit blob (`plan`, `from_plan`,
`trial_days`, `manual`, `extended_days`, `field`, `until`, `from`, `to`, `reason`,
`order`, `number`). Provider references — anything `stripe*` — are never exposed here or
in a webhook's `meta.log`.

### Subscription

**`GET /stores/{id}/subscription`** · scope `read` — `404 no_subscription` when the
store has none.

```bash
capi $API/stores/acme/subscription
```

```json
{
  "data": {
    "status": "active",
    "plan": {"id": 2, "slug": "pro", "name": "Pro", "price_cents": 4900,
             "currency": "USD", "interval": "month", "trial_days": 14,
             "limits": {"products": 5000, "orders": 0, "storage_mb": 20480, "staff_users": 10},
             "features": {"custom_domain": true}, "allows_custom_domain": true,
             "taken_at": "2026-07-04T12:00:00+00:00"},
    "coupon_code": null,
    "trial_ends_at": null,
    "current_period_ends_at": "2026-10-04T12:00:00+00:00",
    "past_due_since": null, "suspended_at": null, "cancelled_at": null,
    "created_at": "2026-07-04T12:00:00+00:00",
    "updated_at": "2026-09-01T08:12:44+00:00",
    "allowed_actions": ["change_plan", "extend", "cancel"]
  }
}
```

`plan` is the **frozen snapshot** the store actually bought, not the live plan row —
that is what makes grandfathering work. Compare it against `GET /plans/{slug}` to see
whether the live terms have moved on.

`allowed_actions` is a **list of action names** legal from the current state, not a map
of action → reason. It is advisory: the authoritative answer is the `409` from the
action itself. `fulfil_order` is never listed — order review stamps an admin identity an
API caller does not have.

| Method + path | Body | Scope | Notes |
| --- | --- | --- | --- |
| `POST /stores/{id}/subscription/assign` | `{"plan":"pro","trial_days":14}` | `write` | `trial_days` optional |
| `POST /stores/{id}/subscription/change-plan` | `{"plan":"starter"}` | `write` | `422 plan_too_small` when the store exceeds the target's limits; `409 same_plan` |
| `POST /stores/{id}/subscription/extend` | `{"days":30}` | `write` | `1..3650` |
| `POST /stores/{id}/subscription/reactivate` | — | `write` | after a cancel, within retention |
| `POST /stores/{id}/subscription/cancel` | — | `write` | store enters retention, then is purged |

All five answer the subscription resource. A Stripe-managed subscription refuses every
one with `409 stripe_managed` — change it in Stripe.

### Domains

`{domain}` is either the row id or the hostname.

**`GET /stores/{id}/domains`** · scope `read`

```json
{
  "data": [
    {"id": 11, "domain": "acme.example.com", "tenant_id": "acme", "is_primary": false,
     "is_fallback": true, "is_custom": false, "verified_at": null, "is_routable": true,
     "created_at": "2026-07-04T12:00:00+00:00"},
    {"id": 12, "domain": "shop.acme.test", "tenant_id": "acme", "is_primary": true,
     "is_fallback": false, "is_custom": true,
     "verified_at": "2026-07-05T09:30:00+00:00", "is_routable": true,
     "created_at": "2026-07-05T09:00:00+00:00"}
  ],
  "meta": {"plan_allows_custom_domains": true, "max_custom_domains": 3}
}
```

**`POST /stores/{id}/domains`** · scope `write` — `{"domain":"shop.acme.test"}` → `201`,
with a `verification` block (`txt_name`, `txt_value`, `cname_target`) carrying the exact
DNS records to publish — present only while the domain is custom and still unverified.
Refusals: `409 plan_upgrade_required`, `409 limit_reached`, `409 already_taken`.

**`POST /stores/{id}/domains/{domain}/verify`** · scope `write` — runs a DNS check now.

```json
{"data": {"id": 12, "verified_at": "2026-07-05T09:30:00+00:00", "is_routable": true},
 "verification_result": {"verified": true, "method": "txt", "reason": null}}
```

**`POST /stores/{id}/domains/{domain}/primary`** · scope `write` — `409 verify_first`
for an unverified domain (an unverified primary would poison every generated URL).

**`DELETE /stores/{id}/domains/{domain}`** · scope `write` → `204`; `409 not_removable`
for the platform fallback host.

### Apps and theme

Both run inside the store's own context, so a store with no database yet answers
`409 store_unavailable`.

**`GET /stores/{id}/apps`** · scope `read`

```json
{"data": [{"slug": "ecommerce", "name": "Ecommerce", "enabled": true, "required_by": []},
          {"slug": "marketplace", "name": "Marketplace", "enabled": false, "required_by": ["ecommerce"]}]}
```

**`POST /stores/{id}/apps/{slug}/enable`** · **`/disable`** · scope `write` — answer the
full list again. Refusals: `409 not_entitled`, `409 requirement_not_entitled`,
`409 still_required`.

**`POST /stores/{id}/theme`** · scope `write` — `{"theme":"shopwise"}` — answers the
store resource and emits `store.theme_changed`. Refusals: `409 store_unavailable` for a
store that has not been provisioned yet, `409 theme_unavailable`,
`409 theme_not_entitled`, `409 theme_requirement_not_entitled`.

### Webhook endpoints

**`GET /webhooks`** · scope `read` (paginated) · **`GET /webhooks/{id}`** · scope `read`

```json
{
  "data": [{
    "id": 4, "url": "https://hooks.acme.test/tenancy",
    "events": ["store.*", "subscription.plan_changed"],
    "description": "Ops bot", "is_active": true, "is_receiving": true,
    "consecutive_failures": 0, "disabled_at": null,
    "last_success_at": "2026-09-02T10:59:01+00:00", "last_failure_at": null,
    "created_by_name": "Billing sync",
    "created_at": "2026-08-10T11:00:00+00:00", "updated_at": "2026-09-02T10:59:01+00:00"
  }],
  "meta": {"page": 1, "per_page": 30, "total": 1, "last_page": 1}
}
```

**`POST /webhooks`** · scope `write` → `201`.

```bash
capi -X POST $API/webhooks -H 'Content-Type: application/json' -d '{
  "url": "https://hooks.acme.test/tenancy",
  "events": ["store.*", "subscription.plan_changed"],
  "description": "Ops bot"
}'
```

```json
{"data": {"id": 4, "url": "https://hooks.acme.test/tenancy"},
 "secret": "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
```

::: warning
This response is the only time the signing secret is readable (besides a rotation) —
store it immediately.
:::

`url` must be **HTTPS**, and the platform refuses its own network: any central domain or
label under one, any registered store domain, `localhost`, and loopback / private /
link-local / reserved addresses (`422 validation_failed`). See
[Webhooks → adding an endpoint](./webhooks.md#adding-an-endpoint) for the full host
check and event-name syntax.

**`PATCH /webhooks/{id}`** · scope `write` — partial update of `url`, `events`,
`description`, `is_active`. Setting `is_active` to `true` also clears an auto-disable
(`disabled_at` and the failure counter), so re-enabling is one call.

**`DELETE /webhooks/{id}`** · scope `write` → `204`. Its deliveries cascade away with
it.

**`POST /webhooks/{id}/rotate-secret`** · scope `write` — the old secret stops
validating immediately; there is no grace window, so update the receiver in the same
maintenance window.

```json
{"data": {"id": 4, "secret": "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}}
```

**`POST /webhooks/{id}/test`** · scope `write` → `202`. Sends a `ping` to this endpoint
regardless of its subscriptions **and of its state** — an inactive or auto-disabled
endpoint is still contacted, because checking a repaired receiver before re-enabling it
is exactly what a test is for. The first attempt is **made inline**, so the returned
delivery row already carries the receiver's answer (`status`, `response_status`,
`response_excerpt`, `error`) — a test that says `delivered` really was delivered.

### Deliveries

**`GET /webhooks/{id}/deliveries`** · scope `read` — `?status=`, `?event=`,
`?include=payload`, paginated, newest first. Payloads are opt-in: a page of them would
repeat a full store snapshot per row.

```json
{
  "data": [{
    "id": 9021, "endpoint_id": 4,
    "event_id": "01K4A6QF8Z5T7M1N0J2W3D4E5F", "event": "store.ready",
    "tenant_id": "acme", "attempt": 2, "status": "delivered",
    "response_status": 200, "response_excerpt": "ok", "error": null,
    "next_attempt_at": null, "delivered_at": "2026-09-02T10:59:01+00:00",
    "created_at": "2026-09-02T10:53:44+00:00", "updated_at": "2026-09-02T10:59:01+00:00"
  }],
  "meta": {"page": 1, "per_page": 30, "total": 214, "last_page": 8}
}
```

See [Webhooks → delivery status](./webhooks.md#reading-a-delivery-failure) for what
each `status` and `error` value means.

**`POST /webhooks/deliveries/{id}/retry`** · scope `write` — forces one attempt
**inline** (the caller waits for the receiver's answer) and returns the row with its
payload included.

An attempt reserves the row by bumping `attempt`, flipping `status` to `pending` and
leasing `next_attempt_at` into the near future. So a row that is `pending` with
`attempt > 0` and a `next_attempt_at` in the **future** is being sent right now, and a
retry of it answers **`409 delivery_not_retryable`** rather than sending the event
twice. Once the lease lapses (a worker killed mid-request), the same row becomes
retryable again — by this endpoint and by the cron sweep.

## Issuing and revoking a key from the console

**Operator console → API keys → New key.** Set:

| Field | Notes |
| --- | --- |
| Name | Label for the key, shown in the list and in audit-log entries |
| Scopes | `read`, `write`, or both |
| Expiry | Recommended for every key |

![API keys list — name, prefix, scopes, last used, revoke](./images/operator-api-keys.png)

::: warning
The plaintext key is shown **once**, on the page that creates it. It is stored only as a
sha256 hash — a lost key cannot be recovered, only revoked and reissued.
:::

Click **Revoke** on the list to disable a key immediately — it takes effect on the next
request. Every write a key makes is attributed to it in the store's audit trail
(`actor.type = "api_key"`), so the **History** panel on
**Operator console → Subscriptions → a subscription** shows which integration did what.

## Operational notes

- **`APP_KEY` rotation invalidates every webhook secret.** Secrets are stored with
  Laravel's `encrypted` cast, so after rotating the key each endpoint's secret can no
  longer be decrypted and every delivery fails. Rotate the secret of every endpoint
  (`POST /webhooks/{id}/rotate-secret`) and update the receivers immediately after any
  `APP_KEY` rotation. API keys are unaffected — they are sha256 hashes, not encrypted.
- **Deleting an endpoint deletes its deliveries.** The history cascades at the
  database; export it first if you need it.
- **`store.deleted` payloads outlive the tenant.** Delivery rows carry no foreign key to
  `tenants`, so the snapshot of a deleted store is still delivered (and retried) after
  the row and its database are gone.
- **Emitting never breaks the action.** Every emit is wrapped so a broken endpoints
  table or an unreachable receiver can never roll back the store change it was
  describing. If an event never arrives, the change still happened — reconcile through
  the REST API.
- **`tenancy:create-tenant` honours `provisioning.sync`.** Without `--sync` the command
  takes the same path as signup and the API: queued unless `TENANCY_PROVISION_SYNC=true`
  (or the queue driver is `sync`), in which case it provisions inline.
- **Order of operations for a new integration:** issue a `read` key → confirm with
  `GET /me` → register an endpoint and store its secret → `POST /webhooks/{id}/test` and
  verify the signature on the `ping` → subscribe to real events → add the
  `tenancy:webhooks-deliver` cron entry (see [Webhooks](./webhooks.md) and
  [Queue worker and cron](./cronjob.md)).

See [Webhooks](./webhooks.md) for the event catalogue, payload shape and signature
verification, and [Operator console](./operator-console.md) for the rest of the console.
