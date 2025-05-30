# AutocompleteField Documentation

The `AutocompleteField` is a form field component that provides autocomplete functionality with AJAX support for dynamic data loading. It extends the `SelectField` and integrates with Select2 for enhanced user experience.

## Features

- **AJAX Support**: Load options dynamically from server endpoints
- **Minimum Input Length**: Configure minimum characters before triggering search
- **Customizable Request Type**: Support for GET/POST requests
- **Placeholder Support**: Custom placeholder text
- **Multiple Selection**: Support for multiple value selection
- **Searchable**: Built-in search functionality
- **Caching**: Automatic response caching for better performance

## Basic Usage

### Simple Static Autocomplete

```php
use Botble\Base\Forms\FieldOptions\AutocompleteFieldOption;
use Botble\Base\Forms\Fields\AutocompleteField;

$this->add('category_id', AutocompleteField::class, 
    AutocompleteFieldOption::make()
        ->label('Category')
        ->choices([
            1 => 'Technology',
            2 => 'Business',
            3 => 'Health',
        ])
        ->selected(1)
        ->placeholder('Select a category')
);
```

### AJAX Autocomplete

```php
$this->add('user_id', AutocompleteField::class, 
    AutocompleteFieldOption::make()
        ->label('User')
        ->ajaxUrl(route('admin.users.search'))
        ->minimumInputLength(2)
        ->placeholder('Search for users...')
        ->requestType('GET')
);
```

## AutocompleteFieldOption Methods

### Core Configuration

#### `choices(array|Collection|Closure $choices)`
Set static choices for the autocomplete field.

```php
AutocompleteFieldOption::make()
    ->choices([
        'option1' => 'Label 1',
        'option2' => 'Label 2',
    ])
```

#### `selected(array|string|bool|float|null|Closure $selected)`
Set the selected value(s).

```php
AutocompleteFieldOption::make()
    ->selected('option1')
    // or for multiple
    ->selected(['option1', 'option2'])
```

### AJAX Configuration

#### `ajaxUrl(string $url)`
Set the AJAX endpoint URL for dynamic data loading.

```php
AutocompleteFieldOption::make()
    ->ajaxUrl(route('admin.categories.search'))
```

#### `minimumInputLength(int $length)`
Set minimum characters required before triggering AJAX search (default: 1).

```php
AutocompleteFieldOption::make()
    ->minimumInputLength(3)
```

#### `requestType(string $type)`
Set HTTP request method for AJAX calls (default: 'GET').

```php
AutocompleteFieldOption::make()
    ->requestType('POST')
```

### UI Configuration

#### `placeholder(string $placeholder)`
Set placeholder text for the field.

```php
AutocompleteFieldOption::make()
    ->placeholder('Start typing to search...')
```

#### `multiple(bool $multiple = true)`
Enable multiple selection.

```php
AutocompleteFieldOption::make()
    ->multiple()
```

#### `allowClear(bool $allowClear = true)`
Allow clearing the selection.

```php
AutocompleteFieldOption::make()
    ->allowClear()
```

## AJAX Endpoint Requirements

Your AJAX endpoint should return JSON in the following format:

```json
{
    "data": [
        {
            "id": 1,
            "name": "Option 1"
        },
        {
            "id": 2,
            "name": "Option 2"
        }
    ],
    "links": {
        "next": "http://example.com/api/search?page=2"
    }
}
```

### Expected Request Parameters

- `q`: Search term
- `page`: Page number for pagination (optional)

### Example Controller Method

```php
public function search(Request $request)
{
    $query = $request->get('q');
    $page = $request->get('page', 1);
    
    $users = User::where('name', 'like', "%{$query}%")
        ->paginate(10, ['*'], 'page', $page);
    
    return response()->json([
        'data' => $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
            ];
        }),
        'links' => [
            'next' => $users->nextPageUrl(),
        ],
    ]);
}
```

## Advanced Examples

### Multiple Selection with AJAX

```php
$this->add('tag_ids', AutocompleteField::class, 
    AutocompleteFieldOption::make()
        ->label('Tags')
        ->ajaxUrl(route('admin.tags.search'))
        ->multiple()
        ->minimumInputLength(2)
        ->placeholder('Search and select tags...')
        ->allowClear()
);
```

### Custom Attributes

```php
$this->add('product_id', AutocompleteField::class, 
    AutocompleteFieldOption::make()
        ->label('Product')
        ->ajaxUrl(route('admin.products.search'))
        ->addAttribute('data-custom-param', 'value')
        ->addAttribute('data-category-filter', 'electronics')
);
```

## JavaScript Integration

The autocomplete field automatically integrates with the existing Select2 implementation in `core.js`. The JavaScript looks for elements with the `select-autocomplete` class and initializes them with the following configuration:

- **Minimum Input Length**: From `data-minimum-input` attribute
- **AJAX URL**: From `data-url` attribute
- **Request Type**: From `data-type` attribute
- **Delay**: 250ms (built-in)
- **Caching**: Enabled by default

## Troubleshooting

### Common Issues

1. **AJAX not working**: Ensure your endpoint returns the correct JSON format
2. **No results showing**: Check that your endpoint is accessible and returns data
3. **Multiple selection not working**: Make sure to call `->multiple()` on the field option
4. **Styling issues**: Verify that Select2 CSS is loaded

### Debug Tips

1. Check browser network tab for AJAX requests
2. Verify endpoint response format
3. Ensure proper route registration
4. Check for JavaScript console errors

## Browser Support

The AutocompleteField supports all modern browsers that are compatible with Select2:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
