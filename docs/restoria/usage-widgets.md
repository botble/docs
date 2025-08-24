# Widgets

Widgets are modular content blocks that can be placed in various widget areas throughout your Restoria restaurant website. They provide dynamic functionality without requiring coding knowledge.

## Managing Widgets

Access widget management from **Appearance** → **Widgets** in your admin panel.

![Manage Widgets](./images/widgets/manage-widgets.png)

## Widget Areas

Restoria provides multiple widget areas optimized for restaurant websites:

### Header Widget Areas
- **Header Top Bar**: Above main navigation (contact info, hours)
- **Header Right**: Beside logo (reservation button, phone)

### Sidebar Widget Areas
- **Primary Sidebar**: Main content sidebar
- **Menu Sidebar**: Restaurant menu page sidebar
- **Blog Sidebar**: Blog and news pages
- **Shop Sidebar**: Online ordering pages

### Footer Widget Areas
- **Footer Column 1-4**: Four footer columns
- **Footer Bottom**: Copyright area
- **Footer Newsletter**: Newsletter signup area

### Special Widget Areas
- **Reservation Sidebar**: Booking page widgets
- **Gallery Sidebar**: Gallery page widgets
- **Home Page Sections**: Widgetized homepage areas

## Available Widgets

### Restaurant-Specific Widgets

#### Operating Hours Widget
Display your restaurant's hours of operation.

**Settings:**
- Title: Widget heading
- Display Format: List/Table/Compact
- Show Today: Highlight current day
- Show Status: Open/Closed indicator
- Holiday Hours: Special hours notice

![Operating Hours Widget](./images/widgets/operating-hours-widget.png)

#### Reservation Widget
Quick reservation form for sidebars.

**Settings:**
- Title: Form heading
- Form Type: Simple/Detailed
- Required Fields: Select fields
- Button Text: CTA text
- Success Message: Confirmation text

![Reservation Widget](./images/widgets/reservation-widget.png)

#### Menu Preview Widget
Showcase featured menu items.

**Settings:**
- Title: Widget title
- Category: Menu category to display
- Number of Items: Items to show
- Display Style: List/Grid/Carousel
- Show Price: Display pricing
- Show Image: Include photos

![Menu Preview Widget](./images/widgets/menu-preview-widget.png)

#### Today's Specials Widget
Highlight daily specials and promotions.

**Settings:**
- Title: Widget heading
- Auto-Update: Change daily
- Display Time: Lunch/Dinner/All day
- Show Price: Regular and special price
- CTA Button: Order/Reserve button

#### Location & Map Widget
Display restaurant location with map.

**Settings:**
- Title: Widget title
- Address: Full address
- Map Type: Google/OpenStreetMap
- Map Style: Standard/Satellite/Custom
- Zoom Level: Map zoom
- Directions Link: Get directions button

![Location Widget](./images/widgets/location-widget.png)

#### Chef's Message Widget
Personal message from the chef.

**Settings:**
- Title: Widget heading
- Chef Name: Chef's name
- Photo: Chef's photo
- Message: Welcome message
- Signature: Chef's signature image

#### Restaurant Gallery Widget
Mini gallery for sidebar display.

**Settings:**
- Title: Gallery title
- Gallery: Select gallery
- Number of Images: Images to show
- Layout: Grid/Slider/Masonry
- Lightbox: Enable lightbox

### Social & Contact Widgets

#### Social Media Icons
Display social media links.

**Settings:**
- Title: Widget title
- Icon Style: Round/Square/Text
- Icon Size: Small/Medium/Large
- Color Scheme: Brand/Custom/Monochrome
- Networks: Select active networks

![Social Icons Widget](./images/widgets/social-icons-widget.png)

#### Contact Information
Display contact details.

**Settings:**
- Title: Widget heading
- Show Phone: Display number
- Show Email: Display email
- Show Address: Display location
- Show Hours: Quick hours display
- Icons: Use icons or text

#### Newsletter Signup
Email subscription form.

**Settings:**
- Title: Subscribe heading
- Description: Brief text
- Button Text: Submit button
- Privacy Text: GDPR notice
- Success Message: Thank you text

### Content Widgets

#### Recent Posts
Display latest blog posts.

**Settings:**
- Title: Widget title
- Number of Posts: Posts to display
- Category: Filter by category
- Show Date: Display publish date
- Show Excerpt: Include preview text
- Show Thumbnail: Display images

![Recent Posts Widget](./images/widgets/recent-posts-widget.png)

#### Testimonials
Customer reviews display.

**Settings:**
- Title: Widget heading
- Number: Reviews to show
- Display Style: Slider/List/Grid
- Show Rating: Star ratings
- Show Date: Review date
- Auto-rotate: Carousel timing

#### Instagram Feed
Display Instagram posts.

**Settings:**
- Title: Feed title
- Username: Instagram handle
- Number of Posts: Posts to show
- Layout: Grid/Slider
- Show Caption: Display text
- Link to Instagram: Profile link

### Navigation Widgets

#### Custom Menu
Display any navigation menu.

