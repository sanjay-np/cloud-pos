<?php

use App\Http\Controllers\Products\SupplierController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('suppliers', SupplierController::class)
            ->names('suppliers');
    });
