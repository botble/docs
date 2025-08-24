# Gallery Management

Restoria's gallery system allows you to showcase your restaurant's ambiance, dishes, events, and team through beautiful image collections. Visual content is crucial for restaurants to attract customers and showcase their offerings.

## Creating Galleries

### Adding a New Gallery

1. Navigate to **Admin Panel** → **Galleries**
2. Click **Create New Gallery**
3. Configure gallery settings:

#### Basic Information
- **Name**: Gallery title (e.g., "Signature Dishes", "Restaurant Ambiance")
- **Description**: Brief description of the gallery
- **Slug**: URL-friendly version of the name
- **Status**: Published/Draft
- **Featured Image**: Cover image for the gallery

#### Gallery Categories
- Food & Dishes
- Restaurant Interior
- Restaurant Exterior
- Events & Celebrations
- Team & Staff
- Behind the Scenes
- Customer Moments
- Seasonal Specials

### Adding Images

1. Click **Add Images** in the gallery editor
2. Upload or select images from media library
3. For each image, add:
   - **Title**: Image caption
   - **Alt Text**: For SEO and accessibility
   - **Description**: Detailed description (optional)
   - **Order**: Arrange images

## Gallery Display Styles

### Layout Options

Restoria offers multiple gallery layouts:

1. **Masonry Grid** - Pinterest-style layout
   ```
   [gallery id="1" style="masonry" columns="3"]
   ```

2. **Classic Grid** - Uniform grid layout
   ```
   [gallery id="1" style="grid" columns="4"]
   ```

3. **Carousel Slider** - Sliding gallery
   ```
   [gallery id="1" style="carousel" items="5"]
   ```

4. **Lightbox Gallery** - Click to enlarge
   ```
   [gallery id="1" style="lightbox" thumbnails="true"]
   ```

5. **Filterable Gallery** - With category filters
   ```
   [gallery style="filter" categories="food,ambiance,events"]
   ```

## Gallery Categories

### Food Photography

Showcase your culinary creations:

- **Appetizers & Starters**
- **Main Courses**
- **Desserts & Sweets**
- **Beverages & Cocktails**
- **Daily Specials**
- **Seasonal Dishes**
- **Chef's Creations**

### Ambiance & Interior

Display your restaurant atmosphere:

- **Dining Areas**
- **Private Rooms**
- **Bar Area**
- **Outdoor Seating**
- **Decor Details**
- **Table Settings**
- **Lighting & Mood**

### Events & Occasions

Document special moments:

- **Wedding Receptions**
- **Corporate Events**
- **Birthday Celebrations**
- **Holiday Gatherings**
- **Live Entertainment**
- **Wine Tastings**
- **Cooking Classes**

## Advanced Features

### Smart Galleries

Create dynamic galleries that update automatically:

1. **Latest Dishes** - Automatically show newest menu items
2. **Seasonal Gallery** - Display current season's offerings
3. **Event Gallery** - Show upcoming event photos
4. **Instagram Feed** - Sync with your Instagram account

### Virtual Tour

Create an immersive experience:

1. Navigate to **Galleries** → **Virtual Tour**
2. Upload 360° photos or panoramas
3. Add hotspots with information
4. Link areas together
5. Embed on your website

### Before/After Galleries

Show transformations:
- Restaurant renovations
- Dish preparations
- Event setups
- Seasonal decorations

## Gallery Page Templates

### Full Gallery Page

Create a dedicated gallery page:

1. Go to **Pages** → **Add New**
2. Title: "Gallery" or "Photo Gallery"
3. Select template: **Gallery Page**
4. Choose galleries to display
5. Set layout preferences

### Category Pages

Separate pages for each gallery type:
- Food Gallery
- Interior Gallery
- Events Gallery
- Team Gallery

## Integration Options

### Menu Integration

Link galleries to menu items:

1. Edit menu item
2. Add gallery in **Photo Gallery** field
3. Display on menu pages
4. Show in lightbox on click

### Homepage Galleries

Add galleries to your homepage:

```
[gallery-section title="Our Dishes" category="food" limit="8"]
[gallery-featured style="slider"]
```

### Sidebar Widgets

Gallery widgets for sidebars:

- **Random Images Widget**
- **Latest Gallery Widget**
- **Category Gallery Widget**
- **Featured Gallery Widget**

## Optimization & Performance

### Image Optimization

Best practices for gallery images:

1. **Size**: Optimize for web (max 2000px width)
2. **Format**: Use JPEG for photos, PNG for graphics
3. **Compression**: Reduce file size without quality loss
4. **Lazy Loading**: Enable for better performance
5. **CDN**: Use content delivery network

### SEO Optimization

Improve gallery SEO:

- Add descriptive titles
- Use relevant alt text
- Include image descriptions
- Create gallery sitemaps
- Use structured data

## Social Media Integration

### Instagram Integration

Sync your Instagram feed:

1. Go to **Galleries** → **Instagram Settings**
2. Connect your Instagram account
3. Choose display options:
   - Number of photos
   - Update frequency
   - Layout style
   - Link behavior

### Social Sharing

Enable sharing options:

- Share buttons on images
- Pinterest save button
- Facebook share
- Twitter/X post
- WhatsApp share

## Gallery Management

### Bulk Actions

Manage multiple images efficiently:

- Bulk upload
- Batch edit titles/descriptions
- Bulk reorder
- Mass delete
- Category assignment

### Image Editor

Built-in editing tools:

- Crop and resize
- Rotate and flip
- Adjust brightness/contrast
- Apply filters
- Add watermarks

## Customer Galleries

### User-Submitted Photos

Allow customers to share photos:

1. Enable user submissions
2. Set moderation rules
3. Create submission form
4. Review and approve
5. Display in customer gallery

### Photo Contests

Run photo competitions:

- Set contest theme
- Define submission rules
- Create voting system
- Display winners
- Offer prizes

## Best Practices

### Photography Tips

1. **Lighting**: Use natural light when possible
2. **Composition**: Follow rule of thirds
3. **Styling**: Present dishes attractively
4. **Consistency**: Maintain visual style
5. **Quality**: Use professional photography

### Gallery Organization

- Group related images
- Use clear category names
- Regular updates
- Remove outdated photos
- Maintain reasonable gallery sizes

### Legal Considerations

- Obtain permissions for people in photos
- Credit photographers
- Respect copyright
- Use proper licensing
- Include model releases when needed

::: tip
Update your galleries regularly with fresh content to keep visitors engaged and showcase seasonal changes in your restaurant.
:::

::: warning
Always optimize images before uploading to ensure fast page load times. Large, unoptimized images can significantly slow down your website.
:::