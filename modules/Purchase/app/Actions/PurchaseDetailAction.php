<?php

namespace Modules\Purchase\Actions;

use Modules\Purchase\Models\PurchaseDetail;

class PurchaseDetailAction
{

    protected $model;

    public function __construct(PurchaseDetail $model)
    {
        $this->model = $model;
    }

    public function create(array $data, int $purchaseId)
    {
        $data['product_id'] = $data['id'] ?? null;
        $data['purchase_id'] = $purchaseId;
        $data['sub_total'] = $data['unit_price'] * $data['qty'];
        return $this->model->create($data);
    }
}
