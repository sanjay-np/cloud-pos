<?php

namespace App\Repositories\Product;
use App\Contracts\Product\SupplierRepositoryInterface;
use App\Models\Supplier;

class SupplierRepository implements SupplierRepositoryInterface
{

    public function findAll(): object
    {
        return Supplier::all();
    }

    public function paginate(int $perPage): object
    {
        return Supplier::paginate(perPage: $perPage);
    }

    public function create(array $data): object
    {
        return Supplier::create(attributes: $data);
    }

    public function find(int $id): object
    {
        return Supplier::findOrFail($id);
    }
}
