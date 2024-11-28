<?php

namespace Modules\Purchase\Services;

use App\Services\InventoryService;
use App\Services\PriceService;
use Modules\Purchase\Models\PurchaseDetail;
use Modules\Purchase\Models\PurchasePayment;

class PurchaseService
{
    public function __construct(
        private PurchaseDetail $purchaseDetailModal,
        private PurchasePayment $purchasePaymentModal,
        private InventoryService $inventoryService,
        private PriceService $priceService
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

        $inventoryLogs = array_map(function ($product) use ($purchaseId) {
            return [
                'product_id' => $product['product_id'],
                'qty' => $product['qty'],
                'type' => 'purchase',
                'causer_id' => $purchaseId
            ];
        }, $products);
        $this->inventoryService->createBulkLog($inventoryLogs);

        $priceLogs = array_map(function ($product) use ($purchaseId) {
            return [
                'product_id' => $product['product_id'],
                'price' => $product['amount'] ?? 0,
                'causer_id' => $purchaseId,
                'type' => 'purchase'
            ];
        }, $products);
        $this->priceService->createBulkLog($priceLogs);
    }

    public function createPurchasePayment(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        $this->purchasePaymentModal->create($data);
    }
}
