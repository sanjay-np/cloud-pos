<?php

namespace App\Http\Controllers;

use App\Contracts\Product\BrandServiceInterface;
use App\Http\Requests\BrandRequest;
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

    public function store(BrandRequest $request)
    {
        $this->brandService->store(data: $request->validated());
        return to_route(route: 'brands.index');
    }

    public function update(BrandRequest $request, $id)
    {
        $this->brandService->update(data: $request->validated(), id: $id);
        return to_route(route: 'brands.index');
    }

    public function destroy($id)
    {
        $this->brandService->delete(id: $id);
        return to_route(route: 'brands.index');
    }

    public function find($id)
    {
        $item = $this->brandService->find(id: $id);
        return $item;
    }
}
