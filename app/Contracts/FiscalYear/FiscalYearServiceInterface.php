<?php

namespace App\Contracts\FiscalYear;

interface FiscalYearServiceInterface
{
    public function paginate(int $perPage);
}
