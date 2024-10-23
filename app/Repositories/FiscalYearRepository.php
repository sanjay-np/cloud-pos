<?php

namespace App\Repositories;

use App\Contracts\FiscalYear\FiscalYearRepositoryInterface;
use App\Models\FiscalYear;

class FiscalYearRepository implements FiscalYearRepositoryInterface
{
    protected $model;

    public function __construct(FiscalYear $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }
}
