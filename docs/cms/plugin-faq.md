# FAQ Plugin

## Introduction

The FAQ plugin for Botble CMS provides a powerful way to create and manage Frequently Asked Questions on your website. It allows you to organize FAQs into categories, add rich text answers, and automatically generate structured data for better SEO.

Key features of the FAQ plugin include:

- Create and manage FAQ items with questions and answers
- Organize FAQs into categories
- Add FAQ schema markup to pages and posts for better SEO
- Multi-language support with the Language Advanced plugin
- Integration with the admin dashboard

## Basic Usage

### Creating FAQ Categories

1. Go to **Admin Panel** → **FAQs** → **Categories**
2. Click **Create** to add a new category
3. Fill in the following information:
   - **Name**: The category name (e.g., "General Questions", "Product FAQs")
   - **Description**: Optional description of the category
   - **Order**: The display order of the category
   - **Status**: Published or Draft
4. Click **Save** to create the category

### Creating FAQ Items

1. Go to **Admin Panel** → **FAQs**
2. Click **Create** to add a new FAQ item
3. Fill in the following information:
   - **Category**: Select the category for this FAQ
   - **Question**: The question text
   - **Answer**: The answer text (supports rich text formatting)
   - **Status**: Published or Draft
4. Click **Save** to create the FAQ item

## Adding FAQs to Pages and Posts

The FAQ plugin allows you to add FAQ schema markup to your pages and posts, which helps search engines understand and display your content in rich search results.

### Enabling FAQ Schema

1. Go to **Admin Panel** → **Settings** → **FAQs**
2. Enable the "Enable FAQs Schema" option
3. Click **Save Changes**

### Adding FAQs to a Page or Post

1. Edit a page or post
2. Scroll down to the "FAQ schema configuration" meta box
3. You can add FAQs in two ways:
   - **Create new FAQ items**: Click "Add item" and fill in the question and answer fields
   - **Select existing FAQs**: Click "Select from existing FAQs" and check the FAQs you want to include
4. Save the page or post

The FAQ schema will be automatically added to the page or post as structured data, which can help your content appear in Google's rich search results.

## Displaying FAQs in Your Theme

### Using Custom Fields

You can use the Custom Fields plugin to create a repeater field for FAQs and display them in your theme:

```blade
@if (has_field($page, 'faq_items'))
    <section class="faq">
        <div class="container">
            <h2>{{ get_field($page, 'faq_title', 'Frequently Asked Questions') }}</h2>
            
            <div class="accordion">
                @php $faqItems = get_field($page, 'faq_items'); @endphp
                @foreach ($faqItems as $item)
                    <div class="accordion-item">
                        <h3 class="accordion-header">{{ get_sub_field($item, 'question') }}</h3>
                        <div class="accordion-body">
                            {!! get_sub_field($item, 'answer') !!}
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endif
```

### Creating a Custom Shortcode

You can create a custom shortcode to display FAQs from specific categories:

```php
// In your theme's functions/shortcodes.php file
use Botble\Faq\Models\FaqCategory;
use Botble\Shortcode\Compilers\Shortcode;
use Botble\Theme\Facades\Theme;

Shortcode::register('faqs', __('FAQs'), __('Display FAQs'), function (Shortcode $shortcode) {
    $categoryId = $shortcode->category_id;
    
    $faqs = [];
    
    if ($categoryId) {
        $category = FaqCategory::query()->find($categoryId);
        
        if ($category) {
            $faqs = $category->faqs()->wherePublished()->get();
        }
    } else {
        $faqs = \Botble\Faq\Models\Faq::query()->wherePublished()->get();
    }
    
    return Theme::partial('shortcodes.faqs', compact('faqs', 'shortcode'));
});

// Add admin config for the shortcode
Shortcode::setAdminConfig('faqs', function (array $attributes) {
    $categories = \Botble\Faq\Models\FaqCategory::query()
        ->wherePublished()
        ->pluck('name', 'id')
        ->toArray();
        
    return \Botble\Shortcode\Forms\ShortcodeForm::createFromArray($attributes)
        ->add('category_id', \Botble\Base\Forms\Fields\SelectField::class, [
            'label' => __('Category'),
            'choices' => ['' => __('All Categories')] + $categories,
        ]);
});
```

