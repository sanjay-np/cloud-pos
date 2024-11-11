<?php

namespace Modules\Product\Repositories;

use App\Interfaces\Interfaces\CurdRepositoryInterface;
use Modules\Product\Models\Category;

class CategoryRepository implements CurdRepositoryInterface
{
    protected $model;

    public function __construct(Category $model)
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

    public function update(array $data, int $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->find($id)->delete();
    }

    public function take(int $count)
    {
        return $this->model->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->model->search($search_qry);
    }
}
