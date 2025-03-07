<?php

namespace Modules\Purchase\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Purchase\Http\Requests\StoreRequest;
use Modules\Purchase\Http\Requests\UpdateRequest;
use Modules\Purchase\Models\Purchase;
use Modules\Purchase\Services\PurchaseService;

class PurchaseController extends Controller
{
    public function __construct(
        private PurchaseService $purchaseService,
        private Purchase $model
    ) {}

    public function index(Request $request)
    {
        $purchases = $this->model
            ->current()
            ->with(['supplier'])
            ->withCount('items')
            ->orderBy('id', 'desc')
            ->paginate(perPage: 10);
        return Inertia::render('Purchase::Index', compact('purchases'));
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            $this->purchaseService->createPurchaseDetail($request->getRequestedProducts(), $item->id);
            $this->purchaseService->createPurchasePayment($request->getRequestedPayment(), $item->id);
            return to_route('purchases.index');
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
