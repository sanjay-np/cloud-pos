<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Purchase\StoreRequest;
use App\Http\Requests\Purchase\UpdateRequest;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function __construct(
        private Purchase $model
    ) {}


    public function index(Request $request)
    {
        $purchases = $this->model
            ->with(['supplier'])
            ->withCount('items')
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('purchases/index', [
            'purchases' => Inertia::merge($purchases->items()),
            'pagination' => Arr::except($purchases->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        // if ($item) {
        //     $this->purchaseService->createPurchaseDetail($request->getRequestedProducts(), $item->id);
        //     $this->purchaseService->createPurchasePayment($request->getRequestedPayment(), $item->id);
        //     return to_route('purchases.index');
        // }
    }


    public function show(int $id)
    {
        return $this->model->findOrFail($id);
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
