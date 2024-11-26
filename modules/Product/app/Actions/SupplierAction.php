<?php

namespace Modules\Product\Actions;

use Modules\Product\Models\Supplier;

class SupplierAction
{
    public function search($searchTerm)
    {
        return Supplier::where('name', 'like', '%' . $searchTerm . '%')
            ->take(10)
            ->get();
    }
}
