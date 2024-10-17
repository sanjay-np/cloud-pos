<?php

namespace App\Actions;

use App\Models\PurchaseDetail;

class CreatePurchaseDetail
{
    protected $model;

    public function __construct(PurchaseDetail $model)
    {
        $this->model = $model;
    }

    public function handle(array $data)
    {
        return $this->model->create($data);
    }
}
