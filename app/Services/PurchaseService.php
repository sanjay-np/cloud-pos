<?php

namespace App\Services;

class PurchaseService
{
    public function __construct(
        private Purchase $model,
        private PurchaseDetail $purchaseDetailModal,
        private PurchasePayment $purchasePaymentModal,
    ) {}

    public function createPurchaseDetail(array $data, int $purchaseId)
    {
        $products = array_map(function ($product) use ($purchaseId) {
            return [
                'product_id' => $product['id'] ?? null,
                'sub_total' => ($product['unit_price'] ?? 0) * ($product['qty'] ?? 0),
                'purchase_id' => $purchaseId,
                'qty' => $product['qty'] ?? 0
            ];
        }, $data['products']);
        $this->purchaseDetailModal->insert($products);
    }

    public function createPurchasePayment(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        $this->purchasePaymentModal->create($data);
    }
}
