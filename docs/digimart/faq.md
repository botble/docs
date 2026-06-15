---
title: FAQ
description: Frequently asked questions about DigiMart
---

# Frequently Asked Questions

## Installation & Setup

### How do I change the default admin password?

After installation, the default admin account is created with:
- **Username:** `admin`
- **Password:** `12345678`

Change it immediately:

1. Log into the admin dashboard
2. Go to **Admin Account** (top-right menu)
3. Click **Edit Profile** or **Change Password**
4. Enter a strong new password
5. Save

Or, set custom credentials before seeding:

```env
CMS_DEMO_ACCOUNT_USERNAME=myusername
CMS_DEMO_ACCOUNT_PASSWORD=mysecurepassword
```

Then run:
```bash
php artisan migrate --seed
```

### What are the minimum server requirements?

- PHP 8.3 or later
- MySQL 5.7+ or MariaDB 10.3+
- 512 MB RAM minimum (1 GB recommended)
- 500 MB disk space

See [Installation Requirements](./installation-requirements.md) for complete details.

### Can I install DigiMart locally for testing?

Yes. For local development:

```bash
composer install
php artisan serve
npm install && npm run dev
```

Visit `http://localhost:8000` in your browser.

## Licensing & Activation

### Why do I need to set `productId` in `platform/core/core.json`?

The `productId` is your CodeCanyon item ID. It's required for:
- License verification against Envato's servers
- Automatic update checks
- Support and documentation linking

Update it before going live:

```json
{
  "productId": "your-codecanyon-item-id",
  "name": "DigiMart"
}
```

