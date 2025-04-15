<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OptionController extends Controller
{
    public function __construct(
        protected User $user
    ) {}

    public function shopInformationIndex(): Response
    {
        return Inertia::render('settings/options/shop/index');
    }

    public function shopInformationStore(Request $request): null
    {
        return null;
    }


    public function emailSettingIndex(): Response
    {
        return Inertia::render("settings/options/email/index");
    }

    public function emailSettingStore(Request $request)
    {
        return null;
    }

    public function invoiceSettingIndex(): Response
    {
        return Inertia::render("settings/options/invoice/index");
    }

    public function invoiceSettingStore(Request $request)
    {
        return null;
    }

    public function paymentSettingIndex(): Response
    {
        return Inertia::render("settings/options/payment/index");
    }

    public function paymentSettingStore()
    {
        return null;
    }
}
