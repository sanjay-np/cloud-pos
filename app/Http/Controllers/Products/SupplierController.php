<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Supplier\StoreRequest;
use Modules\Product\Http\Requests\Supplier\UpdateRequest;
use Modules\Product\Models\Supplier;
use Modules\Product\Services\SupplierService;

class SupplierController extends Controller
{
    public function __construct(
        private Supplier $model,
        private SupplierService $service
    ) {}

    public function index(Request $request)
    {
        $data = $this->service->index();
        return Inertia::render('Product::Supplier', $data);
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

    public function search(Request $request)
    {
        return $this->service->search($request->all());
    }
}
