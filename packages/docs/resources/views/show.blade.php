@extends('docs::layouts.app')

@section('content')
    @include('docs::partials.navbar')

	<div class="container docs-container">
		<div class="col-md-11 col-md-offset-1">
            <div class="row">
    			@if ($toc)
    				<div class="col-md-3 docs-sidebar">
    					<nav class="docs-toc" data-current-page="{{ $page }}">
    						{!! $toc !!}
    					</nav>
    				</div>
    			@endif

    			<div class="col-md-{{ $toc ? '9' : '12' }} docs-content">
                    @include('docs::partials.search')
                    {!! $content !!}
    			</div>
    		</div>
        </div>
	</div>

    <script>
        window.currentDoc = {
            id: '{{ $currentDoc['id'] }}',
            version: '{{ $currentVersion }}'
        }
    </script>
@stop
