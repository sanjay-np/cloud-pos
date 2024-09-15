<?php

namespace App\Contracts\Product;

interface SupplierServiceInterface
{
    public function get(string $type);
    public function create(array $data);

    public function find(int $id);

    public function destroy(int $id);
}

