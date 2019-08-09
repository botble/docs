<?php

namespace Botble\Docs\Providers;

use Botble\Docs\Http\Middleware\HttpsProtocolMiddleware;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use JacobBennett\Pjax\PjaxMiddleware;

class DocsServiceProvider extends ServiceProvider
{
    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;

    public function register()
    {
        /**
         * @var Router $router
         */
        $router = $this->app['router'];

        $router->pushMiddlewareToGroup('web', HttpsProtocolMiddleware::class);
        $router->pushMiddlewareToGroup('web', PjaxMiddleware::class);
    }

    public function boot()
    {
        $this->mergeConfigFrom(__DIR__ . '/../../config/docs.php', 'docs');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'docs');
        $this->loadRoutesFrom(__DIR__ . '/../../routes/web.php');

        if ($this->app->runningInConsole()) {
            $this->publishes([__DIR__ . '/../../config/docs.php' => config_path('docs.php')], 'config');
            $this->publishes([__DIR__ . '/../../resources/views' => resource_path('views/vendor/docs')], 'views');
            $this->publishes([__DIR__ . '/../../public' => public_path('vendor/docs')], 'public');
        }

        $this->app->register(CommandServiceProvider::class);
    }
}
