<?php

namespace Modules\Product\Repositories;

use App\Interfaces\Interfaces\CurdRepositoryInterface;
use Modules\Product\Models\Supplier;

class SupplierRepository implements CurdRepositoryInterface
{
    protected $model;

    public function __construct(Supplier $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage)->withQueryString();
    }

    public function findAll()
    {
        return $this->model->all();
    }
    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function findorFail(int $id)
    {
        return $this->model->findorFail($id);
    }

    public function update(array $data, $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
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
            ->where('name', 'like', '%' . $search_qry . '%')
            ->take(10)
            ->get();
    }
}
