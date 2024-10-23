<?php

namespace App\Contracts\FiscalYear;

interface FiscalYearRepositoryInterface
{
    public function paginate(int $perPage);
}
