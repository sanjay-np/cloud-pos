<?php

namespace App\Contracts\Product;

interface CategoryRepositoryInterface
{

    public function paginate(int $perPage);

    public function store(array $data);

    public function find(int $id);

    public function findAll();

    public function update(array $data, int $id);

    public function destroy(int $id);
}
