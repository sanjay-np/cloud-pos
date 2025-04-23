<?php

namespace App\Http\Controllers\Sales;

use App\Events\SaleCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreRequest;
use App\Http\Requests\Sales\UpdateRequest;
use App\Models\Customer;
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

        $sales->through(function ($sale) {
            return $sale->setAttribute('products', $sale->details->pluck('product.title'))
                ->setHidden(['details']);
        });

        return Inertia::render('sales/index', [
            'sales' => Inertia::merge($sales->items()),
            'pagination' => Arr::except($sales->toArray(), ['data', 'links']),
            'customers' => Inertia::defer(fn() => Customer::query()->select(['id', 'name'])->get()?->map(fn($item) => [
                'label' => $item->name,
                'value' => $item->id
            ]), 'optional'),
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            $this->service->createSaleDetail($request->getRequestedProducts(), $item->id);
            $this->service->createSalePayment($request->getRequestedPayment(), $item->id);
            event(new SaleCreated($item));
            return to_route('sales.pos');
        }
    }


    public function show(int $id)
    {
        Product::$disabledAppends = true;
        $item = $this->model->with('details.product:id,title')->findOrFail($id);

        if ($item->relationLoaded('details')) {
            $products = [];
            foreach ($item->details as $detail) {
                $products[] = [
                    'id'    => $detail->product->id ?? null,
                    'title' => $detail->product->title ?? null,
                    'qty'   => $detail->qty ?? 0,
                    'price' => $detail->price ?? 0,
                ];
            }
            $item->setAttribute('products', $products);
        }
        return $item;
    }


    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            $this->service->updateSaleDetail($request->getRequestedProducts(), $id);
            $this->service->updateSalePayment($request->getRequestedPayment(), $id);
            event(new SaleCreated($item));
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
        $customers = Customer::query()
            ->select(['id', 'name'])
            ->take(10)
            ->get()?->map(function($item){
            return [
                'value'=>$item->id,
                'label'=>$item->name
            ];
        });
        return Inertia::render('sales/pos',[
            'customers'=>$customers
        ]);
    }
}
