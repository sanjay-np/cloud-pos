<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Product\StoreRequest;
use Modules\Product\Http\Requests\Product\UpdateRequest;
use Modules\Product\Models\Product;

class ProductController extends Controller
{
    public function __construct(
        private Product $model
    ) {}

    public function index(Request $request)
    {
        $products = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Product::Index', [
            'products' => $products
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested() + [
            'main_image' => $request->getMainImage(),
            'gallery_images' => $request->getGalleryImages()
        ]);
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

    // public function search(Request $request)
    // {
    //     return $this->model->search($request->search_qry);
    // }
}
