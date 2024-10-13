<?php

namespace App\Http\Controllers;

use App\Contracts\Purchase\PurchaseServiceInterface;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    protected $purchaseService;

    public function __construct(PurchaseServiceInterface $purchaseService)
    {
        $this->purchaseService = $purchaseService;
    }

    public function index()
    {
        return Inertia::render('Purchases/Index');
    }
}
