<?php

namespace Modules\Purchase\Services;

use Modules\Purchase\Actions\PurchaseDetailAction;
use Modules\Purchase\Actions\PurchasePaymentAction;

class PurchaseService
{
    protected $purchaseRepository, $purchaseDetail, $purchasePayment;

    public function __construct(
        PurchaseDetailAction $purchaseDetail,
        PurchasePaymentAction $purchasePayment
    ) {
        $this->purchaseRepository = $purchaseRepository;
        $this->purchaseDetail = $purchaseDetail;
        $this->purchasePayment = $purchasePayment;
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
}
