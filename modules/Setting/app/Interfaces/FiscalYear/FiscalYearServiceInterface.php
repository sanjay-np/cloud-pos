<?php

namespace Modules\Setting\Interfaces\FiscalYear;

interface FiscalYearServiceInterface
{
    public function paginate(int $perPage);

    public function all();

    public function store(array $data);

    public function show(int $id);

    public function update(array $data, int $id);

    public function destroy(int $id);
}
