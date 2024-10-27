<?php

namespace App\Http\Controllers;

use App\Contracts\Sales\SalesServiceInterface;
use Inertia\Inertia;

class SalesController extends Controller
{
    protected $salesService;

    public function __construct(SalesServiceInterface $salesService)
    {
        $this->salesService = $salesService;
    }

    public function index()
    {
        return Inertia::render('Sales/Index');
    }
}
