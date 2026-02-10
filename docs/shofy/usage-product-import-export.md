# Product Import & Export

Bulk import and export products to efficiently manage large catalogs, update inventory, sync with external systems, or migrate from other platforms.

## Overview

Available import/export operations:

| Operation | Purpose |
|-----------|---------|
| **Products** | Full product data including variations |
| **Prices** | Bulk price updates |
| **Inventory** | Stock levels and quantities |
| **Categories** | Category assignments |
| **Specifications** | Product specifications |
| **License Codes** | Digital product license codes |

## Exporting Products

Navigate to `Ecommerce` -> `Products` -> `Export`.

### Export Options

1. **Export Type:**
   - All products
   - Selected products only
   - Filter by category, brand, status

2. **Export Format:**
   - CSV (Recommended for Excel)
   - XLSX (Excel format)

3. **Include Variations:**
   - Check to export product variations
   - Uncheck for parent products only

4. Click **Export**

### Export File Structure

**Product Row** (`import_type` = `product`):
```csv
id,name,description,slug,sku,categories,status,is_featured,brand,price,...
123,Product Name,Description,product-slug,SKU123,Category1,publish,1,BrandName,99.99,...
```

**Variation Row** (`import_type` = `variation`):
```csv
id,name,description,slug,sku,product_attributes,import_type,price,quantity,...
,Product Name,,,VAR-SKU,Size:Large|Color:Red,variation,109.99,50,...
```

::: tip
Variations reference parent product by `name` or `slug`. Leave parent product fields empty for variations except `name`.
:::

## Importing Products

Navigate to `Ecommerce` -> `Products` -> `Import`.

### Import Process

1. **Download Template:**
   - Click **Download Template**
   - Review example data

2. **Prepare Data:**
   - Fill in your product data
   - Follow format requirements

3. **Upload File:**
   - Select CSV or Excel file
   - Configure import options

4. **Validation:**
   - System validates data
   - Shows errors if any

5. **Import:**
   - Click **Import**
   - Monitor progress

### Import Options

| Option | Description |
|--------|-------------|
| **Update existing products** | Update products with matching SKU or ID |
| **Skip existing products** | Only import new products (default) |
| **Generate SKU automatically** | Auto-create SKUs if missing |

### Required Columns

**For Products:**
- `name` - Product name (required)
- `status` - `publish`, `draft`, `pending`
- `stock_status` - `in_stock`, `out_of_stock`

**For Variations:**
- `name` or `slug` - Parent product identifier
- `product_attributes` - Attribute combinations
- `import_type` - Must be `variation`
- `sku` - Variation SKU

### Optional Columns

| Column | Format | Example |
|--------|--------|---------|
| `id` | Integer or UUID | `123` |
| `description` | Text | Product description |
| `slug` | URL-friendly | `product-slug` |
| `url` | Custom URL | `/custom-url` |
| `sku` | Alphanumeric | `PROD-123` |
| `categories` | Comma-separated | `Electronics,Phones` |
| `brand` | Brand name | `Apple` |
| `product_collections` | Comma-separated | `New Arrivals,Featured` |
| `labels` | Comma-separated | `Hot,Sale` |
| `taxes` | Comma-separated tax titles | `VAT,GST` |
| `image` | Image URL or path | `products/image.jpg` |
| `images` | Comma-separated URLs | `image1.jpg,image2.jpg` |
| `price` | Decimal | `99.99` |
| `sale_price` | Decimal | `79.99` |
| `start_date` | Date | `2024-01-01` |
| `end_date` | Date | `2024-12-31` |
| `quantity` | Integer | `100` |
| `weight` | Decimal | `0.5` |
| `length` | Decimal | `10` |
| `wide` | Decimal | `5` |
| `height` | Decimal | `2` |
| `cost_per_item` | Decimal | `50.00` |
| `barcode` | Alphanumeric | `123456789012` |
| `content` | HTML or text | Product details |
| `tags` | Comma-separated | `electronics,smartphone` |
| `product_type` | `physical` or `digital` | `physical` |
| `with_storehouse_management` | `0` or `1` | `1` |
| `is_featured` | `0` or `1` | `1` |
| `auto_generate_sku` | `0` or `1` | `1` |
| `generate_license_code` | `0` or `1` | `0` |
| `minimum_order_quantity` | Integer | `1` |
| `maximum_order_quantity` | Integer | `10` |
| `order` | Integer | `0` |

