# UI Block

UI Blocks are pre-designed content sections that help you build beautiful restaurant pages quickly. Restoria provides specialized shortcodes tailored for the food and hospitality industry.

## How to Use UI Blocks

### Adding UI Blocks to Pages

1. Navigate to **Pages** in your admin panel
2. Create a new page or edit an existing one
3. Click the **UI Block** button in the editor
4. Select the desired shortcode from the list
5. Configure the shortcode settings
6. Click **Insert** to add it to your page

![UI Block Button](./images/ui-blocks/shortcode-button.png)

### Editing UI Blocks

To modify an existing UI block:

1. Click on the shortcode in the editor
2. Select **Edit** from the toolbar
3. Update the settings as needed
4. Click **Update** to save changes

![Edit Shortcode](./images/ui-blocks/shortcode-edit.png)

## Available Shortcodes

### Restaurant-Specific Shortcodes

#### Hero Banner
Create stunning hero sections with various styles perfect for restaurants.

```
[hero-banner title="Welcome to Restoria" subtitle="Experience Fine Dining" style="video" background_image="banner.jpg" reservation_button="yes"][/hero-banner]
```

**Parameters:**
- `title`: Main heading text
- `subtitle`: Supporting text
- `style`: Choose from `minimal`, `standard`, `video`, `category`, `rolling`
- `background_image`: Background image URL
- `background_video`: Video URL for video style
- `reservation_button`: Show/hide reservation CTA button
- `menu_button`: Show/hide menu button

![Hero Banner](./images/ui-blocks/shortcode-hero-banner.png)

#### Restaurant Menu Categories
Display your menu categories in an attractive grid or carousel.

```
[menu-categories title="Our Menu" subtitle="Discover Our Culinary Delights" style="grid" limit="6"][/menu-categories]
```

**Parameters:**
- `title`: Section heading
- `subtitle`: Section description
- `style`: Display style (`grid`, `carousel`, `masonry`)
- `limit`: Number of categories to show
- `show_description`: Display category descriptions
- `columns`: Number of columns (2-4)

![Menu Categories](./images/ui-blocks/shortcode-menu-categories.png)

#### Restaurant Menu Section
Showcase your menu items with prices and descriptions.

```
[restaurant-menu title="Today's Specials" category="main-dishes" style="elegant" show_price="yes"][/restaurant-menu]
```

**Parameters:**
- `title`: Section title
- `category`: Menu category to display
- `style`: Display style (`classic`, `elegant`, `modern`, `minimal`, `detailed`)
- `show_price`: Display prices
- `show_description`: Show item descriptions
- `show_dietary`: Display dietary information
- `limit`: Number of items to show

![Restaurant Menu](./images/ui-blocks/shortcode-restaurant-menu.png)

#### Reservation Section
Add a beautiful reservation form with customizable fields.

```
[reserve-section title="Book Your Table" style="centered" show_availability="yes"][/reserve-section]
```

**Parameters:**
- `title`: Form heading
- `subtitle`: Form description
- `style`: Form style (`inline`, `centered`, `sidebar`)
- `show_availability`: Display available time slots
- `show_special_requests`: Include special requests field
- `background_image`: Background for the section

![Reservation Section](./images/ui-blocks/shortcode-reserve-section.png)

#### Chef Team Section
Introduce your culinary team with style.

```
[chef-team-section title="Meet Our Chefs" style="cards" limit="4"][/chef-team-section]
```

**Parameters:**
- `title`: Section title
- `subtitle`: Section description
- `style`: Display style (`cards`, `carousel`, `grid`)
- `limit`: Number of chefs to display
- `show_bio`: Display chef biographies
- `show_social`: Show social media links

![Chef Team](./images/ui-blocks/shortcode-chef-team.png)

#### Gallery Section
Display your restaurant ambiance and dishes.

```
[gallery-section title="Restaurant Gallery" style="masonry" category="ambiance" limit="12"][/gallery-section]
```

**Parameters:**
- `title`: Gallery title
- `style`: Layout style (`grid`, `masonry`, `carousel`, `lightbox`)
- `category`: Gallery category to display
- `limit`: Number of images
- `columns`: Number of columns
- `show_filter`: Display category filter

![Gallery Section](./images/ui-blocks/shortcode-gallery.png)

#### Special Offer Section
Highlight your promotions and special events.

```
[special-offer title="Happy Hour" description="50% off on selected drinks" time="5PM - 7PM" style="banner"][/special-offer]
```

**Parameters:**
- `title`: Offer title
- `description`: Offer details
- `time`: Valid time/date
- `style`: Display style (`banner`, `card`, `popup`)
- `background_image`: Background image
- `cta_text`: Call-to-action button text
- `cta_link`: Button link

![Special Offer](./images/ui-blocks/shortcode-special-offer.png)

### Content Sections

#### About Introduction
Tell your restaurant's story.

```
[about-intro title="Our Story" years_experience="25" style="classic"][/about-intro]
```

**Parameters:**
- `title`: Section title
- `subtitle`: Section subtitle
- `years_experience`: Years in business
- `style`: Display style (`classic`, `modern`, `minimal`)
- `image`: Featured image
- `signature_image`: Chef's signature image

![About Intro](./images/ui-blocks/shortcode-about-intro.png)

