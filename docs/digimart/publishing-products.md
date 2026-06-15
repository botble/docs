---
title: Publishing Products
description: Create, upload, and submit products for approval
---

# Publishing Products

As an author, publish digital products to the marketplace for customers to download and rate. The process is straightforward: create product info, upload files, and submit for admin approval.

**Access:** Your Account → My Products → Create Product

## Product Creation Workflow

```
Create product details
         ↓
Upload version file(s)
         ↓
Configure pricing & dependencies
         ↓
Submit for admin approval
         ↓
Admin reviews (virus scan, quality)
         ↓
Approved → Published (visible in marketplace)
Rejected → Revise and resubmit
```

## Step 1: Product Information

### Basic Details

- **Name** — Product title (e.g., "Advanced SEO Plugin")
- **Type** — Plugin or Theme
- **Category** — Select primary category (required)
- **Tags** — Add multiple tags for filtering (optional)

### Pricing

- **Price** — Free or enter a price in your marketplace currency
- **License Required** — Toggle whether customers need a license key to download

### Description

- **Short Description** — Tagline displayed in product listings
- **Long Description** — Full product details displayed on product page

Use clear, accurate language. Highlight key features and benefits.

### Author Information

Your name and profile are automatically filled. Cannot be changed for individual products.

## Step 2: Upload Files

Choose a product source:

### Option A: Upload ZIP File (Directly)

Upload a ZIP archive containing your product:

1. Click **Upload ZIP**
2. Select your file (max size depends on server configuration)
3. File is automatically scanned for viruses
4. Once scan passes (status: Clean), version is created

**Best for:**
- Small to medium-sized products
- One-time uploads
- Products not on GitHub

### Option B: Link to GitHub Repository

Link your product to a GitHub repository:

1. Click **Link GitHub Repository**
2. Enter repository URL (e.g., `https://github.com/username/my-plugin`)
3. Specify the branch to track (default: main)
4. System automatically pulls latest releases

GitHub-linked products:
- Are automatically updated when you release new versions on GitHub
- Show a link to the GitHub repo on the product page
- Can be forked and contributed to by customers (if public)

**Best for:**
- Open-source projects
- Actively maintained products
- Products with frequent updates

### Option C: Link to Envato

Link your product to an existing Envato CodeCanyon item:

1. Click **Link Envato Item**
2. Enter your CodeCanyon item ID
3. System fetches metadata and versions from Envato

**Best for:**
- Products already on CodeCanyon
- Cross-listing to expand distribution
- Existing Envato customers

## Step 3: Product Versions

Each product can have multiple versions (releases) with different compatibility info.

### Create a Version

When uploading files, a version is created with:

- **Version Number** — e.g., 1.0.0, 2.1.3 (semantic versioning recommended)
- **Compatibility** — Framework/software versions supported (e.g., WordPress 6.0+, PHP 8.0+)
- **Release Notes** — Changelog for this version (markdown supported)
- **GitHub/Envato** — Auto-linked if using those sources

### Version Scanning

After upload, the file is automatically scanned:

1. **Pending** — Scan queued
2. **Scanning** — VirusTotal analyzing (< 5 mins typically)
3. **Clean** — No malware, ready to publish
4. **Malicious** — Threat detected, version quarantined
5. **Error** — Scan failed, contact admin

Only **Clean** versions can be downloaded. If malicious:
- Fix the issue (remove suspicious code)
- Upload a new version
- Request manual rescan

## Step 4: Dependencies

Declare dependencies on other products:

1. Go to **Dependencies**
2. Click **Add Dependency**
3. Select a product from the marketplace
4. Mark as **Required** or **Optional**

Example: A WordPress plugin may require a framework plugin as a dependency.

Dependencies are shown to customers before download/purchase.

## Step 5: Pricing & License

### Set Product Price

- **Free** — No charge, customers can download immediately
- **Paid** — Enter amount (displayed in marketplace currency)

Paid products may require license verification (if enabled in marketplace settings).

### License Settings

If the product requires a license:

- **License Type** — Envato purchase code, custom key, or none
- **Max Activations** — How many domains can activate one license (e.g., 1, 5, unlimited)

Customers enter a license key/code during download if required.

## Step 6: SEO & Metadata

Optionally configure SEO settings:

- **Slug** — URL path for product page (auto-generated, editable)
- **Meta Title** — Title shown in search results
- **Meta Description** — Description shown in search results
- **Meta Keywords** — Tags for SEO (comma-separated)

Good SEO helps your products rank higher in search results.

## Step 7: Submit for Approval

### Save as Draft

Save your product without submitting:

1. Click **Save as Draft**
2. Product is stored but not visible to customers
3. You can edit it anytime before submission

### Submit for Review

When ready, submit your product:

1. Click **Submit for Approval**
2. Admin receives notification
3. Admin reviews within 24-48 hours (typical)
4. You are notified of approval or rejection

### Admin Review Criteria

Admin checks:

- Product information is complete and accurate
- Virus scan passed (all versions Clean)
- No copyright violations or malicious intent
- Complies with marketplace policies
- Dependencies exist and are compatible

## Step 8: Product is Published

Once approved:

1. Product appears in marketplace catalog
2. Customers can see, rate, and download your product
3. You can track downloads and ratings
4. Updates trigger new versions (automatically if GitHub-linked)

## Managing Published Products

### View Product Page

See how your product appears to customers:

1. Go to your product
2. Click **View on Marketplace**

### Edit Product

Update details after publication:

1. Go to your product
2. Click **Edit**
3. Modify info and save
4. Changes take effect immediately

### Upload New Version

Release updates:

1. Go to your product
2. Click **New Version**
3. Upload updated ZIP/commit to GitHub
4. Version is scanned automatically
5. Once Clean, customers can download the new version

### View Statistics

Monitor product performance:

1. Go to your product
2. See:
   - Total downloads
   - Download trend (7 days, 30 days, all-time)
   - Customer ratings and reviews
   - Recent activity

### Deactivate Product

Temporarily hide your product:

1. Go to your product
2. Click **Deactivate**
3. Product hidden from marketplace but can be reactivated later

### Delete Product

Permanently remove your product:

1. Go to your product
2. Click **Delete**
3. Click **Confirm**

Deletion is permanent and cannot be undone.

## Best Practices

1. **Clear Descriptions** — Help customers understand what your product does
2. **Accurate Pricing** — Price competitively and honestly
3. **Regular Updates** — Release updates to fix bugs and maintain compatibility
4. **Respond to Reviews** — Engage with customer feedback
5. **Use GitHub** — Simplifies updates and builds trust (shows active maintenance)
6. **Follow Policies** — No spam, malware, or copyright violations
7. **Semantic Versioning** — Use version numbers like 1.0.0, 1.1.0, 2.0.0
8. **Release Notes** — Document what changed in each version

::: tip
High-quality products with good ratings and regular updates are featured and promoted on the marketplace homepage. Invest in quality and customer support.
:::

See [Becoming an Author](./become-author.md) for author registration.
