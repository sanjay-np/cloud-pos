<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;

class PageController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService
    ) {}


    public function dashboard()
    {
        $items = $this->dashboardService->getDashboardItems();
        return Inertia::render('dashboard/index', $items);
    }
}
