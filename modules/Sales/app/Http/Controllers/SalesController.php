<?php

namespace Modules\Sales\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sales\Http\Requests\StoreRequest;
use Modules\Sales\Http\Requests\UpdateRequest;
use Modules\Sales\Repositories\SaleRepository;

class SalesController extends Controller
{
    protected $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function index(Request $request)
    {
        return Inertia::render('Sales::Index');
    }

    public function store(StoreRequest $request)
    {
        $item = $this->saleRepository->store($request->getValidated());
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function show(int $id)
    {
        return $this->saleRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->saleRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->saleRepository->delete($id);
        if ($item) {
            return to_route('sales.index');
        }
    }
}
