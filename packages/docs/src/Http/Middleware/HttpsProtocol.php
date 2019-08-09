<?php

namespace Botble\Docs\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HttpsProtocol
{

    /**
     * @param Request $request
     * @param Closure $next
     * @return \Illuminate\Http\RedirectResponse
     * @author Sang Nguyen
     */
    public function handle($request, Closure $next)
    {
        if (!$request->secure() && env('ENABLE_HTTPS_SUPPORT', false)) {
            return redirect()->secure($request->getRequestUri());
        }

        return $next($request);
    }
}
