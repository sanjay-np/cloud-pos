<?php

namespace App\Services;

use App\Contracts\Purchase\PurchaseRepositoryInterface;
use App\Contracts\Purchase\PurchaseServiceInterface;

class PurhcaseService implements PurchaseServiceInterface
{
    protected $purchaseRepository;

    public function __construct(PurchaseRepositoryInterface $purchaseRepository)
    {
        $this->purchaseRepository = $purchaseRepository;
    }
}