Then create a partial view for the shortcode in `platform/themes/your-theme/partials/shortcodes/faqs.blade.php`:

```blade
<div class="faqs-wrapper">
    @if ($shortcode->title)
        <h2>{{ $shortcode->title }}</h2>
    @endif
    
    @if (count($faqs) > 0)
        <div class="accordion" id="faq-accordion">
            @foreach ($faqs as $faq)
                <div class="accordion-item">
                    <h3 class="accordion-header" id="heading-{{ $faq->id }}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-{{ $faq->id }}" aria-expanded="false" aria-controls="collapse-{{ $faq->id }}">
                            {{ $faq->question }}
                        </button>
                    </h3>
                    <div id="collapse-{{ $faq->id }}" class="accordion-collapse collapse" aria-labelledby="heading-{{ $faq->id }}" data-bs-parent="#faq-accordion">
                        <div class="accordion-body">
                            {!! BaseHelper::clean($faq->answer) !!}
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <div class="alert alert-info">
            {{ __('No FAQs found') }}
        </div>
    @endif
</div>
```

## Programmatically Working with FAQs

### Retrieving FAQs

```php
use Botble\Faq\Models\Faq;
use Botble\Faq\Models\FaqCategory;

// Get all published FAQs
$faqs = Faq::query()->wherePublished()->get();

// Get FAQs from a specific category
$category = FaqCategory::query()->find($categoryId);
$faqs = $category->faqs()->wherePublished()->get();

// Get FAQs with their categories
$faqs = Faq::query()->with('category')->wherePublished()->get();
```

### Creating FAQs Programmatically

```php
use Botble\Faq\Models\Faq;

// Create a new FAQ
Faq::query()->create([
    'question' => 'What is Botble CMS?',
    'answer' => 'Botble CMS is a Laravel-based content management system.',
    'category_id' => $categoryId,
    'status' => 'published',
]);
```

## FAQ Schema and SEO

The FAQ plugin automatically generates structured data in the JSON-LD format for pages and posts that have FAQs attached to them. This structured data helps search engines understand your content and can lead to rich search results.

### Example of Generated Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Botble CMS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Botble CMS is a Laravel-based content management system."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install Botble CMS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can install Botble CMS by following the installation guide in the documentation."
      }
    }
  ]
}
```

## Multi-language Support

The FAQ plugin supports multiple languages when the Language Advanced plugin is activated. You can translate:

- FAQ questions and answers
- FAQ category names
- FAQ schema configuration

To translate FAQ content:

1. Make sure the Language Advanced plugin is activated
2. Go to **Admin Panel** → **FAQs** or **FAQ Categories**
3. Create or edit an item
4. Use the language switcher in the top-right corner to switch between languages
5. Translate the content for each language
6. Save the changes

## Best Practices

1. **Keep Questions Clear and Concise**: Write questions from the user's perspective and keep them clear and concise.

2. **Provide Comprehensive Answers**: Make sure your answers are thorough and address the question completely.

3. **Organize with Categories**: Use categories to organize your FAQs by topic, making it easier for users to find relevant information.

4. **Update Regularly**: Review and update your FAQs regularly to ensure the information remains accurate and relevant.

5. **Use Rich Formatting**: Take advantage of the rich text editor to format your answers with headings, lists, and links for better readability.

6. **Enable Schema Markup**: Always enable the FAQ schema markup to improve your SEO and chances of appearing in rich search results.

7. **Consider User Experience**: Design your FAQ display with user experience in mind, using accordions or collapsible sections to make long lists of FAQs more manageable.
