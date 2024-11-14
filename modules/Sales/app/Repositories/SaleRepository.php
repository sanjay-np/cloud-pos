<?php

namespace Modules\Sales\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use Modules\Sales\Models\Sale;

class SaleRepository implements CrudRepositoryInterface
{
    protected $model;

    public function __construct(Sale $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model
            ->with('customer:id,name')
            ->paginate($perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function all()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function findOrFail(int $id)
    {
        return $this->model->find($id);
    }

    public function update(array $data, int $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->find($id)->delete();
    }
}
