<?php

namespace Botble\Docs\Commands;

use Illuminate\Console\Command;
use Botble\Docs\Services\Indexer;

class IndexDocuments extends Command
{
    /**
     * The name of the console command.
     *
     * @var string
     */
    protected $name = 'docs:index';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Index all documentation on Algolia';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        app(Indexer::class)->indexAllDocuments();
    }
}
