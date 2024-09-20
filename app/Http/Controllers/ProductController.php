<?php

namespace App\Http\Controllers;

use App\Contracts\Product\ProductServiceInterface;
use App\Models\Product;
use Illuminate\Http\Request;
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


    public function store(Request $request)
    {
        //
    }




    public function update(Request $request, Product $product)
    {
        //
    }

   
    public function destroy(Product $product)
    {
        //
    }
}
