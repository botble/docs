# Digital Products

Digital products allow you to sell downloadable files and software licenses. Customers receive download links and license codes automatically after purchase.

## Overview

Digital product features:

1. **Downloadable Files** - PDF, audio, video, software, etc.
2. **License Codes** - Unique keys for software activation
3. **Auto-Delivery** - Instant access after payment
4. **Download Limits** - Control number of downloads
5. **Expiry Settings** - Time-limited access

## Enable Digital Products

Navigate to `Ecommerce` -> `Settings` -> `Digital Products`.

![Digital products settings](./images/digital-products-settings.png)

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable support for digital products** | Turn on/off digital product features | Off |
| **Allow guest checkout** | Let guests purchase without account | Off |
| **Enable license code system** | Use license key generation | Off |

Click **Save** after configuration.

::: warning
Digital products require a properly configured email system. Customers receive download links via email.
:::

## Creating Digital Products

### Step 1: Create Product

Navigate to `Ecommerce` -> `Products` -> `Create`.

1. Enter product details (name, description, price)
2. In **General** section, set **Product Type** = `Digital`
3. Configure pricing and settings
4. Click **Save**

### Step 2: Upload Digital Files

In the product edit page:

1. Scroll to **Digital Product Files** section
2. Click **Add File**
3. Choose upload method:

**Option 1: Upload File**
- Click **Browse**
- Select file from computer
- System uploads and stores securely

**Option 2: External Link**
- Enter direct download URL
- For files hosted elsewhere (Google Drive, Dropbox, etc.)
- Check **Is external link**

4. Configure file settings:
   - **File Name** - Display name for customer
   - **File Size** - Auto-detected or manual entry
5. Repeat for multiple files
6. Click **Save**

::: tip
For large files (>100MB), use external links to cloud storage instead of direct upload.
:::

### Supported File Types

Common file types for digital products:

| Category | Extensions |
|----------|-----------|
| Documents | PDF, DOC, DOCX, TXT, XLS, XLSX |
| Images | JPG, PNG, GIF, SVG, AI, PSD |
| Audio | MP3, WAV, FLAC, AAC |
| Video | MP4, AVI, MOV, MKV |
| Archives | ZIP, RAR, 7Z |
| Software | EXE, DMG, APK (use with caution) |

::: warning
Executable files (.exe, .dmg) may be blocked by some email providers. Consider providing download links via customer account instead.
:::

## License Code System

For software and activation-based products.

### Enable License Codes

1. Navigate to `Ecommerce` -> `Settings` -> `Digital Products`
2. Enable **Enable license code system**
3. Click **Save**

### Adding License Codes to Products

**Method 1: Auto-Generate**

1. Edit digital product
2. Check **Generate license code automatically**
3. Set **License code quantity** (number to generate)
4. System generates codes on purchase

**Method 2: Manual Entry**

Navigate to `Ecommerce` -> `License Codes`:

1. Click **Create**
2. Select **Product**
3. Enter **License Code**
4. Set **Status** = `Available`
5. Click **Save**
6. Repeat for all codes

**Method 3: Bulk Import**

Navigate to `Ecommerce` -> `License Codes` -> `Import`:

1. Download template
2. Fill in columns:
   ```csv
   product_id,product_sku,license_code,status
   123,PROD-001,XXXX-XXXX-XXXX-XXXX,available
   123,PROD-001,YYYY-YYYY-YYYY-YYYY,available
   ```
3. Upload CSV
4. Click **Import**

### License Code Status

| Status | Description |
|--------|-------------|
| **Available** | Not yet assigned |
| **Used** | Assigned to customer |

::: tip
Generate more license codes than expected sales. System automatically assigns available codes on purchase.
:::

## Download Settings

Configure download behavior per product.

### Download Limits

In product edit page, **Digital Product Settings** section:

| Setting | Description | Recommended |
|---------|-------------|-------------|
| **Maximum downloads** | Number of times customer can download | 3-5 |
| **Download expiry (days)** | Days until download link expires | 7-30 |

**Unlimited Downloads:**
- Set **Maximum downloads** = `0`

**No Expiry:**
- Set **Download expiry** = `0`

### Access Control

| Option | Use Case |
|--------|----------|
| **Limit downloads** | Prevent abuse, ensure compliance |
| **Set expiry** | Time-limited promotions |
| **Unlimited** | Lifetime access for premium products |

## Customer Download Process

### Purchase Flow

1. **Customer purchases** digital product
2. **Payment confirmed** - Order status = Completed
3. **System sends email** with:
   - Download links for each file
   - License codes (if enabled)
   - Access instructions
4. **Customer downloads** from email or account

### Download from Account

Customers can access downloads from their account:

1. Navigate to `My Account` -> `Downloads`
2. View all purchased digital products
3. Click **Download** button
4. View license codes (if applicable)

### Download Link Security

Download links are:
- **Unique per customer** - Cannot be shared
- **Time-limited** - Expire after set days
- **Count-limited** - Track download attempts
- **Logged** - Monitor download activity

## Email Notifications

### Download Email Template

Customize the download email:

1. Navigate to `Settings` -> `Email`
2. Find **Order Completed (Digital Product)**
3. Edit template variables:

