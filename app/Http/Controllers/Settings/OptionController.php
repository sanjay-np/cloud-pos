<?php

namespace App\Http\Controllers\Settings;

use App\Actions\OptionAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Options\EmailSettingsRequest;
use App\Http\Requests\Options\InvoiceSettingRequest;
use App\Http\Requests\Options\PaymentSettingRequest;
use App\Http\Requests\Options\ShopInformationRequest;
use App\Models\Option;
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
        $emailSettings = $this->model->query()
            ->whereCategory('emailSettings')
            ->get()?->pluck('meta_value', 'meta_key')
            ->toArray();
        return Inertia::render("settings/options/email/index", [
            'emailSettings' => $emailSettings
        ]);
    }

    public function emailSettingStore(EmailSettingsRequest $request): null
    {
        $requestedItems = $request->getRequested();
        foreach ($requestedItems as $key => $value) {
            if ($value) {
                $this->action->upsert($key, $value, 'emailSettings');
            }
        }
        return null;
    }

    public function invoiceSettingIndex(): Response
    {
        $invoiceSettings = $this->model->query()
            ->whereCategory('invoiceSettings')
            ->get()
            ?->pluck('meta_value', 'meta_key')
            ->toArray();
        return Inertia::render("settings/options/invoice/index", [
            'invoiceSettings' => $invoiceSettings
        ]);
    }

    public function invoiceSettingStore(InvoiceSettingRequest $request): null
    {
        $requestedItems = $request->getRequested();
        foreach ($requestedItems as $key => $value) {
            if ($value) {
                $this->action->upsert($key, $value, 'invoiceSettings');
            }
        }
        return null;
    }

    public function paymentSettingIndex(): Response
    {
        $paymentSettings = $this->model->query()
            ->whereCategory('paymentSettings')
            ->get()?->pluck('meta_value', 'meta_key')
            ->toArray();
        return Inertia::render("settings/options/payment/index", [
            'paymentSettings' => $paymentSettings
        ]);
    }

    public function paymentSettingStore(PaymentSettingRequest $request): null
    {
        $requestedItems = $request->getRequested();
        foreach ($requestedItems as $key => $value) {
            if ($value) {
                $this->action->upsert($key, $value, 'paymentSettings');
            }
        }
        return null;
    }
}
