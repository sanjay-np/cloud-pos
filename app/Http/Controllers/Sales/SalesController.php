<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreRequest;
use App\Http\Requests\Sales\UpdateRequest;
use App\Models\Product;
use App\Models\Sale;
use App\Services\SaleService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function __construct(
        private Sale $model,
        private SaleService $service
    ) {}


    public function index(Request $request)
    {
        $sales = $this->model
            ->with('customer:id,name')
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('sales/index', [
            'sales' => Inertia::merge($sales->items()),
            'pagination' => Arr::except($sales->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            $this->service->createSaleDetail($request->getRequestedProducts(), $item->id);
            $this->service->createSalePayment($request->getRequestedPayment(), $item->id);
            return to_route('sales.index');
        }
    }


    public function show(int $id)
    {
        Product::$disabledAppends = true;
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            $this->service->updateSaleDetail($request->getRequestedProducts(), $id);
            $this->service->updateSalePayment($request->getRequestedPayment(), $id);
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


    public function pos(Request $request)
    {
        return Inertia::render('sales/pos');
    }
}
