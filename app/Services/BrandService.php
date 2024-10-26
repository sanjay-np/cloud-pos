<?php

namespace App\Services;

use App\Contracts\Brand\BrandRepositoryInterface;
use App\Contracts\Brand\BrandServiceInterface;
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
        $brand = $this->brandRepository->find(id: $id);
        if (isset($brand->image)) {
            $brand->image_url = asset($brand->image);
        }
        return  $brand;
    }

    public function update(array $data, int $id)
    {
        $item = $this->brandRepository->find(id: $id);
        $data['image'] = $this->upload(data: $data) ?? $item->image;
        return $this->brandRepository->update(data: $data, id: $id);
    }

    public function destroy(int $id)
    {
        // Todo: Image unlink
        return $this->brandRepository->destroy(id: $id);
    }


    public function upload(array $data)
    {
        $filePath = null;
        if (isset($data['image'])) {
            $filePath = $this->uploadImage(image: $data['image']['blobFile'], path: 'Brands');
        }
        return $filePath;
    }

    public function brandsValueAndLabel(): array
    {
        $brands = $this->brandRepository->findAll();
        $brands = $brands->map(function ($brand) {
            return [
                'value' => $brand->id,
                'label' => $brand->name
            ];
        })->toArray();
        return $brands;
    }
}
