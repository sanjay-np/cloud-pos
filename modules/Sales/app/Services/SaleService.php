<?php

namespace Modules\Sales\Services;

use Modules\Sales\Interfaces\SaleRepositoryInterface;
use Modules\Sales\Interfaces\SaleServiceInterface;

class SaleService implements SaleServiceInterface
{
    protected $saleRepository;

    public function __construct(SaleRepositoryInterface $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->saleRepository->paginate($perPage);
    }

    public function all()
    {
        return $this->saleRepository->all();
    }

    public function store(array $data)
    {
        $item = $this->saleRepository->store($data['sales']);
        if ($item) {
            $products = $data['products']['products'] ?? [];
            // if (!empty($products)) {
            //     foreach ($products as $product) {
            //         $this->purchaseDetail->create($product, $item->id);
            //     }
            // }
            // if (!empty($data['payments'])) {
            //     $this->purchasePayment->create($data['payments'], $item->id);
            // }
        }
        return $item;
    }

    public function show(int $id)
    {
        return $this->saleRepository->show($id);
    }

    public function update(array $data, int $id)
    {
        return $this->saleRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->saleRepository->destroy($id);
    }
}
