<?php

namespace Botble\Docs\Commands;

use Botble\Docs\Models\Documentation;
use PHPGit\Git;
use Illuminate\Support\Arr;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class UpdateDocsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'docs:update {doc?} {version?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update docs from GitHub.';

    /**
     * @var Git
     */
    protected $git;

    /**
     * @var Filesystem
     */
    protected $files;

    /**
     * @var Documentation
     */
    protected $docs;

    /**
     * UpdateDocs constructor.
     * @param Documentation $docs
     * @param Git $git
     * @param Filesystem $files
     */
    public function __construct(Documentation $docs, Git $git, Filesystem $files)
    {
        $this->git = $git;
        $this->docs = $docs;
        $this->files = $files;

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $doc = $this->argument('doc');
        $version = $this->argument('version');

        if ($doc) {
            $docs = [$doc];
        } else {
            $docs = array_keys($this->docs->getDocs());
        }

        $this->info('Updating ' . count($docs) . ' doc(s)...');

        foreach ($docs as $doc) {
            $this->updateDoc($doc, $version);
        }

        $this->info('Docs updated!');

        return true;
    }

    /**
     * Update documentation.
     *
     * @param string $doc
     * @param string|null $version
     * @return void
     */
    protected function updateDoc(string $doc, ?string $version = null)
    {
        $path = config('docs.path');

        if (! $data = Arr::get($this->docs->getDocs(), $doc)) {
            return;
        }

        if (! $this->files->exists("$path/$doc")) {
            $this->git->clone($data['repository'], "$path/$doc");
        }

        $this->git->setRepository("$path/$doc");

        $this->git->checkout('master');
        $this->git->pull('origin');

        if ($version) {
            $versions = [$version];
        } else {
            $versions = $this->getVersions();
        }

        foreach ($versions as $version) {
            $this->git->checkout($version);

            $this->git->pull('origin', $version);

            $this->git->checkout($version);

            $storagePath = public_path("docs/$doc/$version");

            $this->files->copyDirectory("$path/$doc", $storagePath);

            $this->docs->clearCache($doc, $version);
        }
    }

    /**
     * Get documentation versions from the repository.
     *
     * @return array
     */
    protected function getVersions(): array
    {
        $versions = [];

        $branches = $this->git->branch(['all' => true]);

        foreach ($branches as $branch) {
            preg_match('/origin\/(.*)/', $branch['name'], $matches);

            if (isset($matches[1]) && $matches[1] !== 'HEAD') {
                $versions[] = $matches[1];
            }
        }

        return $versions;
    }
}
