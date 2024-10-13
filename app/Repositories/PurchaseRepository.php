<?php

namespace App\Repositories;

use App\Contracts\Purchase\PurchaseRepositoryInterface;
use App\Models\Purchase;

class PurchaseRepository implements PurchaseRepositoryInterface
{
    protected $model;

    public function __construct(Purchase $model)
    {
        $this->model = $model;
    }
}
