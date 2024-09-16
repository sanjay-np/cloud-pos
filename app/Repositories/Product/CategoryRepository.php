<?php

namespace App\Repositories\Product;

use App\Contracts\Product\CategoryRepositoryInterface;
use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{


    public function findAll()
    {
        return Category::all();
    }


    public function paginate(int $perPage)
    {
        return Category::paginate(perPage: $perPage);
    }


    public function store(array $data)
    {
        return Category::create(attributes: $data);
    }
}
