<?php

namespace App\Traits;

use Modules\Setting\Models\Currency;

trait CurrentCurrency
{
    public function getCurrenctCurrency()
    {
        $item = Currency::where('is_current', 1)->first();
        return $item->label ?? '$';
    }
}
