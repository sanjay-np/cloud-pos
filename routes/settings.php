<?php

use App\Http\Controllers\Settings\CurrencyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    Route::get('users/appearance', function () {
        return Inertia::render('users/appearance');
    })->name('appearance');

    Route::prefix('settings')->group(function () {
        Route::resource('currency', CurrencyController::class);
    });
});
