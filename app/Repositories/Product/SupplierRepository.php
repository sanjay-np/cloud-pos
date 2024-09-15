<?php

namespace App\Repositories\Product;
use App\Contracts\Product\SupplierRepositoryInterface;
use App\Models\Supplier;

class SupplierRepository implements SupplierRepositoryInterface
{

    public function findAll()
    {
        return Supplier::all();
    }

    public function paginate(int $perPage)
    {
        return Supplier::paginate(perPage: $perPage);
    }

    public function create(array $data)
    {
        return Supplier::create(attributes: $data);
    }

    public function find(int $id)
    {
        return Supplier::findOrFail($id);
    }

    public function destroy(int $id)
    {
        Supplier::destroy($id);
    }
}
