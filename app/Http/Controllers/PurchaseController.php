<?php

namespace App\Http\Controllers;

use App\Contracts\Purchase\PurchaseServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Http\Requests\Purchase\StoreRequest;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    protected $purchaseService, $supplierService;

    public function __construct(
        PurchaseServiceInterface $purchaseService,
        SupplierServiceInterface $supplierService
    ) {
        $this->purchaseService = $purchaseService;
        $this->supplierService = $supplierService;
    }

    public function index()
    {
        $suppliers = $this->supplierService->suppliersValueAndLabel();
        $purchases = $this->purchaseService->paginate(perPage: 10);
        return Inertia::render('Purchases/Index', [
            'suppliers' => $suppliers,
            'purchases' => $purchases
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->purchaseService->store($request->valuesToStore());
        if ($item) {
            return redirect(to: route(name: 'purchases.index'));
        }
    }
}
