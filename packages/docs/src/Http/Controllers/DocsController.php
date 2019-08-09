<?php

namespace Botble\Docs\Http\Controllers;

use App\Http\Controllers\Controller;
use Botble\Docs\Documentation;
use Symfony\Component\DomCrawler\Crawler;

class DocsController extends Controller
{
    /**
     * @var Documentation
     */
    protected $docs;

    /**
     * DocsController constructor.
     * @param Documentation $docs
     */
    public function __construct(Documentation $docs)
    {
        $this->docs = $docs;
    }

    /**
     * Show all docs.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('docs::index', ['docs' => $this->docs->all()]);
    }

    /**
     * Show a documentation page.
     *
     * @param string $doc
     * @param string|null $version
     * @param string|null $page
     * @return \Illuminate\Http\Response
     */
    public function show($doc, $version = null, $page = null)
    {
        if (empty($version)) {
            $version = $this->docs->getDefaultVersion($doc);

            if (empty($version)) {
                abort(404);
            }

            return redirect()->route('show', [$doc, $version]);
        }

        if (empty($page)) {
            $page = $this->docs->getDefaultPage($doc, 'installation');
        }

        $content = $this->docs->getContent($doc, $version, $page);

        if (empty($content)) {
            abort(404);
        }

        $title = (new Crawler($content))->filterXPath('//h1');
        $title = count($title) ? $title->text() : null;

        return view('docs::show', [
            'toc'            => $this->docs->getToc($doc, $version),
            'title'          => $title,
            'content'        => $content,
            'currentDoc'     => $this->docs->all()[$doc],
            'currentVersion' => $version,
            'docs'           => $this->docs->all(),
            'versions'       => $this->docs->getVersions($doc),
            'page'           => $page,
        ]);
    }
}
