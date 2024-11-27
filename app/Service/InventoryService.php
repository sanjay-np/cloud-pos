<?php

namespace App\Service;

use App\Models\InventoryLog;

class InventoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private InventoryLog $model) {}

    public function createLog(array $data)
    {
        return $this->model->create($data);
    }
}
