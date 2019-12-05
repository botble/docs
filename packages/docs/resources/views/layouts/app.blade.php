<!DOCTYPE html>
<html lang="en">
    <head>
        @include('docs::partials.head')
        <title>@if (isset($currentDoc)){{ $title }} - {{ $currentDoc['name'] }} {{ $currentVersion }} - Botble @else Botble - Documents @endif</title>

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="@if (isset($currentDoc)){{ $title }} - {{ $currentDoc['name'] }} {{ $currentVersion }} - Botble @else Botble - Documents @endif" />
        <meta property="og:description" content="Document for all Botble products" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:site_name" content="Botble Documents" />
        <meta property="article:publisher" content="https://facebook.com/botble.technologies" />
        <meta property="article:author" content="https://www.facebook.com/SangNguyen2603" />
        <meta property="article:tag" content="botble document" />
        <meta property="article:section" content="PHP" />
        <meta property="article:published_time" content="2017-07-02T14:46:16+00:00" />
        <meta property="article:modified_time" content="2017-07-02T14:48:37+00:00" />
        <meta property="og:updated_time" content="2017-07-02T14:48:37+00:00" />
        <meta property="fb:app_id" content="800463043406447" />
        <meta property="og:image" content="https://s3.envato.com/files/229656828/screenshot.png" />
        <meta property="og:image:width" content="590" />
        <meta property="og:image:height" content="300" />
    </head>
    <body>
        <div id="pjax-container">
            @yield('content')
        </div>

        <div class="footer">
            Built with <a href="https://laravel.com/" target="_blank">Laravel</a>
            and developed by <a href="https://botble.com" target="_blank">Botble Team</a>.
            © {{ date('Y') }} <a href="http://sangnguyen.info" target="_blank">Sang Nguyen</a>.
        </div>

        @include('docs::partials.scripts')
        @include('docs::partials.ga')
    </body>
</html>
