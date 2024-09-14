<?php

namespace App\Http\Controllers;

use App\Contracts\Product\BrandServiceInterface;
use App\Models\Brand;
use App\Traits\ImageUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    use ImageUpload;

    protected $brandService;

    public function __construct(BrandServiceInterface $brandService)
    {
        $this->brandService = $brandService;

    }

    public function index(): Response
    {
        $brands = $this->brandService->get(type: 'paginate');
        return Inertia::render(component: 'Brands/Index', props: [
            'brands' => $brands
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate(rules: [
            'name' => 'required|string|max:255',
        ]);
        $logoPath = null;
        if ($request->hasFile(key: 'image')) {
            $logoPath = $this->uploadImage(image: $request->file(key: 'image')['blobFile'], path: 'Brands');
        }

        $brand = Brand::create(attributes: [
            'name' => $request->name,
            'description' => $request->description,
            'image' => $logoPath,
        ]);
        return to_route(route: 'brands.index');
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $request->validate(rules: [
            'name' => 'required|string|max:255',
        ]);
        $brand = Brand::findOrFail(id: $id);
        $logoPath = null;
        if ($request->hasFile(key: 'image')) {
            $logoPath = $this->uploadImage(image: $request->file(key: 'image')['blobFile'], path: 'Brands');
        }

        $brand->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $logoPath ?? $brand->image,
        ]);
        return to_route(route: 'brands.index');
    }

    public function destroy($id): RedirectResponse
    {
        $this->brandService->destroy(id: $id);
        return to_route(route: 'brands.index');
    }

    public function find($id)
    {
        $item = $this->brandService->find(id: $id);
        return $item;
    }
}
