<?php

namespace App\Services;

use App\Actions\CreatePurchaseDetail;
use App\Actions\CreatePurchasePayment;
use App\Contracts\Purchase\PurchaseRepositoryInterface;
use App\Contracts\Purchase\PurchaseServiceInterface;

class PurchaseService implements PurchaseServiceInterface
{
    protected $purchaseRepository, $createPurchseDetailsAction, $createPurchasePaymentAction;

    public function __construct(
        PurchaseRepositoryInterface $purchaseRepository,
        CreatePurchaseDetail $createPurchseDetail,
        CreatePurchasePayment $createPurchasePayment
    ) {
        $this->purchaseRepository = $purchaseRepository;
        $this->createPurchseDetailsAction = $createPurchseDetail;
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
        $item = $this->purchaseRepository->store($data);
        if ($item) {
            if (isset($data['products'])) {
                foreach ($data['products'] as $product) {
                    $this->createPurchseDetailsAction->handle($product + [
                        'purchase_id' => $item->id,
                        'sub_total' => $product['unit_price'] * $product['qty']
                    ]);
                }
            }

            if (isset($data['payments'])) {
                foreach ($data['payments'] as $payment) {
                    $this->createPurchasePaymentAction->handle($payment, $item->id);
                }
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
