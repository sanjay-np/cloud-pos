<?php

namespace App\Services;

use App\Contracts\Supplier\SupplierRepositoryInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Models\Brand;

class SupplierService implements SupplierServiceInterface
{
    protected $supplierRepository, $brand;

    public function __construct(SupplierRepositoryInterface $supplierRepository, Brand $brand)
    {
        $this->supplierRepository = $supplierRepository;
        $this->brand = $brand;
    }

    public function paginate(int $perPage)
    {
        return $this->supplierRepository->paginate(perPage: $perPage);
    }

    public function store(array $data)
    {
        return $this->supplierRepository->store(data: $data);
    }

    public function find(int $id)
    {
        return $this->supplierRepository->find(id: $id);
    }

    public function findAll()
    {
        return $this->supplierRepository->findAll();
    }

    public function update(array $data, int $id)
    {
        return $this->supplierRepository->update(data: $data, id: $id);
    }

    public function destroy(int $id)
    {
        return $this->supplierRepository->destroy(id: $id);
    }

    public function search(string $search_qry)
    {
        return $this->supplierRepository->search(search_qry: $search_qry);
    }

    public function take($count)
    {
        return $this->supplierRepository->take($count);
    }
}
