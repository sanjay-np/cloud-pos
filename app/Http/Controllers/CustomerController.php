<?php

namespace App\Http\Controllers;

use App\Contracts\Customer\CustomerServiceInterface;
use App\Http\Requests\Customer\StoreRequest;
use App\Http\Requests\Customer\UpdateRequest;
use Inertia\Inertia;

class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerServiceInterface $customerService)
    {
        $this->customerService = $customerService;
    }

    public function index()
    {
        $customers = $this->customerService->paginate(10);
        return Inertia::render('Customers/Index', [
            'customers' => $customers
        ]);
    }


    public function store(StoreRequest $request)
    {
        return $this->customerService->store($request->all());
    }

    public function find($id)
    {
        return $this->customerService->find($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        return $this->customerService->update($request->all(), $id);
    }

    public function destory($id)
    {
        return $this->customerService->destroy($id);
    }
}
