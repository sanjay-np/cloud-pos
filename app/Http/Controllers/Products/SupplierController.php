<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Supplier\StoreRequest;
use App\Http\Requests\Supplier\UpdateRequest;
use App\Models\Brand;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function __construct(
        private Supplier $model,
    ) {}


    public function index(Request $request): Response
    {
        $suppliers = $this->model->query()
            ->select(['id', 'name', 'brands', 'contact_person', 'phone'])
            ->applyFilter($request->all())
            ->paginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        Brand::$disabledAppends = true;
        return Inertia::render('supplier/index', [
            'suppliers' => Inertia::merge($suppliers->items()),
            'pagination' => Arr::except($suppliers->toArray(), ['data', 'links']),
            'brands' => Inertia::defer(fn() => Brand::query()->select(['id', 'name'])->get(), 'optional'),
        ]);
    }


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('suppliers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show($id): Supplier
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('suppliers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy($id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('suppliers.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
