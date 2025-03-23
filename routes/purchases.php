<?php

use App\Http\Controllers\Purchase\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('purchases', PurchaseController::class)
            ->names('purchases');
    });
