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
}
