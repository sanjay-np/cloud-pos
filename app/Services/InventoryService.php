<?php

namespace App\Services;

use App\Models\InventoryLog;

class InventoryService
{
    public function __construct(private InventoryLog $model) {}

    public function createLog(array $data)
    {
        return $this->model->create($data);
    }

    public function createBulkLog(array $products, $id, $type): void
    {
        $logs = array_map(function ($product) use ($id, $type) {
            return [
                'product_id' => $product['product_id'],
                'qty' => $product['qty'],
                'type' => $type,
                'causer_id' => $id
            ];
        }, $products);
        $this->model->insert($logs);
    }
}
