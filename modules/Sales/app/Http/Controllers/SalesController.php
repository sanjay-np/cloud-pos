<?php

namespace Modules\Sales\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sales\Http\Requests\StoreRequest;
use Modules\Sales\Http\Requests\UpdateRequest;
use Modules\Sales\Interfaces\SaleServiceInterface;

class SalesController extends Controller
{
    protected $saleService;

    public function __construct(SaleServiceInterface $saleService)
    {
        $this->saleService = $saleService;
    }

    public function index()
    {
        return Inertia::render('Sales::Index');
    }

    public function store(StoreRequest $request)
    {
        $item = $this->saleService->store($request->getValidated());
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function show(int $id)
    {
        return $this->saleService->show($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->saleService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->saleService->destroy($id);
        if ($item) {
            return to_route('sales.index');
        }
    }
}
