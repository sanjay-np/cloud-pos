<?php

namespace App\Contracts\Employee;

interface EmployeeRepositoryInterface
{
    public function paginate(int $perPage);

    public function store(array $data);

    public function find(int $id);

    public function update(array $data, int $id);

    public function delete(int $id);
}
