<?php

namespace Modules\Product\Actions;

use Modules\Product\Models\Brand;

class BrandAction
{
    public function search($searchTerm)
    {
        return Brand::where('name', 'like', '%' . $searchTerm . '%')
            ->take(10)
            ->get();
    }
}
