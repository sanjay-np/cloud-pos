<?php

namespace App\Repositories;

use App\Contracts\Supplier\SupplierRepositoryInterface;
use App\Models\Supplier;

class SupplierRepository implements SupplierRepositoryInterface
{
    protected $model;

    public function __construct(Supplier $supplier)
    {
        $this->model = $supplier;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate(perPage: $perPage);
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function findAll()
    {
        return $this->model->all();
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
            ->where('name', 'like', '%' . $search_qry . '%')
            ->take(10)
            ->get();
    }

    public function take(int $count)
    {
        return $this->model->take($count)->get();
    }
}
