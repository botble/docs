---
title: Real Estate Integration
description: SMS for property inquiry notifications and agent verification.
---

# Real Estate Integration

Send SMS to agents for property inquiries and customer OTP verification.

## What fires SMS

| Event | SMS Template | Recipient | When |
|-------|---|---|---|
| **Property Inquiry** | `property.inquiry` | Agent phone | Customer inquires about a property |
| **Inquiry Response** | `inquiry.response` | Customer phone | Agent responds to inquiry |
| **Showing Scheduled** | `showing.scheduled` | Agent phone | Appointment booked for property showing |
| **Customer OTP** | `customer.phone_verify` | Customer phone | Customer verifies phone on platform |

## Configuration

### Step 1 — Enable real estate SMS

1. Go to **Admin → Settings → SMS Gateways**
2. Under **Subjects**, check **Real Estate** to enable
3. Click **Save**

### Step 2 — Create templates

1. Go to **Admin → SMS Gateways → Templates**
2. Create templates for each event above
3. Use the available variables (see below)

## Template variables

### Property Inquiry

Available in `property.inquiry` template:

- `{agent_name}` — agent full name
- `{customer_name}` — customer inquiring
- `{property_address}` — property address
- `{property_id}` — property reference number
- `{inquiry_type}` — type of inquiry (e.g., "viewing request", "price question")
- `{brand}` — platform name

Example:

```
{agent_name}, new inquiry for {property_address} from {customer_name} ({inquiry_type}).
```

### Inquiry Response

Available in `inquiry.response` template:

- `{customer_name}`
- `{agent_name}`
- `{property_address}`
- `{response}` — agent's response (first 100 chars)
- `{brand}`

Example:

```
{customer_name}, {agent_name} replied to your {property_address} inquiry. Check your account.
```

### Showing Scheduled

Available in `showing.scheduled` template:

- `{agent_name}`
- `{customer_name}`
- `{property_address}`
- `{showing_date}` — appointment date (YYYY-MM-DD)
- `{showing_time}` — appointment time (HH:MM)
- `{brand}`

Example:

```
{agent_name}, showing scheduled for {property_address} on {showing_date} at {showing_time}.
```

## Customer OTP

When customers sign up or verify their phone:

1. Customer enters phone on signup/profile
2. System sends OTP via SMS
3. Customer enters 6-digit code
4. If correct, phone is marked verified

Configure OTP in **Admin → Settings → SMS Gateways** (same as ecommerce).

## Agent Consent

When sending SMS to agents:

1. System checks if agent phone is opted out
2. If yes, SMS is not sent
3. If no, SMS is sent

Agents can opt-out by replying **STOP** to any SMS.

Admins can manage consent in **Admin → SMS Gateways → Consents**.

## Delivery logs

Monitor SMS in **Admin → SMS Gateways → Delivery Logs**:

1. Filter by **Subject** = "Real Estate"
2. See all agent and customer SMS
3. Check status and retry failed SMS

## Outbound webhooks

Configure webhooks to track SMS delivery:

```json
{
  "event": "sms.sent",
  "to": "+1-555-1234",
  "subject": "real_estate",
  "context": {
    "agent_id": "123",
    "property_id": "456",
    "template": "property.inquiry"
  },
  "timestamp": "2025-01-15T10:30:05Z"
}
```

## Troubleshooting

### Agent SMS not being sent

1. Check **Real Estate** is enabled in SMS Gateways settings
2. Verify agent phone is not opted out
3. Check SMS driver is configured and active
4. Look in **Delivery Logs** for errors

### OTP not arriving

1. Verify SMS driver credentials
2. Check phone format (must include country code)
3. Check delivery logs for OTP SMS

## Next step

See [Job Board Integration](./job-board.md) for application status SMS.
