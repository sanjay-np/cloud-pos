<?php

namespace App\Builders;

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
}
