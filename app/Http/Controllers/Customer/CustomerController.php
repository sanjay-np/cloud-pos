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
            ->select(['id', 'name', 'email', 'phone', 'status'])
            ->orderBy('id', 'desc')
            ->simplePaginate(perPage: $request->per_page ?? 20)
            ->withQueryString();

        return Inertia::render('customer/index', compact('customers'));
    }


    public function store(StoreRequest $request)
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('customers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
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
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('customers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
