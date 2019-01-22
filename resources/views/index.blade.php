@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#docs-navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="./" class="navbar-brand">Botble Documentation</a>
            </div>
            <div id="docs-navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="https://codecanyon.net/user/botble#contact" target="_blank">Support</a></li>
                    <li><a href="https://botble.com" target="_blank">Botble Team</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container docs-container">
        <div class="row">
            @foreach ($docs as $id => $doc)
                <div class="col-md-4 col-sm-6 project-item">
                    <a href="{{ route('show', $id) }}">
                        <div class="project-body">
                            <img src="{{ $doc['banner'] }}" alt="{{ $doc['long_name'] }}">
                            <div class="project-name">
                                <p title="{{ $doc['long_name'] }}">{{ $doc['long_name'] }}</p>
                                <p class="project-version"><small>Version {{ $doc['version'] }}</small></p>
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
@stop
