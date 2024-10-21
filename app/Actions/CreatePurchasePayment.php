<?php

namespace App\Actions;

use App\Models\PurchasePayment;

class CreatePurchasePayment
{
    protected $model;

    public function __construct(PurchasePayment $model)
    {
        $this->model = $model;
    }

    public function handle(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        return $this->model->create($data);
    }
}
