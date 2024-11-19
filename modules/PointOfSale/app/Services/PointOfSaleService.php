<?php

namespace Modules\PointOfSale\Services;

use Modules\Sales\Repositories\SaleRepository;

class PointOfSaleService
{
    protected $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function store(array $data)
    {
        return $this->saleRepository->store($data);
    }
}
