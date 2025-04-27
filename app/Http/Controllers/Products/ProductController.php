<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
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
            ->select(['id', 'title', 'stock_qty', 'purchase_price', 'sale_price', 'main_image', 'status'])
            ->selectPurchasePrice()
            ->withSum('purchase as total_purchased', 'qty')
            ->withSum('sale as total_sold', 'qty')
            ->applyFilter($request->qry)
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => Inertia::merge($products->items()),
            'pagination' => Arr::except($products->toArray(), ['data', 'links']),
            'categories' => Inertia::defer(fn() => Category::query()->select(['id', 'name'])->get(), 'optional'),
            'brands' => Inertia::defer(fn() => Brand::query()->select(['id', 'name'])->get()?->map(fn($item) => [
                'label' => $item->name,
                'value' => $item->id
            ]), 'optional'),
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


    public function search(Request $request)
    {
        return $this->model->query()
            ->select(['id', 'title', 'purchase_price', 'sale_price', 'main_image'])
            ->applyFilter($request->search_qry)
            ->take(10)
            ->get();
    }
}
