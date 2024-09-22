<?php

namespace App\Contracts\Product;

interface AttributeServiceInterface
{
    public function paginate(int $perPage);

    public function findAll();
}
