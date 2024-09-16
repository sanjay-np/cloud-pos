<?php

namespace App\Services\Product;

use App\Contracts\Product\BrandRepositoryInterface;
use App\Contracts\Product\BrandServiceInterface;

class BrandService implements BrandServiceInterface
{
    protected $brandRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(BrandRepositoryInterface $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function get(string $type): object
    {
        return match ($type) {
            'all' => $this->brandRepository->findAll(),
            'paginate' => $this->brandRepository->paginate(perPage: 10),
        };
    }

    public function find(int $id): object
    {
        $item = $this->brandRepository->find(id: $id);
        $item->image_url = $item->image ? asset(path: $item->image) : null;
        $item->makeHidden(attributes: ['image']);
        return $item;
    }

    public function destroy(int $id): bool
    {
        return $this->brandRepository->destroy(id: $id);
    }

    public function getBrandForSupplier(): array
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
