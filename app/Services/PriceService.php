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
}
