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
        $brands = $this->brandService->brandsValueAndLabel();
        $suppliers = $this->supplierService->suppliersValueAndLabel();
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
        return to_route('products.index');
    }

    public function find($id){

        $product = $this->productService->find($id);
        return $product;
    }


    public function update(UpdateProductRequest $request, $id)
    {
        $item  = $this->productService->update($request->validated(), $id);
        return to_route('products.index');
    }


    public function destroy($id)
    {
        //
    }
}
