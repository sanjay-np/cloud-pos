<?php

namespace App\Services;

use App\Contracts\Attribute\AttributeServiceInterface;
use App\Contracts\Attribute\AttributeRepositoryInterface;
use App\Contracts\AttributeValue\AttributeValueServiceInterface;

class AttributeService implements AttributeServiceInterface
{
    protected $attributeRepository, $attributeValueService;

    public function __construct(
        AttributeRepositoryInterface $attributeRepository,
        AttributeValueServiceInterface $attributeValueService
    ) {
        $this->attributeRepository = $attributeRepository;
        $this->attributeValueService = $attributeValueService;
    }

    public function paginate(int $perPage)
    {
        return $this->attributeRepository->paginate($perPage);
    }

    public function findAll()
    {
        return $this->attributeRepository->findAll();
    }

    public function store(array $data)
    {
        $attribute  = $this->attributeRepository->store($data);
        if (isset($data['values'])) {
            foreach ($data['values'] as $item) {
                $valuesItem = [
                    'attribute_id' => $attribute->id,
                    'value' => $item
                ];
                $attributeValue = $this->attributeValueService->store($valuesItem);
            }
        }
        return $attribute;
    }

    public function find($id){
        return $this->attributeRepository->find($id);
    }

    public function update(array $data, int $id)
    {
        return $this->attributeRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->attributeRepository->destroy($id);
    }
}
