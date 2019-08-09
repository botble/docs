### Layouts

To use master layout in admin panel, please extend your view from `core.base::layouts.master`

Example:

```php
@extends('core.base::layouts.master')

@section('content')
    <p>Your content goes here</p>
@stop
```