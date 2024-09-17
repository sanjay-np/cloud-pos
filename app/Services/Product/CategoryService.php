<?php

namespace App\Services\Product;

use App\Contracts\Product\CategoryRepositoryInterface;
use App\Contracts\Product\CategoryServiceInterface;

class CategoryService implements CategoryServiceInterface
{
    protected $categoryRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->categoryRepository->paginate(perPage: $perPage);
    }

    public function store(array $data)
    {
        return $this->categoryRepository->store($data);
    }

    public function find(int $id)
    {
        return $this->categoryRepository->find($id);
    }

    public function findAll()
    {
        return $this->categoryRepository->findAll();
    }

    public function update(array $data, int $id)
    {
        return $this->categoryRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->categoryRepository->destroy($id);
    }
}
