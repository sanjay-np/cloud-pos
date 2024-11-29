<?php

namespace Modules\Purchase\Services;

use App\Services\InventoryService;
use App\Services\PriceService;
use Modules\Purchase\Models\Purchase;
use Modules\Purchase\Models\PurchaseDetail;
use Modules\Purchase\Models\PurchasePayment;

class PurchaseService
{
    public function __construct(
        private Purchase $model,
        private PurchaseDetail $purchaseDetailModal,
        private PurchasePayment $purchasePaymentModal,
        private InventoryService $inventoryService,
        private PriceService $priceService
    ) {}

    public function index($data)
    {
        return $this->model
            ->current()
            ->with(['supplier'])
            ->withCount('items')
            ->orderBy('id', 'desc')
            ->paginate(perPage: 10);
    }

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
        $this->inventoryService->createBulkLog($products, $purchaseId, 'purchase');
        $this->priceService->createBulkLog($products, $purchaseId, 'purchase');
    }

    public function createPurchasePayment(array $data, int $purchaseId)
    {
        $data['purchase_id'] = $purchaseId;
        $this->purchasePaymentModal->create($data);
    }
}
