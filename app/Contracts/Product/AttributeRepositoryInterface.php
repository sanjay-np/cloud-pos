<?php

namespace App\Contracts\Product;

interface AttributeRepositoryInterface
{
    public function paginate(int $perPage);

    public function findAll();
}
