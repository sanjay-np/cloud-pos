<?php

namespace Modules\Product\Services;

use Modules\Product\Interfaces\Attribute\AttributeRepositoryInterface;
use Modules\Product\Interfaces\Attribute\AttributeServiceInterface;

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

    public function store(array $data)
    {
        return $this->attributeRepository->store($data);
    }

    public function show($id)
    {
        return $this->attributeRepository->show($id);
    }

    public function update(array $data, $id)
    {
        return $this->attributeRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->attributeRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->attributeRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->attributeRepository->search($search_qry);
    }
}
