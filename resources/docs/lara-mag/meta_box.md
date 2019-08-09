# Meta box

- [add_meta_box()](#add_meta_box)
    - [Description](#add_meta_box_description)
    - [Parameters](#add_meta_box_parameters)
- [do_meta_boxes()](#do_meta_boxes)
    - [Description](#do_meta_boxes_description)
    - [Parameters](#do_meta_boxes_parameters)
    
This concept based on Wordpress functions.

<a name="add_meta_box"></a>
## add_meta_box()

** Reference: https://developer.wordpress.org/reference/functions/add_meta_box **

Function: Adds a meta box to one or more screens.

```php
add_meta_box(
    string $id, 
    string $title, 
    callable $callback, 
    string $screen = null, 
    string $context = 'advanced', 
    string $priority = 'default', 
    array $callback_args = null
);
```
    
<a name="add_meta_box_description"></a>
### Description


<a name="add_meta_box_parameters"></a>
### Parameters

**$id**:
- (string) (Required) Meta box ID (used in the 'id' attribute for the meta box).

**$title**:
- (string) (Required) Title of the meta box.

**$callback**:
- (callable) (Required) Function that fills the box with the desired content. The function should echo its output.

**$screen**:
- (string|array|WP_Screen) (Optional) The screen or screens on which to show the box (such as a post type, 'link', or 'comment'). Accepts a single screen ID, WP_Screen object, or array of screen IDs. Default is the current screen.
- Default value: null

**$context**:
- (string) (Optional) The context within the screen where the boxes should display. Available contexts vary from screen to screen. Post edit screen contexts include 'normal', 'side', and 'advanced'. Comments screen contexts include 'normal' and 'side'. Menus meta boxes (accordion sections) all use the 'side' context. Global
- Default value: 'advanced'

**$priority**:
- (string) (Optional) The priority within the context where the boxes should show ('high', 'low').
- Default value: 'default'

**$callback_args**:
- (array) (Optional) Data that should be set as the $args property of the box array (which is the second parameter passed to your callback).
- Default value: null

<a name="do_meta_boxes"></a>
## do_meta_boxes()

** Reference: https://developer.wordpress.org/reference/functions/do_meta_boxes **

Function: Meta-Box template function

```php
do_meta_boxes(string $screen, string $context, mixed $object)
```
    
<a name="do_meta_boxes_description"></a>
### Description

<a name="do_meta_boxes_parameters"></a>
### Parameters

**$screen**: 
- (string) (Required) Screen identifier

**$context**: 
- (string) (Required) box context
**$object**:
- (mixed) (Required) gets passed to the box callback function as first parameter