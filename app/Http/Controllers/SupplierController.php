<?php

namespace App\Http\Controllers;

use App\Contracts\Brand\BrandServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Http\Requests\SupplierRequest;
use Inertia\Inertia;

class SupplierController extends Controller
{
    protected $supplierService, $brandService;

    public function __construct(SupplierServiceInterface $supplierService, BrandServiceInterface $brandService)
    {
        $this->supplierService = $supplierService;
        $this->brandService = $brandService;
    }

    public function index()
    {
        $brands = $this->brandService->brandsValueAndLabel();
        $suppliers = $this->supplierService->paginate(perPage: 10);
        return Inertia::render(component: 'Suppliers/Index', props: [
            'brands' => $brands,
            'suppliers' => $suppliers
        ]);
    }

    public function store(SupplierRequest $request)
    {
        $supplier = $this->supplierService->store(data: $request->all());
        return redirect(to: route(name: 'suppliers.index'));
    }

    public function update(SupplierRequest $request, $id)
    {
        $this->supplierService->update(data: $request->all(), id: $id);
        return redirect(to: route(name: 'suppliers.index'));
    }

    public function find($id)
    {
        $supplier = $this->supplierService->find(id: $id);
        return $supplier;
    }
    public function destroy($id)
    {
        $this->supplierService->delete(id: $id);
        return to_route(route: 'suppliers.index');
    }
}
