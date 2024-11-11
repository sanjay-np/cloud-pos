<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Product\StoreRequest;
use Modules\Product\Http\Requests\Product\UpdateRequest;
use Modules\Product\Repositories\ProductRepository;

class ProductController extends Controller
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = $this->productRepository->paginate(perPage: 10);
        return Inertia::render('Product::Index', [
            'products' => $products
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->productRepository->store($request->getValidated() + [
            'main_image' => $request->getMainImage(),
            'gallery_images' => $request->getGalleryImages()
        ]);
        if ($item) {
            return to_route('products.index');
        }
    }

    public function show($id)
    {
        return $this->productRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->productRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('products.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->productRepository->delete($id);
        if ($item) {
            return to_route('products.index');
        }
    }

    public function search(Request $request)
    {
        return $this->productRepository->search($request->search_qry);
    }
}
