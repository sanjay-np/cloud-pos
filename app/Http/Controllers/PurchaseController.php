<?php

namespace App\Http\Controllers;

use App\Contracts\Purchase\PurchaseServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    protected $purchaseService, $supplierService;

    public function __construct(PurchaseServiceInterface $purchaseService, SupplierServiceInterface $supplierService)
    {
        $this->purchaseService = $purchaseService;
        $this->supplierService = $supplierService;
    }

    public function index()
    {
        $suppliers = $this->supplierService->suppliersValueAndLabel();
        return Inertia::render('Purchases/Index', [
            'suppliers' => $suppliers
        ]);
    }
}
