<?php

namespace Botble\Docs\Providers;

use Botble\Docs\Commands\UpdateDocs;
use Illuminate\Support\ServiceProvider;

class CommandServiceProvider extends ServiceProvider
{
    /**
     * @var \Illuminate\Foundation\Application
     */
    protected $app;

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                UpdateDocs::class,
            ]);
        }
    }
}
