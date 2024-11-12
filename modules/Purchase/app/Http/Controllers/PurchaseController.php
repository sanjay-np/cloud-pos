<?php

namespace Modules\Purchase\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Purchase\Http\Requests\StoreRequest;
use Modules\Purchase\Http\Requests\UpdateRequest;
use Modules\Purchase\Repositories\PurchaseRepository;
use Modules\Purchase\Services\PurchaseService;

class PurchaseController extends Controller
{
    protected $purchaseRepository, $purchaseService;

    public function __construct(PurchaseRepository $purchaseRepository, PurchaseService $purchaseService)
    {
        $this->purchaseRepository = $purchaseRepository;
        $this->purchaseService = $purchaseService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $purchases = $this->purchaseRepository->paginate(perPage: 10);
        return Inertia::render('Purchase::Index', [
            'purchases' => $purchases
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->purchaseRepository->store($request->getValidated());
        if ($item) {
            $this->purchaseService->createPurchaseDetail($request->getValidatedProducts(), $item->id);
            $this->purchaseService->createPurchasePayment($request->getValidatedPayment(), $item->id);
            return to_route('purchases.index');
        }
    }

    public function show(int $id)
    {
        return $this->purchaseRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->purchaseRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('purchases.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->purchaseRepository->delete($id);
        if ($item) {
            return to_route('purchases.index');
        }
    }
}
