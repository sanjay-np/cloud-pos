<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::resource('products', ProductController::class)->only(['index', 'store'])->middleware(['auth', 'verified']);
Route::resource('orders', OrderController::class)->middleware(['auth', 'verified']);
Route::resource('customers', CustomerController::class)->middleware(['auth', 'verified']);

Route::resource('employees', EmployeeController::class)->only(['index', 'store', 'update', 'destroy'])->middleware(['auth', 'verified']);
Route::get('/employees/{id}', [EmployeeController::class, 'get'])->name('employees.get')->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
