<?php

namespace Modules\Customer\Services;

use Modules\Customer\Models\Customer;

class CustomerService
{
    public function __construct(
        private Customer $model
    ) {}

    public function index()
    {
        return $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
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
        if (array_key_exists('type', $data) && $data['type'] === 'picker') {
            return $items->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ];
            });
        }
        return $items;
    }
}
