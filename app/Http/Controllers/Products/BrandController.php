<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\StoreRequest;
use App\Http\Requests\Brand\UpdateRequest;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function __construct(
        private Brand $model,
    ) {}

    public function index(Request $request)
    {
        $brands = $this->model->query()
            ->select(['id', 'name', 'image','description'])
            ->simplePaginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('brand/index', compact('brands'));
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
