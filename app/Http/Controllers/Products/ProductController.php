<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        private Product $model,
    ) {}


    public function index(Request $request)
    {
        $products = $this->model->query()
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => Inertia::merge($products->items()),
            'pagination' => Arr::except($products->toArray(), ['data', 'links']),
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('products.index');
        }
    }


    public function show($id)
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('products.index');
        }
    }


    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('products.index');
        }
    }
}
