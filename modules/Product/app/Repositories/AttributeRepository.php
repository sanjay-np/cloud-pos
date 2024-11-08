<?php

namespace Modules\Product\Repositories;

use Modules\Product\Interfaces\Attribute\AttributeRepositoryInterface;
use Modules\Product\Models\Attribute;

class AttributeRepository implements AttributeRepositoryInterface
{
    protected $model;

    public function __construct(Attribute $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function show($id)
    {
        return $this->model->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function take(int $count)
    {
        return $this->model->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->model->where('name', 'like', '%' . $search_qry . '%')->get();
    }
}
