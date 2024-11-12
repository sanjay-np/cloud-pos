<?php

namespace Modules\Purchase\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use Modules\Purchase\Models\Purchase;

class PurchaseRepository implements CrudRepositoryInterface
{
    protected $model;

    public function __construct(Purchase $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model
            ->current()
            ->with(['supplier'])
            ->withCount('items')
            ->paginate($perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function findOrFail(int $id)
    {
        return $this->model->findOrFail($id);
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
