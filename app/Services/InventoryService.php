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
}