#### Services Section
Showcase your restaurant services.

```
[services-section title="Our Services" style="icons" columns="3"][/services-section]
```

**Parameters:**
- `title`: Section title
- `style`: Display style (`icons`, `images`, `cards`)
- `columns`: Number of columns
- `services`: Comma-separated service IDs

![Services](./images/ui-blocks/shortcode-services.png)

#### Testimonials Section
Display customer reviews and testimonials.

```
[testimonials-section title="What Our Guests Say" style="carousel" limit="6"][/testimonials-section]
```

**Parameters:**
- `title`: Section title
- `style`: Display style (`carousel`, `grid`, `masonry`)
- `limit`: Number of testimonials
- `show_rating`: Display star ratings
- `show_date`: Show review dates

![Testimonials](./images/ui-blocks/shortcode-testimonials.png)

#### News Section
Show latest blog posts or news.

```
[news-section title="Latest News" category="events" limit="3" style="cards"][/news-section]
```

**Parameters:**
- `title`: Section title
- `category`: Post category
- `limit`: Number of posts
- `style`: Display style (`cards`, `list`, `grid`)
- `show_date`: Display post dates
- `show_excerpt`: Show post excerpts

![News Section](./images/ui-blocks/shortcode-news.png)

### Interactive Elements

#### Intro Video
Add an engaging video section.

```
[intro-video title="Experience Our Kitchen" video_url="youtube.com/watch?v=xxx" poster_image="poster.jpg"][/intro-video]
```

**Parameters:**
- `title`: Video title
- `video_url`: YouTube or Vimeo URL
- `poster_image`: Video thumbnail
- `style`: Display style (`popup`, `inline`, `background`)
- `autoplay`: Auto-play video

![Intro Video](./images/ui-blocks/shortcode-intro-video.png)

#### We Offer Section
Highlight what makes your restaurant special.

```
[we-offer title="Why Choose Us" style="features" columns="3"][/we-offer]
```

**Parameters:**
- `title`: Section title
- `style`: Display style (`features`, `benefits`, `cards`)
- `columns`: Number of columns
- `items`: Feature items

## Combining UI Blocks

Create compelling pages by combining multiple UI blocks:

### Example: Complete Homepage

```
[hero-banner style="video" title="Welcome to Restoria" reservation_button="yes"][/hero-banner]

[about-intro title="Our Story" years_experience="25"][/about-intro]

[menu-categories title="Explore Our Menu" style="carousel"][/menu-categories]

[special-offer title="Lunch Special" description="3-course meal at $29"][/special-offer]

[chef-team-section title="Meet Our Chefs" limit="3"][/chef-team-section]

[gallery-section title="Restaurant Gallery" style="masonry"][/gallery-section]

[testimonials-section title="Guest Reviews" style="carousel"][/testimonials-section]

[reserve-section title="Reserve Your Table" style="centered"][/reserve-section]
```

### Example: Menu Page

```
[hero-banner style="minimal" title="Our Menu" background_image="menu-hero.jpg"][/hero-banner]

[menu-categories title="Menu Categories" style="grid"][/menu-categories]

[restaurant-menu category="appetizers" title="Appetizers"][/restaurant-menu]

[restaurant-menu category="main-dishes" title="Main Dishes"][/restaurant-menu]

[restaurant-menu category="desserts" title="Desserts"][/restaurant-menu]

[special-offer title="Wine Pairing Available"][/special-offer]
```

## Best Practices

### Performance Tips

1. **Optimize Images**: Use compressed images for faster loading
2. **Limit Items**: Don't display too many items in carousels
3. **Lazy Loading**: Enable for image-heavy sections
4. **Cache**: Use caching for dynamic content

### Design Guidelines

1. **Consistency**: Use consistent styles across UI blocks
2. **Spacing**: Maintain proper spacing between sections
3. **Mobile-First**: Test all blocks on mobile devices
4. **Accessibility**: Ensure proper alt text and ARIA labels

### Content Tips

1. **High-Quality Images**: Use professional food photography
2. **Clear CTAs**: Make reservation and menu buttons prominent
3. **Fresh Content**: Regularly update specials and galleries
4. **SEO**: Use descriptive titles and alt text

## Customization

### Custom Styling

Add custom CSS to modify UI block appearance:

```css
/* Custom menu item styling */
.restaurant-menu-item {
    border-bottom: 1px dotted #ddd;
    padding: 15px 0;
}

.menu-item-price {
    color: #d4af37;
    font-weight: bold;
}
```

### Creating Custom Shortcodes

Developers can create custom shortcodes in the theme:

1. Navigate to `/platform/themes/restoria/functions/`
2. Create a new shortcode file
3. Register the shortcode
4. Add to the UI Block list

## Troubleshooting

### Shortcode Not Displaying

- Check if the shortcode is properly closed `[/shortcode]`
- Verify all required parameters are provided
- Clear cache after adding shortcodes

### Styling Issues

- Clear browser cache
- Check for CSS conflicts
- Verify theme options are properly set

### Performance Issues

- Optimize images before uploading
- Limit the number of items displayed
- Enable caching in settings

::: tip
Preview your pages regularly to ensure UI blocks display correctly across different devices and screen sizes.
:::