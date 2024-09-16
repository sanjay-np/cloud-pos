<?php

namespace App\Contracts\Product;

interface CategoryRepositoryInterface
{

    public function findAll();

    public function paginate(int $perPage);

    public function store(array $data);
}
