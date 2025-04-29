<?php

use App\Http\Controllers\Products\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('products', ProductController::class)
            ->names('products');

        Route::get('search-product', [ProductController::class, 'search'])
            ->name('search.product');
    });
