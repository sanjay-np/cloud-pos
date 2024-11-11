<?php

use Illuminate\Support\Facades\Route;
use Modules\Purchase\Http\Controllers\PurchaseController;

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

Route::resource('purchases', PurchaseController::class)
    ->names('purchases')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);
