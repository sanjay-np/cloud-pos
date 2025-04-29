<?php

use App\Http\Controllers\Products\BrandController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('brands', BrandController::class)
            ->names('brands');
    });
