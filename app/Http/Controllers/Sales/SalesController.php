<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sales\StoreRequest;
use App\Http\Requests\Sales\UpdateRequest;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function __construct(
        private Sale $model,
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
