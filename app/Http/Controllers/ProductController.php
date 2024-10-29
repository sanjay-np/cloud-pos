<?php

namespace App\Http\Controllers;

use App\Contracts\Brand\BrandServiceInterface;
use App\Contracts\Product\ProductServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productService, $brandService, $supplierService;

    public function __construct(
        ProductServiceInterface $productService,
        BrandServiceInterface $brandService,
        SupplierServiceInterface $supplierService
    ) {
        $this->productService = $productService;
        $this->brandService = $brandService;
        $this->supplierService = $supplierService;
    }


    public function index()
    {
        $brands = $this->brandService->labelAndValue();
        $suppliers = $this->supplierService->labelAndValue();
        $products = $this->productService->paginate(10);
        return Inertia::render('Products/Index', [
            'products' => $products,
            'brands' => $brands,
            'suppliers' => $suppliers
        ]);
    }


    public function store(StoreProductRequest $request)
    {
        $item = $this->productService->store($request->all());
        if ($item) {
            return to_route('products.index');
        }
    }

    public function find($id)
    {
        return $this->productService->find($id);
    }


    public function update(UpdateProductRequest $request, $id)
    {
        $item  = $this->productService->update($request->validated(), $id);
        if ($item) {
            return to_route('products.index');
        }
    }


    public function destroy($id)
    {
        $item = $this->productService->destroy($id);
        if ($item) {
            return to_route('products.index');
        }
    }

    public function search(Request $request)
    {
        $products = $this->productService->search($request->search_qry);
        if (isset($request->show_type) && $request->show_type === 'picker') {
            return $products->map(function ($product) {
                return [
                    'value' => $product->id,
                    'label' => $product->name
                ];
            });
        }
        return $products;
    }

    public function picker(Request $request)
    {
        return $this->productService->labelAndValue($request->count ?? 10);
    }
}
