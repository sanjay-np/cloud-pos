<?php

namespace App\Services;

use App\Contracts\Customer\CustomerRepositoryInterface;
use App\Contracts\Customer\CustomerServiceInterface;

class CustomerService implements CustomerServiceInterface
{
    protected $customerRepository;

    public function __construct(CustomerRepositoryInterface $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->customerRepository->paginate($perPage);
    }

    public function store(array $data)
    {
        return $this->customerRepository->store($data);
    }

    public function find(int $id)
    {
        return $this->customerRepository->find($id);
    }

    public function update(array $data, int $id)
    {
        return $this->customerRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->customerRepository->destroy($id);
    }
}
