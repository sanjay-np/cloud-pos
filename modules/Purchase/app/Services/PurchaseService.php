<?php

namespace Modules\Purchase\Services;

use Modules\Purchase\Actions\PurchaseDetailAction;
use Modules\Purchase\Actions\PurchasePaymentAction;
use Modules\Purchase\Interfaces\PurchaseRepositoryInterface;
use Modules\Purchase\Interfaces\PurchaseServiceInterface;

class PurchaseService implements PurchaseServiceInterface
{
    protected $purchaseRepository, $purchaseDetail, $purchasePayment;

    public function __construct(
        PurchaseRepositoryInterface $purchaseRepository,
        PurchaseDetailAction $purchaseDetail,
        PurchasePaymentAction $purchasePayment
    ) {
        $this->purchaseRepository = $purchaseRepository;
        $this->purchaseDetail = $purchaseDetail;
        $this->purchasePayment = $purchasePayment;
    }

    public function paginate(int $perPage)
    {
        return $this->purchaseRepository->paginate($perPage);
    }

    public function all()
    {
        return $this->purchaseRepository->all();
    }

    public function store(array $data)
    {
        $item = $this->purchaseRepository->store($data['purchase']);
        if ($item) {
            $products = $data['products']['products'] ?? [];
            if (!empty($products)) {
                foreach ($products as $product) {
                    $this->purchaseDetail->create($product, $item->id);
                }
            }
            if (!empty($data['payments'])) {
                $this->purchasePayment->create($data['payments'], $item->id);
            }
        }
        return $item;
    }

    public function show(int $id)
    {
        return $this->purchaseRepository->show($id);
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
