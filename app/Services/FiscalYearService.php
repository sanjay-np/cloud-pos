<?php

namespace App\Services;

use App\Contracts\FiscalYear\FiscalYearRepositoryInterface;
use App\Contracts\FiscalYear\FiscalYearServiceInterface;

class FiscalYearService implements FiscalYearServiceInterface
{
    protected $fiscalYearRepository;

    public function __construct(FiscalYearRepositoryInterface $fiscalYearRepository)
    {
        $this->fiscalYearRepository = $fiscalYearRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->fiscalYearRepository->paginate($perPage);
    }
}
