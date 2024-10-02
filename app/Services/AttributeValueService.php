<?php

namespace App\Services;

use App\Contracts\AttributeValue\AttributeValueServiceInterface;
use App\Repositories\AttributeValueRepository;

class AttributeValueService implements AttributeValueServiceInterface
{
    protected $attributeValueRepository;

    public function __construct(AttributeValueRepository $attributeValueRepository)
    {
        $this->attributeValueRepository = $attributeValueRepository;
    }

    public function store(array $data)
    {
        return $this->attributeValueRepository->store($data);
    }
}
