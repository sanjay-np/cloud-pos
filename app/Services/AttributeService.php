<?php

namespace App\Services;

use App\Contracts\Attribute\AttributeRepositoryInterface;
use App\Contracts\Attribute\AttributeServiceInterface;

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

    public function store(array $data)
    {
        return $this->attributeRepository->store($data);
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
