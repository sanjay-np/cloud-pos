<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Supplier\StoreRequest;
use Modules\Product\Http\Requests\Supplier\UpdateRequest;
use Modules\Product\Interfaces\Brand\BrandServiceInterface;
use Modules\Product\Interfaces\Supplier\SupplierServiceInterface;

class SupplierController extends Controller
{
    protected $supplierService, $brandService;

    public function __construct(
        SupplierServiceInterface $supplierService,
        BrandServiceInterface $brandService
    ) {
        $this->supplierService = $supplierService;
        $this->brandService = $brandService;
    }
    public function index()
    {
        $suppliers = $this->supplierService->paginate(perPage: 10);
        $brands = $this->brandService->all()->map(function ($brand) {
            return [
                'value' => $brand->id,
                'label' => $brand->name,
            ];
        });
        return Inertia::render('Product::Supplier', [
            'suppliers' => $suppliers,
            'brands' => $brands
        ]);
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
