<?php

namespace App\Repositories\Product;
use App\Contracts\Product\BrandRepositoryInterface;
use App\Models\Brand;

class BrandRepository implements BrandRepositoryInterface
{
    public function findAll(): object
    {
        return Brand::all();
    }
    public function paginate(int $perPage): object
    {
        return Brand::paginate(perPage: $perPage);
    }
    public function find(int $id): object
    {
        return Brand::findOrFail(id: $id);
    }

    public function destroy(int $id): bool
    {
        $brand = Brand::findOrFail(id: $id);
        $brand->delete();
        return true;
    }
}
