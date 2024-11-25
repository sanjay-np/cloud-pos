<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Brand\StoreRequest;
use Modules\Product\Http\Requests\Brand\UpdateRequest;
use Modules\Product\Models\Brand;

class BrandController extends Controller
{
    public function __construct(private Brand $model) {}

    public function index(Request $request)
    {
        $brands = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Product::Brand', [
            'brands' => $brands
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update image
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('brands.index');
        }
    }
}
