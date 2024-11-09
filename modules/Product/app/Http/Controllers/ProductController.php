<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Product\StoreRequest;
use Modules\Product\Http\Requests\Product\UpdateRequest;
use Modules\Product\Interfaces\Product\ProductServiceInterface;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productService->paginate(perPage: 10);
        return Inertia::render('Product::Index', [
            'products' => $products
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->productService->store($request->getValidated() + [
            'main_image' => $request->getMainImage(),
            'gallery_images' => $request->getGalleryImages()
        ]);
        if ($item) {
            return to_route('products.index');
        }
    }

    public function show($id)
    {
        return $this->productService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->productService->update($request->getValidated(), $id);
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
}
