<?php

namespace App\Http\Controllers;

use App\Contracts\Brand\BrandServiceInterface;
use App\Http\Requests\Brand\StoreRequest;
use App\Http\Requests\Brand\UpdateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    protected $brandService;

    public function __construct(BrandServiceInterface $brandService)
    {
        $this->brandService = $brandService;
    }

    public function index()
    {
        $brands = $this->brandService->paginate(perPage: 10);
        return Inertia::render(component: 'Brands/Index', props: [
            'brands' => $brands
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->brandService->store(data: $request->validated());
        if ($item) {
            return to_route(route: 'brands.index');
        }
    }

    public function find($id)
    {
        return $this->brandService->find(id: $id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->brandService->update(data: $request->validated(), id: $id);
        if ($item) {
            return to_route(route: 'brands.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->brandService->destroy(id: $id);
        if ($item) {
            return to_route(route: 'brands.index');
        }
    }

    public function search(Request $request)
    {
        $brands = $this->brandService->search(search_qry: $request->search_qry);
        if (isset($request->show_type) && $request->show_type === 'picker') {
            return $brands->map(function ($brand) {
                return [
                    'value' => $brand->id,
                    'label' => $brand->name
                ];
            });
        }
        return $brands;
    }

    public function picker(Request $request)
    {
        $brands = $this->brandService->take($request->count ?? 10);
        $brands = $brands->map(function ($brand) {
            return [
                'value' => $brand->id,
                'label' => $brand->name
            ];
        });
        return $brands;
    }
}
