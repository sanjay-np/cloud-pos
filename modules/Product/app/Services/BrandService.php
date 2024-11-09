<?php

namespace Modules\Product\Services;

use Modules\Product\Interfaces\Brand\BrandRepositoryInterface;
use Modules\Product\Interfaces\Brand\BrandServiceInterface;

class BrandService implements BrandServiceInterface
{
    protected $brandRepository;

    public function __construct(BrandRepositoryInterface $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->brandRepository->paginate($perPage);
    }

    public function all()
    {
        return $this->brandRepository->all();
    }

    public function store(array $data)
    {
        return $this->brandRepository->store($data);
    }

    public function show($id)
    {
        return $this->brandRepository->show($id);
    }

    public function update(array $data, $id)
    {
        return $this->brandRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->brandRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->brandRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->brandRepository->search($search_qry);
    }
}
