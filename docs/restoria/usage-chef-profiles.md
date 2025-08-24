# Chef Profiles

Showcase your culinary team with Restoria's comprehensive chef profile management system. This feature allows you to highlight the expertise, experience, and personality of your kitchen staff.

## Creating Chef Profiles

### Adding a New Chef

1. Navigate to **Admin Panel** → **Restaurant** → **Our Chefs**
2. Click **Add New Chef**
3. Fill in the chef information:

#### Basic Information
- **Name**: Full name of the chef
- **Position**: Executive Chef, Sous Chef, Pastry Chef, etc.
- **Photo**: Professional headshot (recommended: 600x800px)
- **Bio**: Detailed biography and culinary journey
- **Years of Experience**: Professional experience
- **Specialties**: Signature dishes or cuisine types

#### Professional Details
- **Education**: Culinary schools and certifications
- **Previous Experience**: Notable restaurants or positions
- **Awards & Recognition**: Industry awards and achievements
- **Signature Dishes**: Famous creations
- **Cooking Philosophy**: Personal approach to cuisine

#### Social Media
- Facebook profile
- Instagram handle
- Twitter/X account
- LinkedIn profile
- Personal website

## Display Options

### Chef Gallery Page

Display all chefs in an attractive gallery layout:

```
[chef-team style="grid" columns="3"]
[chef-team style="carousel" show="4"]
[chef-team style="list" orderby="position"]
```

### Individual Chef Pages

Each chef can have a dedicated profile page featuring:

- Full biography
- Photo gallery
- Signature dishes
- Awards and achievements
- Media appearances
- Cooking classes or events

### Homepage Section

Feature your chef team on the homepage:

```
[chef-team featured="true" limit="3"]
[chef-team department="kitchen" style="minimal"]
```

## Chef Hierarchy

### Position Management

Organize your team by positions:

1. **Executive Chef** - Head of kitchen
2. **Sous Chef** - Second in command
3. **Chef de Partie** - Station chefs
4. **Pastry Chef** - Dessert specialist
5. **Line Cooks** - Kitchen team members
6. **Sommelier** - Wine expert

### Department Organization

Group chefs by department:
- Main Kitchen
- Pastry & Bakery
- Garde Manger (Cold Kitchen)
- Bar & Beverages
- Special Events

## Chef Features & Content

### Recipe Contributions

Link chefs to their signature dishes:

1. Go to **Restaurant** → **Menu Items**
2. Edit a menu item
3. Assign a chef in the **Created By** field
4. Display attribution on menu pages

### Blog Integration

Allow chefs to share their expertise:

- Recipe posts
- Cooking tips
- Seasonal ingredients
- Behind-the-scenes stories
- Food pairing suggestions

### Event Participation

Highlight chef involvement in:
- Cooking classes
- Wine dinners
- Guest chef events
- Food festivals
- Media appearances

## Styling & Customization

### Layout Styles

Choose from multiple display styles:

1. **Grid Layout** - Photo grid with hover effects
2. **Carousel** - Sliding chef profiles
3. **List View** - Detailed list with photos and bios
4. **Card Style** - Modern card-based design
5. **Timeline** - Career journey display

### Customization Options

In **Theme Options** → **Chef Profiles**, configure:

- Default layout style
- Photo shape (square, circle, rounded)
- Information to display
- Social media icons
- Hover effects
- Animation styles

## Special Features

### Chef of the Month

Highlight a featured chef:

1. Navigate to **Restaurant** → **Featured Chef**
2. Select the chef to feature
3. Add special content or interview
4. Display with `[featured-chef]` shortcode

### Team Schedule

Display chef availability:

```
[chef-schedule week="current"]
[chef-availability chef="john-doe"]
```

### Guest Chefs

Manage guest chef appearances:

1. Create guest chef profile
2. Set appearance dates
3. Link to special menu items
4. Promote on homepage

## Best Practices

### Photography Guidelines

- Use professional, high-quality photos
- Maintain consistent style across all profiles
- Include action shots in the kitchen
- Update photos regularly

### Content Tips

1. **Authentic Bios**: Write genuine, personal stories
2. **Highlight Uniqueness**: Emphasize what makes each chef special
3. **Update Regularly**: Keep achievements and positions current
4. **SEO Optimization**: Use relevant keywords naturally
5. **Engage Visitors**: Include interesting facts or quotes

### Team Building

- Feature all team members, not just head chefs
- Rotate featured chefs monthly
- Share team achievements
- Include behind-the-scenes content

## Widgets

### Chef Widgets

Add to sidebars or footers:

- **Featured Chef Widget**: Highlight current featured chef
- **Chef Quote Widget**: Display rotating chef quotes
- **Team Gallery Widget**: Mini chef gallery
- **Chef's Pick Widget**: Chef-recommended dishes

## Integration with Other Features

### Menu Integration

- Link chefs to their signature dishes
- Display "Chef's Recommendation" badges
- Show chef photos on menu items

### Reservation System

- Allow booking for specific chef's tables
- Chef's tasting menu reservations
- Private dining with the chef

### Events & Classes

- Chef-led cooking classes
- Wine pairing dinners
- Meet the chef events
- Culinary workshops

::: tip
Regularly update chef profiles with new achievements, menu contributions, and media appearances to keep content fresh and engaging.
:::

::: info
Consider creating video profiles or interviews with your chefs to add a personal touch and increase engagement.
:::