### SEO Columns

| Column | Example |
|--------|---------|
| `seo_title` | Product SEO Title |
| `seo_description` | Meta description for search engines |
| `seo_index` | `index` or `noindex` |

### Multi-language Columns

If multi-language is enabled:

| Column | Example |
|--------|---------|
| `name_(fr)` | French product name |
| `description_(fr)` | French description |
| `content_(fr)` | French content |

Replace `(fr)` with your language code.

## Product Attributes in Import

### For Parent Products

`product_attributes` column lists attribute set names:

```csv
product_attributes
Size,Color,Material
```

Creates attribute sets for the product.

### For Variations

`product_attributes` column specifies attribute combination:

```csv
product_attributes
Size:Large|Color:Red|Material:Cotton
```

Format: `AttributeSet:Value|AttributeSet:Value`

::: warning
Attribute sets and values must exist before import. Create them in `Ecommerce` -> `Attributes`.
:::

## Handling Images

### Image Formats

**Option 1: Relative Paths**
```csv
image
products/phone.jpg
```
File must exist in `storage/app/public/products/`

**Option 2: Full URLs**
```csv
image
https://example.com/images/phone.jpg
```
System downloads and stores image.

### Multiple Images

Comma-separated in `images` column:
```csv
images
products/image1.jpg,products/image2.jpg,https://example.com/image3.jpg
```

::: tip
For large imports with images, upload images to `storage/app/public/products/` first, then use relative paths in CSV.
:::

## Importing Variations

### Step-by-Step Process

1. **Prepare parent products** - Import parent products first
2. **Create attribute sets** - Ensure attributes exist in `Ecommerce` -> `Attributes`
3. **Prepare variation rows** - Format variation data
4. **Import** - Upload CSV with variations

### Variation CSV Example

```csv
name,slug,sku,product_attributes,import_type,price,quantity,is_variation_default
T-Shirt,,TSHIRT-001,Size|Color,product,20.00,0,0
T-Shirt,,TSHIRT-RED-S,Size:Small|Color:Red,variation,20.00,50,1
T-Shirt,,TSHIRT-RED-M,Size:Medium|Color:Red,variation,20.00,30,0
T-Shirt,,TSHIRT-BLUE-S,Size:Small|Color:Blue,variation,22.00,40,0
```

**Explanation:**
- Row 1: Parent product with Size and Color attribute sets
- Row 2: Small/Red variation (default)
- Row 3: Medium/Red variation
- Row 4: Small/Blue variation (higher price)

### Auto-Generate Variation SKUs

Enable `auto_generate_sku` for variations:

```csv
name,product_attributes,import_type,auto_generate_sku
T-Shirt,Size:Small|Color:Red,variation,1
```

Generated SKU format: `{parent_sku}-{attribute1}-{attribute2}`
Result: `TSHIRT-001-SMALL-RED`

## Importing Prices Only

Navigate to `Ecommerce` -> `Products` -> `Import Prices`.

### Price Import Format

```csv
id,sku,name,price,sale_price
123,SKU-123,Product Name,99.99,79.99
,SKU-VAR-1,,109.99,89.99
```

**Columns:**
- `id` or `sku` or `name` - Product identifier (at least one required)
- `price` - New base price
- `sale_price` - New sale price (optional)

::: tip
Use price import for quick price updates without modifying other product data.
:::

## Importing Inventory Only

Navigate to `Ecommerce` -> `Products` -> `Import Inventory`.

### Inventory Import Format

```csv
sku,name,quantity,stock_status,with_storehouse_management
SKU-123,Product Name,100,in_stock,1
SKU-VAR-1,Variation Name,50,in_stock,1
```

**Columns:**
- `sku` or `name` - Product identifier
- `quantity` - New stock level
- `stock_status` - `in_stock` or `out_of_stock`
- `with_storehouse_management` - Enable/disable inventory tracking

## Importing Categories

Navigate to `Ecommerce` -> `Products` -> `Import Categories`.

### Category Import Format

