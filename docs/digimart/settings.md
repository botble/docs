---
title: Marketplace Settings
description: Configure marketplace behavior and integrations
---

# Marketplace Settings

Configure DigiMart's core functionality, integrations, and policies via the admin settings panel.

**Access:** Admin → Settings → Marketplace (tab)

## General Settings

### Licensing Requirements

**Setting:** `marketplace_requires_license`

- **Enabled:** Buyers must enter a license key or purchase code before downloading paid products
- **Disabled:** Buyers can download paid products without license verification

Use this to enforce license compliance across your marketplace.

## Announcements & Advertisements

### Marketplace Announcement

**Setting:** `marketplace_announcement`

Display a banner message on the marketplace homepage and product pages. Supports HTML.

**Hide Control:** `marketplace_hide_announcement` — Allow users to dismiss the announcement.

**Use cases:**
- Maintenance notifications
- Platform updates
- Important policy changes

### Marketplace Advertisement

**Setting:** `marketplace_advertisement`

Display an advertisement banner (e.g., promotional content, partner links). Supports HTML and embedding.

**Hide Control:** `marketplace_hide_advertisement` — Allow users to dismiss the ad.

### Hide Mobile App Announcement

**Setting:** `marketplace_hide_mobile_app_announcement`

Hide the native mobile app promotion banner on mobile devices.

## Domain Control

### Blacklisted Domains

**Setting:** `marketplace_blacklisted_domains`

Comma-separated list of domains that cannot be used for license activation or product registration. Useful to block:
- Known malicious domains
- Competitor domains
- Test/staging domains that should not activate licenses

**Example:**
```
spam.com, phishing.org, test.local
```

### Silent Blacklist Mode

**Setting:** `marketplace_blacklisted_domains_silent`

- **Enabled:** Blacklisted domain activation requests silently fail (no error message to user)
- **Disabled:** Return a clear error message explaining why the domain is blocked

Silent mode prevents attackers from discovering which domains are blacklisted.

## Comments & Notifications

### Enable Comment Notifications

**Setting:** `marketplace_enable_comment_notification`

- **Enabled:** Send email notifications when new product comments are posted or replied to
- **Disabled:** Comments are tracked but no notifications are sent

Affects author and admin notifications for product reviews/comments.

## Virus Scanning

Configure VirusTotal integration for automatic product file scanning.

### Enable Virus Scanning

**Setting:** `marketplace_virustotal_enabled`

- **Enabled:** Uploaded product archives are automatically scanned before becoming downloadable
- **Disabled:** Virus scanning is skipped

### VirusTotal API Key

**Setting:** `marketplace_virustotal_api_key`

Obtain a free API key from [virustotal.com](https://www.virustotal.com):

1. Sign up for a free VirusTotal account
2. Go to Settings → API Key
3. Copy your API key
4. Paste into this field

### Detection Threshold

**Setting:** `marketplace_virustotal_threshold`

Minimum number of antivirus engines that must flag a file as malicious for it to be marked as malicious. Default: `5`

**Example:**
- Threshold 5: File is malicious if 5+ engines detect it
- Threshold 1: File is malicious if any engine detects it (more strict)

### Scan Timeout

**Setting:** `marketplace_virustotal_timeout`

Maximum seconds to wait for a scan to complete. Default: `60`

If a scan takes longer, it is marked as pending and can be retried via the `marketplace:virus-scan-pending` command.

### Fail Open

**Setting:** `marketplace_virustotal_fail_open`

- **Enabled:** If VirusTotal is unreachable, allow downloads to proceed (fail open)
- **Disabled:** If VirusTotal is unreachable, block downloads until scanning resumes (fail secure)

Choose based on your risk tolerance and uptime requirements.

## Example Configuration

A typical marketplace setup:

```
marketplace_requires_license = true
marketplace_virustotal_enabled = true
marketplace_virustotal_threshold = 5
marketplace_virustotal_fail_open = false
marketplace_enable_comment_notification = true
marketplace_blacklisted_domains = spam.com, test.local
```

## Environment Overrides

Any setting can be overridden via `.env` using the uppercase setting name:

```env
MARKETPLACE_REQUIRES_LICENSE=true
MARKETPLACE_VIRUSTOTAL_ENABLED=true
MARKETPLACE_VIRUSTOTAL_API_KEY=your-key-here
MARKETPLACE_VIRUSTOTAL_THRESHOLD=5
```

Environment values take precedence over database settings.

::: warning
Changing these settings takes effect immediately. Test changes in a staging environment first, especially virus scanning and licensing requirements.
:::

See [Virus Scanning](./virus-scanning.md) for scanning workflow details.
