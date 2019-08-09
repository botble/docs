# Customization

- [Assets](#assets)
- [Views](#views)
- [Translations](#translations)

## Assets

If you wish to edit something in the JavaScript/Sass files, you have to compile them with [Laravel Mix](http://laravel.com/docs/5.4/mix).

From your terminal, cd into the `media` directory and install the npm dependencies:

With npm:

```bash
npm install
```

Or the recommended way, with [Yarn](http://yarnpkg.com/):

```bash
yarn 
```

After you make your changes run `npm run build` to compile the assets.

Each time the assets are compiled you have to run 

```bash
php artisan vendor:publish --provider="Botble\Media\Providers\MediaServiceProvider" --tag=assets --force
```
 
to override them in your public directory. 

Or you edit the `webpack.mix.js` and change the `publicPath` variable:

```javascript
const publicPath = './../public/vendor/media'
```
_Assuming that you have the `media` folder in your project root directory._

## Views

If you wish to customize the views run:

```bash
php artisan vendor:publish --provider="Botble\Media\Providers\MediaServiceProvider" --tag=views --force
```

Then edit them from `resources/views/vendor/media`.

## Translations

```bash
php artisan vendor:publish --provider="Botble\Media\Providers\MediaServiceProvider" --tag=lang --force
```

> {info} See [Overriding Vendor Language Files](https://laravel.com/docs/5.4/localization#overriding-package-language-files).
