<?php

namespace App\Repositories;

use App\Contracts\Sales\SalesRepositoryInterface;
use App\Models\Sale;

class SalesRepository implements SalesRepositoryInterface
{
    protected $model;

    public function __construct(Sale $model)
    {
        $this->model = $model;
    }
}
