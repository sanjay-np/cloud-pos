<?php

namespace App\Contracts\Product;

interface BrandRepositoryInterface
{
    public function findAll(): object;
    public function paginate(int $perPage): object;
    public function find(int $id): object;
    public function destroy(int $id): bool;
}

