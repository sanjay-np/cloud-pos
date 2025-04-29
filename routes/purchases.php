<?php

use App\Http\Controllers\Purchase\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('purchases', PurchaseController::class)
            ->names('purchases');

        Route::get('purchases-add-payment', [PurchaseController::class, 'addPayment'])
            ->name('purchases.payments.add');
    });
