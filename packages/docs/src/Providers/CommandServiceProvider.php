<?php

namespace Botble\Docs\Providers;

use Botble\Docs\Commands\UpdateDocsCommand;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class CommandServiceProvider extends ServiceProvider
{
    /**
     * @var Application
     */
    protected $app;

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                UpdateDocsCommand::class,
            ]);
        }
    }
}
