<?php

use App\Http\Controllers\Expenses\ExpensesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('expenses', ExpensesController::class)
            ->names('expenses');
    });
