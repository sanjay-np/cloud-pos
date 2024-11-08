<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Brand\StoreRequest;
use Modules\Product\Http\Requests\Brand\UpdateRequest;
use Modules\Product\Interfaces\Brand\BrandServiceInterface;

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
        return Inertia::render('Product::Brand', [
            'brands' => $brands
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->brandService->store($request->getValidated() + [
            'image' => $request->getImage()
        ]);
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function show($id)
    {
        return $this->brandService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update image
        $item = $this->brandService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->brandService->destroy($id);
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function take(int $count)
    {
        return $this->brandService->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->brandService->search($search_qry);
    }
}
