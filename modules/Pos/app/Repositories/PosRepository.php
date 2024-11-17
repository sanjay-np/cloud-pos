<?php

namespace Modules\Pos\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use Modules\Pos\Models\PointOfSale;

class PosRepository implements CrudRepositoryInterface
{

    protected $model;

    public function __construct(PointOfSale $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage) {}

    public function findAll() {}

    public function store(array $data) {}

    public function findOrFail(int $id) {}

    public function update(array $data, int $id) {}

    public function delete(int $id) {}
}
