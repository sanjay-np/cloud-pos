<?php

namespace App\Services;

use App\Models\PurchaseDetail;
use App\Models\PurchasePayment;

class PurchaseService
{
    public function __construct(
        private PurchaseDetail $purchaseDetailModal,
        private PurchasePayment $purchasePaymentModal,
    ) {}


    public function createPurchaseDetail(array $data, int $purchaseId)
    {
        $products = array_map(function ($product) use ($purchaseId) {
            return [
                'product_id' => $product['id'] ?? null,
                'sub_total' => ($product['price'] ?? 0) * ($product['qty'] ?? 0),
                'purchase_id' => $purchaseId,
                'price' => $product['price'] ?? 0,
                'qty' => $product['qty'] ?? 0,
            ];
        }, $data['products']);
        $this->purchaseDetailModal->insert($products);
    }


    public function createPurchasePayment(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        $this->purchasePaymentModal->create($data);
    }


    public function updatePurchaseDetail(array $data, int $purchaseId)
    {
        $productIds = array_column($data['products'], 'id');
        $this->purchaseDetailModal
            ->where('purchase_id', $purchaseId)
            ->whereNotIn('product_id', $productIds)
            ->delete();

        foreach ($data['products'] as $product) {
            $this->purchaseDetailModal
                ->updateOrCreate(
                    [
                        'purchase_id' => $purchaseId,
                        'product_id' => $product['id']
                    ],
                    [
                        'sub_total' => ($product['price'] ?? 0) * ($product['qty'] ?? 0),
                        'price' => $product['price'] ?? 0,
                        'qty' => $product['qty'] ?? 0,
                    ]
                );
        }
    }


    public function updatePurchasePayment(array $data, int $purchaseId)
    {
        $paymentItem = $this->purchasePaymentModal->where('purchase_id', $purchaseId)->first();

        if ($paymentItem) {
            $paymentItem->update($data);
        } else {
            $data['purchase_id'] = $purchaseId;
            $this->purchasePaymentModal->create($data);
        }
    }
}