Find your item ID on [codecanyon.net](https://codecanyon.net) → My Items.

### How do I activate my CodeCanyon purchase code?

1. Go to Admin → **Settings** → **License**
2. Enter your purchase code (8-character code from CodeCanyon)
3. Click **Activate**

Or during web installer setup, the license step prompts you.

### Can I transfer my license to another domain?

DigiMart licenses are domain-specific. To use on a different domain:

1. Deactivate the license from the current domain (or wait for expiration)
2. Activate it on the new domain via Admin → Settings → License

Each license typically grants activation on one domain.

## Products & Publishing

### What's the difference between GitHub, Direct, and Envato sources?

| Source | Use When | Benefits |
|--------|----------|----------|
| **Direct (ZIP)** | Uploading files manually | Full control, immediate upload |
| **GitHub** | Product is on GitHub | Auto-updates, shows repo link, community-driven |
| **Envato** | Already on CodeCanyon | Cross-sell, leverage existing customer base |

Authors choose one source per product.

### Why is my product version not downloadable?

Versions must pass virus scanning before they're downloadable:

- **Pending** — Scan hasn't started yet; wait or use `marketplace:virus-scan-pending` command
- **Scanning** — VirusTotal is analyzing; wait (typically < 5 mins)
- **Clean** — No malware; version is downloadable
- **Malicious** — Threat detected; file is quarantined, not downloadable
- **Error** — Scan failed; retry via command

Check the version's scan status in Admin → Products & Versions → [Product] → Versions.

### Can an author modify a product after it's published?

Yes. Authors can:
- Edit product name, description, category, tags
- Upload new versions (automatically scanned)
- Update pricing
- Manage dependencies

Changes take effect immediately; no re-approval needed (unless significantly altering the product).

### How do I feature a product?

As admin:

1. Go to **Products & Versions** → [Product]
2. Click **Feature**
3. Select placement and duration
4. Save

Featured products appear on the homepage or category pages with special highlighting.

## Virus Scanning

### How does virus scanning work?

1. Author uploads a product ZIP
2. System submits file to VirusTotal
3. VirusTotal scans with 90+ antivirus engines
4. Results are recorded
5. Version is marked Clean, Malicious, or Error
6. Only Clean versions are downloadable

### What if my product is flagged as malicious (false positive)?

1. Review the VirusTotal report (link in Admin → Virus Scanning)
2. Check which engines flagged it
3. If only a few engines flagged it (false positive likely):
   - Contact those antivirus vendors to report
   - Try removing suspicious code patterns
   - Re-upload for rescanning
4. Contact marketplace admin if you need manual review

### What if VirusTotal service is down?

By default, downloads are blocked if scanning cannot complete (fail-secure mode).

Admin can configure fail-open mode in Admin → Settings → Marketplace:
- **Fail Open:** Scan unavailable → allow download anyway
- **Fail Secure:** Scan unavailable → block download until scanning resumes

Choose based on risk tolerance.

## Licensing & Access

### What does license-protected download mean?

If `marketplace_requires_license` is enabled:

- Customers must provide a license key/purchase code before downloading paid products
- Free products don't require licenses
- License verification checks against your database or Envato

Admin enables this in Admin → Settings → Marketplace.

### How do I create an API token?

Generate a token for REST API access:

```bash
php artisan api:public-access-token-create
```

Follow prompts:
- Enter token name (e.g., "Mobile App")
- Confirm creation
- Save the returned token securely

Use the token in API requests:
```bash
Authorization: Token {access_token}
```

### What are API rate limits?

- **Free tier:** 500 requests/day
- **Paid tier:** 10,000 requests/day

Responses include headers showing remaining quota. Once exceeded, API returns 429 (Too Many Requests).

## Marketplace Settings

### Can I require a license for all downloads?

Yes. In Admin → Settings → Marketplace:

Enable **`marketplace_requires_license`**

Now all paid product downloads require a license key.

Free products bypass this requirement.

### How do I block certain domains from activating licenses?

In Admin → Settings → Marketplace:

Set **`marketplace_blacklisted_domains`** to a comma-separated list:

```
spam.com, phishing.org, test.local
```

These domains cannot activate licenses. Optionally enable **`marketplace_blacklisted_domains_silent`** to silently fail (no error message to user).

### How do I enable virus scanning?

In Admin → Settings → Marketplace:

1. Enable **`marketplace_virustotal_enabled`**
2. Enter your **VirusTotal API Key** (free from [virustotal.com](https://www.virustotal.com))
3. Set **Detection Threshold** (default: 5)
4. Choose **Fail Open/Fail Secure** mode

See [Virus Scanning](./virus-scanning.md) for details.

## Approvals & Moderation

### How long does admin approval take?

Typically 24-48 hours. Admin:
1. Receives notification of submission
2. Reviews product info, scan results
3. Approves or rejects with feedback

New author registrations may take longer (admin verification).

### Can I appeal a product rejection?

Yes:

1. Review rejection reason (sent via email)
2. Address the issue (fix code, add missing info, etc.)
3. Revise product and resubmit
4. Admin reviews again

Contact marketplace admin if you believe the decision was unfair.

### Why was my author account banned?

Bans occur when authors violate marketplace policies:
- Publishing malware or spam
- Copyright violations
- Fraudulent activity
- Violating terms of service

Ban notification includes reason and duration. Contact admin to appeal.

## Troubleshooting

### My products aren't showing in the marketplace

Check:
- Product status is **Published** (not Drafted, Rejected, Pending)
- Virus scan passed (status: Clean)
- Category and tags are properly set
- Product is not deactivated by admin

Go to Admin → Products & Versions → [Product] → verify status.

### I can't log in to my author account

Try:
- Reset password via login page ("Forgot Password" link)
- Clear browser cache and cookies
- Try a different browser
- Contact admin if issue persists

### Download counts seem incorrect

Run the update command:

```bash
php artisan marketplace:product-downloads-count-update
```

This recalculates statistics from the database.

::: tip
Still have questions? Contact marketplace admin or check [Installation Requirements](./installation-requirements.md), [Products](./products.md), or [Licensing](./licensing.md) guides.
:::
