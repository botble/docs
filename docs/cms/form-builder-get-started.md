# Form Builder - Get Started

We're utilizing the - [kristijanhusak/laravel-form-builder](https://github.com/kristijanhusak/laravel-form-builder) package for form construction. 
For more details, please refer to the official documentation - [here](https://kristijanhusak.github.io/laravel-form-builder).

## Adding fields to a form

```php
use Botble\Todo\Models\Todo;
use Botble\Todo\Http\Requests\TodoRequest;
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

$this
    ->setUpModel(new Todo()) // Model which will be used in form (data will be saved to this model)
    ->setValidatorClass(TodoRequest::class) // Will parse Laravel request rules in client side (using jquery validate)
    ->add('name', TextField::class, TextFieldOption::make()->required())
    ->add('description', TextareaField::class, TextareaFieldOption::make()->required())
    ->add('content', EditorField::class, EditorFieldOption::make()->required())
```

## Displaying form

```php
{!! \Botble\Todo\Forms\TodoForm::create()->renderForm() !!}
```

## Available fields

## Other Fields
- AlertField.php: platform/core/base/src/Forms/Fields/AlertField.php
- AutocompleteField.php: platform/core/base/src/Forms/Fields/AutocompleteField.php
- CheckboxField.php: platform/core/base/src/Forms/Fields/CheckboxField.php
- CkEditorField.php: platform/core/base/src/Forms/Fields/CkEditorField.php
- CodeEditorField.php: platform/core/base/src/Forms/Fields/CodeEditorField.php
- ColorField.php: platform/core/base/src/Forms/Fields/ColorField.php
- ColorSelectorField.php: platform/core/base/src/Forms/Fields/ColorSelectorField.php
- CoreIconField.php: platform/core/base/src/Forms/Fields/CoreIconField.php
- DateField.php: platform/core/base/src/Forms/Fields/DateField.php
- DatePickerField.php: platform/core/base/src/Forms/Fields/DatePickerField.php
- DatetimeField.php: platform/core/base/src/Forms/Fields/DatetimeField.php
- EditorField.php: platform/core/base/src/Forms/Fields/EditorField.php
- EmailField.php: platform/core/base/src/Forms/Fields/EmailField.php
- GoogleFontsField.php: platform/core/base/src/Forms/Fields/GoogleFontsField.php
- HtmlField.php: platform/core/base/src/Forms/Fields/HtmlField.php
- LabelField.php: platform/core/base/src/Forms/Fields/LabelField.php
- MediaFileField.php: platform/core/base/src/Forms/Fields/MediaFileField.php
- MediaImageField.php: platform/core/base/src/Forms/Fields/MediaImageField.php
- MediaImagesField.php: platform/core/base/src/Forms/Fields/MediaImagesField.php
- MultiCheckListField.php: platform/core/base/src/Forms/Fields/MultiCheckListField.php
- NumberField.php: platform/core/base/src/Forms/Fields/NumberField.php
- OnOffCheckboxField.php: platform/core/base/src/Forms/Fields/OnOffCheckboxField.php
- OnOffField.php: platform/core/base/src/Forms/Fields/OnOffField.php
- PasswordField.php: platform/core/base/src/Forms/Fields/PasswordField.php
- PhoneNumberField.php: platform/core/base/src/Forms/Fields/PhoneNumberField.php
- RadioField.php: platform/core/base/src/Forms/Fields/RadioField.php
- RepeaterField.php: platform/core/base/src/Forms/Fields/RepeaterField.php
- SelectField.php: platform/core/base/src/Forms/Fields/SelectField.php
- TagField.php: platform/core/base/src/Forms/Fields/TagField.php
- TextareaField.php: platform/core/base/src/Forms/Fields/TextareaField.php
- TextField.php: platform/core/base/src/Forms/Fields/TextField.php
- TimeField.php: platform/core/base/src/Forms/Fields/TimeField.php
- TimePickerField.php: platform/core/base/src/Forms/Fields/TimePickerField.php
- TinyMceField.php: platform/core/base/src/Forms/Fields/TinyMceField.php
- TreeCategoryField.php: platform/core/base/src/Forms/Fields/TreeCategoryField.php
- UiSelectorField.php: platform/core/base/src/Forms/Fields/UiSelectorField.php