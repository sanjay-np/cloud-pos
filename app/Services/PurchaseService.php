<?php

namespace App\Services;

use App\Actions\CreatePurchaseDetail;
use App\Actions\CreatePurchasePayment;
use App\Contracts\Purchase\PurchaseRepositoryInterface;
use App\Contracts\Purchase\PurchaseServiceInterface;

class PurchaseService implements PurchaseServiceInterface
{
    protected $purchaseRepository, $createPurchaseDetailsAction, $createPurchasePaymentAction;

    public function __construct(
        PurchaseRepositoryInterface $purchaseRepository,
        CreatePurchaseDetail $createPurchaseDetail,
        CreatePurchasePayment $createPurchasePayment
    ) {
        $this->purchaseRepository = $purchaseRepository;
        $this->createPurchaseDetailsAction = $createPurchaseDetail;
        $this->createPurchasePaymentAction = $createPurchasePayment;
    }

    public function paginate(int $perPage)
    {
        return $this->purchaseRepository->paginate($perPage);
    }

    public function findAll()
    {
        return $this->purchaseRepository->findAll();
    }

    public function store(array $data)
    {
        $item = $this->purchaseRepository->store($data['purchase']);
        if ($item) {
            $products = $data['products']['products'] ?? [];
            if (!empty($products)) {
                foreach ($products as $product) {
                    $this->createPurchaseDetailsAction->handle($product, $item->id);
                }
            }
            if (!empty($data['payments'])) {
                $this->createPurchasePaymentAction->handle($data['payments'], $item->id);
            }
        }
        return $item;
    }

    public function find(int $id)
    {
        return $this->purchaseRepository->find($id);
    }

    public function update(array $data, int $id)
    {
        return $this->purchaseRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->purchaseRepository->destroy($id);
    }
}
