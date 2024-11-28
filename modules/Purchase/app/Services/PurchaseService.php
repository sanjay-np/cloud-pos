<?php

namespace Modules\Purchase\Services;

use App\Services\InventoryService;
use Modules\Purchase\Models\PurchaseDetail;
use Modules\Purchase\Models\PurchasePayment;

class PurchaseService
{
    public function __construct(
        private PurchaseDetail $purchaseDetailModal,
        private PurchasePayment $purchasePaymentModal,
        private InventoryService $inventoryService
    ) {}

    public function createPurchaseDetail(array $data, int $purchaseId)
    {
        foreach ($data['products'] as $product) {
            $product['product_id'] = $product['id'] ?? null;
            $product['sub_total'] = $product['unit_price'] ?? 0 * $product['qty'] ?? 0;
            $this->purchaseDetailModal->create($product + ['purchase_id' => $purchaseId]);
        }
    }

    public function createPurchasePayment(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        $this->purchasePaymentModal->create($data);
    }
}
