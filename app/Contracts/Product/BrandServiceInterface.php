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

    // public function get(string $type): object;
    // public function find(int $id): object;

    // public function destroy(int $id): bool;

    // public function getBrandForSupplier(): array;
}
