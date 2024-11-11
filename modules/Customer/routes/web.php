<?php

use Illuminate\Support\Facades\Route;
use Modules\Customer\Http\Controllers\CustomerController;

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

Route::resource('customers', CustomerController::class)
    ->names('customers')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::controller(CustomerController::class)->group(function () {
    Route::get('customer-picker', 'picker')->name('customers.picker');
    Route::get('customer-search', 'search')->name('customers.search');
})->middleware(['auth', 'verified']);
