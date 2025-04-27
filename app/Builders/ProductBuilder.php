<?php

namespace App\Builders;

use App\Models\PurchaseDetail;
use App\Models\SaleDetail;
use Illuminate\Database\Eloquent\Builder;

class ProductBuilder extends Builder
{
    public function whereActive(): self
    {
        return $this->where('status', 'active');
    }


    public function whereInActive(): self
    {
        return $this->where('status', 'inactive');
    }


    public function whereCategory(int $categoryId): self
    {
        return $this->whereIn('category_ids', $categoryId);
    }


    public function applyFilter(?string $searchQry): self
    {
        if ($searchQry) {
            return $this->where(function ($query) use ($searchQry) {
                $query->where('title', 'like', "%{$searchQry}%");
            });
        }
        return $this;
    }


    public function selectPurchasePrice(): self
    {
        return $this->addSelect(['latest_purcahse_price' => PurchaseDetail::select('price')
            ->whereColumn('product_id', 'products.id')
            ->latest()
            ->take(1)]);
    }
}
