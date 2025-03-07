<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get(uri: '/', action: [AuthenticatedSessionController::class, 'create']);

Route::controller(PageController::class)->group(function () {
    Route::get('/dashboard', 'index')->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/inventory-book', 'inventoryBook')->middleware(['auth', 'verified'])->name('inventory-book');
    Route::get('/price-book', 'priceBook')->middleware(['auth', 'verified'])->name('price-book');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__ . '/auth.php';

Route::resource('customers', CustomerController::class)
    ->names('customers')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::controller(CustomerController::class)->group(function () {
    Route::get('customer-search', 'search')->name('customers.search');
})->middleware(['auth', 'verified']);

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

Route::resource('sales', SalesController::class)
    ->names('sales')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::get('pos', [POSController::class, 'index'])
    ->name('pos.index');

Route::resource('employees', EmployeeController::class)
    ->names('employees')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);
Route::group([], function () {
    Route::resource('expenses', ExpensesController::class)
        ->only('index', 'store', 'show', 'update', 'destroy')
        ->names('expenses');
});
Route::resource('purchases', PurchaseController::class)
    ->names('purchases')
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);


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
    Route::get('supplier-search', 'search')->name('suppliers.search');
})->middleware(['auth', 'verified']);