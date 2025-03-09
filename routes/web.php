<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('dashboard', [PageController::class, 'dashboard'])
            ->name('dashboard');
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
