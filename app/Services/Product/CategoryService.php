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

    public function get(string $type)
    {
        return match ($type) {
            'all' => $this->categoryRepository->findAll(),
            'paginate' => $this->categoryRepository->paginate(perPage: 10),
        };
    }

    public function store(array $data)
    {
        return $this->categoryRepository->store($data);
    }
}
