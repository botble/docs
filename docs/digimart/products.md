---
title: Products & Versions
description: Manage product listings, approvals, and versions
---

# Products & Versions

Products are the core of your marketplace. Manage listings, approve submissions, configure versions, and monitor scan status from the admin panel.

**Access:** Admin → Products & Versions

## Product Statuses

| Status | Description | Actions |
|--------|-------------|---------|
| **Published** | Live in marketplace, visible to customers | Edit, deactivate, feature, manage versions |
| **In Review** | Awaiting admin approval | Approve, reject, request changes |
| **Pending** | Author submitted, not yet reviewed | Review and approve/reject |
| **Drafted** | Author saved but not submitted | Author can finalize and submit |
| **Rejected** | Admin rejected, author can revise | Author resubmits for review |
| **Deactivated** | Manually disabled by admin | Reactivate or permanently delete |

## Managing Products

### View All Products

1. Go to **Products & Versions**
2. See list of all products with:
   - Title and author
   - Current status
   - Number of versions
   - Download count
   - Virus scan status
   - Created/updated dates

Filter by status, author, category, or search by name.

### Approve a Product

1. Click a product in **Pending** or **In Review** status
2. Review:
   - Product details (name, description, category, pricing)
   - Version files and scan results
   - Author information
   - Product dependencies
3. Verify virus scan passed (all versions show **Clean** status)
4. Click **Approve**
5. Add approval notes (optional)
6. Click **Confirm**

The product is published immediately.

### Reject a Product

1. Click a product in review
2. Click **Reject**
3. Enter a detailed reason (shared with author)
4. Click **Send**

The product reverts to **Rejected** status; author must revise and resubmit.

### Feature a Product

Promote a product on the homepage or category pages:

1. Click a product
2. Click **Feature**
3. Select placement and duration
4. Click **Save**

Featured products appear in a special section and receive increased visibility.

### Deactivate a Product

Temporarily hide a published product without deleting it:

1. Click a product
2. Click **Deactivate**
3. Enter reason (optional)
4. Click **Confirm**

The product is hidden from the marketplace but all data is preserved. Authors cannot manage it during deactivation.

### Reactivate a Product

1. Click a deactivated product
2. Click **Reactivate**
3. Click **Confirm**

The product returns to **Published** status.

## Product Information

Each product contains:

- **Name** — Product title
- **Type** — Plugin or Theme
- **Category** — Primary category
- **Tags** — Additional labels
- **Short Description** — Tagline (shown in listing)
- **Long Description** — Full details (shown on product page)
- **Author** — Creator/owner
- **Pricing** — Free or Paid (with price)
- **License Requirements** — Requires license key to download (if enabled)
- **Dependencies** — Other products this product requires to function

## Product Versions

Products can have multiple versions (releases) with compatibility info and optional GitHub linking.

### Manage Versions

1. Click a product
2. Go to **Versions** tab
3. See all versions with:
   - Version number
   - Release date
   - Scan status (Pending, Scanning, Clean, Malicious, Error, Skipped)
   - Compatibility information
   - GitHub repository link (if applicable)

### Version Scan Status

| Status | Meaning | Action |
|--------|---------|--------|
| **Pending** | Scan not yet started | Wait or retry via command |
| **Scanning** | VirusTotal is scanning | Wait (usually < 5 mins) |
| **Clean** | No malware detected | Version is downloadable |
| **Malicious** | Malware detected | Version is quarantined, not downloadable |
| **Error** | Scan failed | Retry via command or contact support |
| **Skipped** | Scan disabled in settings | Version is downloadable |

Only versions with **Clean** or **Skipped** status can be downloaded by customers.

### Create a Version

Authors create versions when publishing or updating products. Admins cannot create versions but can:
- View scan results
- Manually rerun scans (via console command)
- Deactivate versions

See [Publishing Products](./publishing-products.md) for the author version workflow.

## Product Dependencies

Products can declare dependencies on other products (e.g., a plugin requires a framework).

- If a dependency is unpublished or unavailable, the product shows a warning
- Customers are informed of dependencies before purchase/download
- Authors can mark dependencies as optional or required

## Product Types

| Type | Description |
|------|-------------|
| **Plugin** | WordPress plugin, code extension, or software module |
| **Theme** | UI theme, template, or design package |

Product type affects filtering and categorization.

## Virus Scanning

All uploaded product versions are scanned before becoming downloadable (if enabled).

- Scans run automatically via VirusTotal
- Results are recorded in virus scan logs
- Malicious files are quarantined immediately
- Use `marketplace:virus-scan-pending` console command to process versions still pending a scan

See [Virus Scanning](./virus-scanning.md) for details.

## Bulk Actions

From the products list, select multiple products to:
- Change status (approve, reject, deactivate)
- Add/remove tags
- Change category
- Delete (with confirmation)

::: warning
Deleting a product cannot be undone. Deactivation is preferred for temporary removal.
:::

::: tip
Regularly review pending products and virus scan logs. Set up cron jobs to run virus scanning and download count updates (see [Console Commands](./commands.md)).
:::
