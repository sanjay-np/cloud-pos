<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Modules\Setting\Models\FiscalYear;

trait CurrentFiscalYear
{
    /**
     * Returns the id of the current fiscal year.
     *
     * @return int
     */
    public function getCurrentFY()
    {
        $item = Cache::remember('current_fiscal_year', now()->addMinutes(60), function () {
            return FiscalYear::where('is_current', 1)->first();
        });
        return $item ? $item->id : 0;
    }
}
