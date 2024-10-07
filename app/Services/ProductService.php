<?php

namespace App\Services;

use App\Contracts\Product\ProductRepositoryInterface;
use App\Contracts\Product\ProductServiceInterface;
use App\Traits\ImageUpload;

class ProductService implements ProductServiceInterface
{

    use ImageUpload;

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

    public function store(array $data)
    {
        $data['main_image'] = $this->uploadMainImage($data);
        $data['gallery_images'] = $this->uploadGalleryImages($data);
        return $this->productRepository->store($data);
    }

    public function find(int $id)
    {
        return $this->productRepository->find($id);
    }

    public function update(array $data, int $id)
    {
        $data['main_image'] = $this->uploadMainImage($data);
        $data['gallery_images'] = $this->uploadGalleryImages($data);
        return $this->productRepository->update($data, $id);
    }

    public function uploadMainImage($data)
    {
        $path = null;
        if (isset($data['main_image'])) {
            $path = $this->uploadImage($data['main_image']['blobFile'], 'Products');
        }
        return $path;
    }

    public function uploadGalleryImages($data)
    {
        $path = null;
        if (isset($data['gallery_images'])) {
            foreach ($data['gallery_images'] as $item) {
                $path[] = $this->uploadImage($item['blobFile'], 'Products');
            }
        }
        return $path;
    }
}
