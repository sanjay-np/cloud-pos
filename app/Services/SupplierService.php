<?php

namespace App\Services;

class SupplierService
{
    public function __construct(
        private Supplier $model,
        private BrandService $brandService
    ) {}

    public function index()
    {
        $suppliers = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        $brands = $this->brandService->pickerItems();
        return [
            'suppliers' => $suppliers,
            'brands' => $brands,
        ];
    }

    public function search($data)
    {
        $items = null;
        if (array_key_exists('search_qry', $data)) {
            $items = $this->model
                ->where('name', 'like', '%' . $data['search_qry'] . '%')
                ->take(10)
                ->get();
        } else {
            $items = $this->model->take($data['count'] ?? 10)->get();
        }
        if (array_key_exists('type', $data) && $data['type'] == 'picker') {
            return $items->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ];
            });
        }
        return $items;
    }

    public function pickerItems()
    {
        return $this->model->all()
            ->map(function ($supplier) {
                return [
                    'value' => $supplier->id,
                    'label' => $supplier->name,
                ];
            });
    }
}
