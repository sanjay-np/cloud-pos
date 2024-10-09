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
        $customers = $this->customerService->paginate(perPage: 10);
        return Inertia::render(component: 'Customers/Index', props: [
            'customers' => $customers
        ]);
    }


    public function store(StoreRequest $request)
    {
        $this->customerService->store($request->getValues() + ['avatar' => $request->getAvatar()]);
        return to_route('customers.index');
    }

    public function find($id)
    {
        return $this->customerService->find($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $this->customerService->update($request->getValues() + ['avatar' => $request->getAvatar()], $id);
        return to_route('customers.index');
    }

    public function destroy($id)
    {
        $this->customerService->destroy($id);
        return to_route('customers.index');
    }
}
