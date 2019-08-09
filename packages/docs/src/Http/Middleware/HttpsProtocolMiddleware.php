<?php

namespace Botble\Docs\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HttpsProtocolMiddleware
{

    /**
     * @param Request $request
     * @param Closure $next
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        if (!$request->secure() && config('docs.enable_https_support')) {
            return redirect()->secure($request->getRequestUri());
        }

        return $next($request);
    }
}
