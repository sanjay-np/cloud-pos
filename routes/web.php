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
