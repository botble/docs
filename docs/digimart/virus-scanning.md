---
title: Virus Scanning
description: VirusTotal integration and automatic product file scanning
---

# Virus Scanning

DigiMart integrates with VirusTotal to automatically scan uploaded product files for malware before they become downloadable. This protects your marketplace's reputation and customers.

## How It Works

1. Author uploads a product archive (ZIP file)
2. System scans the file with VirusTotal
3. Scan result is recorded and version is marked:
   - **Clean** — No malware detected, version is downloadable
   - **Malicious** — Malware detected, version is quarantined, not downloadable
   - **Pending** — Scan queued but not yet started
   - **Scanning** — VirusTotal is analyzing the file
   - **Error** — Scan failed, try again

Only versions with **Clean** status (or **Skipped** if scanning is disabled) can be downloaded.

## Setup

### 1. Get a VirusTotal API Key

1. Sign up for a free account at [virustotal.com](https://www.virustotal.com)
2. Go to **Settings** → **API Key**
3. Copy your API key (free tier allows 500 requests/day)

### 2. Configure in Admin Settings

1. Go to Admin → **Settings** → **Marketplace** (tab)
2. Under **Virus Scanning**, fill in:
   - **Enable Virus Scanning** — Toggle on
   - **VirusTotal API Key** — Paste your API key
   - **Detection Threshold** — Minimum engines flagging file as malicious (default: 5)
   - **Scan Timeout** — Seconds to wait for scan to complete (default: 60)
   - **Fail Open** — Allow downloads if VirusTotal is unreachable (true/false)

3. Click **Save**

Configuration can also be set via environment variables:

```env
MARKETPLACE_VIRUSTOTAL_ENABLED=true
MARKETPLACE_VIRUSTOTAL_API_KEY=your-api-key-here
MARKETPLACE_VIRUSTOTAL_THRESHOLD=5
MARKETPLACE_VIRUSTOTAL_TIMEOUT=60
MARKETPLACE_VIRUSTOTAL_FAIL_OPEN=false
```

## Scan Status & Results

### Viewing Scan Logs

1. Go to Admin → **Virus Scanning** → **Virus Scan Logs**
2. See all scans with:
   - Product and version
   - File name and size
   - Scan status
   - Date scanned
   - Detected threats (if any)
   - VirusTotal report link

### Understanding Scan Results

| Status | Meaning | Action |
|--------|---------|--------|
| **Pending** | Scan queued, not yet started | Wait or retry via command |
| **Scanning** | VirusTotal is analyzing | Wait (typically < 5 mins) |
| **Clean** | No malware detected | Version downloadable |
| **Malicious** | Threat detected | Version quarantined, not downloadable |
| **Error** | Scan failed (network, API, etc.) | Retry via command |
| **Skipped** | Scanning disabled in settings | Version downloadable |

### Detection Threshold

The threshold determines how many antivirus engines must flag a file as malicious for it to be marked malicious:

- **Threshold 1** — Strict; one engine is enough (sensitive)
- **Threshold 5** — Balanced; 5 engines must agree (default)
- **Threshold 10** — Permissive; 10 engines must agree (allows edge cases)

Choose based on your risk tolerance. Higher thresholds reduce false positives but may miss obscure malware.

## Handling Malicious Files

When a product version is flagged as malicious:

1. The version is automatically quarantined (not downloadable)
2. Admin and author are notified
3. The author can:
   - Delete the version and upload a clean one
   - Request a manual re-scan if they believe it's a false positive
   - Update the product description to address the issue

### False Positives

Sometimes antivirus engines flag legitimate files as malicious due to heuristics or incomplete definitions:

1. Review the VirusTotal report (link in scan logs)
2. Check which engines flagged it (few vs. many)
3. If likely a false positive:
   - Contact the antivirus vendors to report the false positive
   - Attempt to clean the file (remove suspicious code patterns)
   - Resubmit for scanning

### Quarantine

Malicious versions are:
- Hidden from the marketplace (not downloadable by customers)
- Not deleted (admin can review, export logs, or archive)
- Visible only to admin and the product author
- Can be permanently deleted or left in quarantine for audit purposes

## Processing Pending Scans

Some scans may remain in **Pending** or **Scanning** status if:
- VirusTotal's backend is slow (large files)
- The scan timed out and needs retry

### Run Manual Scan

Process pending scans via command:

```bash
php artisan marketplace:virus-scan-pending
```

This:
- Fetches all versions with Pending/Scanning/Error status
- Re-requests scan results from VirusTotal
- Updates status in the database
- Outputs summary of processed versions

### Automate Scanning (Cron Job)

Run the command periodically to keep scans up-to-date:

```bash
# Run every 10 minutes
*/10 * * * * cd /path/to/marketplace && php artisan marketplace:virus-scan-pending
```

Add to your server's crontab or use a task scheduler (Laravel Scheduler, AWS Events, etc.).

## Fail-Open vs. Fail-Secure

**Fail Open** (`marketplace_virustotal_fail_open=true`):
- If VirusTotal is unreachable, allow downloads to proceed
- Prioritizes availability over security
- Use if you need maximum uptime and can accept some risk

**Fail Secure** (`marketplace_virustotal_fail_open=false`):
- If VirusTotal is unreachable, block downloads until scanning resumes
- Prioritizes security over availability
- Use if security is paramount

## Monitoring

### Key Metrics

- **Pending Scans** — How many versions are waiting to be scanned
- **Malicious Files Found** — Cumulative detections
- **Scan Failure Rate** — Scans that returned errors
- **Average Scan Time** — Time from upload to result

Monitor these via Admin → Virus Scanning dashboard.

### Alerts

Set up notifications (optional) for:
- High pending scan count (> 20)
- Malicious files detected
- Scan failures (> 10% failure rate)
- VirusTotal API quota nearing limit

## API Integration Limits

VirusTotal's free tier offers:

- **Rate Limit** — 500 requests per day
- **File Size** — Up to 650 MB per scan
- **Concurrent Scans** — Up to 4 simultaneous scans

For high-volume marketplaces, consider upgrading to VirusTotal's paid tier.

## Troubleshooting

**Scans never complete (stuck on "Scanning"):**
- Increase `MARKETPLACE_VIRUSTOTAL_TIMEOUT` (current: 60 seconds)
- Run `php artisan marketplace:virus-scan-pending` to retry
- Check that API key is valid and quota not exceeded

**API key rejected:**
- Verify key is correct (copy/paste from VirusTotal settings)
- Check that key is for the correct VirusTotal account
- Ensure account is not suspended

**Large files fail to scan:**
- VirusTotal has a 650 MB file size limit
- Request authors to reduce file size (compress, remove unused assets)
- Large files may take longer; increase timeout

**Too many pending scans:**
- Ensure cron job is running regularly
- Check server disk space and memory (scanning is resource-intensive)
- Consider upgrading VirusTotal plan for higher concurrency

::: warning
Virus scanning is a critical security feature. Ensure it's enabled and properly configured before going live. Regularly monitor scan logs and quarantine for threats.
:::

See [Settings](./settings.md) for VirusTotal configuration reference.
