<?php

namespace Modules\Sales\Repositories;

use Modules\Sales\Interfaces\SaleRepositoryInterface;
use Modules\Sales\Models\Sale;

class SaleRepository implements SaleRepositoryInterface
{
    protected $model;

    public function __construct(Sale $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }

    public function all()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function show(int $id)
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
}
