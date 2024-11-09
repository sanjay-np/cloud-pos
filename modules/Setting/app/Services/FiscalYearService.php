<?php

namespace Modules\Setting\Services;

use Modules\Setting\Interfaces\FiscalYear\FiscalYearRepositoryInterface;
use Modules\Setting\Interfaces\FiscalYear\FiscalYearServiceInterface;

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

    public function all()
    {
        return $this->fiscalYearRepository->all();
    }

    public function store(array $data)
    {
        return $this->fiscalYearRepository->store($data);
    }

    public function show(int $id)
    {
        return $this->fiscalYearRepository->show($id);
    }

    public function update(array $data, int $id)
    {
        return $this->fiscalYearRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->fiscalYearRepository->destroy($id);
    }
}
