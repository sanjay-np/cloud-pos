<?php

use Illuminate\Support\Facades\Route;
use Modules\Product\Http\Controllers\AttributeController;
use Modules\Product\Http\Controllers\BrandController;
use Modules\Product\Http\Controllers\CategoryController;
use Modules\Product\Http\Controllers\ProductController;
use Modules\Product\Http\Controllers\SupplierController;

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

Route::resource('attributes', AttributeController::class)
    ->names('attributes')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('brands', BrandController::class)
    ->names('brands')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('categories', CategoryController::class)
    ->names('categories')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('products', ProductController::class)
    ->names('products')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::controller(ProductController::class)->group(function () {
    Route::get('product-search', 'search')->name('products.search');
})->middleware(['auth', 'verified']);

Route::resource('suppliers', SupplierController::class)
    ->names('suppliers')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::controller(SupplierController::class)->group(function () {
    Route::get('supplier-picker', 'picker')->name('suppliers.picker');
    Route::get('supplier-search', 'search')->name('suppliers.search');
})->middleware(['auth', 'verified']);
