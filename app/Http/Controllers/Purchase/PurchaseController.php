<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Purchase\PaymentRequest;
use App\Http\Requests\Purchase\StoreRequest;
use App\Http\Requests\Purchase\UpdateRequest;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Supplier;
use App\Services\PurchaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseController extends Controller
{
    public function __construct(
        private Purchase $model,
        private PurchaseService $service,
    ) {}


    public function index(Request $request): Response
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


    public function store(StoreRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $item = $this->model->create($request->getRequested());
            if ($item) {
                $this->service->createPurchaseDetail($request->getRequestedProducts(), $item->id);
                $this->service->createPurchasePayment($request->getRequestedPayment(), $item->id);
            }
            DB::commit();
            return to_route('purchases.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }


    public function show(int $id): Purchase
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


    public function update(UpdateRequest $request, int $purchaseId): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $item = $this->model->findOrFail($purchaseId)->update($request->getRequested());
            if ($item) {
                $this->service->updatePurchaseDetail($request->getRequestedProducts(), $purchaseId);
                $this->service->updatePurchasePayment($request->getRequestedPayment(), $purchaseId);
            }
            DB::commit();
            return to_route('purchases.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('purchases.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getmessage());
        }
    }


    public function addPayment(PaymentRequest  $request, int $id): RedirectResponse
    {
        try {
            $this->service->createPurchasePayment($request->getRequested(), $id);
            return to_route('purchases.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
