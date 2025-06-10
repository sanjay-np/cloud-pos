<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreRequest;
use App\Http\Requests\Customer\UpdateRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function __construct(
        private Customer $model,
    ) {}


    public function index(Request $request): Response
    {
        $customers = $this->model->query()
            ->select(['id', 'name', 'email', 'phone', 'status', 'avatar'])
            ->applyFilter($request->qry)
            ->orderBy('id', 'desc')
            ->paginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('customer/index', [
            'customers' => Inertia::merge($customers->items()),
            'pagination' => Arr::except($customers->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('customers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show(int $id): Customer
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('customers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('customers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function search(Request $request)
    {
        return $this->model->query()
            ->select(['id', 'name', 'email', 'phone', 'status', 'avatar'])
            ->applyFilter($request->search_qry)
            ->take(10)
            ->get();
    }
}
