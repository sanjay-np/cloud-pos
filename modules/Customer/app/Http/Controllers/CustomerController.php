<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Http\Requests\StoreRequest;
use Modules\Customer\Http\Requests\UpdateRequest;
use Modules\Customer\Interfaces\CustomerServiceInterface;

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
        return Inertia::render('Customer::Index', [
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

    public function show($id)
    {
        return $this->customerService->show($id);
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
        $customers = $this->customerService->search($request->search_qry);
        if (isset($request->show_type) && $request->show_type === 'picker') {
            return $customers->map(function ($customer) {
                return [
                    'value' => $customer->id,
                    'label' => $customer->name
                ];
            });
        }
        return $customers;
    }
    public function picker(Request $request)
    {
        return $this->customerService->take($request->count ?? 10);
    }
}
