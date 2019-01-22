<?php

Route::group(['middleware' => ['web']], function () {
    Route::get('/', [
        'as'   => 'index',
        'uses' => 'DocsController@index'
    ]);

    Route::get('{doc}/{version?}/{page?}', [
        'as'   => 'show',
        'uses' => 'DocsController@show'
    ]);
});