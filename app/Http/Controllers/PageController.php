<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(DashboardService $service)
    {
        $items = $service->index();
        return Inertia::render('Dashboard', $items);
    }

    public function inventoryBook()
    {
        return Inertia::render('InventoryBook');
    }

    public function priceBook()
    {
        return Inertia::render('PriceBook');
    }
}
