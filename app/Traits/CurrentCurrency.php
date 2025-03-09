<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

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
