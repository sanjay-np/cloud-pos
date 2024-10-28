<?php

namespace App\Http\Controllers;

use App\Contracts\Customer\CustomerServiceInterface;
use App\Http\Requests\Customer\StoreRequest;
use App\Http\Requests\Customer\UpdateRequest;
use Illuminate\Http\Request;
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
        $item = $this->customerService->store($request->getValues() + ['avatar' => $request->getAvatar()]);
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function find($id)
    {
        return $this->customerService->find($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->customerService->update($request->getValues() + ['avatar' => $request->getAvatar()], $id);
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->customerService->destroy($id);
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function search(Request $request)
    {
        return $this->customerService->search($request->search_qry);
    }
}
