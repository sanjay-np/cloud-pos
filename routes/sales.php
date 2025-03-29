<?php

use App\Http\Controllers\Sales\SalesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('sales', SalesController::class)
            ->names('sales');

        Route::get('pos', [SalesController::class, 'pos'])
            ->name('sales.pos');
    });
