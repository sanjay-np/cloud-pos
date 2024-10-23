<?php

namespace App\Services;

use App\Contracts\FiscalYear\FiscalYearRepositoryInterface;
use App\Contracts\FiscalYear\FiscalYearServiceInterface;

class FiscalYearService implements FiscalYearServiceInterface
{
    protected $fiscalYearRepository;

    public function __construct(FiscalYearRepositoryInterface $fiscalYearRepository)
    {
        $this->fiscalYearRepository = $fiscalYearRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->fiscalYearRepository->paginate($perPage);
    }

    public function store($data)
    {
        return $this->fiscalYearRepository->store($data);
    }

    public function find(int $id)
    {
        return $this->fiscalYearRepository->find($id);
    }

    public function findAll()
    {
        return $this->fiscalYearRepository->findAll();
    }

    public function update(array $data, int $id)
    {
        return $this->fiscalYearRepository->update($data, $id);
    }

    public function delete(int $id)
    {
        return $this->fiscalYearRepository->delete($id);
    }
}
