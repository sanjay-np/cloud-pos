<?php

namespace Modules\Product\Services;

use Modules\Product\Models\Product;

class ProductService
{
    public function __construct(
        private Product $model,
        private BrandService $brandService,
        private SupplierService $supplierService
    ) {}

    public function index()
    {
        $products = $this->model
            ->orderBy('id', 'desc')
            ->withSum('purchase', 'qty')
            ->withSum('sale', 'qty')
            ->with('latestPurchase')
            ->paginate(perPage: 10);

        $brands = $this->brandService->pickerItems();
        $suppliers = $this->supplierService->pickerItems();
        return compact('products', 'brands', 'suppliers');
    }

    public function search($data)
    {
        return $this->model
            ->select(['id', 'title', 'bar_code', 'sku', 'unit_price', 'sale_price'])
            ->where('title', 'like', '%' . $data['search_qry'] . '%')
            ->orWhere('bar_code', 'like', '%' . $data['search_qry'] . '%')
            ->orWhere('sku', 'like', '%' . $data['search_qry'] . '%')
            ->take(10)
            ->get();
    }
}
