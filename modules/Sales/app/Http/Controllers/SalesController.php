<?php

namespace Modules\Sales\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sales\Events\SaleCreated;
use Modules\Sales\Http\Requests\StoreRequest;
use Modules\Sales\Http\Requests\UpdateRequest;
use Modules\Sales\Models\Sale;
use Modules\Sales\Services\SaleService;

class SalesController extends Controller
{
    public function __construct(
        private Sale $model,
        private SaleService $saleService
    ) {}

    public function index(Request $request)
    {
        $sales = $this->model
            ->with('customer:id,name')
            ->orderBy('id', 'desc')
            ->paginate(10);
        return Inertia::render('Sales::Index', ['sales' => $sales]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            $this->saleService->createSaleDetail($request->getRequestedProducts(), $item->id);
            $this->saleService->createSalePayment($request->getRequestedPayment(), $item->id);
            event(new SaleCreated($item));
            return to_route('sales.index');
        }
    }

    public function show(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('sales.index');
        }
    }
}
