<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Modules\Setting\Models\Currency;

trait CurrentCurrency
{
    public function getCurrentCurrency()
    {
        // Use Cache::remember to retrieve or store the value in cache
        $item = Cache::remember('current_currency', now()->addMinutes(60), function () {
            return Currency::where('is_current', 1)->first();
        });

        // Check if $item exists to avoid errors in case no currency is found
        return $item ? $item->label : '$';
    }
}
