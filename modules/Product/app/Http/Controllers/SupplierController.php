<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Actions\SupplierAction;
use Modules\Product\Http\Requests\Supplier\StoreRequest;
use Modules\Product\Http\Requests\Supplier\UpdateRequest;
use Modules\Product\Models\Brand;
use Modules\Product\Models\Supplier;

class SupplierController extends Controller
{
    public function __construct(
        private Brand $brandModel,
        private Supplier $model,
    ) {}

    public function index(Request $request)
    {
        $brands = $this->brandModel->all()->map(function ($brand) {
            return [
                'value' => $brand->id,
                'label' => $brand->name,
            ];
        });
        $suppliers = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Product::Supplier', [
            'brands' => $brands,
            'suppliers' => $suppliers,
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

    public function search(Request $request, SupplierAction $action)
    {
        $items = null;
        if ($request->has('search_qry')) {
            $items = $action->search($request->search_qry);
        } else {
            $items = $this->model->take($request->count ?? 10)->get();
        }
        if ($request->has('type') && $request->type == 'picker') {
            return $items->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ];
            });
        }
        return $items;
    }
}
