<?php

namespace App\Repositories\Product;

use App\Contracts\Product\BrandRepositoryInterface;
use App\Models\Brand;

class BrandRepository implements BrandRepositoryInterface
{
    protected $model;

    public function __construct(Brand $model)
    {
        $this->model = $model;
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
        return $this->model->findOrFail(id: $id);
    }

    // public function findAll(): object
    // {
    //     return Brand::all();
    // }
    // public function paginate(int $perPage): object
    // {
    //     return Brand::paginate(perPage: $perPage);
    // }
    // public function find(int $id): object
    // {
    //     return Brand::findOrFail(id: $id);
    // }

    // public function destroy(int $id): bool
    // {
    //     $brand = Brand::findOrFail(id: $id);
    //     $brand->delete();
    //     return true;
    // }
}
