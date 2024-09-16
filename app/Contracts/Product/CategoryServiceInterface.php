<?php

namespace App\Contracts\Product;

interface CategoryServiceInterface
{
    public function get(string $type);

    public function store(array $data);
}
