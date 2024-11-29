<?php

namespace Modules\Sales\Services;

use App\Services\InventoryService;
use App\Services\PriceService;
use Modules\Sales\Models\SaleDetail;
use Modules\Sales\Models\SalePayment;

class SaleService
{
    public function __construct(
        private SaleDetail $saleDetailModel,
        private SalePayment $salePaymentModel,
        private InventoryService $inventoryService,
        private PriceService $priceService
    ) {
        $this->saleDetailModel = $saleDetailModel;
        $this->salePaymentModel = $salePaymentModel;
    }

    public function createSaleDetail(array $data, int $saleId)
    {
        $products = array_map(function ($product) use ($saleId) {
            return [
                'product_id' => $product['id'] ?? null,
                'sub_total' => ($product['sale_price'] ?? 0) * ($product['qty'] ?? 0),
                'purchase_id' => $saleId,
                'qty' => $product['qty'] ?? 0
            ];
        }, $data['products']);
        $this->saleDetailModel->insert($products);
        $this->inventoryService->createBulkLog($products, $saleId, 'sales');
        $this->priceService->createBulkLog($products, $saleId, 'sales');
    }

    public function createSalePayment(array $data, int $saleId)
    {
        $data['sale_id'] = $saleId;
        $this->salePaymentModel->create($data);
    }
}
