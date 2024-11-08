<?php

namespace Modules\Product\Services;

use Modules\Product\Interfaces\Supplier\SupplierRepositoryInterface;
use Modules\Product\Interfaces\Supplier\SupplierServiceInterface;

class SupplierService implements SupplierServiceInterface
{
    protected $supplierRepository;

    public function __construct(SupplierRepositoryInterface $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }
    public function paginate(int $perPage)
    {
        return $this->supplierRepository->paginate($perPage);
    }

    public function store(array $data)
    {
        return $this->supplierRepository->store($data);
    }

    public function show($id)
    {
        return $this->supplierRepository->show($id);
    }

    public function update(array $data, $id)
    {
        return $this->supplierRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->supplierRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->supplierRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->supplierRepository->search($search_qry);
    }
}
