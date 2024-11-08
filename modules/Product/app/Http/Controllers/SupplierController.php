<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Supplier\StoreRequest;
use Modules\Product\Http\Requests\Supplier\UpdateRequest;
use Modules\Product\Interfaces\Supplier\SupplierServiceInterface;

class SupplierController extends Controller
{
    protected $supplierService;

    public function __construct(SupplierServiceInterface $supplierService)
    {
        $this->supplierService = $supplierService;
    }
    public function index()
    {
        return Inertia::render('Product::Supplier');
    }

    public function store(StoreRequest $request)
    {
        $item = $this->supplierService->store($request->getValidated());
        if ($item) {
            return to_route('suppliers.index');
        }
    }

    public function show($id)
    {
        return $this->supplierService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->supplierService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('suppliers.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->supplierService->destroy($id);
        if ($item) {
            return to_route('suppliers.index');
        }
    }

    public function take(int $count)
    {
        return $this->supplierService->take($count);
    }

    public function search(Request $request)
    {
        return $this->supplierService->search($request->get('q'));
    }
}
