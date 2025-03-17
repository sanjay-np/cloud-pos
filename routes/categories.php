<?php

use App\Http\Controllers\Products\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('categories', CategoryController::class)
            ->names('categories');
    });
