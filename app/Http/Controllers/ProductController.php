<?php

namespace App\Http\Controllers;

use App\Contracts\Brand\BrandServiceInterface;
use App\Contracts\Product\ProductServiceInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
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
        $brands = $this->brandService->findAll();
        $suppliers = $this->supplierService->findAll();
        $products = $this->productService->paginate(10);
        return Inertia::render('Products/Index', [
            'products' => $products,
            'brands' => $brands,
            'suppliers' => $suppliers
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
