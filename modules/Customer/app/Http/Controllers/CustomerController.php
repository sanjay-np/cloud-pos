<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\InertiaResponseTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Http\Requests\StoreRequest;
use Modules\Customer\Http\Requests\UpdateRequest;
use Modules\Customer\Repositories\CustomerRepository;

class CustomerController extends Controller
{
    use InertiaResponseTrait;
    
    protected $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function index()
    {
        $customers = $this->customerRepository->paginate(perPage: 10);
        return Inertia::render('Customer::Index', [
            'customers' => $customers
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->customerRepository->store($request->getValidated() + ['avatar' => $request->getAvatar()]);
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function show($id)
    {
        return $this->customerRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update avatar
        $item = $this->customerRepository->update($request->getValidated() + ['avatar' => $request->getAvatar()], $id);
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->customerRepository->delete($id);
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function search(Request $request)
    {
        $customers = $this->customerRepository->search($request->search_qry);
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
        if ($request->has('search_qry')) {
            $items = $this->customerRepository->search($request->search_qry);
        } else {
            $items = $this->customerRepository->take($request->count ?? 10);
        }
        return $items->map(function ($item) {
            return [
                'value' => $item->id,
                'label' => $item->name,
            ];
        });
    }
}
