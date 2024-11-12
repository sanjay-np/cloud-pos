<?php

namespace App\Interfaces;

interface CrudRepositoryInterface
{
    public function paginate(int $perPage);

    public function findAll();

    public function store(array $data);

    public function findOrFail(int $id);

    public function update(array $data, int $id);

    public function delete(int $id);
}
