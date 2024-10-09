<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalesController;
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

// Products
Route::controller(ProductController::class)->group(function () {
    Route::resource('products', ProductController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/products/find/{id}', 'find')->name('products.find');
})->middleware(['auth', 'verified']);

// Attributes
Route::controller(AttributeController::class)->group(function () {
    Route::resource('products/attributes', AttributeController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/products/attributes/{id}', 'find')->name('attributes.find');
})->middleware(['auth', 'verified']);

// Brands
Route::controller(BrandController::class)->group(function () {
    Route::resource('products/brands', BrandController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/products/brands/{id}', 'find')->name('brands.find');
});

// Categories
Route::controller(CategoryController::class)->group(function () {
    Route::resource('products/categories', CategoryController::class)
        ->only(['index', 'store', 'update', 'destroy']);
    Route::get('/products/categories/{id}', 'find')->name('categories.find');
})->middleware(['auth', 'verified']);

// Suppliers
Route::controller(SupplierController::class)->group(function () {
    Route::resource('products/suppliers', SupplierController::class)
        ->only(['index', 'store', 'update', 'destroy']);
    Route::get('/products/suppliers/{id}', 'find')->name('suppliers.find');
})->middleware(['auth', 'verified']);

// Sales
Route::resource('sales', SalesController::class)
    ->middleware(['auth', 'verified']);

// Customers
Route::controller(CustomerController::class)->group(function () {
    Route::resource('customers', CustomerController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/customers/{id}', 'find')->name('customers.find');
})->middleware(['auth', 'verified']);

// Employees
Route::controller(EmployeeController::class)->group(function () {
    Route::resource('employees', EmployeeController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/employees/{id}', 'find')->name('employees.find');
})->middleware(['auth', 'verified']);


require __DIR__ . '/auth.php';
