<?php

namespace Modules\Product\Repositories;

use App\Interfaces\Interfaces\CurdRepositoryInterface;
use Modules\Product\Models\Product;

class ProductRepository implements CurdRepositoryInterface
{
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(array $data, $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete($id)
    {
        return $this->model->find($id)->delete();
    }

    public function take(int $count)
    {
        return $this->model->take($count)->get();
    }

    public function search(string $search_qry)
    {
        return $this->model
            ->where('title', 'like', '%' . $search_qry . '%')
            ->orWhere('bar_code', 'like', '%' . $search_qry . '%')
            ->orWhere('sku', 'like', '%' . $search_qry . '%')
            ->take(10)
            ->get();
    }
}
