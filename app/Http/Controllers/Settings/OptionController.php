<?php

namespace App\Http\Controllers\Settings;

use App\Actions\OptionAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Options\ShopInformationRequest;
use App\Models\Option;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OptionController extends Controller
{
    public function __construct(
        protected Option $model,
        protected OptionAction $action
    ) {}


    public function shopInformationIndex(): Response
    {
        $shopInformation = $this->model->query()
            ->whereCategory('shopInformation')
            ->get()?->pluck('meta_value', 'meta_key')
            ->toArray();

        return Inertia::render('settings/options/shop/index', [
            'shopInformation' => $shopInformation
        ]);
    }


    public function shopInformationStore(ShopInformationRequest $request): null
    {
        $requestedItems = $request->getRequested();
        foreach ($requestedItems as $key => $value) {
            if ($value) {
                $this->action->upsert($key, $value, 'shopInformation');
            }
        }
        return null;
    }


    public function emailSettingIndex(): Response
    {
        return Inertia::render("settings/options/email/index");
    }

    public function upsertEmailSetting(Request $request)
    {
        return null;
    }

    public function invoiceSettingIndex(): Response
    {
        return Inertia::render("settings/options/invoice/index");
    }

    public function upsertInvoiceSetting(Request $request)
    {
        return null;
    }

    public function paymentSettingIndex(): Response
    {
        return Inertia::render("settings/options/payment/index");
    }

    public function upsertPaymentSetting()
    {
        return null;
    }
}
