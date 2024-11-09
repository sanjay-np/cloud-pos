<?php

namespace Modules\Product\Interfaces\Brand;

interface BrandRepositoryInterface
{
    public function paginate(int $perPage);

    public function all();

    public function store(array $data);

    public function show($id);

    public function update(array $data, $id);

    public function destroy($id);

    public function take(int $count);

    public function search(string $search_qry);
}
