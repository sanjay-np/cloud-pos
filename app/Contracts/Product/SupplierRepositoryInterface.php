<?php

namespace App\Contracts\Product;

interface SupplierRepositoryInterface
{
    public function findAll(): object;

    public function paginate(int $perPage): object;

    public function create(array $data): object;

    public function find(int $id): object;

}
