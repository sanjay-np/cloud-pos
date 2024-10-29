<?php

namespace App\Http\Controllers;

use App\Contracts\Brand\BrandServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Http\Requests\Supplier\StoreRequest;
use App\Http\Requests\Supplier\UpdateRequest;
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
        $suppliers = $this->supplierService->paginate(perPage: 10);
        return Inertia::render(component: 'Suppliers/Index', props: [
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

    public function search(Request $request)
    {
        $suppliers = $this->supplierService->search($request->search);
        if (isset($request->show_type) && $request->show_type === 'picker') {
            return  $suppliers->map(function ($supplier) {
                return [
                    'value' => $supplier->id,
                    'label' => $supplier->name
                ];
            });
        }
        return $suppliers;
    }

    public function picker(Request $request)
    {
        $suppliers = $this->supplierService->take($request->count ?? 10);
        $suppliers = $suppliers->map(function ($supplier) {
            return [
                'value' => $supplier->id,
                'label' => $supplier->name
            ];
        });
        return $suppliers;
    }
}
