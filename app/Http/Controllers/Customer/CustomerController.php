<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreRequest;
use App\Http\Requests\Customer\UpdateRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(
        private Customer $model,
    ) {}

    public function index(Request $request)
    {
        $customers = $this->model->query()
            ->orderBy('id', 'desc')
            ->simplePaginate(perPage: $request->per_page ?? 10);

        return Inertia::render('customer/index', compact('customers'));
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: file validation
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('customers.index');
        }
    }
}
