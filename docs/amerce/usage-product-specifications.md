# Product Specifications

Product specifications provide detailed technical information about your products in a structured, organized format. They display as tables on product pages and help customers make informed purchase decisions.

## Overview

The specification system has three components:

1. **Specification Groups** - Organize related specs (e.g., "Display", "Performance")
2. **Specification Attributes** - Individual specs within groups (e.g., "Screen Size", "RAM")
3. **Specification Tables** - Collections of groups applied to products

![Specification groups](./images/specification-groups.png)

## Creating Specification Groups

Groups organize related specifications together.

Navigate to `Ecommerce` -> `Specifications` -> `Groups` in the admin panel.

1. Click **Create**
2. Enter group details:
   - **Name** - Group title (e.g., "Display Specifications")
   - **Description** - Optional group description
3. Click **Save**

Common specification group examples:
- Display Specifications
- Performance
- Connectivity
- Physical Dimensions
- Battery & Power
- Camera Specifications

## Creating Specification Attributes

Attributes are the actual specifications within groups.

Navigate to `Ecommerce` -> `Specifications` -> `Attributes`.

1. Click **Create**
2. Fill in attribute details:
   - **Group** - Select the parent group
   - **Name** - Attribute label (e.g., "Screen Size")
   - **Type** - Field type (see below)
   - **Default Value** - Pre-filled value (optional)
3. Configure type-specific options
4. Click **Save**

### Specification Attribute Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Text** | Single-line text input | Short values (e.g., "6.1 inches") |
| **Textarea** | Multi-line text input | Long descriptions |
| **Select** | Dropdown menu | Predefined options (e.g., "Yes/No") |
| **Checkbox** | Multiple selections | Multiple features (e.g., connection types) |
| **Radio** | Single selection | Mutually exclusive options |

### Adding Options for Select/Checkbox/Radio

For `select`, `checkbox`, and `radio` types:

1. In the **Options** field, enter one option per line:
   ```
   Option 1
   Option 2
   Option 3
   ```
2. These become the selectable values

## Creating Specification Tables

Tables combine multiple groups for easy assignment to products.

Navigate to `Ecommerce` -> `Specifications` -> `Tables`.

1. Click **Create**
2. Enter table details:
   - **Name** - Table identifier (e.g., "Smartphone Specifications")
   - **Description** - Optional description
3. In **Groups** section:
   - Click **Add group**
   - Select specification group
   - Set display order
   - Repeat for all groups
4. Click **Save**

::: tip
Create different specification tables for different product types. For example:
- "Laptop Specs" for computers
- "Smartphone Specs" for phones
- "TV Specs" for televisions
:::

## Assigning Specifications to Products

### Method 1: Via Specification Table

1. Navigate to `Ecommerce` -> `Products`
2. Open a product
3. Scroll to **Specifications** section
4. Select a **Specification Table**
5. All attributes from that table appear
6. Fill in values for each attribute
7. Optional: Set **Display Order** for attributes
8. Optional: Check **Hidden** to hide specific attributes
9. Click **Save**

### Method 2: Manual Assignment

1. Open a product
2. In **Specifications** section, click **Add attribute**
3. Select individual attributes (without a table)
4. Fill in values
5. Click **Save**

## Configuring Attribute Values

For each attribute on a product:

| Setting | Description |
|---------|-------------|
| **Value** | The actual specification value |
| **Order** | Display priority (lower numbers first) |
| **Hidden** | Hide this attribute on frontend |

### Field Type Behavior

**Text/Textarea:**
- Enter free-form text
- Uses default value if left empty

**Select:**
- Choose one option from dropdown
- Must match predefined options

**Checkbox:**
- Select multiple options
- Values stored as comma-separated

**Radio:**
- Choose one option
- Mutually exclusive selection

## Display on Product Pages

Specifications display as grouped tables on product detail pages:

```
Display Specifications
━━━━━━━━━━━━━━━━━━━━
Screen Size     6.1 inches
Resolution      2532 x 1170 pixels
Display Type    OLED

Performance
━━━━━━━━━━━━━━━━━━━━
Processor       A15 Bionic
RAM             6GB
Storage         128GB
```

Order of display:
1. Groups appear in the order defined in Specification Table
2. Attributes within groups follow their Order setting
3. Hidden attributes don't display

## Hiding Specifications

You can hide specific attributes per product:

1. Open product
2. In specifications section, find the attribute
3. Check **Hidden**
4. Attribute won't display on frontend but remains in admin

Use cases:
- Not applicable for this product variant
- Information not yet available
- Temporarily hide without deleting

## Import/Export Specifications

### Export Specifications

Navigate to `Ecommerce` -> `Products` -> `Export Specifications`:

1. Select export format
2. Export includes:
   - Product ID
   - Product Name
   - Specification Table
   - All attribute values
3. Download file

### Import Specifications

Navigate to `Ecommerce` -> `Products` -> `Import Specifications`:

1. Download template
2. Fill in columns:
   - `product_id` or `product_name` - Product identifier
   - `specification_table` - Table name (optional)
   - `{attribute_name}` - Value for each attribute
3. Upload and import

::: warning
Product must exist before importing specifications. Import products first, then specifications.
:::

## Multi-language Support

If language plugin is active:

1. Edit specification attribute
2. Switch language in top bar
3. Translate attribute **Name**
4. Save for each language

Product-specific values:
1. Edit product
2. Switch language
3. Translate specification **Values**
4. Save

## Vendor-Specific Specifications (Marketplace)

If marketplace plugin is active:

Vendors can create their own specification groups and attributes:

1. Navigate to vendor dashboard
2. Go to `Products` -> `Specifications`
3. Create custom groups/attributes
4. These are vendor-specific and don't appear for other vendors

Admin-created specifications are available to all vendors.

## Troubleshooting

### Specifications not appearing on product page

1. **Check specification table assigned** - Product must have a table or manual attributes
2. **Verify attribute values filled** - Empty attributes may not display
3. **Check Hidden checkbox** - Ensure attributes aren't hidden
4. **Clear theme cache** - Run `php artisan cms:theme:assets:remove`

### Import fails with "Attribute not found"

1. **Check attribute names** - Must match exactly (case-sensitive)
2. **Create attributes first** - Import requires existing attributes
3. **Verify specification table** - Table name must exist if specified

### Can't edit vendor specifications as admin

By default, vendor-created specifications only appear in vendor scope. To access:

1. Disable global scope temporarily
2. Or access via vendor account

## Best Practices

1. **Plan your structure** - Create groups and attributes before assigning to products
2. **Use consistent naming** - Keep attribute names uniform across products
3. **Leverage specification tables** - Create reusable tables for product categories
4. **Set meaningful defaults** - Provide default values for common specs
5. **Order logically** - Display most important specs first
6. **Use appropriate types** - Select correct field type for each attribute
7. **Keep it relevant** - Only include specs customers care about
8. **Update regularly** - Keep specifications current as products evolve

## Example: Smartphone Specification Setup

**Groups:**
- Display
- Performance
- Camera
- Battery
- Connectivity

**Attributes (Display group):**
- Screen Size (text)
- Resolution (text)
- Display Type (select: OLED, LCD, AMOLED)
- Refresh Rate (select: 60Hz, 90Hz, 120Hz)

**Specification Table:**
- Name: "Smartphone Specifications"
- Groups: Display, Performance, Camera, Battery, Connectivity

Apply this table to all smartphone products, then fill in specific values per product.
