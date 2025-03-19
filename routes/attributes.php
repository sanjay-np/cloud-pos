<?php

use App\Http\Controllers\Products\AttributeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('attributes', AttributeController::class)
            ->names('attributes');
    });
