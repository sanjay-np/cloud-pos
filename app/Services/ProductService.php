<?php

namespace App\Services;

use App\Contracts\Product\ProductRepositoryInterface;
use App\Contracts\Product\ProductServiceInterface;

class ProductService implements ProductServiceInterface
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->productRepository->paginate($perPage);
    }

    public function findAll()
    {
        return $this->productRepository->findAll();
    }

    public function store(array $data) {}
}
