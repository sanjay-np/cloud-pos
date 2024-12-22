<?php

use Illuminate\Support\Facades\Route;
use Modules\Setting\Http\Controllers\CurrencyController;
use Modules\Setting\Http\Controllers\FiscalYearController;
use Modules\Setting\Http\Controllers\SettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::group([], function () {
//     Route::resource('setting', SettingController::class)->names('setting');
// });

Route::prefix('settings')->group(function () {
    Route::resource('fiscal-year', FiscalYearController::class)
        ->names('fiscal-years')
        ->only(['index', 'store', 'show', 'update', 'destroy'])
        ->middleware(['auth', 'verified']);

    Route::resource('currencies', CurrencyController::class)
        ->names('currency')
        ->only(['index', 'store', 'show', 'update', 'destroy'])
        ->middleware(['auth', 'verified']);
});
