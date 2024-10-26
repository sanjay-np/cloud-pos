<?php

namespace App\Http\Controllers;

use App\Contracts\Brand\BrandServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Http\Requests\Supplier\StoreRequest;
use App\Http\Requests\Supplier\UpdateRequest;
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

    public function store(StoreRequest $request)
    {
        $item = $this->supplierService->store(data: $request->all());
        if ($item) {
            return redirect(to: route(name: 'suppliers.index'));
        }
    }

    public function find($id)
    {
        return $this->supplierService->find(id: $id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->supplierService->update(data: $request->all(), id: $id);
        if ($item) {
            return redirect(to: route(name: 'suppliers.index'));
        }
    }

    public function destroy($id)
    {
        $item = $this->supplierService->destroy(id: $id);
        if ($item) {
            return to_route(route: 'suppliers.index');
        }
    }
}
