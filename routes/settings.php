<?php

use App\Http\Controllers\Settings\CurrencyController;
use App\Http\Controllers\Settings\OptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    Route::get('users/appearance', function () {
        return Inertia::render('users/appearance');
    })->name('appearance');

    Route::prefix('settings')->group(function () {
        Route::resource('currency', CurrencyController::class)
            ->only(['index', 'store', 'update', 'destroy'])
            ->names('currency');

        Route::prefix('options')
            ->controller(OptionController::class)
            ->group(function () {
                Route::get('shop', 'shopInformationIndex')->name('options.shopInformation.index');
                Route::post('shop', 'shopInformationStore')->name('options.saveShopInformation.save');

                Route::get('email', 'emailSettingIndex')->name('options.emailSetting.index');
                Route::post('email', 'emailSettingStore')->name('options.saveEmailSetting.save');

                Route::get('invoice', 'invoiceSettingIndex')->name('options.invoiceSetting.index');
                Route::post('invoice', 'invoiceSettingStore')->name('options.saveInvoiceSetting.save');

                Route::get('payment', 'paymentSettingIndex')->name('options.paymentSetting.index');
                Route::post('payment', 'paymentSettingStore')->name('options.savePaymentSetting.save');
            });
    });
});
