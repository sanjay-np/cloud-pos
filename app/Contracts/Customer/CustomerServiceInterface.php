<?php

namespace App\Contracts\Customer;

interface CustomerServiceInterface
{
    public function paginate(int $perPage);

    public function store(array $data);

    public function find(int $id);

    public function update(array $data, int $id);

    public function destroy(int $id);

    public function search(string $search_qry);

    public function labelAndValue();
}
