<?php

namespace App\Http\Controllers;

use App\Contracts\Product\ProductServiceInterface;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use Inertia\Inertia;

class ProductController extends Controller
{

    protected $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }


    public function index()
    {
        $products = $this->productService->paginate(10);
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }


    public function store(StoreProductRequest $request)
    {
        $this->productService->store($request->all());
        return to_route('products.index');
    }


    public function update(UpdateProductRequest $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
