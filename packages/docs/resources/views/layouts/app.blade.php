<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1" name="viewport"/>
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <title>@if (isset($currentDoc)){{ $title }} - {{ $currentDoc['name'] }} {{ $currentVersion }} - Botble @else Botble - Documents @endif</title>

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="@if (isset($currentDoc)){{ $title }} - {{ $currentDoc['name'] }} {{ $currentVersion }} - Botble @else Botble - Documents @endif" />
        <meta property="og:description" content="Document for all Botble's products" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:site_name" content="Botble Documents" />
        <meta property="article:publisher" content="https://facebook.com/botble.technologies" />
        <meta property="article:author" content="https://facebook.com/botble.technologies" />
        <meta property="article:tag" content="botble document" />
        <meta property="article:section" content="PHP" />
        <meta property="article:published_time" content="2020-07-22T14:46:16+00:00" />
        <meta property="article:modified_time" content="2020-07-22T14:48:37+00:00" />
        <meta property="og:updated_time" content="2020-07-22T14:48:37+00:00" />
        <meta property="fb:app_id" content="800463043406447" />
        <meta property="og:image" content="https://codecanyon.img.customer.envatousercontent.com/files/296511789/banner.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=8472556ebcddf747a4552a099ed8afae" />
        <meta property="og:image:width" content="590" />
        <meta property="og:image:height" content="300" />

        <link rel="stylesheet" href="{{ asset('vendor/docs/css/app.css') }}?v=1.1">
        <link rel="shortcut icon" href="{{ url('vendor/docs/images/logo.png') }}">
    </head>
    <body>
        <div id="pjax-container">
            @yield('content')
        </div>

        <div class="footer">
            Built with <a href="https://laravel.com/" target="_blank">Laravel</a>
            and developed by <a href="https://botble.com" target="_blank">Botble Technologies</a> © {{ date('Y') }}.
        </div>

        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.pjax/1.9.6/jquery.pjax.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="{{ asset('vendor/docs/js/app.js') }}?v=1.1"></script>

        @if ($id = config('docs.ga_tracking_id'))
            <script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                ga('create', '{{ $id }}', 'auto');
                ga('send', 'pageview');
            </script>
        @endif

    </body>
</html>
