<?php

namespace Modules\Product\Services;

use Modules\Product\Interfaces\Product\ProductRepositoryInterface;
use Modules\Product\Interfaces\Product\ProductServiceInterface;

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

    public function all()
    {
        return $this->productRepository->all();
    }

    public function store(array $data)
    {
        return $this->productRepository->store($data);
    }

    public function show($id)
    {
        return $this->productRepository->show($id);
    }

    public function update(array $data, $id)
    {
        return $this->productRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->productRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->productRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->productRepository->search($search_qry);
    }
}
