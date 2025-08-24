# Restaurant Menu Management

The Restaurant Menu Management system in Restoria allows you to create, organize, and display your food and beverage offerings in an attractive and user-friendly format.

## Menu Display Styles

Restoria offers 5 different menu layout styles to showcase your culinary offerings:

1. **Menu Style 1** - Classic grid layout with images
2. **Menu Style 2** - Elegant list view with descriptions
3. **Menu Style 3** - Modern card-based design
4. **Menu Style 4** - Compact category-based layout
5. **Menu Style 5** - Full-width showcase style

## Creating Menu Items

To add new menu items to your restaurant:

1. Navigate to **Admin Panel** → **Restaurant** → **Menu Items**
2. Click on **Create New Item**
3. Fill in the required information:
   - **Item Name**: Name of the dish/beverage
   - **Description**: Brief description of the item
   - **Price**: Regular price
   - **Special Price** (optional): Discounted price for promotions
   - **Category**: Select or create a category (Appetizers, Main Courses, Desserts, etc.)
   - **Image**: Upload a high-quality photo of the dish
   - **Ingredients** (optional): List key ingredients
   - **Allergen Information**: Important for customer safety
   - **Dietary Tags**: Vegetarian, Vegan, Gluten-Free, etc.
   - **Availability**: Mark as available or temporarily unavailable

## Menu Categories

Organize your menu items into logical categories:

### Default Categories
- Appetizers & Starters
- Soups & Salads
- Main Courses
- Seafood Specialties
- Pasta & Pizza
- Desserts
- Beverages
- Wine & Spirits
- Kids Menu
- Daily Specials

### Creating Custom Categories

1. Go to **Admin Panel** → **Restaurant** → **Menu Categories**
2. Click **Add New Category**
3. Enter category details:
   - **Name**: Category title
   - **Description**: Brief description
   - **Icon**: Choose an icon to represent the category
   - **Sort Order**: Determine display order
   - **Status**: Active/Inactive

## Menu Display Options

### Displaying Menus on Pages

You can display menus using shortcodes:

```
[restaurant-menu style="1" categories="appetizers,main-courses,desserts"]
[restaurant-menu style="2" featured="true"]
[restaurant-menu style="3" limit="8" category="daily-specials"]
```

### Menu Page Templates

1. **Full Menu Page** - Display complete menu with all categories
2. **Category Pages** - Separate pages for each menu category
3. **Featured Items** - Highlight chef's recommendations
4. **Seasonal Menu** - Special seasonal offerings

## Special Features

### Daily Specials

Create and manage daily specials:

1. Navigate to **Restaurant** → **Daily Specials**
2. Select the day of the week
3. Choose menu items or create new special items
4. Set special pricing if applicable
5. Add special description or chef's notes

### Meal Periods

Configure different menus for different times:

- **Breakfast Menu** (6:00 AM - 11:00 AM)
- **Lunch Menu** (11:00 AM - 4:00 PM)
- **Dinner Menu** (4:00 PM - 10:00 PM)
- **Late Night Menu** (10:00 PM - 2:00 AM)

### Menu Customization Options

In **Theme Options** → **Restaurant Menu**, you can customize:

- Default menu layout style
- Price display format (with/without currency symbol)
- Show/hide dietary icons
- Enable nutrition information
- Display preparation time
- Show availability status
- Enable online ordering buttons

## Best Practices

1. **High-Quality Images**: Use professional photos at least 800x600px
2. **Clear Descriptions**: Write appetizing, concise descriptions
3. **Accurate Pricing**: Keep prices updated regularly
4. **Allergen Information**: Always include for customer safety
5. **Regular Updates**: Remove unavailable items promptly
6. **SEO Optimization**: Use descriptive names and keywords

## Menu Widgets

Add menu widgets to your sidebar or footer:

- **Today's Special Widget**: Display current special
- **Menu Categories Widget**: Quick category navigation
- **Popular Items Widget**: Show best-selling dishes
- **New Items Widget**: Highlight recently added items

## Printing and Export

### Print-Friendly Version

Generate a print-friendly version of your menu:

1. Go to **Restaurant** → **Export Menu**
2. Select format (PDF, Print View)
3. Choose categories to include
4. Customize layout and styling
5. Generate and download

### QR Code Menu

Create a QR code for contactless menu viewing:

1. Navigate to **Restaurant** → **QR Menu**
2. Select menu to display
3. Customize QR code design
4. Download QR code image
5. Print for table displays

::: tip
Keep your menu updated regularly to reflect seasonal changes, availability, and pricing adjustments. This helps maintain customer trust and satisfaction.
:::