# Breadcrumb

- [Breadcrumbs](#breadcrumbs)

<a name="breadcrumbs"></a>
## Breadcrumbs
In order to use breadcrumbs, follow the instruction below:
    
```php
Theme::breadcrumb()->add('label', 'http://...')->add('label2', 'http:...');
    
// or

Theme::breadcrumb()->add(array(
    array(
        'label' => 'label1',
        'url'   => 'http://...'
    ),
    array(
        'label' => 'label2',
        'url'   => 'http://...'
    )
));
```
    
To render breadcrumbs.

```php
{!! Theme::breadcrumb()->render() !!}
```
    
To customize breadcrumb, using this code:

```php
<ul class="breadcrumb">
    @foreach (Theme::breadcrumb()->getCrumbs() as $i => $crumb)
        @if ($i != (count(Theme::breadcrumb()->getCrumbs()) - 1))
            <li><a href="{{ $crumb['url'] }}">{!! $crumb['label'] !!}</a><span class="divider">/</span></li>
        @else
            <li class="active">{!! $crumb['label'] !!}</li>
        @endif
    @endforeach
</ul>
```
   