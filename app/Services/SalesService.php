<?php

namespace App\Services;

use App\Contracts\Sales\SalesRepositoryInterface;
use App\Contracts\Sales\SalesServiceInterface;

class SalesService implements SalesServiceInterface
{
    protected $salesRepository;

    public function __construct(SalesRepositoryInterface $salesRepository)
    {
        $this->salesRepository = $salesRepository;
    }
}