| Variable | Description |
|----------|-------------|
| `customer_name` | Customer's name |
| `order_id` | Order reference number |
| `download_links` | HTML list of file links |
| `license_codes` | HTML list of codes |
| `expiry_date` | Download expiration date |

4. Click **Save**

### Test Email

1. Create test order
2. Mark as completed
3. Check email delivery
4. Verify download links work

## Managing License Codes

Navigate to `Ecommerce` -> `License Codes`.

### View License Codes

Filter by:
- **Product** - View codes for specific product
- **Status** - Available or Used
- **Assigned Order** - Track which order used code

### License Code Actions

| Action | Description |
|--------|-------------|
| **Edit** | Modify code or status |
| **Delete** | Remove code from system |
| **Mark as Available** | Reset used code |

::: warning
Marking used code as available may cause conflicts if customer already activated software.
:::

## Digital Product Variations

You can combine digital products with variations:

**Example:** Software with different editions

1. Create parent product (Software)
2. Add variations:
   - Basic Edition - $49
   - Pro Edition - $99
   - Enterprise Edition - $199
3. Upload different files per variation
4. Assign specific license codes per variation

Each variation can have:
- Different downloadable files
- Different license code pools
- Different pricing

## Digital + Physical Products

Customers can purchase both types in one order:

- **Digital products** - Deliver instantly
- **Physical products** - Ship separately
- **Order status** - Completed when physical items ship

## Refunds and Returns

### Refund Policy

Configure digital product refund policy:

1. Set return period (e.g., 7 days)
2. Track downloads before refund
3. Revoke access on refund

### Revoking Access

When refunding digital product:

1. Navigate to order
2. Issue refund
3. System automatically:
   - Disables download links
   - Marks license codes as revoked
   - Removes from customer downloads

## Security Best Practices

### File Storage

1. **Use secure storage** - Files stored outside public directory
2. **Generate signed URLs** - Temporary, expiring links
3. **Monitor downloads** - Track suspicious activity
4. **Watermark files** - Add customer info to PDF/images

### License Code Security

1. **Use strong format** - UUID or complex alphanumeric
2. **One-time use** - Prevent code sharing
3. **Verify on activation** - Validate codes server-side
4. **Track activations** - Monitor how codes are used

### Preventing Piracy

1. **Limit downloads** - Reasonable download count
2. **Expire links** - Time-limited access
3. **Track sharing** - Monitor if multiple IPs download
4. **Legal notices** - Include copyright in files
5. **Regular audits** - Review download patterns

## Troubleshooting

### Customer can't download files

1. **Check order status** - Must be "Completed"
2. **Verify email sent** - Check order emails
3. **Check expiry** - Download link may have expired
4. **Check download count** - May have exceeded limit
5. **Generate new link** - Admin can create new download

### License code not received

1. **Check email delivery** - Verify email sent
2. **Check spam folder** - Email may be filtered
3. **Verify codes available** - Check license code pool
4. **Manual assignment** - Admin can assign code manually

### Download link expired

**Admin Solution:**
1. Navigate to order
2. Click **Resend download links**
3. System generates fresh links with new expiry

**Customer Solution:**
1. Contact support
2. Request new download link

### File upload fails

1. **Check file size** - Verify server upload limits
2. **Check permissions** - Ensure `storage/app` is writable
3. **Use external link** - For very large files
4. **Check timeout** - Increase `max_execution_time`

## Import/Export Digital Products

### Export

Include digital product data:

```csv
product_type,generate_license_code
digital,1
```

### Import

Specify product type:

```csv
name,product_type,generate_license_code
Digital Product,digital,1
```

Upload files and license codes manually after import.

## Analytics & Reporting

Track digital product performance:

Navigate to `Ecommerce` -> `Reports`:

**Metrics:**
- Download count per product
- License code usage rate
- Most downloaded products
- Download errors/failures
- Average downloads per customer

## Best Practices

1. **Test thoroughly** - Purchase and download before launch
2. **Set reasonable limits** - Balance access and security
3. **Use cloud storage** - For large files
4. **Backup files** - Maintain copies of all digital products
5. **Monitor downloads** - Watch for unusual patterns
6. **Update files** - Keep digital products current
7. **Clear instructions** - Include usage guides
8. **Prompt delivery** - Ensure instant access
9. **Quality files** - Provide professional, working files
10. **Customer support** - Help with download issues quickly

## Example: Complete Setup

**Product:** Premium WordPress Theme

**Configuration:**
1. **Product Type:** Digital
2. **Price:** $59
3. **Files:**
   - Theme ZIP file (15MB)
   - Documentation PDF (2MB)
   - Video tutorial link (external)
4. **License Codes:** 100 pre-generated codes
5. **Download Settings:**
   - Maximum downloads: 5
   - Expiry: 30 days
6. **Email:** Custom template with installation instructions

**Customer Experience:**
1. Purchase theme ($59)
2. Payment confirmed
3. Receive email with:
   - Download button for ZIP
   - Download button for PDF
   - Video tutorial link
   - License code: `XXXX-XXXX-XXXX-XXXX`
4. Downloads ZIP, activates with license code
5. Can re-download 4 more times within 30 days
