<?php

namespace App\Http\Controllers;

use App\Contracts\Product\BrandServiceInterface;
use App\Contracts\Product\SupplierServiceInterface;
use App\Http\Requests\SupplierRequest;
use Illuminate\Http\Request;
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
        $brands = $this->brandService->findAll();
        $suppliers = $this->supplierService->paginate(perPage: 10);
        return Inertia::render(component: 'Suppliers/Index', props: [
            'brands' => $brands,
            'suppliers' => $suppliers
        ]);
    }

    public function store(SupplierRequest $request)
    {
        $supplier = $this->supplierService->store(data: $request->validated());
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
