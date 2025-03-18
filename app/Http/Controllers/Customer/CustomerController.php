<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreRequest;
use App\Http\Requests\Customer\UpdateRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(
        private Customer $model,
    ) {}


    public function index(Request $request)
    {
        $customers = $this->model->query()
            ->select(['id', 'name', 'email', 'phone', 'status', 'avatar'])
            ->orderBy('id', 'desc')
            ->paginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('customer/index', [
            'customers' => Inertia::merge($customers->items()),
            'pagination' => Arr::except($customers->toArray(), ['data', 'links'])
        ]);
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
