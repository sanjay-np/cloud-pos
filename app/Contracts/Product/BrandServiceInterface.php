<?php

namespace App\Contracts\Product;

interface BrandServiceInterface
{
    public function paginate(int $perPage);

    public function store(array $data);

    public function find(int $id);

    public function findAll();

    public function update(array $data, int $id);

    public function delete(int $id);

    public function brandsForSupplier();
}
