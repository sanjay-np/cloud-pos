<?php

namespace App\Traits;

use App\Models\FiscalYear;

trait CurrentFiscalYear
{
    /**
     * Returns the id of the current fiscal year.
     *
     * @return int
     */
    public function getCurrentFY()
    {
        $item = FiscalYear::where('is_current', 1)->first();
        return  $item->id ?? 0;
    }
}
