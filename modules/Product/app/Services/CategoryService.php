<?php

namespace Modules\Product\Services;

use Modules\Product\Interfaces\Category\CategoryRepositoryInterface;
use Modules\Product\Interfaces\Category\CategoryServiceInterface;

class CategoryService implements CategoryServiceInterface
{
    protected $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->categoryRepository->paginate($perPage);
    }

    public function store(array $data)
    {
        return $this->categoryRepository->store($data);
    }

    public function show($id)
    {
        return $this->categoryRepository->show($id);
    }

    public function update(array $data, $id)
    {
        return $this->categoryRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->categoryRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->categoryRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->categoryRepository->search($search_qry);
    }
}
