<?php

namespace App\Http\Controllers\Sales;

use App\Events\SaleCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\PaymentRequest;
use App\Http\Requests\Sales\StoreRequest;
use App\Http\Requests\Sales\UpdateRequest;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Services\SaleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SalesController extends Controller
{
    public function __construct(
        private Sale $model,
        private SaleService $service
    ) {}


    public function index(Request $request): Response
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


    public function store(StoreRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $item = $this->model->create($request->getRequested());
            if ($item) {
                $this->service->createSaleDetail($request->getRequestedProducts(), $item->id);
                $this->service->createSalePayment($request->getRequestedPayment(), $item->id);
                event(new SaleCreated($item));
            }
            DB::commit();
            return to_route('sales.pos');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }


    public function show(int $id): Sale
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


    public function update(UpdateRequest $request, int $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $item = $this->model->findOrFail($id)->update($request->getRequested());
            if ($item) {
                $this->service->updateSaleDetail($request->getRequestedProducts(), $id);
                $this->service->updateSalePayment($request->getRequestedPayment(), $id);
                event(new SaleCreated($item));
            }
            DB::commit();
            return to_route('sales.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('sales.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function pos(): Response
    {
        $customers = Customer::query()
            ->select(['id', 'name'])
            ->take(10)
            ->get()?->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name
                ];
            });
        return Inertia::render('sales/pos', [
            'customers' => $customers
        ]);
    }


    public function addPayment(PaymentRequest $request, int $id): RedirectResponse
    {
        try {
            $this->service->createSalePayment($request->getRequested(), $id);
            return to_route('sales.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
