<?php

use App\Http\Controllers\Users\PasswordController;
use App\Http\Controllers\Users\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::get('users/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('users/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('users/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('users/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('users/password', [PasswordController::class, 'update'])->name('password.update');
});
