<?php

namespace Modules\Purchase\Services;

use Modules\Purchase\Interfaces\PurchaseRepositoryInterface;
use Modules\Purchase\Interfaces\PurchaseServiceInterface;

class PurchaseService implements PurchaseServiceInterface
{
    protected $purchaseRepository;

    public function __construct(PurchaseRepositoryInterface $purchaseRepository)
    {
        $this->purchaseRepository = $purchaseRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->purchaseRepository->paginate($perPage);
    }

    public function all()
    {
        return $this->purchaseRepository->all();
    }

    public function store(array $data)
    {
        return $this->purchaseRepository->store($data);
    }

    public function show(int $id)
    {
        return $this->purchaseRepository->show($id);
    }

    public function update(array $data, int $id)
    {
        return $this->purchaseRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->purchaseRepository->destroy($id);
    }
}
