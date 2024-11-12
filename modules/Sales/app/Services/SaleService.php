<?php

namespace Modules\Sales\Services;

use Modules\Sales\Models\SaleDetail;
use Modules\Sales\Models\SalePayment;

class SaleService
{
    protected $saleDetailModel, $salePaymentModel;

    public function __construct(SaleDetail $saleDetailModel, SalePayment $salePaymentModel)
    {
        $this->saleDetailModel = $saleDetailModel;
        $this->salePaymentModel = $salePaymentModel;
    }

    public function createSaleDetail(array $data, int $saleId)
    {
        $data['sale_id'] = $saleId;
        foreach ($data['products'] as $product) {
            $product['product_id'] = $product['id'] ?? null;
            $product['sub_total'] = $product['unit_price'] * $product['qty'];
            $this->saleDetailModel->create($product);
        }
    }

    public function createSalePayment(array $data, int $saleId)
    {
        $data['sale_id'] = $saleId;
        $this->salePaymentModel->create($data);
    }
}
