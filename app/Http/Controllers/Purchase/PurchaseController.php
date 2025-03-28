<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Purchase\StoreRequest;
use App\Http\Requests\Purchase\UpdateRequest;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Supplier;
use App\Services\PurchaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function __construct(
        private Purchase $model,
        private PurchaseService $service,
    ) {}


    public function index(Request $request)
    {
        $purchases = $this->model->query()
            ->with([
                'supplier:id,name',
                'details.product:id,title'
            ])
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        $purchases->through(function ($purchase) {
            return $purchase->setAttribute('products', $purchase->details->pluck('product.title'))
                ->setHidden(['details']);
        });


        return Inertia::render('purchases/index', [
            'purchases' => Inertia::merge($purchases->items()),
            'pagination' => Arr::except($purchases->toArray(), ['data', 'links']),
            'suppliers' => Inertia::defer(fn() => Supplier::query()->select(['id', 'name'])->get()?->map(fn($item) => [
                'label' => $item->name,
                'value' => $item->id
            ]), 'optional'),
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            $this->service->createPurchaseDetail($request->getRequestedProducts(), $item->id);
            $this->service->createPurchasePayment($request->getRequestedPayment(), $item->id);
            return to_route('purchases.index');
        }
    }


    public function show(int $id)
    {
        Product::$disabledAppends = true;
        $item = $this->model->with('details.product:id,title,purchase_price')->findOrFail($id);
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
            return to_route('purchases.index');
        }
    }


    public function destroy(int $id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('purchases.index');
        }
    }
}