**Settings:**
- Title: Menu title
- Select Menu: Choose menu
- Display Style: Vertical/Horizontal
- Show Icons: Menu icons
- Depth: Menu levels

#### Quick Links
Frequently accessed pages.

**Settings:**
- Title: Links heading
- Links: Add custom links
- Style: List/Buttons/Cards
- Icons: Add link icons
- Target: Same/New window

#### Breadcrumb
Navigation breadcrumbs.

**Settings:**
- Show Home: Include home link
- Separator: Separator character
- Show Current: Display current page

### Promotional Widgets

#### Special Offers
Highlight promotions.

**Settings:**
- Title: Offer heading
- Offer Type: Discount/Event/Special
- Valid Until: Expiry date
- CTA Button: Action button
- Background: Color/Image

#### Event Calendar
Upcoming restaurant events.

**Settings:**
- Title: Calendar title
- Number of Events: Events to show
- Display: List/Calendar/Cards
- Show Time: Include times
- Registration Link: RSVP button

#### Gift Cards
Promote gift cards.

**Settings:**
- Title: Widget title
- Card Image: Gift card visual
- Amounts: Available values
- Purchase Link: Buy button
- Terms: Terms text

## Adding Widgets

### Method 1: Drag and Drop

1. Navigate to **Appearance** → **Widgets**
2. Find desired widget in available widgets
3. Drag widget to target widget area
4. Configure widget settings
5. Click **Save**

### Method 2: Widget Selector

1. Click **+** in widget area
2. Search or browse widgets
3. Select widget to add
4. Configure settings
5. Save widget

![Add Widget](./images/widgets/add-widget.png)

## Configuring Widgets

Each widget has specific settings:

1. **Click widget** to expand settings
2. **Fill in fields** as needed
3. **Preview** changes (if available)
4. **Save** to apply changes
5. **Delete** to remove widget

![Configure Widget](./images/widgets/configure-widget.png)

## Widget Visibility

Control where widgets appear:

### Page-Specific Display
- Show on homepage only
- Hide on specific pages
- Display on menu pages
- Show on blog only

### User-Based Display
- Logged in users only
- Guests only
- Specific user roles

### Device-Based Display
- Desktop only
- Mobile only
- Tablet and above

### Time-Based Display
- Business hours only
- Specific days
- Date ranges
- Happy hour times

## Custom Widgets

### HTML Widget
Add custom HTML content.

```html
<div class="custom-widget">
    <h3>Special Announcement</h3>
    <p>Join us for Wine Wednesday!</p>
    <a href="/events" class="btn">Learn More</a>
</div>
```

### Shortcode Widget
Use any shortcode in widgets.

```
[reservation-form style="compact"]
```

### PHP Code Widget
For developers (use carefully):

```php
<?php
echo do_shortcode('[menu-special]');
?>
```

## Widget Styling

### Theme Styles
Widgets inherit theme styling automatically:
- Colors from theme options
- Typography settings
- Spacing and layout

### Custom CSS
Add custom widget styling:

```css
/* Custom widget styling */
.widget {
    background: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
}

.widget-title {
    color: #333;
    font-size: 20px;
    margin-bottom: 15px;
}

/* Restaurant hours widget */
.hours-widget .today {
    background: #ffe4b5;
    font-weight: bold;
}

.hours-widget .open {
    color: green;
}

.hours-widget .closed {
    color: red;
}
```

## Best Practices

### Widget Organization

1. **Logical Grouping**: Related widgets together
2. **Priority Order**: Important widgets first
3. **Avoid Clutter**: Don't overload areas
4. **Mobile Consider**: Test mobile display
5. **Performance**: Limit heavy widgets

### Content Guidelines

1. **Concise Text**: Brief widget content
2. **Clear CTAs**: Obvious action buttons
3. **Updated Info**: Keep hours, prices current
4. **Visual Balance**: Mix text and visual widgets
5. **Accessibility**: Proper labels and alt text

### Performance Tips

1. **Image Optimization**: Compress widget images
2. **Lazy Loading**: For image galleries
3. **Cache Widgets**: Enable widget caching
4. **Limit Social Feeds**: API calls impact speed
5. **Conditional Loading**: Load only when needed

## Widget Backup

### Export Widgets
1. Go to **Tools** → **Export**
2. Select **Widgets**
3. Download backup file

### Import Widgets
1. Go to **Tools** → **Import**
2. Upload widget backup
3. Map widget areas
4. Import settings

## Troubleshooting

### Widget Not Displaying
- Check widget area exists in theme
- Verify widget has content
- Clear cache after adding
- Check visibility settings

### Styling Issues
- Review theme compatibility
- Check custom CSS conflicts
- Verify responsive settings
- Test in different browsers

### Performance Issues
- Reduce number of widgets
- Optimize widget images
- Disable unused widgets
- Enable widget caching

### Widget Errors
- Check PHP syntax in custom widgets
- Verify API keys for social widgets
- Update widget plugins
- Review error logs

::: tip
Regularly review your widgets to ensure they're providing value to visitors. Remove outdated widgets and test new ones to improve user engagement.
:::