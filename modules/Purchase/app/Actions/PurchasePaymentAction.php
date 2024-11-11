<?php

namespace Modules\Purchase\Actions;

use Modules\Purchase\Models\PurchasePayment;

class PurchasePaymentAction
{
    protected $model;

    public function __construct(PurchasePayment $model)
    {
        $this->model = $model;
    }

    public function create(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        return $this->model->create($data);
    }
}
