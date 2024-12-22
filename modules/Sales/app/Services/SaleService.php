<?php

namespace Modules\Sales\Services;

use Modules\Sales\Models\SaleDetail;
use Modules\Sales\Models\SalePayment;

class SaleService
{
    public function __construct(
        private SaleDetail $saleDetailModel,
        private SalePayment $salePaymentModel,
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
                'sale_id' => $saleId,
                'qty' => $product['qty'] ?? 0
            ];
        }, $data['products']);
        $this->saleDetailModel->insert($products);
    }

    public function createSalePayment(array $data, int $saleId)
    {
        $data['sale_id'] = $saleId;
        $this->salePaymentModel->create($data);
    }
}
