<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<div class="col-md-11 col-md-offset-1">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#docs-navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <a href="{{ route('show', [$currentDoc['id'], $currentVersion]) }}" class="navbar-brand">{{ $currentDoc['name'] }}</a>
            </div>

            <div id="docs-navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    @if (isset($currentVersion))
                        @if (count($versions) > 1)
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <span class="glyphicon glyphicon-bookmark"></span>
                                    {{ $currentVersion }}
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    @foreach ($versions as $version)
                                        <li><a href="{{ route('show', [$currentDoc['id'], $version]) }}">{{ $version }}</a></li>
                                    @endforeach
                                </ul>
                            </li>
                        @else
                            <li>
                                <p class="navbar-text">
                                    <span class="glyphicon glyphicon-bookmark"></span>
                                    {{ $currentVersion }}
                                </p>
                            </li>
                        @endif
                    @endif
                </ul>

                <div class="docs-nav-toc"></div>

                <ul class="nav navbar-nav navbar-right">
                    @if (isset($currentDoc['demo']))
                        <li><a href="{{ $currentDoc['demo'] }}" target="_blank">Demo</a></li>
                    @endif

                    <li><a href="{{ $currentDoc['purchase'] }}?ref=botble" target="_blank">Purchase</a></li>

                    <li><a href="{{ $currentDoc['support'] or 'http://codecanyon.net/user/botble#contact'}}?ref=botble" target="_blank">Support</a></li>

                    <li><a href="https://botble.com" target="_blank">Botble Team</a></li>
                </ul>
            </div>
        </div>
	</div>
</nav>
