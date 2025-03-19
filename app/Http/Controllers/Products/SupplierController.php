<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Supplier\StoreRequest;
use App\Http\Requests\Supplier\UpdateRequest;
use App\Models\Brand;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function __construct(
        private Supplier $model,
    ) {}


    public function index(Request $request)
    {
        $suppliers = $this->model->query()
            ->select(['id', 'name', 'brands', 'contact_person', 'phone'])
            ->applyFilter($request->all())
            ->paginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        Brand::$disabledAppends = true;
        $brands = Brand::query()
            ->select(['id', 'name'])
            ->get();
        return Inertia::render('supplier/index', [
            'suppliers' => Inertia::merge($suppliers->items()),
            'pagination' => Arr::except($suppliers->toArray(), ['data', 'links']),
            'brands' => $brands
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('suppliers.index');
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
            return to_route('suppliers.index');
        }
    }


    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('suppliers.index');
        }
    }
}
