<?php

namespace Modules\Purchase\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Purchase\Http\Requests\StoreRequest;
use Modules\Purchase\Http\Requests\UpdateRequest;
use Modules\Purchase\Interfaces\PurchaseServiceInterface;

class PurchaseController extends Controller
{
    protected $purchaseService;

    public function __construct(PurchaseServiceInterface $purchaseService)
    {
        $this->purchaseService = $purchaseService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Purchase::Index');
    }

    public function store(StoreRequest $request)
    {
        $item = $this->purchaseService->store($request->getValidated());
        if ($item) {
            return to_route('purchases.index');
        }
    }

    public function show(int $id)
    {
        return $this->purchaseService->show($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->purchaseService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('purchases.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->purchaseService->destroy($id);
        if ($item) {
            return to_route('purchases.index');
        }
    }
}
