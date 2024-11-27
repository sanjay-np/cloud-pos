<?php

namespace Modules\Product\Services;

use Modules\Product\Models\Brand;

class BrandService
{
    public function __construct(private Brand $model) {}

    public function index()
    {
        return $this->model
            ->orderBy('id', 'desc')
            ->paginate(perPage: 10);
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
            ->map(function ($brand) {
                return [
                    'value' => $brand->id,
                    'label' => $brand->name,
                ];
            });
    }
}
