<?php

namespace App\Services\Product;

use App\Contracts\Product\AttributeRepositoryInterface;
use App\Contracts\Product\AttributeServiceInterface;


class AttributeService implements AttributeServiceInterface
{
    protected $attributeRepository;
    public function __construct(AttributeRepositoryInterface $attributeRepository)
    {
        $this->attributeRepository = $attributeRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->attributeRepository->paginate($perPage);
    }

    public function findAll()
    {
        return $this->attributeRepository->findAll();
    }
}
