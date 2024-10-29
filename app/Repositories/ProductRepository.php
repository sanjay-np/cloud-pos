<?php

namespace App\Repositories;

use App\Contracts\Product\ProductRepositoryInterface;
use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate(perPage: $perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function update(array $data, int $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function destroy(int $id)
    {
        return $this->model->find($id)->delete();
    }

    public function search(string $search_qry)
    {
        return $this->model
            ->select(['id', 'title', 'sku', 'bar_code', 'unit_price', 'sale_price'])
            ->where('title', 'like', "%{$search_qry}%")
            ->orWhere('sku', 'like', "%{$search_qry}%")
            ->orWhere('bar_code', 'like', "%{$search_qry}%")
            ->take(10)->get();
    }

    public function labelAndValue(int $count)
    {
        return $this->model->take($count)->get();
    }
}
