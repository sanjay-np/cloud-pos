<?php

namespace App\Http\Controllers;

use App\Contracts\Product\BrandServiceInterface;
use App\Contracts\Product\SupplierServiceInterface;
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
        $brands = $this->brandService->getBrandForSupplier();
        $suppliers = $this->supplierService->get(type: 'paginate');
        return Inertia::render(component: 'Suppliers/Index', props: [
            'brands' => $brands,
            'suppliers' => $suppliers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(rules: [
            'name' => ['required', 'string', 'max:255'],
        ]);
        $supplier = $this->supplierService->create(data: $request->all());
        return redirect(to: route(name: 'suppliers.index'));
    }

    public function find($id)
    {
        $supplier = $this->supplierService->find(id: $id);
        return $supplier;
    }
    public function destroy($id)
    {
        $this->supplierService->destroy(id: $id);
        return to_route(route: 'suppliers.index');
    }
}
