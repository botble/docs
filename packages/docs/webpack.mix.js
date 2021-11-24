let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const resourcePath = 'packages/docs';
const publicPath = 'public/vendor/docs';

mix.options({
    processCssUrls: false
});

mix
    .scripts([
        resourcePath + '/resources/assets/js/vendor/prism.js',
        resourcePath + '/resources/assets/js/vendor/hogan.js',
        resourcePath + '/resources/assets/js/vendor/typeahead.js',
        resourcePath + '/resources/assets/js/app.js',
    ], publicPath + '/js/app.js')
    .copy(publicPath + '/js/app.js', resourcePath + '/public/js')

    .sass(resourcePath + '/resources/assets/sass/app.scss', publicPath + '/css')
    .copy(publicPath + '/css/app.css', resourcePath + '/public/css');
