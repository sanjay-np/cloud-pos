<?php

namespace Modules\PointOfSale\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\PointOfSale\Http\Requests\StoreRequest;
use Modules\PointOfSale\Services\PointOfSaleService;

class PointOfSaleController extends Controller
{
    public function __construct(
        private PointOfSaleService $pointOfSaleService
    ) {}

    public function index()
    {
        return Inertia::render('PointOfSale::Index');
    }

    public function store(StoreRequest $request)
    {
        return $this->pointOfSaleService->store($request->getRequested());
    }
}
