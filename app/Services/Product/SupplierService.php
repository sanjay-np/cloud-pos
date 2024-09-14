<?php

namespace App\Services\Product;
use App\Contracts\Product\SupplierRepositoryInterface;
use App\Contracts\Product\SupplierServiceInterface;

class SupplierService implements SupplierServiceInterface
{
    protected $supplierRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(SupplierRepositoryInterface $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }

    public function get(string $type): object
    {
        return match ($type) {
            'all' => $this->supplierRepository->findAll(),
            'paginate' => $this->supplierRepository->paginate(perPage: 10),
            default => $this->supplierRepository->findAll(),
        };
    }

    public function create(array $data): object
    {
        return $this->supplierRepository->create(data: $data);
    }
}
