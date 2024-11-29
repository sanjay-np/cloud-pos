<?php

namespace App\Services;

use App\Models\PriceLog;

class PriceService
{
    public function __construct(private PriceLog $model) {}

    public function createLog(array $data)
    {
        return $this->model->create($data);
    }

    public function createBulkLog(array $products, $id, $type): void
    {
        $logs = array_map(function ($product) use ($id, $type) {
            return [
                'product_id' => $product['product_id'],
                'price' => $type === 'sales' ? $product['sale_price'] : $product['unit_price'],
                'causer_id' => $id,
                'type' => $type
            ];
        }, $products);
        $this->model->insert($logs);
    }
}
