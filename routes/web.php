<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\PurchaseReturnController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\SalesReturnController;
use App\Http\Controllers\SupplierController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get(uri: '/', action: [AuthenticatedSessionController::class, 'create']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    // Products
    Route::controller(ProductController::class)->group(function () {
        Route::resource('products', ProductController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/products/find/{id}', 'find')->name('products.find');
        Route::get('/products/search', 'search')->name('products.search');
    });

    // Attributes
    Route::controller(AttributeController::class)->group(function () {
        Route::resource('products/attributes', AttributeController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/products/attributes/find/{id}', 'find')->name('attributes.find');
    });

    // Brands
    Route::controller(BrandController::class)->group(function () {
        Route::resource('products/brands', BrandController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/products/brands/find/{id}', 'find')->name('brands.find');
    });

    // Categories
    Route::controller(CategoryController::class)->group(function () {
        Route::resource('products/categories', CategoryController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/products/categories/{id}', 'find')->name('categories.find');
    });

    // Suppliers
    Route::controller(SupplierController::class)->group(function () {
        Route::resource('products/suppliers', SupplierController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/products/suppliers/{id}', 'find')->name('suppliers.find');
    });

    // Purchases
    Route::controller(PurchaseController::class)->group(function () {
        Route::resource('purchases', PurchaseController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/purchases/find/{id}', 'find')->name('purchases.find');
    });

    Route::resource('purchases/returns', PurchaseReturnController::class)->only(['index', 'store', 'update', 'destroy'])->names('purchases.returns');
    Route::get('purchases/returns/{id}', [PurchaseReturnController::class, 'find'])->name('purchases.returns.find');

    // Sales
    Route::controller(SalesController::class)->group(function () {
        Route::resource('sales', SalesController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/sales/find/{id}', 'find')->name('sales.find');
    });

    Route::resource('sales/returns', SalesReturnController::class)->only(['index', 'store', 'update', 'destroy'])->names('sales.returns');
    Route::get('sales/returns/{id}', [SalesReturnController::class, 'find'])->name('sales.returns.find');

    // Customers
    Route::controller(CustomerController::class)->group(function () {
        Route::resource('customers', CustomerController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/customers/find/{id}', 'find')->name('customers.find');
    });

    // Employees
    Route::controller(EmployeeController::class)->group(function () {
        Route::resource('employees', EmployeeController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('/employees/find/{id}', 'find')->name('employees.find');
    });
});


require __DIR__ . '/auth.php';
