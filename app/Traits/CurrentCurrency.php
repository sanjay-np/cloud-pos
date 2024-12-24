<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Modules\Setting\Models\Currency;

trait CurrentCurrency
{
    public function getCurrentCurrency()
    {
        $item = Cache::remember('current_currency', now()->addMinutes(60), function () {
            return Currency::where('is_current', 1)->first();
        });
        return $item ? $item->label : '$';
    }
}
