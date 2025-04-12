<?php

use App\Http\Controllers\Settings\CurrencyController;
use App\Http\Controllers\Settings\OptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    Route::get('users/appearance', function () {
        return Inertia::render('users/appearance');
    })->name('appearance');

    Route::prefix('settings')->group(function () {
        Route::resource('currency', CurrencyController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->names('currency');

        Route::resource('options', OptionController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->names('options');
    });
});
