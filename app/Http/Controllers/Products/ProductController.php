<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private Product $model,
    ) {}


    public function index(Request $request): Response
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


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('products.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show($id): Product
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('products.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy($id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('products.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function search(Request $request): Collection
    {
        return $this->model->query()
            ->select(['id', 'title', 'purchase_price', 'sale_price', 'main_image'])
            ->applyFilter($request->search_qry)
            ->take(10)
            ->get();
    }
}
