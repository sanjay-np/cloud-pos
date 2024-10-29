<?php

namespace App\Http\Controllers;

use App\Contracts\Customer\CustomerServiceInterface;
use App\Contracts\Sales\SalesServiceInterface;
use Inertia\Inertia;

class SalesController extends Controller
{
    protected $salesService, $customerService;

    public function __construct(
        SalesServiceInterface $salesService,
        CustomerServiceInterface $customerService
    ) {
        $this->salesService = $salesService;
        $this->customerService = $customerService;
    }

    public function index()
    {
        return Inertia::render('Sales/Index');
    }
}
