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

    public function pickerItems()
    {
        return Supplier::all()->map(function ($supplier) {
            return [
                'value' => $supplier->id,
                'label' => $supplier->name,
            ];
        });
    }
}
