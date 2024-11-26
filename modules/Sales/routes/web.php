<?php

use Illuminate\Support\Facades\Route;
use Modules\Sales\Http\Controllers\POSController;
use Modules\Sales\Http\Controllers\SalesController;

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

Route::resource('sales', SalesController::class)
    ->names('sales')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::get('pos', [POSController::class, 'index'])
    ->name('pos.index');

Route::get('/test', [SalesController::class, 'test']);
