<?php

namespace Modules\Purchase\Services;

use Modules\Purchase\Models\PurchaseDetail;
use Modules\Purchase\Models\PurchasePayment;

class PurchaseService
{
    protected $purchaseDetailModal, $purchasePaymentModal;

    public function __construct(
        PurchaseDetail $purchaseDetailModal,
        PurchasePayment $purchasePaymentModal
    ) {
        $this->purchaseDetailModal = $purchaseDetailModal;
        $this->purchasePaymentModal = $purchasePaymentModal;
    }

    public function createPurchaseDetail(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        foreach ($data['products'] as $product) {
            $product['product_id'] = $product['id'] ?? null;
            $product['sub_total'] = $product['unit_price'] * $product['qty'];
            $this->purchaseDetailModal->create($product);
        }
    }

    public function createPurchasePayment(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        $this->purchasePaymentModal->create($data);
    }
}
