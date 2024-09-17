<?php

namespace App\Services\Product;

use App\Contracts\Product\BrandRepositoryInterface;
use App\Contracts\Product\BrandServiceInterface;
use App\Traits\ImageUpload;

class BrandService implements BrandServiceInterface
{
    use ImageUpload;

    protected $brandRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(BrandRepositoryInterface $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->brandRepository->paginate(perPage: $perPage);
    }

    public function findAll()
    {
        return $this->brandRepository->findAll();
    }

    public function store(array $data)
    {
        $data['image'] = $this->upload(data: $data);
        return $this->brandRepository->store(data: $data);
    }

    public function find(int $id)
    {
        return $this->brandRepository->find(id: $id);
    }

    public function update(array $data, int $id)
    {
        $item = $this->brandRepository->find(id: $id);
        $data['image'] = $this->upload(data: $data) ?? $item->image;
        return $this->brandRepository->update(data: $data, id: $id);
    }

    public function delete(int $id)
    {
        return $this->brandRepository->delete(id: $id);
    }


    public function upload(array $data)
    {
        $filePath = null;
        if (isset($data['image'])) {
            $filePath = $this->uploadImage(image: $data['image']['blobFile'], path: 'Brands');
        }
        return $filePath;
    }
}
