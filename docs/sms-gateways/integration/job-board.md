---
title: Job Board Integration
description: SMS for job application status and employer notifications.
---

# Job Board Integration

Send SMS to candidates for application updates and to employers for new applications.

## What fires SMS

| Event | SMS Template | Recipient | When |
|-------|---|---|---|
| **New Application** | `job.application_received` | Employer phone | Candidate applies for position |
| **Application Status** | `job.application_status_update` | Candidate phone | Employer updates application status |
| **Job Posted** | `job.posted` | Subscriber phone | New job matching candidate's search |
| **Candidate OTP** | `candidate.phone_verify` | Candidate phone | Candidate verifies phone |

## Configuration

### Step 1 — Enable job board SMS

1. Go to **Admin → Settings → SMS Gateways**
2. Under **Subjects**, check **Job Board** to enable
3. Click **Save**

### Step 2 — Create templates

1. Go to **Admin → SMS Gateways → Templates**
2. Create templates for each event above

## Template variables

### New Application

Available in `job.application_received` template:

- `{employer_name}` — employer company name
- `{candidate_name}` — candidate name
- `{job_title}` — position title
- `{job_id}` — job posting reference
- `{shop_name}` — platform name

Example:

```
{employer_name}, {candidate_name} applied for {job_title}. Review at {shop_name}.
```

### Application Status Update

Available in `job.application_status_update` template:

- `{candidate_name}`
- `{employer_name}`
- `{job_title}`
- `{status}` — new status (e.g., "shortlisted", "rejected", "hired")
- `{shop_name}`

Example:

```
{candidate_name}, your application for {job_title} at {employer_name} is {status}.
```

### Job Posted

Available in `job.posted` template:

- `{job_title}`
- `{employer_name}`
- `{job_id}`
- `{salary_range}` — if provided (e.g., "$50k–$70k")
- `{shop_name}`

Example:

```
New job: {job_title} at {employer_name}. Salary: {salary_range}. Apply now!
```

## Candidate OTP

When candidates sign up or verify their phone:

1. Candidate enters phone
2. System sends OTP
3. Candidate enters 6-digit code
4. If correct, phone is verified

Same OTP settings as ecommerce (configure in **Admin → Settings → SMS Gateways**).

## Consent & Opt-out

When sending SMS to candidates or employers:

1. System checks if phone is opted out
2. If yes, SMS is not sent
3. If no, SMS is sent

Recipients can opt-out by replying **STOP** to any SMS.

Admins can manage consent in **Admin → SMS Gateways → Consents**.

## Delivery logs

Monitor SMS in **Admin → SMS Gateways → Delivery Logs**:

1. Filter by **Subject** = "Job Board"
2. See all candidate and employer SMS
3. Check status and retry failed SMS

## Troubleshooting

### SMS not being sent

1. Check **Job Board** is enabled in SMS settings
2. Verify phone is not opted out
3. Check SMS driver is configured and active
4. Look in **Delivery Logs** for errors

### OTP not arriving

1. Verify SMS driver credentials
2. Check phone format (must include country code)
3. Check delivery logs for OTP SMS

## Next step

See [Car Manager Integration](./car-manager.md) for car rental SMS.
