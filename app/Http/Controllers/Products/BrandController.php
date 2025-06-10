<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\StoreRequest;
use App\Http\Requests\Brand\UpdateRequest;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    public function __construct(
        private Brand $model,
    ) {}


    public function index(Request $request): Response
    {
        $brands = $this->model->query()
            ->select(['id', 'name', 'image', 'description'])
            ->applyFilter($request->all())
            ->paginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('brand/index', [
            'brands' => Inertia::merge($brands->items()),
            'pagination' => Arr::except($brands->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('brands.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show($id): Brand
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('brands.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy($id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('brands.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
