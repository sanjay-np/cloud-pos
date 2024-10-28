<?php

namespace App\Services;

use App\Contracts\Customer\CustomerRepositoryInterface;
use App\Contracts\Customer\CustomerServiceInterface;
use App\Traits\ImageUpload;

class CustomerService implements CustomerServiceInterface
{
    use ImageUpload;

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
        $data['avatar'] = $this->uploadImage($data['avatar']['blobFile'], 'customers');
        return $this->customerRepository->store($data);
    }

    public function find(int $id)
    {
        return $this->customerRepository->find($id);
    }

    public function update(array $data, int $id)
    {
        if (!isset($data['avatar'])) {
            unset($data['avatar']);
        } else {
            $data['avatar'] = $this->uploadImage($data['avatar']['blobFile'], 'customers');
        }
        // Todo: Delete previous uploaded Image
        return $this->customerRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->customerRepository->destroy($id);
    }

    public function search($search_qry)
    {
        return $this->customerRepository->search($search_qry);
    }

    public function labelAndValue()
    {
        $customers = $this->customerRepository->takeItems(10);
        $customers = $customers->map(function ($customer) {
            return [
                'value' => $customer->id,
                'label' => $customer->name
            ];
        });
        return $customers;
    }
}
