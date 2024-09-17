<?php

namespace App\Repositories\Product;

use App\Contracts\Product\CategoryRepositoryInterface;
use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected $model;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }
    public function paginate(int $perPage)
    {
        return $this->model->paginate(perPage: $perPage);
    }

    public function store(array $data)
    {
        return $this->model->create(attributes: $data);
    }

    public function find(int $id)
    {
        return $this->model->find(id: $id);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function update(array $data, int $id)
    {
        return $this->model->find(id: $id)->update(attributes: $data);
    }

    public function destroy(int $id)
    {
        return $this->model->find(id: $id)->delete();
    }
}
