<?php

namespace Modules\Customer\Services;

use Modules\Customer\Interfaces\CustomerRepositoryInterface;
use Modules\Customer\Interfaces\CustomerServiceInterface;

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

    public function show($id)
    {
        return $this->customerRepository->show($id);
    }

    public function update(array $data, $id)
    {
        return $this->customerRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->customerRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->customerRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->customerRepository->search($search_qry);
    }
}
