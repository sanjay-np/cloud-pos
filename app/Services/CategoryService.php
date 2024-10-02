<?php

namespace App\Services;

use App\Contracts\Category\CategoryRepositoryInterface;
use App\Contracts\Category\CategoryServiceInterface;
use App\Traits\ImageUpload;

class CategoryService implements CategoryServiceInterface
{

    use ImageUpload;

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
        $data['image'] = $this->imageUpload($data);
        return $this->categoryRepository->store($data);
    }

    public function find(int $id)
    {
        $item =$this->categoryRepository->find($id);
        if(isset($item->image)){
            $item->image_url = asset($item->image);
        }
        return $item;
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

    public function imageUpload($data)
    {
        $path = null;
        if (isset($data['image'])) {
            $path = $this->uploadImage($data['image']['blobFile'], 'Category');
        }
        return $path;
    }
}
