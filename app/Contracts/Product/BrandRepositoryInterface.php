<?php

namespace App\Contracts\Product;

interface BrandRepositoryInterface
{
    public function paginate(int $perPage);

    public function store(array $data);

    public function find(int $id);

    // public function findAll(): object;
    // public function paginate(int $perPage): object;
    // public function destroy(int $id): bool;
}
