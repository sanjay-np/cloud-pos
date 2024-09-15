<?php

namespace App\Contracts\Product;

interface SupplierRepositoryInterface
{
    public function findAll();

    public function paginate(int $perPage);

    public function create(array $data);

    public function find(int $id);

    public function destroy(int $id);

}
