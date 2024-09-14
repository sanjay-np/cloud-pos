<?php

namespace App\Contracts\Product;

interface SupplierServiceInterface
{
    public function get(string $type): object;
    public function create(array $data): object;
}
