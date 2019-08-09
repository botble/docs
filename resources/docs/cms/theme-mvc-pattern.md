# Theme MVC Pattern

 - [Theme structure](#theme_structure)
 
<a name="theme_structure"></a>
## Theme structure

You can start working develop theme base on default theme `ripple` or using starter theme by command:
    
```bash
php artisan cms:theme:create <your theme name>
```
 
Then you can see MVC pattern in your theme:

\- Models: `/public/themes/<your theme>/src/Models`

You can create folder `public/themes/<your theme>/src/Models` and put all models you need here. Namespace for it will be `Theme\Ripple\Models`.
> {note} `Theme\Ripple` is the namespace which autoload in `public/themes/<your theme>/composer.json`

Ex: `public/themes/<your theme>/src/Models/Post.php`

```php
namespace Theme\Ripple\Models;
    
use Eloquent;

class Post extends Eloquent
{
    protected $table = 'posts';
}
```

\- View: `/public/themes/<your theme>/views`

Views will be in `public/themes/<your theme>/views`.

\- Controllers: `/public/themes/<your theme>/src/Http/Controllers`

You can create folder `public/themes/<your theme>/src/Http/Controllers` and put all controllers you need here. Namespace for it will be `Theme\Ripple\Http\Controllers`.

\- Routes: ``/public/themes/<your theme>/routes`    
