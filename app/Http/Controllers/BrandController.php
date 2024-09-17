<?php

namespace App\Http\Controllers;

use App\Contracts\Product\BrandServiceInterface;
use App\Http\Requests\BrandRequest;
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

    public function store(BrandRequest $request)
    {
        // $logoPath = null;
        // if ($request->hasFile(key: 'image')) {
        //     $logoPath = $this->uploadImage(image: $request->file(key: 'image')['blobFile'], path: 'Brands');
        // }

        // $brand = Brand::create(attributes: [
        //     'name' => $request->name,
        //     'description' => $request->description,
        //     'image' => $logoPath,
        // ]);
        // return to_route(route: 'brands.index');
    }

    public function update(Request $request, $id)
    {
        // $request->validate(rules: [
        //     'name' => 'required|string|max:255',
        // ]);
        // $brand = Brand::findOrFail(id: $id);
        // $logoPath = null;
        // if ($request->hasFile(key: 'image')) {
        //     $logoPath = $this->uploadImage(image: $request->file(key: 'image')['blobFile'], path: 'Brands');
        // }

        // $brand->update([
        //     'name' => $request->name,
        //     'description' => $request->description,
        //     'image' => $logoPath ?? $brand->image,
        // ]);
        // return to_route(route: 'brands.index');
    }

    public function destroy($id)
    {
        // $this->brandService->destroy(id: $id);
        // return to_route(route: 'brands.index');
    }

    public function find($id)
    {
        $item = $this->brandService->find(id: $id);
        return $item;
    }
}
