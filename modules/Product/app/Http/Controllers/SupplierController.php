<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\InertiaResponseTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Supplier\StoreRequest;
use Modules\Product\Http\Requests\Supplier\UpdateRequest;
use Modules\Product\Repositories\BrandRepository;
use Modules\Product\Repositories\SupplierRepository;

class SupplierController extends Controller
{
    use InertiaResponseTrait;
    
    protected $supplierRepository, $brandRepository;

    public function __construct(
        SupplierRepository $supplierRepository,
        BrandRepository $brandRepository
    ) {
        $this->supplierRepository = $supplierRepository;
        $this->brandRepository = $brandRepository;
    }
    public function index(Request $request)
    {
        $suppliers = $this->supplierRepository->paginate(perPage: 10);
        $brands = $this->brandRepository->findAll()->map(function ($brand) {
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
        $item = $this->supplierRepository->store($request->getValidated());
        if ($item) {
            return to_route('suppliers.index');
        }
    }

    public function show($id)
    {
        return $this->supplierRepository->findorFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->supplierRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('suppliers.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->supplierRepository->delete($id);
        if ($item) {
            return to_route('suppliers.index');
        }
    }

    public function take(int $count)
    {
        return $this->supplierRepository->take($count);
    }

    public function search(Request $request)
    {
        return $this->supplierRepository->search($request->get('q'));
    }

    public function picker(Request $request)
    {
        if ($request->has('search_qry')) {
            $items = $this->supplierRepository->search($request->search_qry);
        } else {
            $items = $this->supplierRepository->take($request->count ?? 10);
        }
        return $items->map(function ($item) {
            return [
                'value' => $item->id,
                'label' => $item->name,
            ];
        });
    }
}
