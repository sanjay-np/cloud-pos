<?php

namespace App\Services;

use App\Models\SaleDetail;
use App\Models\SalePayment;

class SaleService
{
    public function __construct(
        private SaleDetail $saleDetailModel,
        private SalePayment $salePaymentModel,
    ) {}


    public function createSaleDetail(array $data, int $saleId)
    {
        $products = array_map(function ($product) use ($saleId) {
            return [
                'product_id' => $product['id'] ?? null,
                'sub_total' => ($product['price'] ?? 0) * ($product['qty'] ?? 0),
                'sale_id' => $saleId,
                'price' => $product['price'] ?? 0,
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


    public function updateSaleDetail(array $data, int $saleId)
    {
        $productIds = array_column($data['products'], 'id');
        $this->saleDetailModel
            ->where('sale_id', $saleId)
            ->whereNotIn('product_id', $productIds)
            ->delete();

        foreach ($data['products'] as $product) {
            $this->saleDetailModel
                ->updateOrCreate(
                    [
                        'sale_id' => $saleId,
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


    public function updateSalePayment(array $data, int $saleId)
    {
        $paymentItem = $this->salePaymentModel->where('sale_id', $saleId)->first();

        if ($paymentItem) {
            $paymentItem->update($data);
        } else {
            $data['sale_id'] = $saleId;
            $this->salePaymentModel->create($data);
        }
    }
}