```csv
product_id,product_sku,product_name,categories
123,SKU-123,Product Name,Electronics|Smartphones|Samsung
```

**Categories:**
- Pipe-separated: `Category1|Category2|Category3`
- Or comma-separated: `Category1,Category2,Category3`

Categories must exist before import.

## Importing Specifications

Navigate to `Ecommerce` -> `Products` -> `Import Specifications`.

### Specification Import Format

```csv
product_id,specification_table,Screen Size,Resolution,Processor
123,Smartphone Specs,6.1 inches,2532x1170,A15 Bionic
```

**Columns:**
- `product_id` or `product_name` - Product identifier
- `specification_table` - Specification table name (optional)
- Dynamic columns for each specification attribute

## Common Import Errors

### "Product name is required"
- Ensure `name` column has values
- Check for empty rows

### "Invalid status value"
- Status must be: `publish`, `draft`, or `pending`
- Check spelling

### "SKU already exists"
- SKU must be unique
- Enable "Update existing products" to overwrite

### "Category not found"
- Create categories before import
- Check category names match exactly (case-sensitive)

### "Attribute not found"
- Create attribute sets and attributes first
- Verify attribute names match exactly

### "Invalid product_attributes format"
- Use format: `AttributeSet:Value|AttributeSet:Value`
- Check for typos in attribute names

### "Image not found"
- Verify image paths are correct
- Upload images to server first
- Or use full URLs

### "Barcode already exists"
- Barcode must be unique
- Enable "Update existing products" or change barcodes

## Best Practices

### Before Import

1. **Backup database** - Create backup before large imports
2. **Test with small batch** - Import 5-10 products first
3. **Validate data** - Check for required fields, formats
4. **Create dependencies** - Add categories, brands, attributes first
5. **Prepare images** - Upload images before import

### During Import

1. **Monitor progress** - Watch for validation errors
2. **Check logs** - Review Laravel logs for detailed errors
3. **Don't refresh** - Wait for import to complete
4. **Handle errors** - Fix errors and re-import failed rows

### After Import

1. **Verify data** - Check imported products
2. **Review variations** - Ensure variations link correctly
3. **Check images** - Verify images display
4. **Test pricing** - Confirm prices and sales
5. **Clear cache** - Run `php artisan cache:clear`
6. **Reindex search** - If using search plugin

## Performance Tips

### Large Imports (1000+ products)

1. **Split files** - Import in batches of 500-1000 rows
2. **Increase timeouts** - Adjust `max_execution_time` in php.ini
3. **Disable emails** - Temporarily disable notification emails
4. **Use CLI** - Import via command line for better performance
5. **Schedule imports** - Run during low-traffic periods

### Import Speed Optimization

```bash
# Increase PHP memory limit
php -d memory_limit=512M artisan import:products file.csv

# Disable query logging
DB_LOG_QUERIES=false

# Use queue for large imports
php artisan queue:work
```

## Troubleshooting

### Import stuck or times out

1. **Check PHP settings** - Increase `max_execution_time`, `memory_limit`
2. **Reduce batch size** - Split into smaller files
3. **Check server resources** - Monitor CPU, memory usage
4. **Review logs** - Check `storage/logs/laravel.log`

### Variations not linking to parent

1. **Verify parent exists** - Import parent product first
2. **Check name/slug match** - Variation must reference correct parent
3. **Validate attributes** - Ensure attribute sets exist on parent

### Prices not updating

1. **Enable "Update existing"** - Check update option
2. **Verify identifier** - Use correct SKU or ID
3. **Check number format** - Use decimal format (99.99, not 99,99)

## Export/Import Workflow Example

**Scenario:** Update prices and inventory for 500 products

1. **Export current products** - Get latest data
2. **Open in Excel** - Edit price and quantity columns
3. **Save as CSV** - Maintain proper encoding (UTF-8)
4. **Import prices** - Use "Import Prices" for speed
5. **Import inventory** - Use "Import Inventory" separately
6. **Verify changes** - Spot-check updated products

## Advanced: API Import

For programmatic imports:

```bash
POST /api/v1/products/import
Content-Type: multipart/form-data

file: products.csv
update_existing: true
```

See API documentation for details.
