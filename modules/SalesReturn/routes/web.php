<?php

use Illuminate\Support\Facades\Route;
use Modules\SalesReturn\Http\Controllers\SalesReturnController;

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

Route::group([], function () {
    Route::resource('salesreturn', SalesReturnController::class)->names('salesreturn');
});
